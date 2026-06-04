import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/availability";

export const getAvailableRooms = async (
    roomTypeId: number,
    checkIn: string,
    checkOut: string
) => {
    const response = await axios.get(API_URL, {
        params: {
            roomTypeId,
            checkIn,
            checkOut
        }
    });

    return response.data;
};