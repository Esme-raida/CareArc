import { UserIcon } from "lucide-react";

export default function BasicPatientInfo({ name, age, gender, weight, id, room, admitted }) {
    // A patient is Admitted (Inpatient) if they have an active bed/room assigned
    const isAdmitted = Boolean(room && room.toLowerCase() !== "n/a" && room.toLowerCase() !== "outpatient");
    const formattedRoom = isAdmitted ? (room.toLowerCase().startsWith("room") ? room : `Room ${room}`) : null;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-5 lg:p-6 bg-white gap-4">
            <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2.5 sm:p-3 shrink-0 shadow-xs">
                    <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight truncate">{name}</h1>
                    <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-2.5 gap-y-1 text-xs sm:text-sm text-gray-500">
                        <span className="font-medium whitespace-nowrap">{gender}, {age} yrs</span>
                        {weight && weight !== "N/A" && (
                            <>
                                <span className="text-gray-300">·</span>
                                <span className="font-medium whitespace-nowrap">{weight}</span>
                            </>
                        )}
                        <span className="text-gray-300">·</span>
                        <span className="font-medium text-gray-400 font-mono text-[11px] sm:text-xs whitespace-nowrap">ID: {id}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sm:flex-col justify-between sm:justify-center w-full sm:w-auto items-center sm:items-end gap-1.5 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 text-xs sm:text-sm">
                {isAdmitted ? (
                    <>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Inpatient · {formattedRoom}
                        </span>
                        <span className="text-gray-400 text-xs shrink-0">Admitted: {admitted}</span>
                    </>
                ) : (
                    <>
                        <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2.5 py-1 rounded-full font-semibold shrink-0">
                            Outpatient (Non-Admitted)
                        </span>
                        <span className="text-gray-400 text-xs shrink-0">Ambulatory Care</span>
                    </>
                )}
            </div>
        </div>
    );
}