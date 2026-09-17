import { useContext, useState } from "react";
import IndividualPage from "./Individualpage";
import { Link } from "react-router-dom";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { SettingsIcon, CalendarIcon, LayoutDashboardIcon, X, HeartIcon, ChevronDown, Check } from "lucide-react";
import { AuthContext, MOCK_USERS } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";

function Sidebar({ onClose }) {
    const { user, login, isRecords } = useAuth();
    const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

    return (
        <div className="flex flex-col justify-between h-full md:min-h-screen overflow-y-auto border-r border-r-gray-200/60 bg-white">


            <div className="flex flex-col p-4 pt-8 gap-6 ">

                {/*Header*/}
                <div className="flex flex-row justify-between items-center border-b border-b-gray-100 pb-5">
                    <div className="flex flex-row gap-3 items-center">
                        <Link to="/" onClick={onClose}>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 hover:shadow-md hover:scale-105 cursor-pointer transition-all duration-200">
                                <HeartIcon className="w-5 h-5 text-white" />
                            </div>
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-gray-900">
                                CareArc
                            </h1>
                            <span className="text-gray-600 text-xs">Clinical Intelligence</span>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-hidden md:hidden transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/*Nav Links*/}
                <div className="flex flex-col gap-1 text-gray-600">
                    <h2 className="text-gray-400 px-3.5 mb-2 text-[11px] uppercase tracking-wider font-bold"> Navigation </h2>
                    {!isRecords && <IndividualPage Icon={LayoutDashboardIcon} name="Clinic Dashboard" to="/dashboard" onClick={onClose} />}
                    <IndividualPage Icon={CalendarIcon} name="Appointments" to="/dashboard/appointments" onClick={onClose} />
                    <IndividualPage Icon={UserGroupIcon} name="Patients" to="/dashboard/patients" onClick={onClose} />
                    {!isRecords && <IndividualPage Icon={SettingsIcon} name="Settings" to="/dashboard/settings" onClick={onClose} />}
                </div>
            </div>


            {/*Staff Profile & Role Switcher*/}
            <div className="relative m-3 p-3 border-t border-gray-100 bg-slate-50/70 rounded-2xl border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0">
                            {user?.avatar || "ST"}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h2 className="font-semibold text-xs text-gray-900 truncate leading-tight">{user?.name || "Staff Member"}</h2>
                            <span className="text-[11px] text-gray-500 truncate leading-tight mt-0.5">{user?.title || "Clinical Staff"}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsRoleDropdownOpen(prev => !prev)}
                        className="p-1 rounded-lg hover:bg-gray-200/70 text-gray-500 cursor-pointer transition"
                        title="Switch Role Preset"
                    >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRoleDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                </div>

                {/* Dropdown Menu */}
                {isRoleDropdownOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 p-1.5 bg-white rounded-xl shadow-xl border border-gray-200 z-50 flex flex-col gap-1 text-xs">
                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Switch Role View</span>
                        {Object.entries(MOCK_USERS).map(([key, roleUser]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    login(key);
                                    setIsRoleDropdownOpen(false);
                                }}
                                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${user?.role === roleUser.role ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-gray-50 text-gray-700"}`}
                            >
                                <div className="flex flex-col">
                                    <span>{roleUser.name}</span>
                                    <span className="text-[10px] text-gray-400 capitalize">{roleUser.role}</span>
                                </div>
                                {user?.role === roleUser.role && <Check className="w-3.5 h-3.5 text-blue-600" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default Sidebar;
