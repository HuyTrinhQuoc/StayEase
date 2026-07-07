const Sidebar = () => {
    return (
        <nav className="bg-background h-screen w-64 fixed left-0 top-0 border-r border-outline-variant flex flex-col py-8 px-4 z-50">
            {/* Brand */}
            <div className="mb-10 px-4">
                <h1 className="font-headline-sm text-headline-sm text-primary">
                    Luxe Hotel
                </h1>
                <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                    Admin Console
                </p>
            </div>

            {/* Menu */}
            <ul className="flex-1 space-y-2">
                <li>
                    <a
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded bg-surface-container text-secondary border-r-2 border-secondary font-label-caps text-label-caps"
                    >
                        <span className="material-symbols-outlined fill">dashboard</span>
                        Overview
                    </a>
                </li>

                {[
                    { icon: "calendar_month", label: "Bookings", path: "/admin/booking" },
                    { icon: "grid_view", label: "Room Matrix", path: "/admin/roommatrix" },
                    { icon: "payments", label: "Rates", path: "/admin/rate" },
                    { icon: "concierge", label: "Services", path: "#" },
                    { icon: "settings", label: "Settings", path: "#" },
                    { icon: "forum", label: "Chat Support", path: "/admin/chat" },
                ].map((item) => (
                    <li key={item.label}>
                        <a
                            href={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors font-label-caps text-label-caps"
                        >
              <span className="material-symbols-outlined">
                {item.icon}
              </span>
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Button */}
            <div className="mt-auto px-4">
                <button className="w-full bg-primary text-on-primary font-button text-button py-3 rounded hover:bg-primary-container hover:text-on-primary-container transition-colors">
                    New Booking
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;