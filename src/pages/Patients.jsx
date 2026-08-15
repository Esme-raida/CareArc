import { Link } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { SearchIcon } from "lucide-react";
import { patientColumns } from "../data/patientsData.js";
import { useState } from "react";
import usePatients from "../hooks/usePatients";
import useVitals from "../hooks/useVitals";
import useThresholds from "../hooks/useThreshold.jsx";
import { getStatus, getStatusDotStyles } from "../utils/getStatus.js";

export default function Patients() {

    const { patientsArray } = usePatients();
    const { vitalsArray } = useVitals();
    const { thresholds } = useThresholds();

    const [searchValue, setSearchValue] = useState("");
    //The sorting function to automatically grab the latest vitals, score their severity, 
    //and float the most critical patients to the very top of the list so they get attention first.
    const searchedPatients = patientsArray.filter(patient => (patient.name).toLowerCase().includes(searchValue));
    const filteredPatients = searchedPatients.sort((a, b) => {
        const vitalsA = vitalsArray.filter(vital => vital.patientId === a.id);
        const vitalsB = vitalsArray.filter(vital => vital.patientId === b.id);

        const latestVitalA = vitalsA.length > 0 ? vitalsA.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        ) : null;

        const latestVitalB = vitalsB.length > 0 ? vitalsB.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        ) : null;

        const statusA = getStatus(latestVitalA, thresholds);
        const statusB = getStatus(latestVitalB, thresholds);


        function sortingfunction(status) {
            if (status === "Critical") return 3;
            if (status === "Warning") return 2;
            if (status === "Stable") return 1;
            if (status === "No Data") return 0;
            return 0;

        }

        const priorityA = sortingfunction(statusA);
        const priorityB = sortingfunction(statusB);

        //sort between a & b such that it makes use of subtraction
        //assuming a = 2 and b = 5, sort runs 2-5, this is -3, so in this case it means 2 < 5
        //meaning a comes before b, and it returns negative..
        //if b comes before a, it returns positive....i.e
        //if the order remains, it returns 0.

        return priorityB - priorityA


    })


    return (
        <main className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100 w-full max-w-7xl mx-auto">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <header className="pt-6">
                    <div className="flex items-center gap-1.5 text-2xl font-bold">
                        <UserGroupIcon className="h-8 w-8 text-blue-500" />
                        <h1>Patients Directory</h1>
                    </div>
                    <p className="text-gray-500 text-sm">Manage patient records and clinical information</p>
                </header>
                <Link to="/dashboard/patients/addpatientpage" className="self-end sm:self-auto">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 hover:bg-blue-800 transition-all text-xs sm:text-sm font-semibold">
                        + Add Patient
                    </button>
                </Link>
            </div>
            <div className="mb-6 relative text-gray-500 w-full max-w-md">
                <input
                    aria-label="Search Patients by name"
                    placeholder="Search patients"
                    className="w-full border border-gray-200 bg-white rounded-xl shadow-sm outline-0 pl-10 pr-4 py-2 placeholder:text-gray-500"
                    onChange={(e) => {
                        setSearchValue(e.target.value.toLowerCase().trim());
                    }} />
                <SearchIcon
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <section className="border border-gray-200 shadow-sm rounded-xl w-full px-4 py-6 md:px-6 md:py-8 bg-white mb-8">
                <span className="text-xl md:text-2xl font-semibold block mb-4">All Patients ({filteredPatients.length}) </span>
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
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPatients.map((patient) => {
                                const patientVitals = vitalsArray.filter((vitals) => vitals.patientId === patient.id);
                                let latestVitalTime = null

                                const latestVitals = patientVitals.length > 0 ? patientVitals.reduce((latest, current) =>
                                    new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
                                ) : null;
                                latestVitalTime = latestVitals ? latestVitals.timestamp.split("T")[1].slice(0, 5) : null;
                                const patientStatus = getStatus(latestVitals, thresholds);

                                //for every patient in the patients array, create a table row
                                return (
                                    <tr key={patient.id} className="border-b border-b-gray-100 hover:bg-gray-50 transition-colors">
                                        {/*Inside each row....loop through the columns*/}
                                        {patientColumns.map((column) => {
                                            let cellContent;

                                            if (column.key === "name") {
                                                //If the column is a name --- I'll use link cause Ineed it to be a link
                                                cellContent = <Link to={`/dashboard/patients/patientsdetail/${patient.id}`}
                                                    className="font-semibold text-blue-800 hover:underline">{patient[column.key]}</Link>
                                            }
                                            else if (column.key === "status") {
                                                cellContent =
                                                    <span className="inline-flex justify-center items-center gap-2 font-medium">
                                                        <span className={`h-2 w-2 rounded-full ${getStatusDotStyles(patientStatus)}`}></span>
                                                        <span className="text-gray-700 text-xs">{patientStatus}</span>
                                                    </span>

                                            } else {
                                                cellContent = patient[column.key]
                                            }

                                            return (
                                                //for each column in the patientsColumn array, create one table cell
                                                <td key={column.key} className="px-4 py-3 text-sm text-gray-700 text-left">
                                                    {cellContent}
                                                </td>
                                            )
                                        })}
                                        {/* That is for each patient, for each column, show patient[propertyName] */}

                                        {/*For the part added manually and not in the loop*/}
                                        <td className="px-4 py-3 text-sm text-gray-700 text-left">
                                            {latestVitalTime ?? <span className="text-gray-400">No vitals</span>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}

