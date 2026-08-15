import { useState, useEffect } from "react";
import { Building2, ShieldCheck, CheckCircle2, Activity, PhoneCall, Mail, MapPin, BedDouble, Plus, X, Clock, Sparkles } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Profile() {
    const defaultData = {
        facilityName: "CareArc Clinical Intelligence Center",
        unitName: "Ward 4B — Acute & Intensive Care Unit",
        facilityId: "FAC-4B-LAGOS",
        emergencyPhone: "+234 (0) 800-227-3272",
        primaryEmail: "ward4b@carearc-health.com",
        address: "Block 4, Medical Center Drive, Victoria Island, Lagos",
        bedCapacity: "24 Inpatient Beds",
        activeProtocol: "Longitudinal Vitals & AI Delta Synthesis Protocol",
        vitalsInterval: "4 hours",
        deltaEngineWindow: "12 hours",
        aiModel: "GPT-4o-mini Clinical Engine",
        autoHandover: true,
        criticalAlertEscalation: true,
        specialties: [
            "Cardiovascular Care",
            "Respiratory Symptoms Monitoring",
            "Post-Op Recovery Trajectory",
            "Hypertension & Diabetes Oversight",
            "Acute Observation",
        ]
    };

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("carearc_facility_profile");
        return saved ? JSON.parse(saved) : defaultData;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [newSpecialty, setNewSpecialty] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleSave = (e) => {
        if (e) e.preventDefault();
        localStorage.setItem("carearc_facility_profile", JSON.stringify(profile));
        setIsEditing(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    };

    const handleAddSpecialty = () => {
        if (newSpecialty.trim() && !profile.specialties.includes(newSpecialty.trim())) {
            setProfile(prev => ({
                ...prev,
                specialties: [...prev.specialties, newSpecialty.trim()]
            }));
            setNewSpecialty("");
        }
    };

    const handleRemoveSpecialty = (specialtyToRemove) => {
        setProfile(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== specialtyToRemove)
        }));
    };

    return (
        <main className="relative pb-10">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-700 text-white px-5 py-3.5 rounded-xl shadow-2xl transition-all animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                    <div>
                        <p className="font-semibold text-sm">Facility Settings Saved</p>
                        <p className="text-xs text-emerald-100">CareArc clinical unit configuration has been updated.</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSave}>
                <section className="grid grid-cols-1 md:grid-cols-[340px_1fr] lg:grid-cols-[380px_1fr] gap-6">
                    
                    {/* Facility Summary Card */}
                    <div className="border border-gray-200 shadow-sm rounded-2xl p-6 bg-white flex flex-col justify-between">
                        <div>
                            <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md mb-4">
                                    <Building2 className="w-10 h-10" />
                                </div>
                                <h2 className="font-bold text-xl text-gray-900 leading-tight">
                                    {profile.facilityName}
                                </h2>
                                <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 border border-blue-100">
                                    {profile.unitName}
                                </p>
                                <span className="text-xs text-gray-400 mt-2 font-mono">
                                    ID: {profile.facilityId}
                                </span>
                            </div>

                            <div className="flex flex-col gap-4 mt-6 text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <PhoneCall className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span className="font-medium text-gray-800">{profile.emergencyPhone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span className="truncate text-gray-800">{profile.primaryEmail}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                                    <span className="text-xs text-gray-600 leading-snug">{profile.address}</span>
                                </div>
                                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                                    <BedDouble className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <span className="font-semibold text-gray-700">{profile.bedCapacity}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-2xl flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                Clinical Node Active
                            </span>
                            <span className="font-mono">v2.4 CareArc</span>
                        </div>
                    </div>

                    {/* Facility & Clinical Workspace Configuration */}
                    <div className="flex flex-col gap-6">
                        <div className="border border-gray-200 shadow-sm rounded-2xl p-6 bg-white">
                            <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-100">
                                <div>
                                    <h2 className="font-bold text-xl text-gray-900">Clinical Unit & Facility Information</h2>
                                    <p className="text-xs text-gray-500">Configure center parameters, ward location, and clinical contacts</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                    {isEditing ? "Lock Editing" : "Edit Details"}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Facility Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={profile.facilityName}
                                        onChange={(e) => setProfile({ ...profile, facilityName: e.target.value })}
                                        className="w-full border border-gray-300 disabled:bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Ward / Unit Name</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={profile.unitName}
                                        onChange={(e) => setProfile({ ...profile, unitName: e.target.value })}
                                        className="w-full border border-gray-300 disabled:bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Emergency Escalation Phone</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={profile.emergencyPhone}
                                        onChange={(e) => setProfile({ ...profile, emergencyPhone: e.target.value })}
                                        className="w-full border border-gray-300 disabled:bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Primary Clinical Email</label>
                                    <input
                                        type="email"
                                        disabled={!isEditing}
                                        value={profile.primaryEmail}
                                        onChange={(e) => setProfile({ ...profile, primaryEmail: e.target.value })}
                                        className="w-full border border-gray-300 disabled:bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-600 mb-1">Facility Address</label>
                                    <input
                                        type="text"
                                        disabled={!isEditing}
                                        value={profile.address}
                                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        className="w-full border border-gray-300 disabled:bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Managed Clinical Specialties & Focus Areas */}
                        <div className="border border-gray-200 shadow-sm rounded-2xl p-6 bg-white">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                                <ShieldCheck className="w-6 h-6 text-blue-600" />
                                <div>
                                    <h2 className="font-bold text-lg text-gray-900">Ward Clinical Capabilities & Specialties</h2>
                                    <p className="text-xs text-gray-500">Active medical focus areas managed within this facility unit</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {profile.specialties.map((spec, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 font-medium px-3 py-1.5 rounded-lg text-xs"
                                    >
                                        {spec}
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSpecialty(spec)}
                                                className="text-blue-400 hover:text-red-600 transition"
                                            >
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {isEditing && (
                                <div className="flex gap-2 max-w-md mt-3">
                                    <input
                                        type="text"
                                        placeholder="Add new clinical specialty..."
                                        value={newSpecialty}
                                        onChange={(e) => setNewSpecialty(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSpecialty(); } }}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddSpecialty}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Longitudinal Patient Monitoring Protocols */}
                        <div className="border border-gray-200 shadow-sm rounded-2xl p-6 bg-white">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                                <div>
                                    <h2 className="font-bold text-lg text-gray-900">Patient Intelligence & Delta Protocols</h2>
                                    <p className="text-xs text-gray-500">Automated parameters for patient vitals trajectory and AI synthesis</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-blue-500" /> Standard Vitals Check Schedule
                                    </span>
                                    <select
                                        disabled={!isEditing}
                                        value={profile.vitalsInterval}
                                        onChange={(e) => setProfile({ ...profile, vitalsInterval: e.target.value })}
                                        className="bg-white border border-gray-300 rounded-md px-2.5 py-1 text-xs font-semibold text-gray-800 disabled:bg-transparent disabled:border-none focus:outline-none"
                                    >
                                        <option value="1 hour">Every 1 Hour (High Acuity)</option>
                                        <option value="2 hours">Every 2 Hours</option>
                                        <option value="4 hours">Every 4 Hours (Standard)</option>
                                        <option value="8 hours">Every 8 Hours</option>
                                    </select>
                                </div>

                                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col gap-1">
                                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                                        <Activity className="w-3.5 h-3.5 text-indigo-500" /> Delta Engine Trajectory Window
                                    </span>
                                    <select
                                        disabled={!isEditing}
                                        value={profile.deltaEngineWindow}
                                        onChange={(e) => setProfile({ ...profile, deltaEngineWindow: e.target.value })}
                                        className="bg-white border border-gray-300 rounded-md px-2.5 py-1 text-xs font-semibold text-gray-800 disabled:bg-transparent disabled:border-none focus:outline-none"
                                    >
                                        <option value="6 hours">6 Hours Window</option>
                                        <option value="12 hours">12 Hours Window (Recommended)</option>
                                        <option value="24 hours">24 Hours Window</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Save Action Footer */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 hover:scale-[1.02]"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        Save Facility Settings
                    </button>
                </div>
            </form>
        </main>
    );
}