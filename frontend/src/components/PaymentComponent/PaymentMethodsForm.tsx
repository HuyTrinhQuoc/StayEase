import type { PaymentFormData } from '../../type/booking';

interface Props {
    form: PaymentFormData;
    onMethodChange: (method: PaymentFormData['paymentMethod']) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const METHODS = [
    { id: 'Thẻ Quốc Tế', icon: 'credit_card', title: 'Thẻ Quốc Tế', sub: 'Visa / Mastercard' },
    { id: 'Ví Điện Tử', icon: 'account_balance_wallet', title: 'Ví Điện Tử', sub: 'MoMo / ZaloPay' },
    { id: 'Chuyển khoản', icon: 'qr_code_scanner', title: 'Chuyển khoản', sub: 'VietQR' },
    { id: 'Thanh toán tại Khách sạn', icon: 'luggage', title: 'Thanh toán tại', sub: 'Khách sạn' },
] as const;

export const PaymentMethodsForm = ({ form, onMethodChange, onInputChange }: Props) => {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">Phương thức thanh toán</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {METHODS.map((item) => (
                    <label key={item.id} className={`group relative cursor-pointer rounded-xl border p-6 transition ${form.paymentMethod === item.id ? 'border-[#775a19] bg-[#fcf9f8]' : 'border-neutral-200 hover:border-neutral-400'}`}>
                        <input type="radio" name="paymentMethod" checked={form.paymentMethod === item.id} onChange={() => onMethodChange(item.id)} className="absolute right-4 top-4" />
                        <div className="flex flex-col items-center text-center">
                            <span className="material-symbols-outlined mb-3 text-4xl text-neutral-600">{item.icon}</span>
                            <span className="text-sm font-semibold uppercase tracking-[0.15em]">{item.title}</span>
                            <span className="mt-1 text-xs text-neutral-500">{item.sub}</span>
                        </div>
                    </label>
                ))}
            </div>

            {/* Khối nhập thẻ Visa/Mastercard chỉ hiện khi người dùng click chọn Thẻ Quốc Tế */}
            {form.paymentMethod === 'Thẻ Quốc Tế' && (
                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-8 md:grid-cols-2 animate-fadeIn">
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Số thẻ</label>
                        <input type="text" name="cardNumber" value={form.cardNumber} onChange={onInputChange} placeholder="0000 0000 0000 0000" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Ngày hết hạn</label>
                        <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={onInputChange} placeholder="MM/YY" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" />
                    </div>
                    <div>
                        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">CVV</label>
                        <input type="text" name="cardCvv" value={form.cardCvv} onChange={onInputChange} placeholder="123" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" />
                    </div>
                </div>
            )}
        </div>
    );
};