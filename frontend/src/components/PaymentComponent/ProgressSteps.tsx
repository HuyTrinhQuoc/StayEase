import { useCountdown } from '../../hooks/useCountdown';

export const ProgressSteps = () => {
    // Gọi hook đếm ngược 10 phút (600 giây)
    const { formattedTime, isTimeUp } = useCountdown(600);

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-neutral-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-semibold">1</div>
                    <span className="hidden text-xs uppercase tracking-[0.2em] md:block">Chọn phòng</span>
                </div>

                <span className="material-symbols-outlined text-sm text-neutral-400">chevron_right</span>

                <div className="flex items-center gap-2 text-black">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">2</div>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">Thanh toán</span>
                </div>

                <span className="material-symbols-outlined text-sm text-neutral-400">chevron_right</span>

                <div className="flex items-center gap-2 text-neutral-400">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[10px] font-semibold">3</div>
                    <span className="hidden text-xs uppercase tracking-[0.2em] md:block">Hoàn tất</span>
                </div>
            </div>

            {/* Khối hiển thị thời gian giữ phòng */}
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                isTimeUp ? 'bg-red-50 text-red-600 font-medium' : 'bg-[#f0eded] text-[#775a19]'
            }`}>
                <span className="material-symbols-outlined text-[18px]">
                    {isTimeUp ? 'alarm_off' : 'timer'}
                </span>
                <span className="uppercase tracking-[0.15em]">
                    {isTimeUp ? 'Hết giờ giữ phòng!' : `Giữ phòng: ${formattedTime}`}
                </span>
            </div>
        </div>
    );
};