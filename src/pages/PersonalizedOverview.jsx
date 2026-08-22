import { useContext, useState } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import { computeDeltas, derivePatientStatus, generateLatestUpdate } from "../utils/deltaEngine";
import { ResponsiveContainer, Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


export default function PersonalizedOverview() {

    //Declaring the active vitals tstate and color 
    const [activeVital, setActiveVital] = useState("heartRate");
    const vitalChartConfig = {
        heartRate: { label: "Heart Rate", color: "#ef4444", unit: "bpm" },
        systolic: { label: "Systolic BP", color: "#f59e0b", unit: "mm/hg" },
        diastolic: { label: "Diastolic BP", color: "#f59e0b", unit: "mm/hg" },
        temperature: { label: "Temperature", color: "#10b981", unit: "°C" },
        oxygen: { label: "Blood Oxygen", color: "#3b82f6", unit: "%" },
    };

    const currentConfig = vitalChartConfig[activeVital] || vitalChartConfig.heartRate
    //Grabbing the patient data from context... 
    const { latestVital, patientVitals, patientNotes } = useContext(PatientDetailContext);
    let lastRecorded = "";

    //Computing deltas for vital
    const deltas = computeDeltas(patientVitals);

    //Getting the latest notes 
    const latestNote = patientNotes && patientNotes.length > 0 ? patientNotes[patientNotes.length - 1] : null;

    //Getting the patient status 
    const patientStatus = derivePatientStatus(deltas, latestVital);

    //Generating the one-line summmary
    const updateSummary = generateLatestUpdate(deltas, latestNote);


    // Calculate time difference
    if (latestVital) {
        //For Time
        const latestVitalTime = new Date(latestVital.timestamp);
        const nowTime = new Date();
        const difference = nowTime - latestVitalTime;
        const diffMins = Math.floor(difference / 60000);

        lastRecorded = diffMins < 60
            ? `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`
            : diffMins < 1440 //show hours (60-1439 mins = 1-23 hours)
                ? `${Math.floor(diffMins / 60)} ${Math.floor(diffMins / 60) === 1 ? "hour" : "hours"} ago`
                : `${Math.floor(diffMins / 1440)} ${Math.floor(diffMins / 1440) === 1 ? "day" : "days"} ago`;

    }


    //STATUS BADGE COLORS 
    const statusColors = {
        Review: "bg-red-100 text-red-700 border-red-200",
        Watch: "bg-amber-100 text-amber-700 border-amber-200",
        Improving: "bg-green-100 text-green-700 border-green-200",
        Stable: "bg-gray-100 text-gray-700 border-gray-200",
        NoData: "bg-gray-100 text-gray-700 border-gray-200",
    };

    const badgeColor = statusColors[patientStatus] || statusColors.Stable;


    //SORTING THE VITALS CHRONOLOGICALLY FOR RECHARTS
    const chartData = patientVitals && patientVitals.length > 0 ? [...patientVitals].sort((a, b) =>
        new Date(a.timestamp) - new Date(b.timestamp)).map((vital) => ({
            formattedTime: vital.timestamp.split("T")[1].slice(0, 5) || vital.timestamp,
            heartRate: vital.heartRate,
            systolic: vital.bloodPressure.systolic,
            diastolic: vital.bloodPressure.diastolic,
            temperature: vital.temperature,
            respiratoryRate: vital.respiratoryRate,
            oxygen: vital.oxygen

        })) : [];

    return (
        <div className="flex flex-col gap-5">
            {/*Clinical Overview Card*/}
            <div className="flex flex-col gap-4 border border-gray-200/60 shadow-sm rounded-2xl w-full px-6 py-5 bg-white">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg text-gray-800">Clinical Overview</h2>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${badgeColor}`}>
                        {patientStatus}
                    </span>
                </div>

                <div className="p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Latest Trajectory Update
                    </span>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                        {updateSummary}
                    </p>
                    {lastRecorded && (
                        <span className="text-xs text-gray-400 mt-2 block">
                            Last recorded: {lastRecorded}
                        </span>
                    )}
                </div>
            </div>

            {/*Vitals Trajectory Chart Card*/}
            <div className="border border-gray-200/60 shadow-sm rounded-2xl w-full px-6 py-5 bg-white flex flex-col gap-4">
                <h3 className="font-semibold text-gray-800 text-lg">Vitals Trajectory Trends</h3>
                {chartData.length < 2 ? (
                    <p className="text-sm text-gray-400 py-8 text-center">Need at least 2 vital readings to display trajectory</p>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3">
                            {Object.entries(vitalChartConfig).map(([key, config]) => (
                                <button key={key} type="button" onClick={() => { setActiveVital(key) }}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all duration-200 ${
                                        activeVital === key 
                                            ? "bg-gray-900 text-white shadow-sm" 
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}>
                                    {config.label}
                                </button>
                            ))}
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="formattedTime" tick={{ fontSize: 12, fill: '#9ca3af' }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: '#1f2937', 
                                            border: 'none', 
                                            borderRadius: '12px', 
                                            color: '#fff',
                                            fontSize: '13px',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                                        }} 
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#9ca3af', fontSize: '11px', marginBottom: '4px' }}
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey={activeVital} 
                                        stroke={currentConfig.color} 
                                        strokeWidth={2.5} 
                                        dot={{ r: 4, fill: currentConfig.color, strokeWidth: 2, stroke: '#fff' }} 
                                        activeDot={{ r: 6, fill: currentConfig.color, strokeWidth: 2, stroke: '#fff' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </div>
        </div>
    );


}


