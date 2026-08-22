import { UserIcon } from "lucide-react"

export default function BasicPatientInfo({ name, age, gender, weight, id, room, admitted }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200/60 shadow-sm rounded-2xl w-full px-6 py-6 bg-white gap-4">
            <div className="flex flex-row items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shrink-0">
                    <UserIcon className="w-7 h-7 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                        <span className="font-medium">{gender}, {age} years</span>
                        <span className="text-gray-300 hidden sm:inline">·</span>
                        <span className="font-medium">Weight: {weight}</span>
                        <span className="text-gray-300 hidden sm:inline">·</span>
                        <span className="font-medium text-gray-400">ID: {id}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1.5">
                <span className="bg-blue-50 text-blue-700 border border-blue-200/60 text-xs px-3 py-1 rounded-full font-semibold">Room {room}</span>
                <span className="text-gray-400 text-sm">Admitted: {admitted}</span>
            </div>
        </div>
    )
}