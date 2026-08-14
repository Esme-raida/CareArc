import { UserGroupIcon, DocumentDuplicateIcon, CalendarIcon, UserPlusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Clock4Icon } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import StatCard from "../components/StatCard";
import IndividualAppointment from "../components/Individualappointment";
import DashboardQuickActions from "../components/DashboardQuickActions";
import useAppointments from "../hooks/useAppointments";
import usePatients from "../hooks/usePatients";
import useVitals from "../hooks/useVitals";
import useThresholds from "../hooks/useThreshold.jsx";
import { getStatus } from "../utils/getStatus.js";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const { appointmentsList } = useAppointments();
    const { patientsArray } = usePatients();
    const { vitalsArray } = useVitals();
    const { thresholds } = useThresholds();


    const filteredPatients = patientsArray.filter((patient) => {
        const patientVitals = vitalsArray.filter((vital) => vital.patientId === patient.id);

        if (patientVitals.length === 0) {
            return false;
        }

        const latestVital = patientVitals.reduce((latest, current) =>
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
        );

        //Get the health status of the patient 
        const healthStatus = getStatus(latestVital, thresholds);

        if (healthStatus === "Critical" || healthStatus === "Warning") {
            return true;
        }

    });
    const today = new Date();

    // Filter today's appointments
    const todayAppointments = appointmentsList.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.toDateString() === today.toDateString();
    });

    // Pending appointments (today)
    const pendingAppointments = todayAppointments.filter((appointment) => !appointment.isCompleted).slice(0, 4);

    return (
        <main className=" bg-gray-100 px-7 min-h-screen h-full w-[90%] md: w-[100%] lg:w-[100%]">
            {/* Header */}
            <header className="mb-8">
                <div className="flex flex-row gap-1.5 pt-5 text-2xl font-bold w-60 pt-1">
                    <h1 className="mt-0.5">Clinic Dashboard</h1>
                </div>
                <p className="text-gray-500">Overview of Patients & Appointments</p>
            </header>

            {/* Stat Cards */}
            <section className="flex flex-col gap-5 mb-5">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <StatCard cardLabel="Total Patients" CardValue={patientsArray.length} icon={UserGroupIcon} iconColor="text-blue-500" />
                    <StatCard cardLabel="Today's Appointments" CardValue={todayAppointments.length} icon={CalendarIcon} iconColor="text-green-500" />
                    <StatCard cardLabel="Pending Visits" CardValue={todayAppointments.filter((appointmentsList) => !appointmentsList.isCompleted).length} icon={DocumentDuplicateIcon} iconColor="text-amber-500" />
                    <StatCard cardLabel="Newly Registered Patients" CardValue={patientsArray.filter((patient) => {
                        const millisecondsDifference = today - new Date(patient.admitted);
                        const daysDifference = Math.floor(millisecondsDifference / 86400000)
                        return daysDifference <= 30;
                    }).length} icon={UserGroupIcon} iconColor="text-purple-500" />
                </div>
            </section>


            {/* Recent Patients / Appointments */}
            <section className="flex flex-col gap-3 mb-5 md:flex-row lg:flex-row">
                <DashboardCard
                    className="flex justify-between w-3/4"
                    cardTitle="High-acuity patients"
                    iconColor="text-purple-500"
                    icon={UserGroupIcon}
                    action={<Link to={'dashboard/patients'}>View All</Link>}
                >
                    {/* Optionally, list some recent patients here */}
                    <span className="flex flex-col font-semibold text-purple-700">
                        <ul className="flex flex-col ml-10 gap-5 list-disc">
                            {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                                <li key={patient.id}>
                                    <Link to={`/dashboard/patients/patientsdetail/${patient.id}`}>{patient.name}</Link>
                                </li>
                            )) : "No high-acuity patients at this moment"}
                        </ul >
                    </span>
                </DashboardCard>

                <DashboardCard className="flex flex-col" cardTitle="Today's Appointments" iconColor="text-blue-500" icon={Clock4Icon}>
                    <div className="flex flex-col gap-2">
                        {pendingAppointments.length === 0 ? (
                            <p className="text-gray-500 ml-5">No appointments today</p>
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
            <h2 className="font-semibold mt-5 mb-3">Quick Actions</h2>
            <div className="flex flex-row gap-3 mb-5">
                <Link to={'/dashboard/patients/addpatientpage'}>
                    <DashboardQuickActions quickActionTitle="Add Patient" icon={UserPlusIcon} />
                </Link>
                <Link to={'/dashboard/appointments'}>
                    <DashboardQuickActions quickActionTitle="New Appointment" icon={PlusIcon} />
                </Link>
                {/* Future actions like Generate Report or Configure Alerts can be added later */}
            </div>
        </main>
    );
}