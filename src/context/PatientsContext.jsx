import { createContext, useState, useEffect } from "react";
import { patients } from "../data/patientsData.js";

const storedPatients = localStorage.getItem("carearc_patients");
const storedPatientsObj = storedPatients ? JSON.parse(storedPatients) : null;

const defaultWeights = {
    "PT-001": "68 kg",
    "PT-002": "82 kg",
    "PT-003": "64 kg",
    "PT-004": "78 kg",
    "PT-005": "71 kg",
    "PT-006": "75 kg",
    "PT-007": "62 kg",
    "PT-008": "84 kg",
};

// Filter out any blank or incomplete patient objects and merge missing seed patients
const sanitizePatients = (list) => {
    if (!Array.isArray(list) || list.length === 0) return patients;
    const existingIds = new Set(list.map(p => p.id));
    const missingSeeds = patients.filter(p => !existingIds.has(p.id));
    const merged = [...list, ...missingSeeds];

    return merged
        .filter(p => p && p.name && p.name.trim() !== "")
        .map(p => ({
            ...p,
            weight: (p.weight && p.weight !== "N/A") ? p.weight : (defaultWeights[p.id] || "70 kg")
        }));
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