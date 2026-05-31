import type { RoomImage } from '../../type/Room';

interface Props {
    images: RoomImage[];
}

const RoomGallery = ({ images }: Props) => {
    const mainImg = images[0]?.url || undefined;
    const sideImg1 = images[1]?.url || undefined;
    const sideImg2 = images[2]?.url || undefined;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16 h-[600px]">
            <div className="md:col-span-2 h-full overflow-hidden">
                <img
                    src={mainImg}
                    alt="Room Main"
                    className="w-full h-full object-cover hover:scale-105 duration-700"
                />
            </div>
            <div className="hidden md:grid grid-rows-[1fr_1fr] gap-3 h-full">
                <div className="overflow-hidden">
                    <img
                        src={sideImg1}
                        alt="Room Detail 1"
                        className="w-full h-full object-cover hover:scale-105 duration-700"
                    />
                </div>
                <div className="overflow-hidden relative">
                    <img
                        src={sideImg2}
                        alt="Room Detail 2"
                        className="w-full h-full object-cover hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <button className="border border-white text-white px-5 py-2 uppercase tracking-widest text-sm hover:bg-white hover:text-black duration-300">
                            Xem tất cả ảnh ({images.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomGallery;