import axios from 'axios';
import type { RoomType } from '../type/Room';

const API_URL = 'http://localhost:8080/api/v1/room-types';

export const getRoomTypes = async (): Promise<RoomType[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phòng:", error);
        return [];
    }
};