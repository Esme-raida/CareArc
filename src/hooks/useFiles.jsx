import { use, useContext } from "react";
import { FilesContext } from "../context/FilesContext.jsx";

export default function useFiles() {
    return useContext(FilesContext);
}