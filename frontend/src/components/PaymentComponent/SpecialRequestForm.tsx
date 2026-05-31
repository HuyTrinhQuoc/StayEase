import type { PaymentFormData } from '../../type/booking';

interface Props {
    form: PaymentFormData;
    onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export const SpecialRequestForm = ({ form, onChange }: Props) => {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-8 border-b border-neutral-200 pb-4 font-serif text-2xl">Yêu cầu đặc biệt</h2>
            <div className="space-y-6">
                <div className="max-w-sm">
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Giờ nhận phòng dự kiến</label>
                    <select name="checkInTimeWindow" value={form.checkInTimeWindow} onChange={onChange} className="w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3 outline-none transition focus:border-black">
                        <option value="14:00 - 15:00">14:00 - 15:00</option>
                        <option value="15:00 - 18:00">15:00 - 18:00</option>
                        <option value="Sau 18:00">Sau 18:00</option>
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-500">Ghi chú</label>
                    <textarea name="note" value={form.note} onChange={onChange} rows={4} placeholder="Yêu cầu thêm về phòng, giường, dịch vụ đưa đón..." className="w-full rounded-lg border border-neutral-300 p-4 outline-none transition focus:border-black" />
                </div>
            </div>
        </div>
    );
};