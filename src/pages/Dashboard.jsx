import { UserGroupIcon, DocumentDuplicateIcon, CalendarIcon, UserPlusIcon, PlusIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Clock4Icon, LockIcon, LayoutDashboard, ChevronRight } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import StatCard from "../components/StatCard";
import IndividualAppointment from "../components/Individualappointment";
import DashboardQuickActions from "../components/DashboardQuickActions";
import useAppointments from "../hooks/useAppointments";
import usePatients from "../hooks/usePatients";
import useVitals from "../hooks/useVitals";
import { computeDeltas, derivePatientStatus } from "../utils/deltaEngine.js";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

export default function Dashboard() {

    const { appointmentsList } = useAppointments();
    const { patientsArray } = usePatients();
    const { vitalsArray } = useVitals();
    const { isNurse } = useAuth();


    const highAcuityPatients = patientsArray.map((patient) => {
        const patientVitals = vitalsArray.filter((vital) => vital.patientId === patient.id);
        if (patientVitals.length === 0) return null;

        const latestVital = patientVitals.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        );

        // Calculate health triage status using Delta Engine
        const deltas = computeDeltas(patientVitals);
        const healthStatus = derivePatientStatus(deltas, latestVital);

        if (healthStatus === "Review" || healthStatus === "Watch") {
            let trigger = "Biometric variance detected";
            if (latestVital.heartRate > 100) trigger = `Tachycardia (${latestVital.heartRate} bpm)`;
            else if (latestVital.oxygenSaturation && latestVital.oxygenSaturation < 95) trigger = `Low SpO₂ (${latestVital.oxygenSaturation}%)`;
            else if (latestVital.temperature > 37.5) trigger = `Elevated temp (${latestVital.temperature}°C)`;
            else if (latestVital.bloodPressure && latestVital.bloodPressure.systolic > 140) trigger = `Hypertension (${latestVital.bloodPressure.systolic}/${latestVital.bloodPressure.diastolic})`;

            return {
                ...patient,
                healthStatus,
                latestVital,
                trigger,
            };
        }
        return null;
    }).filter(Boolean);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayLocalString = `${year}-${month}-${day}`;

    // Filter today's appointments
    const todayAppointments = appointmentsList.filter((appointment) => {
        return appointment.date === todayLocalString;
    });

    // Pending appointments (today)
    const pendingAppointments = todayAppointments.filter((appointment) => !appointment.isCompleted).slice(0, 4);

    return (
        <main className="bg-gray-100 px-4 sm:px-6 lg:px-8 min-h-screen h-full w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 sm:py-6 mb-2">
                <header className="flex items-center gap-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <LayoutDashboard className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Clinic Dashboard</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Real-time overview of clinical visits, acuity triage, and patient census</p>
                    </div>
                </header>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200/80 px-3.5 py-2 rounded-xl shadow-2xs self-start sm:self-auto shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Stat Cards */}
            <section className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard cardLabel="Total Patients" CardValue={patientsArray.length} icon={UserGroupIcon} iconColor="text-blue-500" />
                    <StatCard cardLabel="Today's Appointments" CardValue={todayAppointments.length} icon={CalendarIcon} iconColor="text-green-500" />
                    <StatCard cardLabel="Pending Visits" CardValue={todayAppointments.filter((appointmentsList) => !appointmentsList.isCompleted).length} icon={DocumentDuplicateIcon} iconColor="text-amber-500" />
                    <StatCard cardLabel="Newly Registered Patients" CardValue={patientsArray.filter((patient) => {
                        if (!patient.admitted) return true;
                        const millisecondsDifference = today - new Date(patient.admitted);
                        const daysDifference = Math.floor(millisecondsDifference / 86400000);
                        return daysDifference <= 30;
                    }).length} icon={UserGroupIcon} iconColor="text-purple-500" />
                </div>
            </section>


            {/* Recent Patients / Appointments */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                <DashboardCard
                    cardTitle="High-acuity patients"
                    iconColor="text-purple-500"
                    icon={UserGroupIcon}
                    action={<Link to={'/dashboard/alerts'} className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline">View Alerts →</Link>}
                >
                    <div className="flex flex-col gap-2">
                        {highAcuityPatients.length === 0 ? (
                            <p className="text-gray-400 text-xs py-3 pl-1">No high-acuity patients at this moment</p>
                        ) : (
                            highAcuityPatients.map((patient) => {
                                const isReview = patient.healthStatus === "Review";
                                return (
                                    <div
                                        key={patient.id}
                                        className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border transition-all duration-200 shadow-xs hover:shadow-sm hover:-translate-y-0.5 gap-3 ${
                                            isReview
                                                ? "bg-gradient-to-r from-rose-50/70 via-rose-50/20 to-white border-rose-200/90 hover:border-rose-300"
                                                : "bg-gradient-to-r from-amber-50/70 via-amber-50/20 to-white border-amber-200/90 hover:border-amber-300"
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className={`p-2 rounded-xl shrink-0 shadow-2xs ${
                                                isReview
                                                    ? "bg-rose-100 text-rose-600 border border-rose-200/80"
                                                    : "bg-amber-100 text-amber-600 border border-amber-200/80"
                                            }`}>
                                                <ExclamationCircleIcon className="w-5 h-5" />
                                            </div>

                                            <div className="flex flex-col min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        to={`/dashboard/patients/patientsdetail/${patient.id}`}
                                                        className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-blue-600 truncate"
                                                    >
                                                        {patient.name}
                                                    </Link>
                                                    <span className="text-[11px] font-medium text-gray-600 bg-white/95 border border-gray-200/90 px-2 py-0.5 rounded-md shadow-2xs shrink-0">
                                                        {patient.room}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500 truncate mt-0.5">
                                                    {patient.trigger}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                                                isReview
                                                    ? "bg-rose-100 text-rose-700 border-rose-200"
                                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                            }`}>
                                                {patient.healthStatus}
                                            </span>
                                            <Link
                                                to={`/dashboard/patients/patientsdetail/${patient.id}`}
                                                className="text-gray-400 hover:text-blue-600 p-0.5 transition hidden sm:inline-flex"
                                                title="View patient details"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </DashboardCard>

                <DashboardCard cardTitle="Today's Appointments" iconColor="text-blue-500" icon={Clock4Icon}>
                    <div className="flex flex-col gap-2">
                        {pendingAppointments.length === 0 ? (
                            <p className="text-gray-500 text-sm pl-2">No appointments today</p>
                        ) : (
                            pendingAppointments.map((appointment) => (
                                <IndividualAppointment
                                    key={appointment.id}
                                    className="flex justify-between text-sm"
                                    name={appointment.name}
                                    appointmentType={appointment.type}
                                    timing={appointment.time}
                                    duration={appointment.duration}
                                    state={appointment.isCompleted ? "Completed" : "Upcoming"}
                                />
                            ))
                        )}
                    </div>
                </DashboardCard>
            </section>

            {/* Quick Actions */}
            {isNurse &&
                <>
                    <h2 className="font-semibold text-lg mt-6 mb-3">Quick Actions</h2>
                    <div className="flex flex-col sm:flex-row pb-10 gap-4 mb-8">
                        <Link to={'/dashboard/patients/addpatientpage'} className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                            <DashboardQuickActions quickActionTitle="Add Patient" icon={UserPlusIcon} />
                        </Link>
                        <Link to={'/dashboard/appointments'} className="w-full sm:w-auto sm:flex-1 sm:max-w-[200px]">
                            <DashboardQuickActions quickActionTitle="Appointment" icon={PlusIcon} />
                        </Link>
                        {/* Future actions like Generate Report or Configure Alerts can be added later */}
                    </div>
                </>
            }

        </main>
    );
}