import { Outlet } from "react-router-dom";
import Header from "../components/Header/header.tsx";
import Footer from "../components/Footer/footer.tsx";
import {ChatWidget} from "../components/ChatComponent/ChatWidget.tsx";


const MainLayout = () => {
    return (
        <div className="min-h-screen">

            <Header />
            <main>
                <Outlet />

            </main>
            <Footer />
            <ChatWidget/>
        </div>
    );
};

export default MainLayout;