import { useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext"

export default function PersonalizedNotes() {

    const { patientNotes } = useContext(PatientDetailContext)
    return (
        <div className="flex flex-col gap-2 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-5 bg-white">
            <h1 className="text-lg font-bold text-gray-600 mb-2">Notes</h1>
            {patientNotes && patientNotes.length > 0 ? (
                <ul className="flex flex-col pl-5 list-disc">
                    {patientNotes.map((note) => (
                        <li key={note.id}>{note.content}</li>
                    ))}
                </ul>
            ) : (
                <span>No notes entered for this patient</span>)}
        </div>
    )
}