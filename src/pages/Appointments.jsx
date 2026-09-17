import { useState } from "react";
import { CalendarIcon, LockIcon, Clock4Icon, PlusIcon } from "lucide-react";
import IndividualAppointment from "../components/Individualappointment";
import AppointmentForm from "../components/AppointmentForm";
import IndividualupcomingAppointment from "../components/UpcomingAppointments";
import useAppointments from "../hooks/useAppointments";
import { getAppointmentStatus } from "../utils/getAppointmentStatus";
import useAuth from "../hooks/useAuth";

export default function Appointments({ }) {

    const { appointmentsList, setAppointmentsList, resetAppointments } = useAppointments();
    const { canBookAppointments } = useAuth();

    // State to check if the form/dropdown is open or closed
    const [isFormOpen, setIsFormOpen] = useState(false);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayLocalString = `${year}-${month}-${day}`;

    const todayAppointments = appointmentsList.filter((newAppointment) => {
        return newAppointment.date === todayLocalString;
    });

    const upcomingAppointments = appointmentsList.filter(newAppointment => getAppointmentStatus(newAppointment) === "scheduled");
    const completedAppointments = appointmentsList.filter(newAppointment => getAppointmentStatus(newAppointment) === "completed");
    const missedAppointments = appointmentsList.filter(newAppointment => getAppointmentStatus(newAppointment) === "missed")

    const markAsCompleted = (id) => {
        setAppointmentsList(prev =>
            prev.map(appointment => appointment.id === id ?
                { ...appointment, isCompleted: true } : appointment)
            //if yes, copy all properties and make isCompleted true else return the appointment
        )
    }

    return (
        <div>
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <AppointmentForm
                        setAppointmentsList={setAppointmentsList}
                        setIsFormOpen={setIsFormOpen}
                    />
                </div>
            )}

            <main className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100 w-full max-w-7xl mx-auto">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <header className="pt-6">
                        <div className="flex items-center gap-1.5 text-2xl font-bold">
                            <h1>Appointments</h1>
                        </div>
                        <p className="text-gray-500 text-sm">Manage your schedule</p>
                    </header>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 sm:mt-0 self-end sm:self-auto">
                        {resetAppointments && (
                            <button
                                onClick={resetAppointments}
                                title="Reset & sync seed data with Patient Directory"
                                className="bg-gray-200 border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition-all text-xs sm:text-sm font-semibold"
                            >
                                🔄 Sync Directory Data
                            </button>
                        )}
                        <button
                            onClick={canBookAppointments ? () => setIsFormOpen(true) : () => setIsFormOpen(false)}
                            className={!canBookAppointments ? "flex flex-row items-center gap-1 border border-gray-300 bg-gray-200 text-gray-400 rounded-md px-2 py-1.5 cursor-not-allowed"
                                : "flex flex-row gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 hover:bg-blue-800 transition-all text-xs sm:text-sm font-semibold"
                            }
                            title={!canBookAppointments ? "You do not have access to schedule appointments" : ""} //the title is not displaying here...recheck 
                            disabled={!canBookAppointments}
                        >
                            {!canBookAppointments ? <LockIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                            Schedule Visit
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-5 w-full bg-gray-100 pb-8">
                    <section className="flex flex-col border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                        <span className="text-xl md:text-2xl font-semibold flex flex-row gap-2 items-center mb-4 border-b border-gray-100 pb-2">
                            <CalendarIcon className="w-6 h-6 text-blue-500" />
                            Appointments Today
                        </span>
                        <div className="flex flex-col gap-3">
                            {todayAppointments.length === 0 ? (
                                <p className="text-gray-500 text-sm py-4">No appointments today</p>
                            ) : (
                                todayAppointments.map((appointment) => (
                                    <IndividualAppointment
                                        key={appointment.id}
                                        name={appointment.name}
                                        appointmentType={appointment.type}
                                        timing={appointment.time}
                                        duration={appointment.duration}
                                        state={getAppointmentStatus(appointment)} />
                                ))
                            )}
                        </div>
                    </section>

                    <div className="w-full lg:w-96 shrink-0 flex flex-col gap-5">
                        <section className="flex flex-col gap-5 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                            <header className="flex gap-2 items-center font-semibold text-xl border-b border-gray-100 pb-2">
                                <Clock4Icon className="w-6 h-6 text-blue-500" />
                                <h1>Scheduled Visits</h1>
                            </header>
                            <div className="flex flex-col gap-2">
                                {upcomingAppointments.length === 0 ? (
                                    <p className="text-gray-500 text-sm py-2">No upcoming visits</p>
                                ) : (
                                    upcomingAppointments.map((upcomingAppointment) => (
                                        <IndividualupcomingAppointment key={upcomingAppointment.id}
                                            name={upcomingAppointment.name}
                                            type={upcomingAppointment.type}
                                            timing={upcomingAppointment.time} />
                                    ))
                                )}
                            </div>
                        </section>
                        <section className="flex flex-col gap-4 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                            <header className="font-semibold text-xl border-b border-gray-100 pb-2">
                                <h1>Quick Stats</h1>
                            </header>
                            <div className="flex flex-col gap-3 text-sm">
                                <span className="text-gray-500 flex justify-between">
                                    Appointments Today
                                    <span className="font-semibold text-black">{todayAppointments.length} visits</span>
                                </span>
                                <span className="text-gray-500 flex justify-between">
                                    Scheduled This Week
                                    <span className="font-semibold text-black">{upcomingAppointments.length} visits</span>
                                </span>
                                <span className="text-gray-500 flex justify-between">
                                    Completed Visits
                                    <span className="font-semibold text-green-700">
                                        {completedAppointments.length}
                                    </span>
                                </span>
                                <span className="text-gray-500 flex justify-between">
                                    Missed Visits
                                    <span className="font-semibold text-orange-600">{missedAppointments.length}</span>
                                </span>
                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    )
}

