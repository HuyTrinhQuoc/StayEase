import type { BookingLocationState, PaymentFormData } from '../../type/booking';

interface Props {
    bookingDetails: BookingLocationState;
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

export const BookingSummary = ({ bookingDetails, form, vatFee, serviceFee, discount, totalPrice, promoError, isLoading, onInputChange, onApplyPromo, onSubmit }: Props) => {
    const currencyFormatter = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

    // Tính số ngày/đêm thực tế từ dữ liệu DateTime nhận được
    const dateIn = new Date(bookingDetails.checkIn);
    const dateOut = new Date(bookingDetails.checkOut);
    const totalNights = Math.max(1, Math.ceil((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24)));

    return (
        <aside className="lg:col-span-4">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
                <div className="relative h-56">
                    <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop" alt="Room" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-white">
                        <p className="mb-1 text-xs uppercase tracking-[0.2em]">L'Héritage Luxury</p>
                        <h3 className="font-serif text-2xl">Phòng Deluxe Hướng Biển</h3>
                    </div>
                </div>

                <div className="space-y-6 p-6">
                    <div className="grid grid-cols-2 gap-4 border-b border-neutral-200 pb-6">
                        <div>
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-neutral-500">Nhận phòng</p>
                            <h4 className="font-medium">{dateIn.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
                            <p className="mt-1 text-sm text-neutral-500">Từ {dateIn.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div>
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-neutral-500">Trả phòng</p>
                            <h4 className="font-medium">{dateOut.toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' })}</h4>
                            <p className="mt-1 text-sm text-neutral-500">Trước {dateOut.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="col-span-2 flex items-center justify-between rounded-lg bg-neutral-100 p-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#775a19]">group</span>
                                <span className="text-sm">2 Người lớn, 1 Trẻ em</span>
                            </div>
                            <span className="text-sm text-neutral-500">{totalNights} Đêm</span>
                        </div>
                    </div>

                    <div className="space-y-4 border-b border-neutral-200 pb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Tiền phòng ({totalNights} đêm)</span>
                            <span>{currencyFormatter(bookingDetails.price * totalNights)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Thuế VAT</span>
                            <span>{currencyFormatter(vatFee)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Phí dịch vụ</span>
                            <span>{currencyFormatter(serviceFee)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-green-600 font-medium">
                                <span>Mã giảm giá áp dụng</span>
                                <span>-{currencyFormatter(discount)}</span>
                            </div>
                        )}
                        <div className="pt-2">
                            <div className="flex items-center gap-2">
                                <input type="text" name="promoCode" value={form.promoCode} onChange={onInputChange} placeholder="Nhập mã WELCOME2026" className="flex-1 border-0 border-b border-neutral-300 bg-transparent px-0 py-2 text-sm outline-none transition focus:border-black" />
                                <button type="button" onClick={onApplyPromo} className="text-xs font-semibold uppercase tracking-[0.15em] text-[#775a19] hover:opacity-80">Áp dụng</button>
                            </div>
                            {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="mb-6 flex items-end justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Tổng cộng</span>
                            <span className="font-serif text-3xl text-[#775a19]">{currencyFormatter(totalPrice)}</span>
                        </div>
                        <div className="mb-6 flex items-start gap-3">
                            <input type="checkbox" name="agreedToTerms" checked={form.agreedToTerms} onChange={onInputChange} className="mt-1 h-4 w-4" />
                            <p className="text-sm leading-relaxed text-neutral-500">Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của khách sạn.</p>
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