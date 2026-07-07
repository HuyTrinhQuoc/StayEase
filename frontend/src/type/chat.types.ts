export interface ChatMessageDto {
    id?: number;
    chatRoomId: number;
    senderId: number;
    message: string;
    messageType: 'TEXT' | 'IMAGE' | 'FILE'; // Tương ứng cột message_type
    createdAt?: string;
}


export interface ChatRoomDto {
    id: number;
    userId: number;
    lastMessage: string;
    lastMessageAt: string;
}