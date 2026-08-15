import { UserIcon } from "lucide-react"

export default function BasicPatientInfo({ name, age, gender, weight, id, room, admitted }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200 shadow-sm rounded-xl w-full px-6 py-6 bg-white gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
                    <span className="font-semibold">{gender}, {age} years</span>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="font-semibold">Weight: {weight}</span>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="font-semibold">ID: {id}</span>
                </div>
            </div>

            <div className="flex flex-col items-start md:items-end">
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold mb-2">Room {room}</span>
                <span className="text-gray-500 text-sm">Admitted: {admitted}</span>
            </div>
        </div>
    )
}