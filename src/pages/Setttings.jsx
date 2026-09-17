import { Outlet } from "react-router-dom";
import { SettingsIcon } from "lucide-react"
import IndividualNavLink from "../components/IndividualNavLink";
import useAuth from "../hooks/useAuth";


export default function Settings() {

    const { isDoctor } = useAuth();

    return (
        <main className="relative flex flex-col mb-5 min-h-screen px-3.5 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
            <div className="py-5 sm:py-6 mb-2">
                <header className="flex items-center gap-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">System Settings</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Configure center parameters, clinical protocols, and notifications</p>
                    </div>
                </header>
            </div>

            {/*NAV LINKS*/}
            <nav className="bg-blue-100/70 flex flex-row overflow-x-auto w-full max-w-full sm:max-w-2xl gap-1.5 p-1.5 mb-7 font-semibold text-xs sm:text-sm text-gray-500 rounded-xl shrink-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
                <IndividualNavLink to="profile" name="Facility Profile" />
                <IndividualNavLink to="system" end name="System" />
                <IndividualNavLink to="notifications" end name="Notifications" />
                {isDoctor && <IndividualNavLink to="thresholds" end name="Normal Ranges" />}
            </nav>

            <div>
                <Outlet />
            </div>



        </main>

    )
}