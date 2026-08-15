import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";
import { UserIcon } from "@heroicons/react/24/outline";

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen h-full flex flex-col md:flex-row">
            {/* Desktop Sidebar (hidden on mobile) */}
            <div className="hidden md:block w-60 shrink-0">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay Drawer */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    
                    {/* Drawer Content */}
                    <div className="relative w-60 max-w-[80vw] h-full flex flex-col bg-white shadow-xl z-50 animate-in slide-in-from-left duration-200">
                        <Sidebar onClose={() => setIsSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Bar */}
                <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-1 -ml-1 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-hidden"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <span className="font-bold text-lg text-gray-800">CareArc</span>
                    </div>
                    <Link to="/dashboard/settings/profile" onClick={() => setIsSidebarOpen(false)}>
                        <UserIcon className="w-8 h-8 p-1.5 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200" />
                    </Link>
                </header>

                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;

