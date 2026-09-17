import { useState } from "react";
import InputComponent from "../components/InputComponent";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import usePatients from "../hooks/usePatients";
import useVitals from "../hooks/useVitals";
import { UserPlus, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function AddPatientPage() {

    const { patientsArray, setPatientsArray } = usePatients();
    const { setVitalsArray } = useVitals();

    const generatePatientId = (patientsArray) => {
        if (patientsArray.length === 0) return "PAT-0001";

        //To be able to update it, I have to get just the digits
        const numbers = patientsArray.map(patient => Number(patient.id.split("-")[1]));

        //Then I will find the highest existing number
        const maxNummber = Math.max(...numbers);

        //Add 1 to the highest number 
        const nextDigit = maxNummber + 1;

        //Then I will pad with zeros once again
        const nextNumber = String(nextDigit).padStart(4, "0");

        return `PAT-${nextNumber}`;
    };

    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        room: "",
        condition: "",
        status: "",
        admitted: "",
        heartRate: "",
        systolic: "",
        diastolic: "",
        oxygen: "",
        temperature: "",
        respiratoryRate: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // creating a new ID
        const newId = generatePatientId(patientsArray);

        const newPatientData = {
            id: newId,
            name: formData.name,
            age: formData.age,
            gender: formData.gender,
            weight: formData.weight,
            room: formData.room,
            condition: formData.condition,
            status: formData.status,
            admitted: formData.admitted,
        };

        const newVitals = {
            patientId: newPatientData.id,
            heartRate: formData.heartRate,
            bloodPressure: { systolic: formData.systolic, diastolic: formData.diastolic },
            oxygen: formData.oxygen,
            temperature: formData.temperature,
            respiratoryRate: formData.respiratoryRate,
            timestamp: new Date().toISOString()
        };

        setVitalsArray(prev => [...prev, newVitals]);
        setPatientsArray(prev => [...prev, newPatientData]);

        setFormData({
            name: "",
            age: "",
            gender: "",
            weight: "",
            room: "",
            condition: "",
            status: "",
            admitted: "",
            heartRate: "",
            systolic: "",
            diastolic: "",
            oxygen: "",
            temperature: "",
            respiratoryRate: ""
        });

        setShowToast(true);
        setTimeout(() => navigate("/dashboard/patients"), 800);
    };

    return (
        <main className="min-h-screen px-3.5 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-5xl mx-auto">
            {showToast && <Toast statement="Patient Added Successfully!" />}

            {/* Modern Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <header className="flex items-center gap-3">
                    <div className="p-2.5 sm:p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <UserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Add New Patient</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Register a new patient into the clinical management system</p>
                    </div>
                </header>
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/patients")}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-xs sm:text-sm font-semibold transition self-start sm:self-auto shadow-2xs"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Directory</span>
                </button>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200/70 rounded-2xl p-5 sm:p-8 shadow-2xs flex flex-col gap-8">
                
                {/* Basic Information */}
                <section>
                    <div className="border-b border-gray-100 pb-2 mb-4">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">Basic Information</h3>
                        <p className="text-xs text-gray-500">Demographics and personal identification</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputComponent
                            label="Full Name"
                            type="text"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <InputComponent
                            label="Age"
                            type="text"
                            placeholder="e.g. 45"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <InputComponent
                            label="Gender"
                            type="text"
                            placeholder="e.g. Male / Female"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                        <InputComponent
                            label="Weight"
                            type="text"
                            placeholder="e.g. 72kg or 160lbs"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        />
                    </div>
                </section>

                {/* Clinical Info */}
                <section>
                    <div className="border-b border-gray-100 pb-2 mb-4">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">Clinical Placement & Admission</h3>
                        <p className="text-xs text-gray-500">Ward allocation and primary clinical status</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputComponent
                            label="Room / Ward"
                            type="text"
                            placeholder="e.g. ICU-101 or Ward 4B"
                            value={formData.room}
                            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                        />
                        <InputComponent
                            label="Primary Condition"
                            type="text"
                            placeholder="e.g. Hypertension, Pneumonia"
                            value={formData.condition}
                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        />
                        <InputComponent
                            label="Status"
                            type="text"
                            placeholder="e.g. Stable, Critical, Recovering"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        />
                        <InputComponent
                            label="Admission Date"
                            type="date"
                            placeholder=""
                            value={formData.admitted}
                            onChange={(e) => setFormData({ ...formData, admitted: e.target.value })}
                        />
                    </div>
                </section>

                {/* Initial Baseline Vitals */}
                <section>
                    <div className="border-b border-gray-100 pb-2 mb-4">
                        <h3 className="font-bold text-base sm:text-lg text-gray-900">Baseline Vitals</h3>
                        <p className="text-xs text-gray-500">Initial vitals recorded upon intake</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InputComponent
                            label="Heart Rate (BPM)"
                            type="text"
                            placeholder="e.g. 78"
                            value={formData.heartRate}
                            onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                        />
                        <InputComponent
                            label="Systolic BP (mmHg)"
                            type="text"
                            placeholder="e.g. 120"
                            value={formData.systolic}
                            onChange={(e) => setFormData({ ...formData, systolic: e.target.value })}
                        />
                        <InputComponent
                            label="Diastolic BP (mmHg)"
                            type="text"
                            placeholder="e.g. 80"
                            value={formData.diastolic}
                            onChange={(e) => setFormData({ ...formData, diastolic: e.target.value })}
                        />
                        <InputComponent
                            label="Oxygen Saturation (%)"
                            type="text"
                            placeholder="e.g. 98"
                            value={formData.oxygen}
                            onChange={(e) => setFormData({ ...formData, oxygen: e.target.value })}
                        />
                        <InputComponent
                            label="Temperature (°C)"
                            type="text"
                            placeholder="e.g. 36.8"
                            value={formData.temperature}
                            onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                        />
                        <InputComponent
                            label="Respiratory Rate (/min)"
                            type="text"
                            placeholder="e.g. 16"
                            value={formData.respiratoryRate}
                            onChange={(e) => setFormData({ ...formData, respiratoryRate: e.target.value })}
                        />
                    </div>
                </section>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/patients")}
                        className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white px-6 py-2.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm font-semibold cursor-pointer"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Register Patient</span>
                    </button>
                </div>
            </form>
        </main>
    );
}