import {Routes, Route} from 'react-router-dom';
import MainLayout from "../layouts/Mainlayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RoomDetailPage from "../pages/RoomDetailPage/RoomDetailPage.tsx";
import PaymentPage from "../pages/PaymentPage/PaymentPay.tsx";
import SuccessPage from "../pages/SuccessPage/SuccessPage.tsx";
import HistoryPage from "../pages/HistoryPage/HistoryPage.tsx";
import Dashboard from "../pages/AdminDashBoardPage/AdminDashBoardPage.tsx";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminBookingPage from "../pages/AdminBookingPage/AdminBookingPage.tsx";
import RoomMatrixPage from "../pages/AdminRoomMatrixPage/AdminRoomMatrixPage.tsx";
import AdminRatesPage from "../pages/AdminRatesPage/AdminRatesPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage.tsx";
import RegisterPage from "../pages/RegisterPage/RegisterPage.tsx";
import CartPage from "../pages/CartPage/CartPage.tsx";
import {AdminChat} from "../components/ChatAdminComponent/AdminChat.tsx";



export default function AppRoutes() {
    return (
        <Routes>
            {/* chứa header footer chung của user */}
            <Route element={<MainLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/room-detail/:id" element={<RoomDetailPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/payment" element={<PaymentPage/>}/>
                <Route path="/success" element={<SuccessPage/>}/>
                <Route path="/history" element={<HistoryPage/>}/>
            </Route>

            {/*chứa header side chung của admin*/}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="booking" element={<AdminBookingPage />} />
                <Route path="roommatrix" element={<RoomMatrixPage />} />
                <Route path="rate" element={<AdminRatesPage />} />
                <Route path="chat" element={<AdminChat/>}/>
            </Route>

            <Route path={"/login"} element={<LoginPage/>}/>
            <Route path={"/reset-pass"} element={<ForgotPasswordPage/>}/>
            <Route path={"/register"} element={<RegisterPage/>}/>



        </Routes>
    );
}
