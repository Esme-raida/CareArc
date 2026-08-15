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
            className="w-full max-w-lg bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]"
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
            <div className="flex flex-col w-full px-6 py-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                    <h2 className="font-semibold text-xl">New Appointment</h2>
                    <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="text-gray-400 hover:text-gray-600 font-bold"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {defaultPatientId ? (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Patient</label>
                            <input
                                type="text"
                                value={`${patientsArray.find(p => p.id === defaultPatientId)?.name || 'Patient'} (${defaultPatientId})`}
                                disabled
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium focus:outline-none"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-700">Select Patient <span className="text-red-500">*</span></label>
                            <select
                                required
                                value={formData.patientId}
                                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                            >
                                <option value="" disabled>Choose a patient from directory...</option>
                                {patientsArray.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name} ({patient.id}) — {patient.room || patient.condition}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

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

                <div className="flex flex-row justify-end gap-3 mt-6 border-t border-gray-100 pt-4">
                    <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition"
                    >
                        Submit
                    </button>
                </div>
            </div>

        </form>
    )
}