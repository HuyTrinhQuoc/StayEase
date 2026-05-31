import { useState, useEffect } from 'react';
import type { RoomType } from '../type/Room';
import {getRoomTypes} from "../services/RoomServices.ts";


export const useRooms = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                setLoading(true);
                const data = await getRoomTypes();
                setRooms(data);
            } catch (err) {
                setError('Không thể tải danh sách phòng');
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    return { rooms, loading, error };
};