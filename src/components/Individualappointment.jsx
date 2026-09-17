import { UserIcon, Clock, CheckCircle2 } from "lucide-react";

export default function IndividualAppointment({ name, appointmentType, timing, duration, state, onMarkCompleted }) {
    const isCompleted = state?.toLowerCase() === "completed";
    const isMissed = state?.toLowerCase() === "missed";

    const statusBadge = isCompleted
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : isMissed
            ? "bg-rose-50 text-rose-700 border-rose-200"
            : "bg-blue-50 text-blue-700 border-blue-200";

    const statusText = isCompleted ? "Completed" : isMissed ? "Missed" : "Scheduled";

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200/70 rounded-xl p-3.5 sm:p-4 gap-3 bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-200 w-full group">
            <div className="flex flex-row gap-3 items-center min-w-0">
                <div className="rounded-xl bg-blue-50 text-blue-600 p-2.5 h-10 w-10 shrink-0 flex items-center justify-center border border-blue-100">
                    <UserIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                    {name && <h3 className="font-semibold text-sm text-gray-900 truncate">{name}</h3>}
                    <span className="text-gray-500 text-xs inline-block">{appointmentType}</span>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-2.5 sm:pt-0 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:text-right">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800">{timing}</span>
                    <span className="text-gray-400">({duration}m)</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2.5 py-0.5 text-xs rounded-full font-semibold border ${statusBadge}`}>
                        {statusText}
                    </span>
                    {!isCompleted && onMarkCompleted && (
                        <button
                            onClick={onMarkCompleted}
                            title="Mark visit as completed"
                            className="text-xs font-semibold text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 p-1 rounded-lg transition"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}