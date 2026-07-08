import type { PaymentFormData } from '../../type/booking';

// Định nghĩa lại Type cho item phòng (Copy từ hook qua hoặc import từ file type chung)
export interface CheckoutItem {
    roomTypeId: number;
    roomName: string;
    checkIn: string;
    checkOut: string;
    quantity: number;
    pricePerNight: number;
}

interface Props {
    checkoutItems: CheckoutItem[]; // Nhận mảng thay vì 1 object
    form: PaymentFormData;
    vatFee: number;
    serviceFee: number;
    discount: number;
    totalPrice: number;
    promoError: string;
    isLoading: boolean;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onApplyPromo: () => void;
    onSubmit: () => void;
}

export const BookingSummary = ({
                                   checkoutItems, form, vatFee, serviceFee, discount, totalPrice, promoError, isLoading, onInputChange, onApplyPromo, onSubmit
                               }: Props) => {
    const currencyFormatter = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    return (
        <aside className="lg:col-span-4">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
                <div className="relative h-40">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop" alt="Room" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-5 text-white">
                        <p className="mb-0 text-xs uppercase tracking-[0.2em] opacity-80">L'Héritage Luxury</p>
                        <h3 className="font-serif text-xl">Thông tin đặt phòng</h3>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    {/* --- KHU VỰC 1: DANH SÁCH PHÒNG ĐÃ CHỌN --- */}
                    <div className="max-h-60 overflow-y-auto space-y-4 border-b border-neutral-200 pb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-400">
                            Chi tiết phòng ({checkoutItems.length} loại)
                        </p>
                        {checkoutItems.map((item, idx) => {
                            const dateIn = new Date(item.checkIn);
                            const dateOut = new Date(item.checkOut);
                            const nights = Math.max(1, Math.ceil((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)));

                            return (
                                <div key={idx} className="rounded-xl bg-neutral-50 p-3 text-sm border border-neutral-100">
                                    <div className="flex justify-between font-medium text-neutral-800">
                                        <span>{item.roomName}</span>
                                        <span>x{item.quantity} phòng</span>
                                    </div>
                                    <div className="mt-1 text-xs text-neutral-500 flex justify-between">
                                        <span>
                                            {dateIn.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                                            &nbsp;→&nbsp;
                                            {dateOut.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                                        </span>
                                        <span className="font-semibold text-neutral-600">{nights} đêm</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* --- KHU VỰC 2: CHI TIẾT TÍNH TIỀN --- */}
                    <div className="space-y-3 border-b border-neutral-200 pb-4 text-sm">
                        {/* Lặp để hiển thị tiền từng loại phòng */}
                        {checkoutItems.map((item, idx) => {
                            const nights = Math.max(1, Math.ceil((new Date(item.checkOut).getTime() - new Date(item.checkIn).getTime()) / (1000 * 60 * 60 * 24)));
                            return (
                                <div key={idx} className="flex justify-between text-xs text-neutral-500">
                                    <span className="truncate max-w-[200px]">{item.roomName}</span>
                                    <span>{currencyFormatter(item.pricePerNight * nights * item.quantity)}</span>
                                </div>
                            );
                        })}

                        <div className="flex justify-between pt-2 border-t border-dashed border-neutral-200">
                            <span className="text-neutral-500">Thuế VAT (8%)</span>
                            <span>{currencyFormatter(vatFee)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-500">Phí dịch vụ (5%)</span>
                            <span>{currencyFormatter(serviceFee)}</span>
                        </div>

                        {discount > 0 && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Mã giảm giá áp dụng</span>
                                <span>-{currencyFormatter(discount)}</span>
                            </div>
                        )}

                        {/* Mã giảm giá */}
                        <div className="pt-2">
                            <div className="flex items-center gap-2">
                                <input type="text" name="promoCode" value={form.promoCode} onChange={onInputChange} placeholder="Nhập mã ưu đãi" className="flex-1 border-0 border-b border-neutral-300 bg-transparent px-0 py-1 text-sm outline-none transition focus:border-black" />
                                <button type="button" onClick={onApplyPromo} className="text-xs font-semibold uppercase text-[#775a19] hover:opacity-80">Áp dụng</button>
                            </div>
                            {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                        </div>
                    </div>

                    {/* --- KHU VỰC 3: TỔNG KẾT VÀ NÚT BẤM --- */}
                    <div>
                        <div className="mb-4 flex items-end justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tổng cộng</span>
                            <span className="font-serif text-2xl text-[#775a19] font-bold">{currencyFormatter(totalPrice)}</span>
                        </div>
                        <div className="mb-4 flex items-start gap-3">
                            <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} onChange={onInputChange} className="mt-1 h-4 w-4" />
                            <p className="text-xs leading-relaxed text-neutral-500">Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của khách sạn.</p>
                        </div>
                        <button type="button" onClick={onSubmit} disabled={isLoading} className="w-full bg-black py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#775a19] disabled:bg-neutral-400">
                            {isLoading ? 'Đang xử lý...' : 'Xác nhận & Thanh toán'}
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};