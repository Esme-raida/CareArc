import IndividualPage from "./Individualpage";
import { Link } from "react-router-dom";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { SettingsIcon, CalendarIcon, LayoutDashboardIcon, X, HeartIcon } from "lucide-react";

function Sidebar({ onClose }) {
    return (
        <div className="flex flex-col justify-between h-full min-h-screen border-r border-r-gray-200 bg-white">


            <div className="flex flex-col p-4 pt-8 gap-5 ">

                {/*Header*/}
                <div className="flex flex-row justify-between items-center border-b border-b-gray-300 pb-4">
                    <div className="flex flex-row gap-2 items-center">
                        <Link to="/" onClick={onClose}>
                            <HeartIcon className="w-10 h-10 px-2.5 bg-blue-500 text-white rounded-md hover:scale-105 hover:cursor-pointer hover:bg-blue-700" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="flex flex-row text-2xl font-bold">
                                CareArc
                            </h1>
                            <span className="text-gray-500 text-xs">Clinic System</span>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-hidden md:hidden"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/*Nav Links*/}
                <div className=" text-gray-600">
                    <h2 className="text-gray-500 pl-4.5 mb-2 text-xs uppercase tracking-wider"> Navigation </h2>
                    <IndividualPage Icon={LayoutDashboardIcon} name="Clinic Dashboard" to="/dashboard" onClick={onClose} />
                    <IndividualPage Icon={CalendarIcon} name="Appointments" to="/dashboard/appointments" onClick={onClose} />
                    <IndividualPage Icon={UserGroupIcon} name="Patients" to="/dashboard/patients" onClick={onClose} />
                    <IndividualPage Icon={SettingsIcon} name="Settings" to="/dashboard/settings" onClick={onClose} />
                </div>
            </div>


            {/*Staff Profile*/}
            <div className="flex flex-row gap-3 m-5 py-5 border-t border-t-gray-300">
                <Link to="/dashboard/settings/profile" onClick={onClose}>
                    <UserIcon className="w-12 p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-400 hover:text-gray-600" />
                </Link>
                <div className="font-semibold text-sm">
                    <h1>Staff Account</h1>
                    <span className="text-gray-400 text-xs font-normal">Records Department</span>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;

