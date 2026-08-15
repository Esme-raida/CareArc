import { createContext, useState, useEffect } from "react";
import { appointmentsData } from "../data/appointmentData.js";

const VALID_NAMES = ["Amina Yusuf", "John Okafor", "Mary Adebayo", "Bello Kasim", "Chidinma Eze"];

const getInitialAppointments = () => {
    // Clean up old legacy keys to prevent stale cache loading
    const storageKey = "carearc_appointments_v4";
    const stored = localStorage.getItem(storageKey);

    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Verify that parsed contains valid patients and no legacy dummy names
            if (
                Array.isArray(parsed) &&
                parsed.length > 0 &&
                parsed.every((item) => item.patientId && VALID_NAMES.includes(item.name))
            ) {
                return parsed;
            }
        } catch (e) {
            console.error("Error parsing stored appointments", e);
        }
    }

    // Flush old cached data and write clean seed data
    localStorage.removeItem("carearc_appointments");
    localStorage.setItem(storageKey, JSON.stringify(appointmentsData));
    return appointmentsData;
};

export const AppointmentsContext = createContext();

export default function AppointmentsProvider({ children }) {
    const [appointmentsList, setAppointmentsList] = useState(getInitialAppointments);

    useEffect(() => {
        const storageKey = "carearc_appointments_v4";
        localStorage.setItem(storageKey, JSON.stringify(appointmentsList));
        localStorage.setItem("carearc_appointments", JSON.stringify(appointmentsList));
    }, [appointmentsList]);

    const resetAppointments = () => {
        localStorage.setItem("carearc_appointments_v4", JSON.stringify(appointmentsData));
        localStorage.setItem("carearc_appointments", JSON.stringify(appointmentsData));
        setAppointmentsList(appointmentsData);
    };

    return (
        <AppointmentsContext.Provider value={{ appointmentsList, setAppointmentsList, resetAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
}