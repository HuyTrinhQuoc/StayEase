import React from 'react';
import type{ CartItem } from '../../type/cart';

interface CartItemCardProps {
    item: CartItem;
    onRemove: (id: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
    // Tính toán số đêm từ checkIn và checkOut
    const inDate = new Date(item.checkIn);
    const outDate = new Date(item.checkOut);
    const timeDiff = outDate.getTime() - inDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

    const itemTotal = item.pricePerNight * nights * item.quantity;

    // Hàm format ngày hiển thị dạng DD/MM/YYYY
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    return (
        <article className="flex flex-col md:flex-row gap-6 p-6 border border-outline-variant/30 bg-surface relative group">
            {/* Nút xóa khỏi giỏ hàng */}
            <button
                onClick={() => onRemove(item.id)}
                className="absolute top-4 right-4 text-outline hover:text-error transition-colors p-2"
                aria-label="Xóa phòng"
            >
                <span className="material-symbols-outlined">close</span>
            </button>

            {/* Ảnh phòng mockup tạm thời dựa trên ID */}
            <div className="w-full md:w-48 aspect-[4/3] bg-surface-container-high overflow-hidden shrink-0">
                <img
                    alt={item.roomName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={`https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=500&q=80`}
                />
            </div>

            <div className="flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2 pr-8">
                    <h2 className="font-headline-sm text-headline-sm text-primary">{item.roomName}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        {formatDate(item.checkIn)} - {formatDate(item.checkOut)} ({nights} đêm)
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                        Số lượng: <span className="font-semibold text-primary">{item.quantity} phòng</span>
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">sell</span>
                        Đơn giá: {formatCurrency(item.pricePerNight)} VND / đêm
                    </p>
                </div>

                <div className="flex items-end justify-between mt-4 border-t border-outline-variant/30 pt-4">
                    <button className="font-button text-button text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-1">
                        Chỉnh sửa
                    </button>
                    <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-primary block">
                            {formatCurrency(itemTotal)} VND
                        </span>
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                            Tổng tiền phòng
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CartItemCard;