import { useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";

export default function PersonalizedNotes() {
    const { patientNotes } = useContext(PatientDetailContext);
    const count = patientNotes?.length || 0;

    return (
        <div className="flex flex-col gap-3 border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-6 bg-white">
            <div className="flex items-center justify-between pb-1">
                <header className="flex items-center gap-2.5">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">
                        Clinical Notes
                    </h1>
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full shrink-0">
                        {count} {count === 1 ? "Note" : "Notes"}
                    </span>
                </header>
            </div>

            {patientNotes && patientNotes.length > 0 ? (
                <ul className="flex flex-col gap-2.5 pt-1">
                    {patientNotes.map((note) => (
                        <li key={note.id} className="p-3.5 bg-gray-50/80 rounded-xl border border-gray-100 text-sm text-gray-700 leading-relaxed list-none">
                            <p>{note.content}</p>
                            {(note.author || note.timestamp) && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200/60 text-[11px] text-gray-400">
                                    {note.author && <span>By {note.author}</span>}
                                    {note.author && note.timestamp && <span>•</span>}
                                    {note.timestamp && <span>{new Date(note.timestamp).toLocaleDateString()}</span>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                    No clinical notes recorded for this patient yet
                </div>
            )}
        </div>
    );
}