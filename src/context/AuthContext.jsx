import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

//Mock account presets for testing different roles

export const MOCK_USERS = {
    doctor: {
        id: "U001",
        name: "Dr. Fatima Adam",
        role: "doctor",
        title: "Attending Physician • Cardiology",
        avatar: "FA"
    },
    nurse: {
        id: "U002",
        name: "Alex Attah, RN",
        role: "nurse",
        title: "Senior Charge Nurse",
        avatar: "AR"
    },
    records: {
        id: "U003",
        name: " John Lee",
        role: "records",
        title: "Health Records Administrator",
        avatar: "JL"
    }
}


//Action functions....login and logout

export default function AuthProvider({ children }) {
    //To sync the user changes for whenever the user changes or when the app loads
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("carearc_user");
        return stored ? JSON.parse(stored) : MOCK_USERS.doctor;
    });


    //Automatically sync state changes to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem("carearc_user", JSON.stringify(user));
        }
        else {
            localStorage.removeItem("carearc_user");
        }
    }, [user]);

    const login = (roleKey) => {
        //setting the role user to doctor by default if no role selcted
        const selectedUser = MOCK_USERS[roleKey] || MOCK_USERS.doctor;
        setUser(selectedUser);
    };

    const logout = () => {
        setUser(null);
    }

    //Permission Helper Flags
    const isDoctor = user?.role === "doctor";
    const isNurse = user?.role === "nurse";
    const isRecords = user?.role === "records";


    const canBookAppointments = isNurse || isRecords;
    const canRegisterNewPatient = isNurse || isRecords;
    const canAccessClinicalNotes = isDoctor || isNurse;

    return (
        <AuthContext.Provider
            value={{
                user, login, logout, isDoctor, isNurse, isRecords,
                canAccessClinicalNotes, canRegisterNewPatient, canBookAppointments
            }}>
            {children}
        </AuthContext.Provider>
    )


}