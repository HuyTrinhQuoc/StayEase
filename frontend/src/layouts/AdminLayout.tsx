import {Outlet} from "react-router-dom";
import HeaderAdmin from "../components/Header/HeaderAdmin";
import Sidebar from "../components/SidebarAdmin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="bg-background text-on-surface font-body-md antialiased flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar/>
            {/* Right Content */}
            <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden bg-background">
                {/* Header */}
                <HeaderAdmin/>
                {/* Page Content */}
                <Outlet/>

            </div>
        </div>
    );
};

export default AdminLayout;