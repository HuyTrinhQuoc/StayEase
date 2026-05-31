import type { PaymentFormData } from '../../type/booking';

interface Props {
    form: PaymentFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const CustomerInfoForm = ({ form, onChange }: Props) => {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">Thông tin khách hàng</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Họ và tên *</label>
                    <input type="text" name="customerName" value={form.customerName} onChange={onChange} placeholder="Nhập họ tên" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" required />
                </div>
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Số điện thoại *</label>
                    <input type="text" name="phone" value={form.phone} onChange={onChange} placeholder="+84" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" required />
                </div>
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={onChange} placeholder="email@example.com" className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black" required />
                </div>
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Quốc tịch</label>
                    <select name="nationality" value={form.nationality} onChange={onChange} className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black">
                        <option value="Việt Nam">Việt Nam</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
                <input type="checkbox" name="isBookingForOthers" checked={form.isBookingForOthers} onChange={onChange} className="h-4 w-4" />
                <span className="text-sm">Tôi đặt phòng cho người khác</span>
            </div>
        </div>
    );
};