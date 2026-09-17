import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, RotateCcw, CheckCircle2 } from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const INITIAL_ALERTS = [
    {
        id: "ALT-001",
        patientId: "PT-002",
        patientName: "John Okafor",
        room: "Room 7A",
        condition: "Cardiac Arrhythmia",
        title: "High heart rate detected",
        telemetryValue: "105 bpm",
        type: "warning",
        severity: "Watch",
        firstResponder: "Alex Attah, RN",
        attending: "Dr. Fatima Adam",
        timeAgo: "2 mins ago",
    },
    {
        id: "ALT-002",
        patientId: "PT-003",
        patientName: "Emeka Obi",
        room: "Room 2C",
        condition: "Pneumonia",
        title: "Low oxygen saturation",
        telemetryValue: "91% SpO₂",
        type: "critical",
        severity: "Review",
        firstResponder: "Alex Attah, RN",
        attending: "Dr. Fatima Adam",
        timeAgo: "5 mins ago",
    },
    {
        id: "ALT-003",
        patientId: "PT-001",
        patientName: "Amina Yusuf",
        room: "Room 4B",
        condition: "Respiratory symptoms, Fever",
        title: "Elevated core temperature",
        telemetryValue: "38.8°C",
        type: "warning",
        severity: "Watch",
        firstResponder: "Alex Attah, RN",
        attending: "Dr. Fatima Adam",
        timeAgo: "12 mins ago",
    },
    {
        id: "ALT-004",
        patientId: "PT-004",
        patientName: "Fatima Bello",
        room: "Room 3B",
        condition: "Hypertensive Crisis",
        title: "Severe blood pressure spike",
        telemetryValue: "168/104 mmHg",
        type: "critical",
        severity: "Review",
        firstResponder: "Alex Attah, RN",
        attending: "Dr. Fatima Adam",
        timeAgo: "18 mins ago",
    }
];

export default function Alerts() {
    const [resolvedAlerts, setResolvedAlerts] = useState(() => {
        try {
            const saved = localStorage.getItem("carearc_resolved_alerts");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [filter, setFilter] = useState("all"); // "all" | "active" | "resolved"

    useEffect(() => {
        try {
            localStorage.setItem("carearc_resolved_alerts", JSON.stringify(resolvedAlerts));
        } catch (e) {
            console.error("Failed to save resolved alerts", e);
        }
    }, [resolvedAlerts]);

    const handleResolve = (alertId) => {
        if (!resolvedAlerts.includes(alertId)) {
            setResolvedAlerts(prev => [...prev, alertId]);
        }
    };

    const handleUnresolve = (alertId) => {
        setResolvedAlerts(prev => prev.filter(id => id !== alertId));
    };

    const handleResetAlerts = () => {
        setResolvedAlerts([]);
    };

    const activeCount = INITIAL_ALERTS.filter(a => !resolvedAlerts.includes(a.id)).length;
    const resolvedCount = resolvedAlerts.length;

    const displayedAlerts = INITIAL_ALERTS.filter(alert => {
        const isResolved = resolvedAlerts.includes(alert.id);
        if (filter === "active") return !isResolved;
        if (filter === "resolved") return isResolved;
        return true;
    });

    return (
        <main className="flex flex-col min-h-screen px-4 sm:px-8 max-w-5xl mx-auto w-full pb-14">
            {/* Header */}
            <header className="mb-6 pt-6 sm:pt-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition mb-3"
                >
                    <span>←</span>
                    <span>Back to Clinic Dashboard</span>
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                                    Clinical Alerts
                                </h1>
                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                    Active physiological telemetry alerts for in-bed patients
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                        {resolvedAlerts.length > 0 && (
                            <button
                                onClick={handleResetAlerts}
                                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 bg-white border border-gray-200/80 px-2.5 py-1.5 rounded-lg shadow-2xs transition hover:bg-gray-50 cursor-pointer"
                                title="Reset demo alerts"
                            >
                                <RotateCcw className="w-3 h-3" />
                                <span>Reset</span>
                            </button>
                        )}
                        {/* Lighter ring active badge */}
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50/80 text-blue-700 border border-blue-200/70 ring-2 ring-blue-100 shadow-xs">
                            {activeCount} active
                        </span>
                    </div>
                </div>

                {/* Soft Filter Tabs */}
                <div className="flex items-center gap-1.5 mt-6 border-b border-gray-100 pb-2 text-xs">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                            filter === "all"
                                ? "bg-white text-gray-900 shadow-2xs border border-gray-200 font-semibold"
                                : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        All ({INITIAL_ALERTS.length})
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                            filter === "active"
                                ? "bg-white text-gray-900 shadow-2xs border border-gray-200 font-semibold"
                                : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        Active ({activeCount})
                    </button>
                    <button
                        onClick={() => setFilter("resolved")}
                        className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                            filter === "resolved"
                                ? "bg-white text-gray-900 shadow-2xs border border-gray-200 font-semibold"
                                : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        Resolved ({resolvedCount})
                    </button>
                </div>
            </header>

            {/* Alert Cards with Dimensional Shadows and Subtle Gradients */}
            <section className="flex flex-col gap-3.5">
                {displayedAlerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-white border border-gray-200 rounded-2xl text-center shadow-xs">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                        <h3 className="font-bold text-gray-900 text-base">All Telemetry Signals Resolved</h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm">
                            Station monitoring nominal. All in-bed physiological parameters within safety thresholds.
                        </p>
                    </div>
                ) : (
                    displayedAlerts.map((alert) => {
                        const isResolved = resolvedAlerts.includes(alert.id);
                        const isCritical = alert.type === "critical";

                        return (
                            <div
                                key={alert.id}
                                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-2xl w-full p-5 transition-all duration-200 gap-4 border ${
                                    isResolved
                                        ? "bg-gray-50/70 border-gray-200/80 opacity-60 shadow-xs"
                                        : isCritical
                                            ? "bg-gradient-to-r from-rose-50/70 via-rose-50/20 to-white border-rose-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-rose-300"
                                            : "bg-gradient-to-r from-amber-50/70 via-amber-50/20 to-white border-amber-200/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-amber-300"
                                }`}
                            >
                                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                                    <div className={`p-2.5 rounded-xl shrink-0 shadow-xs ${
                                        isResolved
                                            ? "bg-gray-100 text-gray-400 border border-gray-200"
                                            : isCritical
                                                ? "bg-rose-100/90 text-rose-600 border border-rose-200"
                                                : "bg-amber-100/90 text-amber-600 border border-amber-200"
                                    }`}>
                                        <ExclamationCircleIcon className="w-5 h-5" />
                                    </div>

                                    <div className="flex flex-col min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className={`font-semibold text-sm sm:text-base ${isResolved ? "line-through text-gray-400" : "text-gray-900"}`}>
                                                {alert.title}
                                            </h2>

                                            <span className="text-xs font-mono font-semibold text-gray-800 bg-white/95 border border-gray-200/90 px-2.5 py-0.5 rounded-lg shadow-xs">
                                                {alert.telemetryValue}
                                            </span>

                                            <span className="text-[11px] text-gray-600 bg-white/95 border border-gray-200/90 px-2 py-0.5 rounded-lg shadow-xs font-medium">
                                                {alert.room}
                                            </span>

                                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                                                isCritical
                                                    ? "bg-rose-100 text-rose-700 border-rose-200"
                                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                            }`}>
                                                {alert.severity}
                                            </span>

                                            {isResolved && (
                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    Resolved
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-gray-500">
                                            <Link
                                                to={`/dashboard/patients/patientsdetail/${alert.patientId}`}
                                                className="font-semibold text-blue-600 hover:underline"
                                            >
                                                {alert.patientName}
                                            </Link>
                                            <span className="text-gray-300">·</span>
                                            <span>{alert.condition}</span>
                                            <span className="text-gray-300">·</span>
                                            <span className="text-gray-400">Nurse: <strong className="text-gray-600 font-medium">{alert.firstResponder}</strong></span>
                                            <span className="text-gray-300">·</span>
                                            <span className="text-gray-400">Attending: <strong className="text-gray-600 font-medium">{alert.attending}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2.5 sm:pt-0 border-t sm:border-t-0 border-gray-100 shrink-0 gap-2">
                                    <span className="text-xs text-gray-400 font-medium">
                                        {alert.timeAgo}
                                    </span>

                                    {isResolved ? (
                                        <button
                                            onClick={() => handleUnresolve(alert.id)}
                                            className="text-xs text-gray-400 hover:text-gray-700 underline cursor-pointer"
                                        >
                                            Undo
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleResolve(alert.id)}
                                            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-3.5 py-1.5 rounded-xl transition shadow-xs hover:shadow-sm cursor-pointer"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </main>
    );
}
