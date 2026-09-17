import { useState } from "react";
import InputComponent from './InputComponent';
import useAuth from "../hooks/useAuth";


export default function RecordVitalsForm({ setIsVitalFormOpen, setVitalsArray, patientId }) {

    const { user } = useAuth();
    const [formData, setFormData] = useState({
        heartRate: "",
        systolic: "",
        diastolic: "",
        oxygen: "",
        temperature: "",
        respiratoryRate: "",
        recordedBy: ""
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        const newVitals = {
            id: `VIT-${Date.now()}`, // A unique ID for the new vital
            patientId: patientId,
            timestamp: new Date().toISOString(), //the date the vital was recorded

            heartRate: Number(formData.heartRate), //converting the string to a number 
            bloodPressure: {
                systolic: Number(formData.systolic), //converting the string to a number 
                diastolic: Number(formData.diastolic), //converting the string to a number 
            },
            oxygen: Number(formData.oxygen), //converting the string to a number 
            temperature: Number(formData.temperature), //converting the string to a number 
            respiratoryRate: Number(formData.respiratoryRate), //converting the string to a number 
            recordedBy: user?.name || "Clinical Staff" //the staff or doctor who recorded the vital
        }

        setVitalsArray(prev => [...prev, newVitals]);
        setFormData({
            heartRate: "",
            systolic: "",
            diastolic: "",
            oxygen: "",
            temperature: "",
            respiratoryRate: "",
            recordedBy: ""
        });
        setIsVitalFormOpen(false);

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex flex-col gap-4 px-6 py-5 overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
                    <h2 className="font-semibold text-xl">Record Vitals</h2>
                    <button
                        type="button"
                        onClick={() => setIsVitalFormOpen(false)}
                        className="text-gray-400 hover:text-gray-600 font-bold"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <InputComponent
                        label="Heart Rate"
                        placeholder="72 BPM"
                        type="number"
                        value={formData.heartRate}
                        onChange={(e) => {
                            setFormData({ ...formData, heartRate: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Systolic BP"
                        placeholder="120 mmHg"
                        type="number"
                        value={formData.systolic}
                        onChange={(e) => {
                            setFormData({ ...formData, systolic: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Diastolic BP"
                        placeholder="80 mmHg"
                        type="number"
                        value={formData.diastolic}
                        onChange={(e) => {
                            setFormData({ ...formData, diastolic: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Oxygen Rate"
                        placeholder="98%"
                        type="number"
                        value={formData.oxygen}
                        onChange={(e) => {
                            setFormData({ ...formData, oxygen: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Temperature"
                        placeholder="36.5°C"
                        type="number"
                        value={formData.temperature}
                        onChange={(e) => {
                            setFormData({ ...formData, temperature: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Respiratory Rate"
                        placeholder="18"
                        type="number"
                        value={formData.respiratoryRate}
                        onChange={(e) => {
                            setFormData({ ...formData, respiratoryRate: e.target.value });
                        }}
                    />

                    <InputComponent
                        label="Recorded By"
                        placeholder="Nurse Fatima"
                        type="text"
                        value={formData.recordedBy || user?.name}
                        disabled={true} //can't be edited  by the user
                    />


                    <div className="flex flex-row justify-end gap-3 mt-4 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsVitalFormOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition"
                        >
                            Add Vitals
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
