// components/Header.tsx


const HeaderAdmin = () => {
    return (
        <header className="bg-surface border-b border-outline-variant fixed top-0 right-0 h-16 flex items-center justify-between w-[calc(100%-16rem)] px-8 z-40">
            {/* Search */}
            <div className="flex items-center flex-1">
                <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent border-0 border-b border-outline-variant pl-8 py-1 focus:ring-0 focus:border-secondary outline-none"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                <button className="text-on-surface-variant hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>

                <button className="text-on-surface-variant hover:text-secondary transition-colors">
                    <span className="material-symbols-outlined">help_outline</span>
                </button>

                <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSBFQ1OAALkTnjcHJL1_0A273WOKANALUXcR7urfkEECnZLXDb-GkZWorUqhk7LrraetiXDarcG6NHXndEaJCorJaHhg5wv7nY2oQ0Oq2RXhrZV7e67-DMx4J5rx0MEp9mD_EOWv8ZQ8qbEixn7rz5ihqGGROxiwTWnhsVHPxBOnanUtYEIDizVeZaATHprHcI8m9I4YxwycSsirQX9ACRZxzUeQQXojL958Wdpj8r_Yg8hf_H99YIWEcfo1sYmbQypa4fklKoZ2M"
                        alt="Manager"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;