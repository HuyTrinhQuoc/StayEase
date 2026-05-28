const AdminRatesPage = () => {
    return (<main
            className="

                mt-16
                h-[calc(100vh-4rem)]
                overflow-y-auto
                overflow-x-hidden
                bg-surface-container-low
                p-8
                pb-32
            "
        >
            {/* Header */}
            <div className="flex justify-between items-end border-b border-outline-variant pb-6 mb-10">
                <div>
                    <h2 className="text-3xl font-semibold text-primary">
                        Quản lý Phòng & Giá
                    </h2>

                    <p className="text-on-surface-variant mt-2">
                        Thiết lập hạng phòng, giá bán và tình trạng phòng trống.
                    </p>
                </div>

                <button className="bg-primary text-white px-6 py-3 rounded hover:opacity-90 transition">
                    Lưu thay đổi
                </button>
            </div>

            {/* Room Types */}
            <section className="mb-14">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-primary">
                        Hạng phòng
                    </h3>

                    <button className="text-secondary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">
                            add
                        </span>

                        Thêm hạng phòng
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Card */}
                    <div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex">
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                            alt="room"
                            className="w-52 h-36 object-cover"
                        />

                        <div className="flex-1 p-6 flex justify-between items-center">
                            <div>
                                <h4 className="text-xl font-semibold text-primary mb-2">
                                    Classic Deluxe
                                </h4>

                                <div className="flex gap-5 text-sm text-on-surface-variant">
                                    <span>2 Khách</span>
                                    <span>45m²</span>
                                    <span>1 King / 2 Twin</span>
                                </div>
                            </div>

                            <button
                                className="border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white transition">
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white border border-outline-variant rounded-xl overflow-hidden flex">
                        <img
                            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
                            alt="room"
                            className="w-52 h-36 object-cover"
                        />

                        <div className="flex-1 p-6 flex justify-between items-center">
                            <div>
                                <h4 className="text-xl font-semibold text-primary mb-2">
                                    Executive Suite
                                </h4>

                                <div className="flex gap-5 text-sm text-on-surface-variant">
                                    <span>3 Khách</span>
                                    <span>75m²</span>
                                    <span>1 King</span>
                                </div>
                            </div>

                            <button
                                className="border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary hover:text-white transition">
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="mb-14">
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-primary mb-2">
                        Giá động & Phụ thu
                    </h3>

                    <p className="text-on-surface-variant">
                        Cấu hình giá cơ bản và phụ thu cuối tuần.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-outline-variant overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left border-collapse">
                        <thead className="bg-surface-container-low">
                        <tr className="text-left border-b border-outline-variant">
                            <th className="p-4">Hạng phòng</th>
                            <th className="p-4">Giá cơ bản</th>
                            <th className="p-4">Phụ thu cuối tuần</th>
                            <th className="p-4 text-right">Hành động</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr className="border-b border-outline-variant">
                            <td className="p-4 font-medium">
                                Classic Deluxe
                            </td>

                            <td className="p-4">
                                <input
                                    type="text"
                                    defaultValue="3,500,000"
                                    className="border-b border-outline-variant bg-transparent outline-none"
                                />
                            </td>

                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span>+</span>

                                    <input
                                        type="text"
                                        defaultValue="20"
                                        className="w-16 border-b border-outline-variant bg-transparent outline-none text-center"
                                    />

                                    <span>%</span>
                                </div>
                            </td>

                            <td className="p-4 text-right">
                                <button>
                                        <span className="material-symbols-outlined">
                                            save
                                        </span>
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td className="p-4 font-medium">
                                Executive Suite
                            </td>

                            <td className="p-4">
                                <input
                                    type="text"
                                    defaultValue="7,200,000"
                                    className="border-b border-outline-variant bg-transparent outline-none"
                                />
                            </td>

                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span>+</span>

                                    <input
                                        type="text"
                                        defaultValue="25"
                                        className="w-16 border-b border-outline-variant bg-transparent outline-none text-center"
                                    />

                                    <span>%</span>
                                </div>
                            </td>

                            <td className="p-4 text-right">
                                <button>
                                        <span className="material-symbols-outlined">
                                            save
                                        </span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Allotment */}
            <section>
                <div className="flex justify-between items-end border-b border-outline-variant pb-4 mb-6">
                    <div>
                        <h3 className="text-2xl font-semibold text-primary">
                            Quản lý quỹ phòng
                        </h3>

                        <p className="text-on-surface-variant mt-1">
                            Đóng / mở phòng theo từng giai đoạn.
                        </p>
                    </div>

                    <div className="border border-outline-variant rounded px-4 py-2 flex items-center gap-3 bg-white">
                        <span className="material-symbols-outlined">
                            calendar_today
                        </span>

                        <span>15/10 - 22/10/2024</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div
                        className="bg-white border border-outline-variant rounded-xl p-5 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-lg">
                                Classic Deluxe
                            </h4>

                            <p className="text-sm text-on-surface-variant mt-1">
                                Sẵn sàng: 12 phòng
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                defaultChecked
                                className="sr-only peer"
                            />

                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-secondary"></div>

                            <div
                                className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                        </label>
                    </div>

                    <div
                        className="bg-white border border-outline-variant rounded-xl p-5 flex justify-between items-center opacity-70">
                        <div>
                            <h4 className="font-semibold text-lg">
                                Executive Suite
                            </h4>

                            <p className="text-sm text-red-500 mt-1">
                                Đã đóng cho giai đoạn này
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                            />

                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-secondary"></div>

                            <div
                                className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                        </label>
                    </div>
                </div>
            </section>
        </main>);
};

export default AdminRatesPage;