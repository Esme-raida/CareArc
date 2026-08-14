import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CalendarIcon } from "lucide-react";
import IndividualAppointment from "../components/Individualappointment";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import { getAppointmentStatus } from "../utils/getAppointmentStatus";

export default function PersonalizedAppointments() {

    const { appointmentsList } = useContext(PatientDetailContext);
    const { patientsId: currentPatientId } = useParams(); //this is the current patient ID
    const patientAppointments = appointmentsList.filter((newAppointment) => newAppointment.patientId === currentPatientId);


    //FILTERING APPOINTMENTS 
    //Today's appointments
    const todayAppointments = patientAppointments.filter((newAppointment) => {
        const today = new Date();
        const appointmentDate = new Date(newAppointment.date);
        return appointmentDate.toDateString() === today.toDateString();
    });

    //Future Appointments using getAppointmentStatus
    const upcomingAppointments = patientAppointments.filter((appointment) => getAppointmentStatus(appointment) === "scheduled")

    return (
        <div>
            <div className="flex flex-col gap-2 border border-gray-200 shadow-sm rounded-xl w-full px-6 py-5 bg-white">
                {patientAppointments && patientAppointments.length > 0 ? (
                    <>
                        <section className="flex flex-col gap-1">

                            {/*Today's Appointments*/}
                            <span className="font-bold mb-2">Appointments Today</span>
                            {todayAppointments.length > 0 ? (
                                todayAppointments.map((appointment) => (
                                    <IndividualAppointment
                                        key={appointment.id}
                                        appointmentType={appointment.type}
                                        timing={appointment.time}
                                        duration={appointment.duration}
                                        state={getAppointmentStatus(appointment)} />
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No appointments scheduled for today.</span>
                            )}
                        </section>
                        <section className="flex flex-col gap-2">

                            {/*Upcoming Scheduled Visits*/}
                            <span className="font-bold text-gray-700 mb-2">Upcoming Scheduled Visits</span>
                            {upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((appointment) => (
                                    <IndividualAppointment
                                        key={appointment.id}
                                        appointmentType={appointment.type}
                                        timing={`${appointment.date} @ ${appointment.time}`} // Shows date & time
                                        duration={appointment.duration}
                                        state={getAppointmentStatus(appointment)} />
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No upcoming appointments scheduled.</span>
                            )}
                        </section>
                    </>
                ) : (
                    <span className="text-gray-500">No appointments recorded for this patient.</span>
                )}
            </div>
        </div>
    )
}