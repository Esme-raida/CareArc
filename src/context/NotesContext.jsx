import { createContext, useState, useEffect } from "react";
import { notesData } from "../data/notesData.js";

//On load
const storedNotes = localStorage.getItem("carearc_notes");
const storedNotesObj = storedNotes ? JSON.parse(storedNotes) : null;

const getInitialNotes = () => {
    if (!storedNotesObj || !Array.isArray(storedNotesObj)) return notesData;
    const existingIds = new Set(storedNotesObj.map(n => n.id));
    const missing = notesData.filter(n => !existingIds.has(n.id));
    return [...storedNotesObj, ...missing];
};

export const NotesContext = createContext();

export default function NotesProvider({ children }) {
    const [notesArray, setNotesArray] = useState(getInitialNotes);

    useEffect(() => {
        //store item/notes in localStorage
        localStorage.setItem("carearc_notes", JSON.stringify(notesArray))
    }, [notesArray])

    return (
        <NotesContext.Provider value={{ notesArray, setNotesArray }}>{children}</NotesContext.Provider>
    )
}