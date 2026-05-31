export interface RoomImage {
    id: number;
    url: string;
    altText: string;
    sortOrder: number;
    isPrimary: boolean;
}

export interface RoomType {
    id: number;
    name: string;
    description: string;
    maxOccupancy: number;
    bedType: string;
    basePricePerNight: number;
    amenities: string;
    images: RoomImage[];
}