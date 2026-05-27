import { Routes, Route } from 'react-router-dom';
import MainLayout from "../layouts/Mainlayout.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RoomDetailPage from "../pages/RoomDetailPage/RoomDetailPage.tsx";



export default function AppRoutes() {
  return (
    <Routes>
      {/* ── USER ROUTES (Renter / Guest) ── */}
      <Route element={<MainLayout />}>


          <Route path="/" element={<HomePage />} />
          <Route path="/room-detail" element={<RoomDetailPage />} />


      </Route>



    </Routes>
  );
}
