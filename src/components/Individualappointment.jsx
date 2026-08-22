import { UserIcon } from "lucide-react"

export default function IndividualAppointment ( { name, appointmentType, timing, duration, state } ) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-100 rounded-xl p-4 gap-3 bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all duration-200 w-full">
            <div className="flex flex-row gap-3 items-center">
                <UserIcon className="rounded-xl bg-blue-50 text-blue-500 p-2 h-9 w-9 shrink-0"/>
                <div>
                    {name && <h3 className="font-semibold text-sm text-gray-800">{name}</h3>}
                    <span className="text-gray-500 text-xs">{appointmentType}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                <div className="flex flex-col text-left sm:text-right">
                    <span className="text-sm font-medium text-gray-700">{timing}</span>
                    <span className="text-xs text-gray-400">{duration} min</span>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold border ${
                    state === "Completed" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                    {state}
                </span>
            </div>
        </div>
    )
}