import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/Mainlayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RoomDetailPage from "../pages/RoomDetailPage/RoomDetailPage.tsx";
import PaymentPage from "../pages/PaymentPage/PaymentPay.tsx";
import SuccessPage from "../pages/SuccessPage/SuccessPage.tsx";
import HistoryPage from "../pages/HistoryPage/HistoryPage.tsx";



export default function AppRoutes() {
  return (
    <Routes>
      {/* ── USER ROUTES (Renter / Guest) ── */}
      <Route element={<MainLayout />}>


          <Route path="/" element={<HomePage />} />
          <Route path="/room-detail" element={<RoomDetailPage />} />
          <Route path="/payment" element={<PaymentPage/>}/>
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/history" element={<HistoryPage />} />


      </Route>



    </Routes>
  );
}
