// import React, { useState, useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { Client } from '@stomp/stompjs';
// import type {ChatMessageDto} from "../../type/chat.types.ts";
//
//
// interface ChatRoom {
//     id: number;
//     user: {
//         id: number;
//         name: string;
//         email: string;
//     };
//     lastMessage: string;
//     lastMessageAt: string;
// }
//
// export const AdminChat = () => {
//     const { token, userId } = useSelector((state: any) => state.auth);
//
//     const [rooms, setRooms] = useState<ChatRoom[]>([]);
//     const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
//     const [messages, setMessages] = useState<ChatMessageDto[]>([]);
//     const [inputStr, setInputStr] = useState('');
//     const [stompClient, setStompClient] = useState<Client | null>(null);
//     const [isConnected, setIsConnected] = useState(false);
//     const [roomId] = useState<number | null>(null);
//
//     const messagesEndRef = useRef<HTMLDivElement>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const imageInputRef = useRef<HTMLInputElement>(null);
//     // Cần import axios hoặc dùng fetch
//     const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'IMAGE' | 'FILE') => {
//         const file = event.target.files?.[0];
//         if (!file || !stompClient || !roomId) return;
//
//         // 1. Tạo FormData để gửi file
//         const formData = new FormData();
//         formData.append("file", file);
//
//         try {
//             // 2. Upload file lên Backend
//             const response = await fetch("http://localhost:8080/api/chat/upload", {
//                 method: "POST",
//                 // Nếu có Token thì thêm header: headers: { Authorization: `Bearer ${token}` },
//                 body: formData
//             });
//
//             if (!response.ok) throw new Error("Upload thất bại");
//
//             // 3. Lấy URL trả về từ server
//             const fileUrl = await response.text();
//
//             // 4. Gửi tin nhắn qua STOMP (WebSocket)
//             const chatMessageDto = {
//                 chatRoomId: roomId,
//                 senderId: userId, // Dùng adminId nếu ở phía admin
//                 message: fileUrl, // Lưu URL thay vì text
//                 messageType: type // 'IMAGE' hoặc 'FILE'
//             };
//
//             stompClient.publish({
//                 destination: '/app/chat.send',
//                 body: JSON.stringify(chatMessageDto)
//             });
//
//         } catch (error) {
//             console.error("Lỗi khi gửi file:", error);
//             alert("Lỗi khi tải file lên!");
//         } finally {
//             // Reset input
//             event.target.value = '';
//         }
//     };
//
//
//
//
//     // 1. Kết nối WebSocket tổng khi Admin vào trang
//     // 1. Fetch danh sách phòng & Kết nối WebSocket tổng
//     useEffect(() => {
//         if (!token) return;
//
//         let client: Client;
//
//         // Lấy danh sách phòng chat ban đầu
//         fetch('http://localhost:8080/api/chat/admin/rooms', {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//             .then(res => res.json())
//             .then(data => setRooms(data))
//             .catch(err => console.error("Lỗi lấy danh sách phòng:", err));
//
//         // Khởi tạo STOMP Client
//         client = new Client({
//             brokerURL: 'ws://localhost:8080/ws',
//             connectHeaders: { Authorization: `Bearer ${token}` },
//             reconnectDelay: 5000,
//             onConnect: () => {
//                 console.log("Admin WebSocket connected!");
//                 setIsConnected(true);
//
//                 // Lắng nghe phòng chat có tin nhắn mới
//                 client.subscribe('/topic/admin.rooms', (message) => {
//                     const updatedRoom: ChatRoom = JSON.parse(message.body);
//
//                     setRooms((prevRooms) => {
//                         // Lọc bỏ phòng cũ (nếu có) và đẩy phòng vừa cập nhật lên đầu mảng
//                         const filtered = prevRooms.filter(r => r.id !== updatedRoom.id);
//                         return [updatedRoom, ...filtered];
//                     });
//                 });
//             },
//             onDisconnect: () => {
//                 console.log("Admin WebSocket disconnected!");
//                 setIsConnected(false);
//             }
//         });
//
//         client.activate();
//         setStompClient(client);
//
//         return () => {
//             if (client) {
//                 client.deactivate();
//             }
//         };
//     }, [token]);
//
//     // 2. Fetch tin nhắn khi click chọn 1 phòng cụ thể
//     useEffect(() => {
//         if (!selectedRoom || !stompClient || !isConnected) return;
//
//         fetch(`http://localhost:8080/api/chat/room/${selectedRoom.id}/messages`, {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//             .then(res => res.json())
//             .then(history => setMessages(history))
//             .catch(err => console.error("Lỗi lấy lịch sử:", err));
//
//         const subscription = stompClient.subscribe(`/topic/room.${selectedRoom.id}`, (message) => {
//             const newMsg: ChatMessageDto = JSON.parse(message.body);
//             setMessages((prev) => [...prev, newMsg]);
//         });
//
//         return () => {
//             subscription.unsubscribe(); // Hủy nghe phòng cũ
//         };
//     }, [selectedRoom, stompClient, isConnected, token]);
//
//     // Tự động cuộn xuống đáy khi có tin nhắn mới
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);
//
//     // 4. Gửi tin nhắn phản hồi cho khách
//     const handleSendMessage = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (inputStr.trim() && stompClient?.connected && selectedRoom && userId) {
//             const payload: ChatMessageDto = {
//                 chatRoomId: selectedRoom.id,
//                 senderId: userId,
//                 message: inputStr,
//                 messageType: 'TEXT'
//             };
//
//             stompClient.publish({
//                 destination: `/app/chat.send`,
//                 body: JSON.stringify(payload)
//             });
//             setInputStr('');
//         }
//     };
//
//     return (
//         // Giải quyết Layout chuẩn: ml-64 (tránh sidebar trái), pt-16 (tránh header trên)
//         <div className="pt-16 h-screen flex bg-background border-l border-outline-variant">
//
//             {/* CỘT TRÁI: DANH SÁCH PHÒNG CHAT CỦA KHÁCH */}
//             <div className="w-80 border-r border-outline-variant flex flex-col h-full bg-surface">
//                 <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container">
//                     <h2 className="font-headline-sm text-base font-bold text-primary flex items-center gap-2">
//                         <span className="material-symbols-outlined text-xl">forum</span>
//                         Tin nhắn hỗ trợ
//                     </h2>
//                     <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} title={isConnected ? "Đã kết nối Socket" : "Mất kết nối"} />
//                 </div>
//
//                 {/* Danh sách các User đang chat */}
//                 <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
//                     {rooms.length === 0 ? (
//                         <div className="p-8 text-center text-sm text-on-surface-variant">Chưa có cuộc trò chuyện nào.</div>
//                     ) : (
//                         rooms.map((room) => {
//                             const isSelected = selectedRoom?.id === room.id;
//                             return (
//                                 <div
//                                     key={room.id}
//                                     onClick={() => setSelectedRoom(room)}
//                                     className={`p-4 cursor-pointer transition-colors flex flex-col gap-1 hover:bg-surface-container ${
//                                         isSelected ? 'bg-surface-container border-l-4 border-primary pl-3' : ''
//                                     }`}
//                                 >
//                                     <div className="flex justify-between items-center">
//                                         <span className="font-semibold text-sm text-on-surface truncate max-w-[70%]">
//                                             {room.user?.name || "Khách ẩn danh"}
//                                         </span>
//                                         <span className="text-[11px] text-on-surface-variant">
//                                             {room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
//                                         </span>
//                                     </div>
//                                     <p className="text-xs text-on-surface-variant truncate pr-2">
//                                         {room.lastMessage || "Chưa có tin nhắn"}
//                                     </p>
//                                 </div>
//                             );
//                         })
//                     )}
//                 </div>
//             </div>
//
//             {/* CỘT PHẢI: CHI TIẾT KHUNG TRÒ CHUYỆN */}
//             <div className="flex-1 flex flex-col h-full bg-surface-container">
//                 {selectedRoom ? (
//                     <>
//                         {/* Header của khung chat */}
//                         <div className="h-14 border-b border-outline-variant bg-surface px-6 flex items-center justify-between shadow-sm">
//                             <div>
//                                 <h3 className="font-semibold text-on-surface text-sm">{selectedRoom.user?.name}</h3>
//                                 <p className="text-xs text-on-surface-variant">{selectedRoom.user?.email}</p>
//                             </div>
//                             <div className="text-xs text-primary font-medium px-2 py-1 bg-blue-50 rounded border border-blue-100">
//                                 Room ID: #{selectedRoom.id}
//                             </div>
//                         </div>
//
//                         {/* Vùng hiển thị tin nhắn */}
//                         <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
//                             {messages.map((msg, idx) => {
//                                 const isMe = msg.senderId === userId;
//                                 return (
//                                     <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
//                                         <div className={`max-w-[65%] flex flex-col gap-0.5`}>
//                                             <div className={`px-4 py-2 text-sm shadow-sm ${
//                                                 isMe
//                                                     ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm'
//                                                     : 'bg-white text-on-surface border border-outline-variant rounded-2xl rounded-tl-sm'
//                                             }`}>
//                                                 {/* 1. Nếu là tin nhắn chữ */}
//                                                 {msg.messageType === 'TEXT' && <p>{msg.message}</p>}
//
//                                                 {/* 2. Nếu là hình ảnh -> Hiển thị thẻ img */}
//                                                 {msg.messageType === 'IMAGE' && (
//                                                     <img
//                                                         src={msg.message}
//                                                         alt="Hình ảnh từ khách"
//                                                         className="rounded-lg max-w-full h-auto cursor-pointer max-h-60 object-cover"
//                                                         onClick={() => window.open(msg.message, '_blank')} // Click để phóng to tab mới
//                                                     />
//                                                 )}
//
//                                                 {/* 3. Nếu là file -> Hiển thị link tải */}
//                                                 {msg.messageType === 'FILE' && (
//                                                     <a
//                                                         href={msg.message}
//                                                         target="_blank"
//                                                         rel="noopener noreferrer"
//                                                         className="underline font-semibold flex items-center gap-1 text-blue-600 hover:text-blue-800"
//                                                     >
//                                                         📎 Tải tệp tin đính kèm
//                                                     </a>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                             <div ref={messagesEndRef} />
//                         </div>
//
//                         {/* Ô nhập tin nhắn trả lời */}
//                         <div className="p-4 bg-surface border-t border-outline-variant">
//                             <form onSubmit={handleSendMessage} className="flex gap-3 items-center">
//                                 <input
//                                     type="text"
//                                     value={inputStr}
//                                     onChange={(e) => setInputStr(e.target.value)}
//                                     placeholder={`Trả lời ${selectedRoom.user?.name}...`}
//                                     className="flex-1 bg-surface-container border border-outline-variant rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
//                                 />
//                                 {/* Nút gửi ảnh */}
//                                 <input
//                                     type="file"
//                                     ref={imageInputRef}
//                                     className="hidden"
//                                     accept="image/*"
//                                     onChange={(e) => handleFileUpload(e, 'IMAGE')}
//                                 />
//
//                                 {/* Nút gửi file */}
//                                 <input
//                                     type="file"
//                                     ref={fileInputRef}
//                                     className="hidden"
//                                     accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
//                                     onChange={(e) => handleFileUpload(e, 'FILE')}
//                                 />
//                                 <button
//                                     type="submit"
//                                     disabled={!inputStr.trim()}
//                                     className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
//                                 >
//                                     <span className="material-symbols-outlined text-sm transform rotate-45 -mt-0.5">send</span>
//                                     Gửi
//                                 </button>
//                             </form>
//                         </div>
//                     </>
//                 ) : (
//                     // Trạng thái khi Admin chưa chọn phòng nào
//                     <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant gap-3">
//                         <span className="material-symbols-outlined text-6xl text-outline animate-bounce">forum</span>
//                         <p className="text-sm font-medium">Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu hỗ trợ khách hàng.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };














import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import type {ChatMessageDto} from "../../type/chat.types.ts";


interface ChatRoom {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    lastMessage: string;
    lastMessageAt: string;
}

export const AdminChat = () => {
    const { token, userId } = useSelector((state: any) => state.auth);

    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<ChatMessageDto[]>([]);
    const [inputStr, setInputStr] = useState('');
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);


    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    // Cần import axios hoặc dùng fetch
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'IMAGE' | 'FILE') => {
        const file = event.target.files?.[0];

        // SỬA TẠI ĐÂY: Kiểm tra selectedRoom thay vì roomId
        if (!file || !stompClient || !selectedRoom) {
            console.error("Thiếu file, kết nối hoặc chưa chọn phòng chat!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Gọi API upload lên backend (đã mở comment Token bảo mật)
            const response = await fetch("http://localhost:8080/api/chat/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) throw new Error("Upload lên server thất bại");

            const fileUrl = await response.text();

            // Đóng gói dữ liệu gửi qua WebSocket
            const chatMessageDto = {
                chatRoomId: selectedRoom.id, // SỬA: Lấy chuẩn ID phòng Admin đang chọn
                senderId: userId,           // SỬA: Lấy ID của Admin làm người gửi
                message: fileUrl,
                messageType: type
            };

            stompClient.publish({
                destination: '/app/chat.send',
                body: JSON.stringify(chatMessageDto)
            });

        } catch (error) {
            console.error("Lỗi khi Admin gửi file:", error);
            alert("Hệ thống không thể tải file/ảnh của Admin lên!");
        } finally {
            event.target.value = ''; // Reset input để có thể chọn lại chính file đó lần sau
        }
    };




    // 1. Kết nối WebSocket tổng khi Admin vào trang
    // 1. Fetch danh sách phòng & Kết nối WebSocket tổng
    useEffect(() => {
        if (!token) return;

        let client: Client;

        // Lấy danh sách phòng chat ban đầu
        fetch('http://localhost:8080/api/chat/admin/rooms', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setRooms(data))
            .catch(err => console.error("Lỗi lấy danh sách phòng:", err));

        // Khởi tạo STOMP Client
        client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            connectHeaders: { Authorization: `Bearer ${token}` },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Admin WebSocket connected!");
                setIsConnected(true);

                // Lắng nghe phòng chat có tin nhắn mới
                client.subscribe('/topic/admin.rooms', (message) => {
                    const updatedRoom: ChatRoom = JSON.parse(message.body);

                    setRooms((prevRooms) => {
                        // Lọc bỏ phòng cũ (nếu có) và đẩy phòng vừa cập nhật lên đầu mảng
                        const filtered = prevRooms.filter(r => r.id !== updatedRoom.id);
                        return [updatedRoom, ...filtered];
                    });
                });
            },
            onDisconnect: () => {
                console.log("Admin WebSocket disconnected!");
                setIsConnected(false);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [token]);

    // 2. Fetch tin nhắn khi click chọn 1 phòng cụ thể
    useEffect(() => {
        if (!selectedRoom || !stompClient || !isConnected) return;

        fetch(`http://localhost:8080/api/chat/room/${selectedRoom.id}/messages`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(history => setMessages(history))
            .catch(err => console.error("Lỗi lấy lịch sử:", err));

        const subscription = stompClient.subscribe(`/topic/room.${selectedRoom.id}`, (message) => {
            const newMsg: ChatMessageDto = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMsg]);
        });

        return () => {
            subscription.unsubscribe(); // Hủy nghe phòng cũ
        };
    }, [selectedRoom, stompClient, isConnected, token]);

    // Tự động cuộn xuống đáy khi có tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 4. Gửi tin nhắn phản hồi cho khách
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputStr.trim() && stompClient?.connected && selectedRoom && userId) {
            const payload: ChatMessageDto = {
                chatRoomId: selectedRoom.id,
                senderId: userId,
                message: inputStr,
                messageType: 'TEXT'
            };

            stompClient.publish({
                destination: `/app/chat.send`,
                body: JSON.stringify(payload)
            });
            setInputStr('');
        }
    };

    return (
        // Giải quyết Layout chuẩn: ml-64 (tránh sidebar trái), pt-16 (tránh header trên)
        <div className="pt-16 h-screen flex bg-background border-l border-outline-variant">

            {/* CỘT TRÁI: DANH SÁCH PHÒNG CHAT CỦA KHÁCH */}
            <div className="w-80 border-r border-outline-variant flex flex-col h-full bg-surface">
                <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container">
                    <h2 className="font-headline-sm text-base font-bold text-primary flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">forum</span>
                        Tin nhắn hỗ trợ
                    </h2>
                    <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} title={isConnected ? "Đã kết nối Socket" : "Mất kết nối"} />
                </div>

                {/* Danh sách các User đang chat */}
                <div className="flex-1 overflow-y-auto divide-y divide-outline-variant">
                    {rooms.length === 0 ? (
                        <div className="p-8 text-center text-sm text-on-surface-variant">Chưa có cuộc trò chuyện nào.</div>
                    ) : (
                        rooms.map((room) => {
                            const isSelected = selectedRoom?.id === room.id;
                            return (
                                <div
                                    key={room.id}
                                    onClick={() => setSelectedRoom(room)}
                                    className={`p-4 cursor-pointer transition-colors flex flex-col gap-1 hover:bg-surface-container ${
                                        isSelected ? 'bg-surface-container border-l-4 border-primary pl-3' : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm text-on-surface truncate max-w-[70%]">
                                            {room.user?.name || "Khách ẩn danh"}
                                        </span>
                                        <span className="text-[11px] text-on-surface-variant">
                                            {room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                                        </span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant truncate pr-2">
                                        {room.lastMessage || "Chưa có tin nhắn"}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* CỘT PHẢI: CHI TIẾT KHUNG TRÒ CHUYỆN */}
            <div className="flex-1 flex flex-col h-full bg-surface-container">
                {selectedRoom ? (
                    <>
                        {/* Header của khung chat */}
                        <div className="h-14 border-b border-outline-variant bg-surface px-6 flex items-center justify-between shadow-sm">
                            <div>
                                <h3 className="font-semibold text-on-surface text-sm">{selectedRoom.user?.name}</h3>
                                <p className="text-xs text-on-surface-variant">{selectedRoom.user?.email}</p>
                            </div>
                            <div className="text-xs text-primary font-medium px-2 py-1 bg-blue-50 rounded border border-blue-100">
                                Room ID: #{selectedRoom.id}
                            </div>
                        </div>

                        {/* Vùng hiển thị tin nhắn */}
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
                            {messages.map((msg, idx) => {
                                const isMe = msg.senderId === userId;
                                return (
                                    <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[65%] flex flex-col gap-0.5`}>
                                            <div className={`px-4 py-2 text-sm shadow-sm ${
                                                isMe
                                                    ? 'bg-primary text-on-primary rounded-2xl rounded-tr-sm'
                                                    : 'bg-white text-on-surface border border-outline-variant rounded-2xl rounded-tl-sm'
                                            }`}>
                                                {/* 1. Nếu là tin nhắn chữ */}
                                                {msg.messageType === 'TEXT' && <p>{msg.message}</p>}

                                                {/* 2. Nếu là hình ảnh -> Hiển thị thẻ img */}
                                                {msg.messageType === 'IMAGE' && (
                                                    <img
                                                        src={msg.message}
                                                        alt="Hình ảnh từ khách"
                                                        className="rounded-lg max-w-full h-auto cursor-pointer max-h-60 object-cover"
                                                        onClick={() => window.open(msg.message, '_blank')} // Click để phóng to tab mới
                                                    />
                                                )}

                                                {/* 3. Nếu là file -> Hiển thị link tải */}
                                                {msg.messageType === 'FILE' && (
                                                    <a
                                                        href={msg.message}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline font-semibold flex items-center gap-1 text-blue-600 hover:text-blue-800"
                                                    >
                                                        📎 Tải tệp tin đính kèm
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Ô nhập tin nhắn trả lời */}
                        <div className="p-4 bg-surface border-t border-outline-variant">
                            <form onSubmit={handleSendMessage} className="flex items-center gap-2 flex-1">
                                {/* 1. KHU VỰC CHỌN ẢNH */}
                                <input
                                    type="file"
                                    ref={imageInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'IMAGE')}
                                />
                                <button
                                    type="button"
                                    onClick={() => imageInputRef.current?.click()} // SỬA: Thêm onClick để kích hoạt input chọn ảnh
                                    className="text-on-surface-variant hover:bg-surface-variant/50 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">image</span>
                                </button>

                                {/* 2. KHU VỰC CHỌN FILE DỰ PHÒNG */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
                                    onChange={(e) => handleFileUpload(e, 'FILE')}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()} // SỬA: Thêm onClick để kích hoạt input chọn file
                                    className="text-on-surface-variant hover:bg-surface-variant/50 w-10 h-10 rounded-full flex items-center justify-center transition-colors mr-2"
                                >
                                    <span className="material-symbols-outlined text-xl">attach_file</span>
                                </button>

                                {/* 3. Ô NHẬP TEXT CỦA ADMIN */}
                                <input
                                    type="text"
                                    value={inputStr}
                                    onChange={(e) => setInputStr(e.target.value)}
                                    placeholder="Nhập nội dung phản hồi khách hàng..."
                                    className="flex-1 bg-surface border border-outline rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-primary text-on-surface placeholder-on-surface-variant/60"
                                />

                                {/* 4. NÚT GỬI */}
                                <button
                                    type="submit"
                                    disabled={!inputStr.trim()}
                                    className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                >
                                    <span className="material-symbols-outlined text-sm transform rotate-45 -mt-0.5">send</span>
                                    Gửi
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    // Trạng thái khi Admin chưa chọn phòng nào
                    <div className="flex-1 flex flex-col items-center justify-center text-on-surface-variant gap-3">
                        <span className="material-symbols-outlined text-6xl text-outline animate-bounce">forum</span>
                        <p className="text-sm font-medium">Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu hỗ trợ khách hàng.</p>
                    </div>
                )}
            </div>
        </div>
    );
};