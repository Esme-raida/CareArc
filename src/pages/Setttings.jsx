import { Outlet } from "react-router-dom";
import { SettingsIcon } from "lucide-react"
import IndividualNavLink from "../components/IndividualNavLink";


export default function Settings () {
    return(
        <main className="relative flex flex-col mb-5 min-h-screen px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
            <header className="mb-6 pt-6">
                <div className="flex items-center gap-1.5 text-2xl font-bold">
                    <SettingsIcon className="h-8 w-8 text-blue-500" />
                    <h1>Settings</h1>
                </div>
                <p className="text-gray-500 text-sm">Manage your profile and preferences</p>
            </header>
            
            {/*NAV LINKS*/}
            <nav className="bg-gray-200 flex flex-row flex-wrap sm:flex-nowrap w-full max-w-xl gap-2 px-2 py-2 mb-7 font-semibold text-gray-500 rounded-xl">
                <IndividualNavLink to="profile" name="Facility Profile" />
                <IndividualNavLink to="system" end name="System" />
                <IndividualNavLink to="notifications" end name="Notifications" />
                <IndividualNavLink to="thresholds" end name="Normal Ranges" />
            </nav>

            <div>
                <Outlet />
            </div>
        
            

        </main>
        
    )
}