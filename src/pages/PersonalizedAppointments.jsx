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

    const getPractitionerName = (type) => {
        if (type === "Consultation") return "Dr. Sarah Chen";
        if (type === "Follow-up") return "Dr. Emeka Okafor";
        if (type === "Check-up") return "Nurse Rahma Ali";
        return "Attending Physician";
    };

    //FILTERING APPOINTMENTS 
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayLocalString = `${year}-${month}-${day}`;

    //Today's appointments
    const todayAppointments = patientAppointments.filter((newAppointment) => {
        return newAppointment.date === todayLocalString;
    });

    //Future Appointments using getAppointmentStatus
    const upcomingAppointments = patientAppointments.filter((appointment) => getAppointmentStatus(appointment) === "scheduled")

    return (
        <div className="flex flex-col gap-6 border border-gray-200/70 shadow-2xs rounded-2xl w-full p-4 sm:p-6 bg-white">
            {patientAppointments && patientAppointments.length > 0 ? (
                <>
                    <section className="flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-blue-600" />
                                <h3 className="font-bold text-sm sm:text-base text-gray-900">Appointments Today</h3>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                {todayAppointments.length}
                            </span>
                        </div>
                        {todayAppointments.length > 0 ? (
                            todayAppointments.map((appointment) => (
                                <IndividualAppointment
                                    key={appointment.id}
                                    name={getPractitionerName(appointment.type)}
                                    appointmentType={appointment.type}
                                    timing={appointment.time}
                                    duration={appointment.duration}
                                    state={getAppointmentStatus(appointment)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400 text-xs sm:text-sm py-3 italic">No consultations scheduled for today.</p>
                        )}
                    </section>

                    <section className="flex flex-col gap-3">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-indigo-600" />
                                <h3 className="font-bold text-sm sm:text-base text-gray-900">Upcoming Scheduled Visits</h3>
                            </div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {upcomingAppointments.length}
                            </span>
                        </div>
                        {upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map((appointment) => (
                                <IndividualAppointment
                                    key={appointment.id}
                                    name={getPractitionerName(appointment.type)}
                                    appointmentType={appointment.type}
                                    timing={`${appointment.date} @ ${appointment.time}`}
                                    duration={appointment.duration}
                                    state={getAppointmentStatus(appointment)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400 text-xs sm:text-sm py-3 italic">No upcoming appointments currently scheduled.</p>
                        )}
                    </section>
                </>
            ) : (
                <div className="py-8 text-center text-gray-400 text-xs sm:text-sm italic">
                    No appointments recorded for this patient.
                </div>
            )}
        </div>
    )
}