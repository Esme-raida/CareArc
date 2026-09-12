import { useState, useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import { buildTimelineEvents } from "../utils/deltaEngine";



export default function PatientTimeline() {

    const { patientVitals, patientNotes } = useContext(PatientDetailContext);
    const sortedEvents = buildTimelineEvents(patientVitals, patientNotes);
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredEvents = sortedEvents.filter(event => {
        if (activeFilter === "all") return true;
        return event.type === activeFilter;
    });

    return (
        //Sorted events is now a single array sorted chronologically, where each item knows if it is a vital or note event
        <div className="flex flex-col gap-3 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-5 bg-white">
            <h2 className="font-semibold text-lg border-b border-gray-100 pb-2">Patient Timeline</h2>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 overflow-x-auto">
                <button onClick={() => setActiveFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${activeFilter === "all"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}>
                    All Events ({sortedEvents.length})
                </button>

                <button
                    onClick={() => setActiveFilter("vital")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${activeFilter === "vital"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        }`}
                >
                    <span>🩺 Vitals</span>
                </button>
                <button
                    onClick={() => setActiveFilter("note")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${activeFilter === "note"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                >
                    <span>📝 Notes</span>
                </button>
            </div>
            {/* Timeline Axis Track */}
            {filteredEvents.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm italic">
                    No timeline events recorded for this filter.
                </div>
            ) : (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {filteredEvents.map((event) => {
                        const isVital = event.type === "vital";

                        return (
                            <div key={event.data.id} className="relative group">
                                {/* Visual Node Icon on Vertical Line */}
                                <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] bg-white ${isVital ? "border-blue-500 text-blue-600 shadow-blue-100" : "border-amber-500 text-amber-600 shadow-amber-100"
                                    }`}>
                                    {isVital ? "🩺" : "📝"}
                                </div>

                                {/* Event Card Box */}
                                <div className={`p-4 rounded-xl border transition-all ${isVital
                                    ? "bg-blue-50/40 border-blue-100/80 hover:border-blue-200"
                                    : "bg-amber-50/40 border-amber-100/80 hover:border-amber-200"
                                    }`}>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isVital ? "text-blue-800" : "text-amber-800"
                                            }`}>
                                            {isVital ? "Vitals Recorded" : "Clinical Note Added"}
                                        </span>
                                        <span className="text-[11px] text-slate-400 font-mono">
                                            {new Date(event.timestamp).toLocaleString()}
                                        </span>
                                    </div>

                                    {isVital ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs text-slate-700">
                                            <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                                                <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                                                <span className="font-bold text-slate-800">{event.data.heartRate || "—"} bpm</span>
                                            </div>
                                            <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                                                <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                                                <span className="font-bold text-slate-800">
                                                    {event.data.bloodPressure ? `${event.data.bloodPressure.systolic}/${event.data.bloodPressure.diastolic}` : "—"} mmHg
                                                </span>
                                            </div>
                                            <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                                                <span className="text-[10px] text-slate-400 block">Oxygen</span>
                                                <span className="font-bold text-slate-800">{event.data.oxygen || "—"}%</span>
                                            </div>
                                            <div className="bg-white/80 p-2 rounded-lg border border-slate-100">
                                                <span className="text-[10px] text-slate-400 block">Temp</span>
                                                <span className="font-bold text-slate-800">{event.data.temperature || "—"}°C</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-700 mt-1 leading-relaxed bg-white/80 p-3 rounded-lg border border-slate-100">
                                            "{event.data.content}"
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
