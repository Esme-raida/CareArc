import { createContext, useState, useEffect } from "react";
import { vitalsData } from "../data/vitalsData.js";

//On load, checks localstorage for stored vitals/entries
const storedVitals = localStorage.getItem("carearc_vitals");
const storedVitalsObj = storedVitals ? JSON.parse(storedVitals) : null;

const getInitialVitals = () => {
    if (!storedVitalsObj || !Array.isArray(storedVitalsObj)) return vitalsData;
    const existingIds = new Set(storedVitalsObj.map(v => v.id));
    const missing = vitalsData.filter(v => !existingIds.has(v.id));
    return [...storedVitalsObj, ...missing];
};

export const VitalsContext = createContext();

export default function VitalsProvider({ children }) {

    const [vitalsArray, setVitalsArray] = useState(getInitialVitals);
    //On change, this will run whenever vitalsArray changes
    useEffect(() => {
        localStorage.setItem("carearc_vitals", JSON.stringify(vitalsArray))
    }, [vitalsArray])

    return (
        <VitalsContext.Provider value={{ vitalsArray, setVitalsArray }}>{children}</VitalsContext.Provider>
    )
}