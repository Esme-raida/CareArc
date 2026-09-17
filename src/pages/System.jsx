import { Shield } from "lucide-react";
import SystemSettings from "../components/SystemSettings";
import SaveChanges from "../components/SaveChanges";

export default function System() {
    return (
        <section className="flex flex-col gap-6">
            {/* System Preferences */}
            <div className="flex flex-col border border-gray-200/70 shadow-2xs rounded-2xl p-5 sm:p-8 bg-white">
                <header className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                            System Preferences
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Configure general platform settings, localization, and polling frequency</p>
                    </div>
                </header>

                <div className="flex flex-col gap-4">
                    {/* Data refresh rate */}
                    <SystemSettings label="Data refresh rate" option1="Every 5 seconds" option2="Every 30 seconds" option3="Every 1 minute" />

                    {/* Time Zone */}
                    <SystemSettings label="Time Zone" option1="Eastern Time (UTC-5)" option2="Pacific Time (UTC-8)" option3="UTC" />

                    {/* Date Format */}
                    <SystemSettings label="Date Format" option1="MM/DD/YYYY" option2="DD/MM/YYYY" option3="YYYY-MM-DD" />
                </div>
            </div>

            <SaveChanges />
        </section>
    );
}