import IndividualPage from "./Individualpage";
import { Link } from "react-router-dom";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { SettingsIcon, CalendarIcon, LayoutDashboardIcon, X, HeartIcon } from "lucide-react";

function Sidebar({ onClose }) {
    return (
        <div className="flex flex-col justify-between h-full min-h-screen border-r border-r-gray-200/60 bg-white">


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
                <div className=" text-gray-600">
                    <h2 className="text-gray-400 pl-4.5 mb-3 text-xs uppercase tracking-wider font-medium"> Navigation </h2>
                    <IndividualPage Icon={LayoutDashboardIcon} name="Clinic Dashboard" to="/dashboard" onClick={onClose} />
                    <IndividualPage Icon={CalendarIcon} name="Appointments" to="/dashboard/appointments" onClick={onClose} />
                    <IndividualPage Icon={UserGroupIcon} name="Patients" to="/dashboard/patients" onClick={onClose} />
                    <IndividualPage Icon={SettingsIcon} name="Settings" to="/dashboard/settings" onClick={onClose} />
                </div>
            </div>


            {/*Staff Profile*/}
            <div className="flex flex-row gap-3 m-4 p-4 border-t border-t-gray-100 items-center">
                <Link to="/dashboard/settings/profile" onClick={onClose}>
                    <div className="bg-gray-100 rounded-xl p-2.5 hover:bg-gray-200 transition-colors">
                        <UserIcon className="w-5 h-5 text-gray-500" />
                    </div>
                </Link>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-sm text-gray-800">Staff Account</h1>
                    <span className="text-gray-400 text-xs">Records Department</span>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
