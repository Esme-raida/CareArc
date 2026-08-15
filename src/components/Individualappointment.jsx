import { UserIcon } from "lucide-react"

export default function IndividualAppointment ( { name, appointmentType, timing, duration, state } ) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300 rounded-xl p-4 sm:p-5 gap-3 bg-white w-full">
            <div className="flex flex-row gap-3 items-center">
                <UserIcon className="rounded-full bg-gray-200 text-gray-500 p-2 h-10 w-10 shrink-0"/>
                <div>
                    {name && <h3 className="font-semibold text-sm sm:text-base">{name}</h3>}
                    <span className="text-gray-500 text-xs sm:text-sm">{appointmentType}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                <div className="flex flex-col text-left sm:text-right">
                    <span className="text-xs sm:text-sm font-medium text-gray-800">{timing}</span>
                    <span className="text-xs text-gray-500">{duration} min</span>
                </div>
                <button className="border border-gray-200 px-3.5 py-1 text-xs sm:text-sm rounded-full font-semibold capitalize bg-gray-50 hover:bg-gray-100 transition shrink-0">
                    {state}
                </button>
            </div>
        </div>
    )
}