import { useState, useEffect } from 'react';
import type {RoomType} from "../type/Room.ts";
import {getRoomTypeById} from "../services/RoomServices.ts";


export const useRoomDetail = (id: string | undefined) => {
    const [room, setRoom] = useState<RoomType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoomDetail = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getRoomTypeById(id);
                setRoom(data);
            } catch (err) {
                setError('Không thể tải thông tin chi tiết phòng');
            } finally {
                setLoading(false);
            }
        };

        fetchRoomDetail();
        window.scrollTo(0, 0); // Tự động cuộn lên đầu khi vào trang
    }, [id]);

    return { room, loading, error };
};






