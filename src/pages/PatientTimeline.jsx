import { useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";


export default function PatientTimeline() {
    const { patientNotes, patientVitals } = useContext(PatientDetailContext);

    //Normalzing i.e transforming each array into a common shape 

    //Transforming vitals into timeline events
    const vitalsEvents = patientVitals.map((vital) => ({
        type: "vital",
        timestamp: vital.timestamp,
        title: "Vitals recorded",
        data: vital
    }));

    //Transforming note into timeline events
    const notesEvents = patientNotes.map((note) => ({
        type: "note",
        timestamp: note.timestamp,
        title: "Note added",
        data: note
    }));

    //Merging vital and note timelines and soting them chronologically 

    //Merging 

    const allEvents = [...vitalsEvents, ...notesEvents];
    //Sorting by timestamp
    const sortedEvents = allEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        //Sorted events is now a single array sorted chronologically, where each item knows if it is a vital or note event
        <div>
            {sortedEvents.map((event) => (
                event.type === "vital" ?
                    <div key={event.data.id}>🩺 Vitals recorded at {event.timestamp} </div> :
                    <div key={event.data.id}>📝{event.title}</div>
            ))
            }
        </div>
    )
}