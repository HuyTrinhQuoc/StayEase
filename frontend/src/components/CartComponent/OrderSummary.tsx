import React from 'react';
import type { CartItem } from '../../type/cart';
import { useOrderSummary } from '../../hooks/useOrderSummary';

interface OrderSummaryProps {
    cartItems: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems }) => {
    // Gọi toàn bộ logic xử lý từ hook vừa tạo
    const {
        promoCode,
        setPromoCode,
        subtotal,
        serviceFee,
        vat,
        total,
        formatCurrency,
        handleCheckout,
        isCartEmpty
    } = useOrderSummary(cartItems);

    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-8 sticky top-32">
            <div className="bg-surface-container p-8 flex flex-col gap-6">
                <h3 className="font-headline-sm text-headline-sm text-primary border-b border-outline-variant/30 pb-4">
                    Tóm tắt đơn hàng
                </h3>

                {/* Khối Mã Khuyến Mãi */}
                <div className="flex flex-col gap-2">
                    <label className="font-label-caps text-label-caps text-on-surface-variant" htmlFor="promo">
                        Mã ưu đãi
                    </label>
                    <div className="flex">
                        <input
                            className="w-full bg-transparent border-b border-outline focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md placeholder-outline-variant transition-colors outline-none rounded-none"
                            id="promo"
                            placeholder="Nhập mã ưu đãi"
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="font-button text-button text-secondary px-4 whitespace-nowrap hover:text-primary transition-colors">
                            Áp dụng
                        </button>
                    </div>
                </div>

                {/* Khối Tính Toán Thuế Phí */}
                <div className="flex flex-col gap-4 font-body-md text-body-md text-on-surface-variant border-y border-outline-variant/30 py-6">
                    <div className="flex justify-between items-center">
                        <span>Tạm tính ({cartItems.length} loại phòng)</span>
                        <span className="text-primary">{formatCurrency(subtotal)} VND</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Phí dịch vụ (5%)</span>
                        <span className="text-primary">{formatCurrency(serviceFee)} VND</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>VAT (8%)</span>
                        <span className="text-primary">{formatCurrency(vat)} VND</span>
                    </div>
                    <div className="flex justify-between items-center text-secondary">
                        <span>Khuyến mãi áp dụng</span>
                        <span>-0 VND</span>
                    </div>
                </div>

                {/* Khối Thành Tiền Cuối Cùng */}
                <div className="flex justify-between items-end">
                    <span className="font-headline-sm text-headline-sm text-primary">Tổng cộng</span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">
                        {formatCurrency(total)} VND
                    </span>
                </div>

                {/* Hành động Checkout */}
                <button
                    onClick={handleCheckout}
                    disabled={isCartEmpty}
                    className={`text-white w-full py-4 font-button text-button uppercase tracking-widest transition-colors mt-4 
                        ${isCartEmpty
                        ? 'bg-gray-400 cursor-not-allowed opacity-50'
                        : 'bg-primary-container text-on-primary-fixed hover:bg-primary-container/90'
                    }`}
                >
                    ĐẶT PHÒNG
                </button>
            </div>
        </aside>
    );
};

export default OrderSummary;