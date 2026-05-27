import { Outlet } from "react-router-dom";
import Header from "../components/Header/header.tsx";
import Footer from "../components/Footer/footer.tsx";

const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;