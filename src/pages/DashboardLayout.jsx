import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
    return (
        <div className="min-h-screen h-full">
            <div className="flex flex-row">
                {/* Sidebar uses a fixed width so content can take remaining space */}
                <div className="w-60 shrink-0">
                    <Sidebar />
                </div>
                {/* Content area fills remaining width */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;
