import { useEffect, useState } from 'react';
import InputComponent from './InputComponent';
import useAppointments from '../hooks/useAppointments';
import usePatients from '../hooks/usePatients';

export default function AppointmentForm({ setAppointmentsList, setIsFormOpen, defaultPatientId = "" }) {

    const { patientsArray } = usePatients();
    const [formData, setFormData] = useState({
        patientId: defaultPatientId || "",
        type: "",
        time: "",
        duration: "",
        date: "",
    });

    //Code to prefill the ID
    useEffect(() => {
        if (defaultPatientId) {
            setFormData((prev) => ({
                ...prev, patientId: defaultPatientId,
            }));
        }
    }, [defaultPatientId]);

    return (
        <form
            className="fixed w-[75%] top-30 translate-x-[20%]"
            onSubmit={(e) => {
                e.preventDefault(); //prevent the default reload

                const patient = patientsArray.find(patient => patient.id === formData.patientId);

                //creates a new appointment object I can append to appointmentsList
                const newAppointment = {
                    ...formData,
                    name: patient ? patient.name : "Unknown Patient",
                    id: Date.now(),
                    isCompleted: false,
                };

                //newly added appointment to appear immediately without refreshing
                setAppointmentsList(prev => [...prev, newAppointment]);

                //resetting form details/UI to be blank now 
                setFormData({
                    patientId: "",
                    type: "",
                    time: "",
                    duration: "",
                    date: "",
                });

                setIsFormOpen(false) //recloses the form



            }} >
            <div className="flex flex-col w-full border border-gray-200 shadow-sm rounded-xl px-6 py-5 bg-white">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-2xl mb-5">New Patient Information</h2>
                </div>
                <div className="flex flex-col gap-4">
                    <InputComponent
                        label="Patient ID"
                        value={formData.patientId} //makes the input display what is in the input box
                        disabled
                    />

                    <InputComponent
                        label="Appointment Type"
                        placeholder="Consultation"
                        type="text"
                        value={formData.type}
                        onChange={(e) => {
                            setFormData({ ...formData, type: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Timing"
                        placeholder="9:00 AM"
                        type="time"
                        value={formData.time} //makes the input display what is in the input box
                        onChange={(e) => { //runs everytime the user types a character
                            setFormData({ ...formData, time: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Duration(minutes)"
                        placeholder="30"
                        type="number"
                        value={formData.duration} //makes the input display what is in the input box
                        onChange={(e) => { //runs everytime the user types a character
                            setFormData({ ...formData, duration: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Date"
                        placeholder="2026-02-25"
                        type="date"
                        value={formData.date}
                        onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                        }}
                    />
                </div>

                <button type="submit"
                    className="border rounded-md border-gray-300 bg-blue-500 text-white py-1 mt-5"> Submit
                </button>
            </div>

        </form>
    )
}