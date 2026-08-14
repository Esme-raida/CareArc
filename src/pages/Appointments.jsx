import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import IndividualAppointment from "../components/Individualappointment";
import AppointmentForm from "../components/AppointmentForm";
import { Clock4Icon } from "lucide-react";
import IndividualupcomingAppointment from "../components/UpcomingAppointments";
import useAppointments from "../hooks/useAppointments";
import { getAppointmentStatus } from "../utils/getAppointmentStatus";

export default function Appointments({ }) {

    const { appointmentsList, setAppointmentsList } = useAppointments();

    // State to check if the form/dropdown is open or closed
    const [isFormOpen, setIsFormOpen] = useState(false);

    const todayAppointments = appointmentsList.filter((newAppointment) => {
        const today = new Date();
        const appointmentDate = new Date(newAppointment.date);

        return appointmentDate.toDateString() === today.toDateString();
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
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-10">
                    <AppointmentForm
                        setAppointmentsList={setAppointmentsList}
                        setIsFormOpen={setIsFormOpen}
                    />
                </div>
            )}

            <main className="flex flex-col min-h-screen px-7 bg-gray-100">

                <div className="flex flex-row justify-between">
                    <header className="mb-8">
                        <div className="flex flex-row  gap-1.5 mt-5 text-2xl font-bold w-60 pt-1">
                            <h1 className="mt-0.5">
                                Appointments
                            </h1>
                        </div>
                        <p className="text-gray-500">Manage your schedule</p>
                    </header>
                    <div className="flex flex-col">
                        <button
                            onClick={() => { setIsFormOpen(true) }}
                            className="mt-5  bg-blue-600 text-white px-3 py-1 h-10 rounded-md mb-5">
                            + Schedule Visit
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-5 px-7 bg-gray-100">
                    <section className="flex flex-col justify-between border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                        <span className="text-2xl font-semibold flex flex-row gap-2 items-center">
                            <CalendarIcon />Appointments Today
                        </span>
                        {todayAppointments.map((appointment) => (
                            <IndividualAppointment
                                key={appointment.id}
                                name={appointment.name}
                                appointmentType={appointment.type}
                                timing={appointment.time}
                                duration={appointment.duration}
                                state={getAppointmentStatus(appointment)} />
                        ))}
                    </section>

                    <div className="w-2xl flex flex-col gap-5">
                        <section className="flex flex-col gap-5 justify-between border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                            <header className="flex gap-2 items-center font-semibold text-2xl">
                                <Clock4Icon />
                                <h1>Scheduled Visits</h1>
                            </header>
                            {upcomingAppointments.map((upcomingAppointment) => (
                                <IndividualupcomingAppointment key={upcomingAppointment.id}
                                    name={upcomingAppointment.name}
                                    type={upcomingAppointment.type}
                                    timing={upcomingAppointment.time} />
                            ))}
                        </section>
                        <section className="flex flex-col gap-5 justify-between border border-gray-200 shadow-sm rounded-xl w-full px-6 py-8 bg-white">
                            <header className="font-semibold text-2xl">
                                <h1>Quick Stats</h1>
                            </header>
                            <span className="text-gray-500 flex justify-between">
                                Appointments Today
                                <span className="font-semibold text-black">{todayAppointments.length} appointments </span>
                            </span>
                            <span className="text-gray-500 flex justify-between">
                                Sheduled This Week
                                <span className="font-semibold text-black">{upcomingAppointments.length} appointments </span>
                            </span>
                            <span className="text-gray-500 flex justify-between">
                                Completed Visits
                                <span className="font-semibold text-green-700">
                                    {completedAppointments.length} </span>
                            </span>
                            <span className="text-gray-500 flex justify-between">
                                Missed Visits
                                <span className="font-semibold  text-orange-600">{missedAppointments.length} </span>
                            </span>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    )
}

