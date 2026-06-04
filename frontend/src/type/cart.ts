export interface CartItem {
    id: number;
    roomTypeId: string | number;
    roomName: string;
    checkIn: string;
    checkOut: string;
    quantity: number;
    pricePerNight: number;
}