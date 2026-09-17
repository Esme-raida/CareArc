import { UserIcon, Clock } from "lucide-react";

export default function IndividualupcomingAppointment({ name, type, timing }) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200/70 rounded-xl p-3.5 gap-2.5 bg-gray-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all duration-200 w-full">
            <div className="flex flex-row gap-3 items-center min-w-0">
                <div className="rounded-xl bg-indigo-50 text-indigo-600 p-2 h-9 w-9 shrink-0 flex items-center justify-center border border-indigo-100">
                    <UserIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 truncate">{name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3 text-gray-400 shrink-0" />
                        <span>{timing}</span>
                    </div>
                </div>
            </div>
            <span className="self-end sm:self-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 shrink-0">
                {type}
            </span>
        </div>
    );
}