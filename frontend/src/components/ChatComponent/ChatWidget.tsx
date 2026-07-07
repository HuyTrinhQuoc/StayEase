import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import type { ChatMessageDto } from "../../type/chat.types";


export const ChatWidget = () => {
    const { token, userId, isAuthenticated } = useSelector((state: any) => state.auth);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageDto[]>([]);
    const [inputStr, setInputStr] = useState('');
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [roomId, setRoomId] = useState<number | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        let client: Client;

        if (isOpen && isAuthenticated && token && userId) {
            // 1. Gọi API lấy thông tin phòng chat và lịch sử
            fetch(`http://localhost:8080/api/chat/my-room/${userId}`)
                .then(res => res.json())
                .then(roomData => {
                    const currentRoomId = roomData.id;
                    setRoomId(currentRoomId);

                    // Lấy lịch sử tin nhắn
                    fetch(`http://localhost:8080/api/chat/room/${currentRoomId}/messages`)
                        .then(res => res.json())
                        .then(history => setMessages(history));

                    // 2. Khởi tạo WebSocket ngay sau khi có Room ID
                    client = new Client({
                        // NẾU BACKEND DÙNG SOCKJS thì đổi dòng dưới thành:
                        // webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
                        brokerURL: 'ws://localhost:8080/ws',
                        connectHeaders: { Authorization: `Bearer ${token}` },
                        reconnectDelay: 5000,
                        onConnect: () => {
                            console.log("WebSocket connected!");

                            // Lắng nghe tin nhắn từ phòng này
                            client.subscribe(`/topic/room.${currentRoomId}`, (message) => {
                                const newMsg: ChatMessageDto = JSON.parse(message.body);
                                setMessages((prev) => [...prev, newMsg]);
                            });
                        },
                        onStompError: (frame) => console.error('STOMP error:', frame.headers['message']),
                        onWebSocketError: (event) => console.error('WebSocket error:', event)
                    });

                    client.activate();
                    setStompClient(client);
                })
                .catch(err => console.error("Lỗi lấy thông tin phòng chat:", err));
        }

        // Cleanup function: Đảm bảo ngắt kết nối đúng cách khi đóng khung chat hoặc component unmount
        return () => {
            if (client) {
                client.deactivate();
                setStompClient(null);
            }
        };
    }, [isOpen, isAuthenticated, token, userId]);

    const handleSendText = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputStr.trim() && stompClient?.connected && roomId && userId) {
            const payload: ChatMessageDto = {
                chatRoomId: roomId,
                senderId: userId,
                message: inputStr,
                messageType: 'TEXT' // Như bạn định nghĩa trong backend [cite: 3]
            };

            stompClient.publish({
                destination: `/app/chat.send`,
                body: JSON.stringify(payload)
            });
            setInputStr('');
        }
    };

    // Hàm xử lý khi chọn file/ảnh

// Cần import axios hoặc dùng fetch
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'IMAGE' | 'FILE') => {
        const file = event.target.files?.[0];
        if (!file || !stompClient || !roomId) return;

        // 1. Tạo FormData để gửi file
        const formData = new FormData();
        formData.append("file", file);

        try {
            // 2. Upload file lên Backend
            const response = await fetch("http://localhost:8080/api/chat/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) throw new Error("Upload thất bại");

            // 3. Lấy URL trả về từ server
            const fileUrl = await response.text();

            // 4. Gửi tin nhắn qua STOMP (WebSocket)
            const chatMessageDto = {
                chatRoomId: roomId,
                senderId: userId, // Dùng adminId nếu ở phía admin
                message: fileUrl, // Lưu URL thay vì text
                messageType: type // 'IMAGE' hoặc 'FILE'
            };

            stompClient.publish({
                destination: '/app/chat.send',
                body: JSON.stringify(chatMessageDto)
            });

        } catch (error) {
            console.error("Lỗi khi gửi file:", error);
            alert("Lỗi khi tải file lên!");
        } finally {
            // Reset input
            event.target.value = '';
        }
    };
    // Tạm tắt kiểm tra role để bạn test UI
    // if (role !== 'guest') return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                // CẬP NHẬT KÍCH THƯỚC: w-96 (384px) và h-[500px] để khung chat to và dễ nhìn hơn
                <div className="flex flex-col w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-sm z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Hỗ trợ khách hàng</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Danh sách tin nhắn */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p className="text-sm">Hãy gửi tin nhắn để bắt đầu!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.senderId === userId;
                                return (
                                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] px-4 py-2.5 shadow-sm text-sm ${
                                            isMe
                                                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                                                : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
                                        }`}>
                                            {/* Hiển thị tùy theo loại tin nhắn [cite: 3] */}
                                            {msg.messageType === 'TEXT' && <p>{msg.message}</p>}
                                            {msg.messageType === 'IMAGE' && <img src={msg.message} alt="sent image" className="rounded-lg max-w-full" />}
                                            {msg.messageType === 'FILE' && <a href={msg.message} target="_blank" className="underline font-semibold">📎 Tải tệp tin</a>}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Khung nhập tin nhắn với Toolbar */}
                    <div className="bg-white border-t border-gray-200 p-2">
                        <form onSubmit={handleSendText} className="flex items-center gap-2">

                            {/* Nút gửi ảnh */}
                            <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Gửi ảnh"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>

                            {/* Nút đính kèm file */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Đính kèm tệp"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                            </button>

                            {/* Input ẩn để xử lý file */}
                            {/* Nút gửi ảnh */}
                            <input
                                type="file"
                                ref={imageInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'IMAGE')}
                            />

                            {/* Nút gửi file */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
                                onChange={(e) => handleFileUpload(e, 'FILE')}
                            />

                            {/* Input text */}
                            <input
                                type="text"
                                className="flex-1 border-0 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
                                placeholder="Nhập tin nhắn..."
                                value={inputStr}
                                onChange={(e) => setInputStr(e.target.value)}
                            />

                            {/* Nút Send */}
                            <button
                                type="submit"
                                disabled={!inputStr.trim()}
                                className="bg-blue-600 text-white p-2.5 rounded-full flex justify-center items-center hover:bg-blue-700 disabled:bg-gray-300 transition-colors ml-1"
                            >
                                <svg className="w-5 h-5 transform rotate-45 -mt-0.5 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-xl flex justify-center items-center transition-transform hover:scale-110 relative"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}
        </div>
    );
};