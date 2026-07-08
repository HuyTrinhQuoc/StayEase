import React, { useState, useEffect } from 'react';
import type{ CartItem } from '../../type/cart';
import OrderSummary from "../../components/CartComponent/OrderSummary.tsx";
import CartItemCard from "../../components/CartComponent/CartItemCard.tsx";


const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // 1. Tự động lấy dữ liệu từ giỏ hàng đã lưu khi load trang
    useEffect(() => {
        const storedCart = localStorage.getItem('hotel_cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    // 2. Hàm xử lý xóa phòng khỏi giỏ hàng
    const handleRemoveItem = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('hotel_cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pt-24">
            {/* TOP BAR / NAVIGATION HEADER */}


            {/* MAIN CONTENT CANVAS */}
            <main className="flex-grow w-full max-w-[1280px] mx-auto px-6 md:px-16 py-12 md:py-20 flex flex-col gap-12">
                <header className="flex flex-col gap-4 border-b border-outline-variant/30 pb-8">
                    <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-primary text-4xl md:text-6xl font-serif">
                        Giỏ hàng của bạn
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">
                        Vui lòng kiểm tra lại thông tin phòng và các dịch vụ đã chọn trước khi thanh toán.
                    </p>
                </header>

                {cartItems.length === 0 ? (
                    /* Trạng thái giỏ hàng trống */
                    <div className="text-center py-20 border border-dashed rounded-lg bg-surface">
                        <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">luggage</span>
                        <p className="text-xl text-on-surface-variant mb-6">Giỏ hàng của bạn đang trống.</p>
                        <a href="/" className="inline-block border border-secondary text-secondary hover:bg-secondary hover:text-on-secondary px-6 py-3 font-button transition-colors uppercase">
                            Quay lại tìm phòng
                        </a>
                    </div>
                ) : (
                    /* Giao diện chính của Giỏ hàng gồm 2 cột */
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        {/* CỘT TRÁI: DANH SÁCH PHÒNG ĐÃ THÊM */}
                        <section className="w-full lg:w-2/3 flex flex-col gap-8">
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemoveItem}
                                />
                            ))}
                        </section>

                        {/* CỘT PHẢI: HOÁ ĐƠN TỔM TẮT */}
                        <OrderSummary cartItems={cartItems} />
                    </div>
                )}
            </main>

        </div>
    );
};

export default CartPage;