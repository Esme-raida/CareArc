import { createContext, useState, useEffect } from "react";
import { patients } from "../data/patientsData.js";

const storedPatients = localStorage.getItem("carearc_patients");
const storedPatientsObj = storedPatients ? JSON.parse(storedPatients) : null;

// Filter out any blank or incomplete patient objects automatically
const sanitizePatients = (list) => {
    if (!Array.isArray(list)) return patients;
    return list.filter(p => p && p.name && p.name.trim() !== "");
};

export const PatientsContext = createContext();

export default function PatientsProvider({ children }) {
    const [patientsArray, setPatientsArray] = useState(() => {
        const initial = storedPatientsObj ? storedPatientsObj : patients;
        return sanitizePatients(initial);
    });

    useEffect(() => {
        localStorage.setItem("carearc_patients", JSON.stringify(patientsArray));
    }, [patientsArray]);

    const deletePatient = (patientId) => {
        setPatientsArray(prev => prev.filter(p => p.id !== patientId));
    };

    const resetPatients = () => {
        setPatientsArray(patients);
        localStorage.setItem("carearc_patients", JSON.stringify(patients));
    };

    return (
        <PatientsContext.Provider value={{ patientsArray, setPatientsArray, deletePatient, resetPatients }}>
            {children}
        </PatientsContext.Provider>
    );
}