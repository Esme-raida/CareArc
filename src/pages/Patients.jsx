import { Link } from "react-router-dom";
import { UserGroupIcon, PlusIcon } from "@heroicons/react/24/outline";
import { SearchIcon, Trash2, LockIcon, RotateCcw } from "lucide-react";
import { patientColumns } from "../data/patientsData.js";
import { useState } from "react";
import usePatients from "../hooks/usePatients";
import useVitals from "../hooks/useVitals";
import useThresholds from "../hooks/useThreshold.jsx";
import { computeDeltas, derivePatientStatus } from "../utils/deltaEngine.js";
import { statusDotStyles } from "../utils/getStatus.js";
import useAuth from "../hooks/useAuth.jsx";

export default function Patients() {
    const { patientsArray, deletePatient, resetPatients } = usePatients();
    const { vitalsArray } = useVitals();
    const { thresholds } = useThresholds();
    const { canRegisterNewPatient, isRecords } = useAuth();

    const [searchValue, setSearchValue] = useState("");
    const [typeFilter, setTypeFilter] = useState("all"); // "all" | "inpatient" | "outpatient"

    const validPatients = patientsArray.filter(patient => patient && patient.name && patient.name.trim() !== "");
    const searchedPatients = validPatients.filter(patient => {
        const matchesSearch = (patient.name || "").toLowerCase().includes(searchValue) ||
            (patient.condition || "").toLowerCase().includes(searchValue) ||
            (patient.id || "").toLowerCase().includes(searchValue);

        const isOutpatient = !patient.room || patient.room.toLowerCase() === "outpatient" || patient.room.toLowerCase() === "n/a";
        if (typeFilter === "inpatient") return matchesSearch && !isOutpatient;
        if (typeFilter === "outpatient") return matchesSearch && isOutpatient;
        return matchesSearch;
    });

    const inpatientCount = validPatients.filter(p => p.room && p.room.toLowerCase() !== "outpatient" && p.room.toLowerCase() !== "n/a").length;
    const outpatientCount = validPatients.filter(p => !p.room || p.room.toLowerCase() === "outpatient" || p.room.toLowerCase() === "n/a").length;

    const filteredPatients = searchedPatients.sort((a, b) => {
        const vitalsA = vitalsArray.filter(vital => vital.patientId === a.id);
        const vitalsB = vitalsArray.filter(vital => vital.patientId === b.id);

        const latestVitalA = vitalsA.length > 0 ? vitalsA.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        ) : null;

        const latestVitalB = vitalsB.length > 0 ? vitalsB.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        ) : null;

        const deltasA = computeDeltas(vitalsA);
        const deltasB = computeDeltas(vitalsB);

        const statusA = derivePatientStatus(deltasA, latestVitalA);
        const statusB = derivePatientStatus(deltasB, latestVitalB);

        function sortingfunction(status) {
            if (status === "Review") return 3;
            if (status === "Watch") return 2;
            if (status === "Improving") return 1;
            if (status === "Stable") return 0;
            return 0;
        }

        const priorityA = sortingfunction(statusA);
        const priorityB = sortingfunction(statusB);

        return priorityB - priorityA;
    });

    return (
        <main className="flex flex-col min-h-screen px-3.5 sm:px-6 lg:px-8 bg-gray-100 w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-5 sm:py-6 mb-2">
                <header className="flex items-center gap-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <UserGroupIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Patients Directory</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage patient records and clinical information</p>
                    </div>
                </header>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                    {resetPatients && (
                        <button
                            onClick={resetPatients}
                            title="Reset Directory to seed patients"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-gray-200/80 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-3.5 py-2.5 rounded-xl transition-all shadow-2xs text-xs sm:text-sm font-semibold shrink-0"
                        >
                            <RotateCcw className="w-4 h-4 text-gray-500 shrink-0" />
                            <span>Reset Directory</span>
                        </button>
                    )}
                    <Link to={canRegisterNewPatient ? "/dashboard/patients/addpatientpage" : ""} className="flex-1 sm:flex-none shrink-0">
                        <button
                            className={!canRegisterNewPatient 
                                ? "w-full inline-flex items-center justify-center gap-2 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl px-4 py-2.5 cursor-not-allowed text-xs sm:text-sm font-semibold shrink-0"
                                : "w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm font-semibold shrink-0"
                            }
                            title={!canRegisterNewPatient ? "You do not have access to register new patients" : ""}
                            disabled={!canRegisterNewPatient}>
                            {!canRegisterNewPatient ? <LockIcon className="w-4 h-4 shrink-0" /> : <PlusIcon className="w-4 h-4 shrink-0" />}
                            <span>Add Patient</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Census Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="inline-flex p-1 bg-gray-200/70 rounded-xl w-fit">
                    <button
                        onClick={() => setTypeFilter("all")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            typeFilter === "all"
                                ? "bg-white text-gray-900 shadow-xs"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        All ({validPatients.length})
                    </button>
                    <button
                        onClick={() => setTypeFilter("inpatient")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            typeFilter === "inpatient"
                                ? "bg-white text-gray-900 shadow-xs"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Inpatients ({inpatientCount})
                    </button>
                    <button
                        onClick={() => setTypeFilter("outpatient")}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            typeFilter === "outpatient"
                                ? "bg-white text-gray-900 shadow-xs"
                                : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                        Outpatients ({outpatientCount})
                    </button>
                </div>

                <div className="relative text-gray-500 w-full sm:w-72">
                    <input
                        aria-label="Search Patients by name"
                        placeholder="Search patients..."
                        className="w-full border border-gray-200 bg-white rounded-xl shadow-xs outline-0 pl-10 pr-4 py-2 text-xs sm:text-sm placeholder:text-gray-400 focus:border-blue-500 transition"
                        onChange={(e) => {
                            setSearchValue(e.target.value.toLowerCase().trim());
                        }}
                    />
                    <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
            </div>

            <section className="border border-gray-200 shadow-sm rounded-xl w-full px-4 py-6 md:px-6 md:py-8 bg-white mb-8">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl md:text-2xl font-semibold">
                        {typeFilter === "all" ? "All Patients" : typeFilter === "inpatient" ? "Inpatients (Admitted)" : "Outpatients (Ambulatory)"} ({filteredPatients.length})
                    </span>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="w-full min-w-[600px]">
                        <thead className="border-b border-gray-200 pb-2">
                            <tr>
                                {patientColumns.map((column) => (
                                    <th key={column.key} scope="col" className="px-4 py-3 text-left text-sm font-semibold text-gray-500">
                                        {column.label}
                                    </th>
                                ))}
                                <th scope="col" className="px-4 py-3 text-gray-500 text-sm text-left font-semibold">Last Vitals</th>
                                <th scope="col" className="px-4 py-3 text-gray-500 text-sm text-right font-semibold">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPatients.map((patient) => {
                                const patientVitals = vitalsArray.filter((vitals) => vitals.patientId === patient.id);
                                let latestVitalTime = null;

                                const latestVitals = patientVitals.length > 0 ? patientVitals.reduce((latest, current) =>
                                    new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
                                ) : null;
                                const deltas = computeDeltas(patientVitals);
                                latestVitalTime = latestVitals ? latestVitals.timestamp.split("T")[1].slice(0, 5) : null;
                                const patientStatus = derivePatientStatus(deltas, latestVitals);

                                return (
                                    <tr key={patient.id} className="border-b border-b-gray-100 hover:bg-gray-50 transition-colors">
                                        {patientColumns.map((column) => {
                                            let cellContent;
                                            if (column.key === "name") {
                                                cellContent = (
                                                    <Link to={`/dashboard/patients/patientsdetail/${patient.id}`} className="font-semibold text-blue-800 hover:underline">
                                                        {patient[column.key]}
                                                    </Link>
                                                );
                                            } else if (column.key === "status") {
                                                cellContent = (
                                                    <span className="inline-flex justify-center items-center gap-2 font-medium">
                                                        <span className={`h-2 w-2 rounded-full ${statusDotStyles[patientStatus] || 'bg-gray-300'}`}></span>
                                                        <span className="text-gray-700 text-xs font-medium">{patientStatus}</span>
                                                    </span>
                                                );
                                            } else if (column.key === "room") {
                                                const isOutpatient = !patient.room || patient.room.toLowerCase() === "outpatient" || patient.room.toLowerCase() === "n/a";
                                                cellContent = isOutpatient ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                                        Outpatient
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                        {patient.room}
                                                    </span>
                                                );
                                            } else if (column.key === "admitted") {
                                                cellContent = patient.admitted ? (
                                                    <span className="text-gray-600 text-xs font-mono">{patient.admitted}</span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs italic">Ambulatory</span>
                                                );
                                            } else {
                                                cellContent = patient[column.key];
                                            }

                                            return (
                                                <td key={column.key} className="px-4 py-3 text-sm text-gray-700 text-left">
                                                    {cellContent}
                                                </td>
                                            );
                                        })}

                                        <td className="px-4 py-3 text-sm text-gray-700 text-left">
                                            {latestVitalTime ?? <span className="text-gray-400">No vitals</span>}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right">
                                            <button
                                                type="button"
                                                disabled={!isRecords}
                                                onClick={() => deletePatient && deletePatient(patient.id)}
                                                title={!isRecords ? "You do not have the permission to delete patients" : "Delete Patient"}
                                                className={!isRecords ? "text-gray-200 cursor-not-allowed" : "p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
