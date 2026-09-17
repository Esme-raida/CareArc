import { useState } from "react";
import { CalendarIcon, LockIcon, Clock4Icon, PlusIcon, RotateCcw, CheckCircle2, AlertCircle } from "lucide-react";
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

            <main className="flex flex-col min-h-screen px-3 sm:px-6 lg:px-8 bg-gray-100 w-full max-w-7xl mx-auto">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-5 sm:py-6 mb-2">
                    <header className="flex items-center gap-3">
                        <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                            <CalendarIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Appointments</h1>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage and coordinate your clinical visit schedule</p>
                        </div>
                    </header>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                        {resetAppointments && (
                            <button
                                onClick={resetAppointments}
                                title="Reset & sync seed data with Patient Directory"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-gray-200/80 hover:bg-gray-50 hover:border-gray-300 text-gray-700 px-3.5 py-2.5 rounded-xl transition-all shadow-2xs text-xs sm:text-sm font-semibold shrink-0"
                            >
                                <RotateCcw className="w-4 h-4 text-gray-500 shrink-0" />
                                <span>Sync Directory Data</span>
                            </button>
                        )}
                        <button
                            onClick={canBookAppointments ? () => setIsFormOpen(true) : () => setIsFormOpen(false)}
                            className={!canBookAppointments 
                                ? "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-gray-200 bg-gray-100 text-gray-400 rounded-xl px-4 py-2.5 cursor-not-allowed text-xs sm:text-sm font-semibold shrink-0"
                                : "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-4 py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm font-semibold shrink-0"
                            }
                            title={!canBookAppointments ? "You do not have access to schedule appointments" : ""}
                            disabled={!canBookAppointments}
                        >
                            {!canBookAppointments ? <LockIcon className="w-4 h-4 shrink-0" /> : <PlusIcon className="w-4 h-4 shrink-0" />}
                            <span>Schedule Visit</span>
                        </button>
                    </div>
                </div>

                {/* Visit Analytics KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
                    {/* Today */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Today's Visits</span>
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                                <CalendarIcon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{todayAppointments.length}</p>
                        <span className="text-[11px] text-gray-400 font-medium">Scheduled for today</span>
                    </div>

                    {/* Scheduled / Upcoming */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheduled</span>
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                                <Clock4Icon className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{upcomingAppointments.length}</p>
                        <span className="text-[11px] text-gray-400 font-medium">Active upcoming queue</span>
                    </div>

                    {/* Completed */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Completed</span>
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{completedAppointments.length}</p>
                        <span className="text-[11px] text-emerald-600 font-medium">Concluded visits</span>
                    </div>

                    {/* Missed */}
                    <div className="bg-white border border-gray-200/70 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Missed</span>
                            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                                <AlertCircle className="w-4 h-4" />
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">{missedAppointments.length}</p>
                        <span className="text-[11px] text-rose-500 font-medium">No-show / cancelled</span>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full pb-10">
                    {/* Appointments Today */}
                    <section className="lg:col-span-7 xl:col-span-8 flex flex-col border border-gray-200/70 shadow-2xs rounded-2xl p-4 sm:p-6 bg-white">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0">
                                    <CalendarIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Appointments Today</h2>
                                    <p className="text-xs text-gray-500">Live consultation queue for today's clinical shift</p>
                                </div>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 shrink-0">
                                {todayAppointments.length} {todayAppointments.length === 1 ? "visit" : "visits"}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {todayAppointments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-2 border-dashed border-gray-200/70 rounded-2xl bg-gray-50/50 my-2">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-100">
                                        <CalendarIcon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-1">No Appointments Today</h4>
                                    <p className="text-xs text-gray-500 max-w-sm mb-4">You have a clear consultation schedule for today. New bookings will automatically populate here.</p>
                                    {canBookAppointments && (
                                        <button
                                            onClick={() => setIsFormOpen(true)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                                        >
                                            <PlusIcon className="w-3.5 h-3.5" />
                                            <span>Book a visit now</span>
                                        </button>
                                    )}
                                </div>
                            ) : (
                                todayAppointments.map((appointment) => (
                                    <IndividualAppointment
                                        key={appointment.id}
                                        name={appointment.name}
                                        appointmentType={appointment.type}
                                        timing={appointment.time}
                                        duration={appointment.duration}
                                        state={getAppointmentStatus(appointment)}
                                        onMarkCompleted={() => markAsCompleted(appointment.id)}
                                    />
                                ))
                            )}
                        </div>
                    </section>

                    {/* Scheduled Visits Queue */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
                        <section className="flex flex-col border border-gray-200/70 shadow-2xs rounded-2xl p-4 sm:p-6 bg-white">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100 shrink-0">
                                        <Clock4Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold text-gray-900">Scheduled Visits</h2>
                                        <p className="text-xs text-gray-500">Upcoming appointments queue</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60 shrink-0">
                                    {upcomingAppointments.length}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2.5 max-h-[460px] overflow-y-auto pr-1">
                                {upcomingAppointments.length === 0 ? (
                                    <p className="text-gray-400 text-xs py-8 text-center italic">No upcoming visits currently queued</p>
                                ) : (
                                    upcomingAppointments.map((upcomingAppointment) => (
                                        <IndividualupcomingAppointment
                                            key={upcomingAppointment.id}
                                            name={upcomingAppointment.name}
                                            type={upcomingAppointment.type}
                                            timing={upcomingAppointment.time}
                                        />
                                    ))
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

