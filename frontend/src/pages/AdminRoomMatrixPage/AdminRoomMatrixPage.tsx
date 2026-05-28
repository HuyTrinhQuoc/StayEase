const RoomMatrixPage = () => {
    return (
        <main className="p-8 min-h-screen bg-surface-container-low flex flex-col pt-24git">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                        QUẢN LÝ PHÒNG
                    </p>

                    <h1 className="font-headline-md text-headline-md text-primary">
                        Ma trận Đặt phòng
                    </h1>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 bg-surface p-4 rounded-lg border border-outline-variant shadow-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Available
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Occupied
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Dirty
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                        <span className="font-button text-button text-on-surface-variant">
                            Maintenance
                        </span>
                    </div>
                </div>
            </div>

            {/* Matrix Container */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col">
                {/* Header */}
                <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant bg-surface-container-lowest">
                    <div className="p-4 border-r border-outline-variant flex items-center justify-center">
                        <span className="font-label-caps text-label-caps text-on-surface-variant">
                            PHÒNG
                        </span>
                    </div>

                    <div className="grid grid-cols-6">
                        {[
                            "Nov 14",
                            "Nov 15",
                            "Nov 16",
                            "Nov 17",
                            "Nov 18",
                            "Nov 19",
                        ].map((date) => (
                            <div
                                key={date}
                                className="p-4 border-r last:border-r-0 border-outline-variant text-center font-button text-button text-primary"
                            >
                                {date}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto relative">
                    {/* Background Grid */}
                    <div className="absolute inset-0 grid grid-cols-[120px_1fr] pointer-events-none">
                        <div className="border-r border-outline-variant"></div>

                        <div className="grid grid-cols-6 h-full">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="border-r border-outline-variant border-dashed opacity-50"
                                ></div>
                            ))}

                            <div></div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        {/* ROOM 101 */}
                        <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                101
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div className="absolute top-2 bottom-2 left-0 w-2/6 bg-red-100 border border-red-500 rounded cursor-pointer flex items-center px-3">
                                    <span className="font-label-caps text-label-caps text-red-800">
                                        Smith (2 Nights)
                                    </span>
                                </div>

                                <div
                                    className="absolute top-2 bottom-2 w-1/6 bg-yellow-100 border border-yellow-400 rounded flex items-center px-3"
                                    style={{ left: "33.33%" }}
                                >
                                    <span className="font-label-caps text-label-caps text-yellow-800">
                                        Cleaning
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ROOM 102 */}
                        <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                102
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div className="absolute top-2 bottom-2 w-3/6 bg-green-50 border border-green-500 border-dashed rounded flex items-center px-3">
                                    <span className="font-label-caps text-label-caps text-green-700 opacity-50">
                                        Available
                                    </span>
                                </div>

                                <div
                                    className="absolute top-2 bottom-2 w-3/6 bg-red-100 border border-red-500 rounded flex items-center px-3"
                                    style={{ left: "50%" }}
                                >
                                    <span className="font-label-caps text-label-caps text-red-800">
                                        Nguyen (3 Nights)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ROOM 103 */}
                        <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                103
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div className="absolute inset-2 bg-gray-100 border border-gray-400 rounded flex items-center px-3">
                                    <span className="font-label-caps text-label-caps text-gray-700">
                                        Maintenance
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ROOM 201 */}
                        <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                201
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div
                                    className="absolute top-2 bottom-2 w-4/6 bg-red-100 border border-red-500 rounded flex items-center px-3"
                                    style={{ left: "16.66%" }}
                                >
                                    <span className="font-label-caps text-label-caps text-red-800">
                                        Johnson (4 Nights)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ROOM 202 */}
                        <div className="grid grid-cols-[120px_1fr] border-b border-outline-variant h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                202
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div className="absolute inset-2 bg-green-50 border border-green-500 border-dashed rounded flex items-center justify-center px-3">
                                    <span className="font-label-caps text-label-caps text-green-700 opacity-50">
                                        Drag to book
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ROOM 203 */}
                        <div className="grid grid-cols-[120px_1fr] h-16 hover:bg-surface-container-low transition-colors">
                            <div className="p-4 flex items-center justify-center font-button text-button text-primary bg-surface border-r border-outline-variant">
                                203
                            </div>

                            <div className="relative w-full h-full p-2">
                                <div className="absolute top-2 bottom-2 w-1/6 bg-red-100 border border-red-500 rounded flex items-center px-3">
                                    <span className="font-label-caps text-label-caps text-red-800">
                                        Doe (1N)
                                    </span>
                                </div>

                                <div
                                    className="absolute top-2 bottom-2 w-1/6 bg-yellow-100 border border-yellow-400 rounded flex items-center px-3"
                                    style={{ left: "16.66%" }}
                                >
                                    <span className="font-label-caps text-label-caps text-yellow-800">
                                        C
                                    </span>
                                </div>

                                <div
                                    className="absolute top-2 bottom-2 w-3/6 bg-red-100 border border-red-500 rounded flex items-center px-3"
                                    style={{ left: "33.33%" }}
                                >
                                    <span className="font-label-caps text-label-caps text-red-800">
                                        Tran (3 Nights)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-surface-container-lowest p-3 border-t border-outline-variant text-center">
                    <p className="font-label-caps text-label-caps text-on-surface-variant flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">
                            drag_indicator
                        </span>

                        Kéo và thả các khối đặt phòng để thay đổi ngày hoặc đổi
                        phòng
                    </p>
                </div>
            </div>
        </main>
    );
};

export default RoomMatrixPage;