import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import { computeDeltas, derivePatientStatus, generateLatestUpdate } from "../utils/deltaEngine";
import { ResponsiveContainer, Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Sparkles, AlertTriangle } from "lucide-react";
import useAuth from "../hooks/useAuth";



export default function PersonalizedOverview() {

    const { canAccessClinicalNotes } = useAuth();

    //Grabbing the patient data and modal controller from context....
    const { latestVital, patientVitals, patientNotes, setIsAIModalOpen } = useContext(PatientDetailContext);

    const handleAISummaryClick = () => {
        setIsAIModalOpen(true);
    };
    //Declaring the active vitals state and color 
    const [activeVital, setActiveVital] = useState("heartRate");
    const vitalChartConfig = {
        heartRate: { label: "Heart Rate", color: "#ef4444", unit: "bpm" },
        systolic: { label: "Systolic BP", color: "#f59e0b", unit: "mm/hg" },
        diastolic: { label: "Diastolic BP", color: "#f59e0b", unit: "mm/hg" },
        temperature: { label: "Temperature", color: "#10b981", unit: "°C" },
        oxygen: { label: "Blood Oxygen", color: "#3b82f6", unit: "%" },
    };

    const currentConfig = vitalChartConfig[activeVital] || vitalChartConfig.heartRate
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


            {/* CareArc Clinical Intelligence Banner */}
            <div
                onClick={canAccessClinicalNotes ? handleAISummaryClick : undefined}
                className={`mb-2 sm:mb-3 p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 
                    to-blue-950 text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-lg 
                    border border-slate-700/50 ${canAccessClinicalNotes ? "hover:scale-[1.005] transition-all cursor-pointer" : "opacity-80 cursor-not-allowed"}`}
            >
                <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
                    <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-400/30 shrink-0 mt-0.5 sm:mt-0">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-sm sm:text-base tracking-wide">AI Clinical Health Summary</h3>
                            <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                                SBAR Handover
                            </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Generate real-time trajectory synthesis, risk stratification, and handover recommendations.
                        </p>
                    </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-xs shrink-0 text-center">
                    View Synthesis
                </button>
            </div>

            {/* Active Telemetry Alert Banner */}
            {(patientStatus === "Review" || patientStatus === "Watch") && (
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center border shadow-sm rounded-xl w-full p-4 gap-3 ${
                    patientStatus === "Review"
                        ? "border-red-300 bg-red-50"
                        : "border-amber-300 bg-amber-50"
                }`}>
                    <div className="flex items-center gap-3">
                        <AlertTriangle className={`h-6 w-6 shrink-0 ${patientStatus === "Review" ? "text-red-500" : "text-amber-500"}`} />
                        <div>
                            <h3 className="font-bold text-sm text-gray-900">
                                {patientStatus === "Review" ? "Critical Acuity Alert" : "Acuity Warning"} · {patientStatus}
                            </h3>
                            <p className="text-xs text-gray-600 mt-0.5">
                                Bedside telemetry variance detected for {latestVital?.heartRate ? `${latestVital.heartRate} bpm heart rate` : "vital signs"}
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/dashboard/alerts"
                        className="text-blue-600 font-semibold text-xs sm:text-sm hover:underline shrink-0"
                    >
                        View Alerts →
                    </Link>
                </div>
            )}


            {/*Clinical Overview Card*/}
            <div className="flex flex-col gap-4 border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-6 bg-white">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg text-gray-800">Clinical Overview</h2>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${badgeColor}`}>
                        {patientStatus}
                    </span>
                </div>

                <div className="p-3.5 sm:p-4 bg-gray-50/80 border border-gray-100 rounded-xl">
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
            <div className="flex flex-col border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-6 bg-white gap-4">
                <h3 className="font-semibold text-gray-800 text-lg">Vitals Trajectory Trends</h3>
                {chartData.length < 2 ? (
                    <p className="text-sm text-gray-400 py-8 text-center">Need at least 2 vital readings to display trajectory</p>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3">
                            {Object.entries(vitalChartConfig).map(([key, config]) => (
                                <button key={key} type="button" onClick={() => { setActiveVital(key) }}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all duration-200 ${activeVital === key
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


