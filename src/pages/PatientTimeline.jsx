import { useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import { buildTimelineEvents } from "../utils/deltaEngine";


export default function PatientTimeline() {

    const { patientVitals, patientNotes } = useContext(PatientDetailContext);
    const sortedEvents = buildTimelineEvents(patientVitals, patientNotes);
    return (
        //Sorted events is now a single array sorted chronologically, where each item knows if it is a vital or note event
        <div className="flex flex-col gap-3 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-5 bg-white">
            <h2 className="font-semibold text-lg border-b border-gray-100 pb-2">Patient Timeline</h2>
            {sortedEvents.length === 0 ? (
                <span className="text-gray-500 text-sm">No timeline events recorded.</span>
            ) : (
                <div className="flex flex-col gap-3">
                    {sortedEvents.map((event) => (
                        event.type === "vital" ?
                            <div key={event.data.id} className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-150">
                                🩺 <strong>Vitals recorded</strong> at {new Date(event.timestamp).toLocaleString()}
                            </div> :
                            <div key={event.data.id} className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-150">
                                📝 <strong>Note added:</strong> {event.data.content}
                            </div>
                    ))}
                </div>
            )}
        </div>
    )
}
