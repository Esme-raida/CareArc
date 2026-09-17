import { BellRing } from "lucide-react";
import IndividualNotification from "../components/IndividualNotification";
import SaveChanges from "../components/SaveChanges";

export default function Notifications() {
    return (
        <section className="min-w-0 flex flex-col gap-6">
            {/* Notifications Preferences */}
            <div className="flex flex-col border border-gray-200/70 shadow-2xs rounded-2xl p-5 sm:p-8 bg-white">
                <header className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <BellRing className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                            Alert & Notification Preferences
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Configure clinical escalation alerts, sounds, and delivery channels</p>
                    </div>
                </header>

                <div className="flex flex-col gap-1">
                    {/* Critical Alerts */}
                    <IndividualNotification
                        title="Critical Alerts"
                        subtitle="Immediate high-priority notification for acute vitals threshold breaches"
                        children={
                            <div className="relative flex items-center w-10 h-5.5 rounded-full bg-blue-600 cursor-pointer">
                                <div className="absolute right-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-xs"></div>
                            </div>
                        }
                    />

                    {/* Warning Alerts */}
                    <IndividualNotification
                        title="Warning Alerts"
                        subtitle="Notifications for moderate biometric drifts and approaching thresholds"
                        children={
                            <div className="relative flex items-center w-10 h-5.5 rounded-full bg-gray-200 cursor-pointer">
                                <div className="absolute left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-xs"></div>
                            </div>
                        }
                    />

                    {/* Email Notifications */}
                    <IndividualNotification
                        title="Email Notifications"
                        subtitle="Receive shift handover summaries and urgent alerts via clinical email"
                        children={
                            <div className="relative flex items-center w-10 h-5.5 rounded-full bg-blue-600 cursor-pointer">
                                <div className="absolute right-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-xs"></div>
                            </div>
                        }
                    />

                    {/* Sound Alerts */}
                    <IndividualNotification
                        title="Audio Alarms"
                        subtitle="Play acoustic chime in the station for critical telemetry alarms"
                        children={
                            <div className="relative flex items-center w-10 h-5.5 rounded-full bg-gray-200 cursor-pointer">
                                <div className="absolute left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-xs"></div>
                            </div>
                        }
                    />
                </div>
            </div>

            <SaveChanges />
        </section>
    );
}