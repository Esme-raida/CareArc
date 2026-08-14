
//CREATING A STATUS FUNCTIONALITY FOR COMPARISON
export const getAppointmentStatus = (newAppointment) => {


    const today = new Date();
    const todayDateOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const appointmentDate = new Date(newAppointment.date);
    const appointmentDateOnly = new Date(
        appointmentDate.getFullYear(),
        appointmentDate.getMonth(),
        appointmentDate.getDate()
    );

    const appointmentDateTime = new Date(`${newAppointment.date} ${newAppointment.time}`); //combining the date and time together.
    const appointmentEndTime = new Date(appointmentDateTime.getTime() + newAppointment.duration * 60000);

    //FOR GETTING THE STATUS FOR THE STATUS BADGE
    if (newAppointment.isCompleted) return "completed";

    if (appointmentDateOnly.getTime() === todayDateOnly.getTime()) {
        if (appointmentDateTime > today) {
            return "upcoming";
        } else if (today >= appointmentDateTime && today <= appointmentEndTime) {
            return "ongoing";
        } else return "missed";

    } else if (appointmentDateOnly > todayDateOnly) {
        return "scheduled";
    } else return "missed";
}

