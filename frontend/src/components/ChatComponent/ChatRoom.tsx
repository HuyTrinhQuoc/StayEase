import  { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import type {ChatMessageDto} from "../../type/chat.types.ts";


export const ChatRoom = ({ roomId, currentUserId }: { roomId: number, currentUserId: number }) => {
    const [messages, setMessages] = useState<ChatMessageDto[]>([]);
    const [inputStr, setInputStr] = useState('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        // 1. Gọi API REST lấy lịch sử cũ (chưa real-time)
        fetch(`/api/chat/room/${roomId}/messages`)
            .then(res => res.json())
            .then(data => setMessages(data));

        // 2. Kết nối WebSocket
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: () => {
                // Subscribe lắng nghe tin nhắn real-time
                client.subscribe(`/topic/room.${roomId}`, (message) => {
                    const newMsg: ChatMessageDto = JSON.parse(message.body);
                    setMessages(prev => [...prev, newMsg]);
                });
            }
        });

        client.activate();
        setStompClient(client);

        return () => { client.deactivate(); };
    }, [roomId]);

    const handleSend = () => {
        if (inputStr.trim() && stompClient?.connected) {
            const payload: ChatMessageDto = {
                chatRoomId: roomId,
                senderId: currentUserId,
                message: inputStr,
                messageType: 'TEXT'
            };

            // Đẩy dữ liệu qua đường ống WebSocket
            stompClient.publish({
                destination: '/app/chat.send',
                body: JSON.stringify(payload)
            });
            setInputStr('');
        }
    };

    return (
        <div className="chat-container">
            <div className="message-list">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.senderId === currentUserId ? 'my-msg' : 'other-msg'}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input value={inputStr} onChange={e => setInputStr(e.target.value)} />
                <button onClick={handleSend}>Gửi</button>
            </div>
        </div>
    );
};