import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';


const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>(''); // THÊM STATE LƯU TÊN
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // Tự động kiểm tra Token và Tên mỗi khi URL thay đổi
    useEffect(() => {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem('userName'); // LẤY TÊN

        setIsLoggedIn(!!token);
        if (name) {
            const shortName = name.split(' ').pop();
            setUserName(shortName || 'User');
        }
    }, [location]);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName'); // XOÁ TÊN KHI LOGOUT
        setIsLoggedIn(false);
        setUserName('');
        setShowDropdown(false);
        alert("Đăng xuất thành công!");
        navigate('/');
    };

    return (
        <nav
            id="navbar"
            className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 shadow-sm backdrop-blur-md transition-all duration-300 print:hidden"
        >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-16">

                <Link to="/" className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold text-black">
                        Stay Ease
                    </h1>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link to="/" className="border-b border-secondary pb-1 text-secondary">
                        Trang chủ
                    </Link>
                    <a href="#" className="text-on-surface-variant transition hover:text-secondary">
                        Danh sách phòng
                    </a>
                    <a href="#" className="text-on-surface-variant transition hover:text-secondary">
                        Dịch vụ
                    </a>
                    <a href="#" className="text-on-surface-variant transition hover:text-secondary">
                        Hình ảnh
                    </a>
                    <a href="#" className="text-on-surface-variant transition hover:text-secondary">
                        Liên hệ
                    </a>

                </div>

                {/* Khu vực nút chức năng Desktop */}
                <div className="hidden md:flex items-center gap-4 relative">


                    {isLoggedIn ? (
                        <div className="relative">
                            {/* CẬP NHẬT: Thêm flex-col và items-center để chữ nằm dưới icon */}
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex flex-col items-center justify-center text-on-surface hover:text-secondary transition focus:outline-none ml-2"
                            >
                                <span className="material-symbols-outlined text-[28px] cursor-pointer select-none leading-none">
                                    account_circle
                                </span>
                                {/* HIỂN THỊ TÊN PHÍA DƯỚI ICON */}
                                <span className="text-[11px] font-semibold mt-1 tracking-wider uppercase text-on-surface-variant">
                                    {userName}
                                </span>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-3 w-44 bg-white border border-outline-variant/30 rounded-xl shadow-xl py-2 z-50">
                                    <div className="px-4 py-2 border-b border-outline-variant/20 mb-1">
                                        <p className="text-xs text-on-surface-variant">Đăng nhập với</p>
                                        <p className="text-sm font-semibold truncate">{localStorage.getItem('userName')}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1 font-medium text-on-surface-variant hover:text-primary transition ml-2"
                        >

                            Đăng nhập
                        </Link>
                    )}
                </div>

                <button className="md:hidden">
                    <span className="material-symbols-outlined text-3xl">menu</span>
                </button>
            </div>

        </nav>
    );
};

export default Header;