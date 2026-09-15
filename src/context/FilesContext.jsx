import { createContext, useState, useEffect, use } from "react";
import { initialFiles } from "../data/filesData.js";

//On Load
const storedFiles = localStorage.getItem("carearc_files");
const storedFilesObj = storedFiles ? JSON.parse(storedFiles) : null;

export const FilesContext = createContext();


export default function FilesProvider({ children }) {
    //Start with the initial files 
    const [filesArray, setFilesArray] = useState(storedFilesObj ? storedFilesObj : initialFiles);


    // Automatically save whenever a new file is uploaded
    useEffect(() => {
        localStorage.setItem("carearc_files", JSON.stringify(filesArray));
    }, [filesArray]);
    // A helper function for adding files
    const addFile = (newFile) => {
        const fileWithId = {
            id: `FILE-${Date.now()}`,
            uploadedAt: new Date().toISOString(),
            ...newFile,
        };
        setFilesArray((prev) => [fileWithId, ...prev]);
    };
    return (
        <FilesContext.Provider value={{ filesArray, setFilesArray, addFile }}>
            {children}
        </FilesContext.Provider>
    );
}