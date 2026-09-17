import { ActivityIcon } from "lucide-react";
import VitalSigns from "../components/VitalSigns";
import SaveChanges from "../components/SaveChanges";
import useThresholds from "../hooks/useThreshold";

export default function Thresholds() {

    //This is saying give me the current thresholds and the function that can change them.”
    const { thresholds, setThresholds } = useThresholds();

    const updateThreshold = (vital, type, value) => {
        setThresholds((prev) => ({
            ...prev, [vital]: {
                ...prev[vital],
                [type]: Number(value)
            }
        }));
    };
    return (

        <section className="min-w-0">
            {/* Vital Signs Threshold */}
            <div className="flex flex-col border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-6 md:p-8 pb-24 sm:pb-32 bg-white">
                <header className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 shrink-0 shadow-2xs">
                        <ActivityIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                            Vital Signs Normal Ranges
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Set baseline clinical reference ranges for telemetry and alerting thresholds</p>
                    </div>
                </header>

                <div className="flex flex-col gap-6">
                    {/*Heart Rate*/}
                    <VitalSigns
                        vital="heartRate"
                        vitalname="Heart Rate"
                        vitalsymbol="bpm"
                        label1="Low Threshold"
                        inputValue1={thresholds.heartRate.min}
                        label2="High Threshold"
                        inputValue2={thresholds.heartRate.max}
                        onThresholdChange={updateThreshold} />

                    {/*Blood Pressure*/}
                    <VitalSigns
                        vital="bloodPressure"
                        vitalname="Blood Pressure"
                        vitalsymbol="mmHg"
                        label1="Systolic Low"
                        inputValue1={thresholds.bloodPressure.systolicMin}
                        label2="Systolic High"
                        inputValue2={thresholds.bloodPressure.systolicMax}
                        onThresholdChange={updateThreshold} />

                    {/*OXYGEN SATURATION*/}
                    <VitalSigns
                        vital="oxygen"
                        vitalname="Oxygen Saturation"
                        vitalsymbol="%"
                        label1="Critical Threshold"
                        inputValue1={thresholds.oxygen.min}
                        label2="Warning Threshold"
                        inputValue2={thresholds.oxygen.max}
                        onThresholdChange={updateThreshold} />

                    {/*Temperature*/}
                    <VitalSigns
                        vital="temperature"
                        vitalname="Temperature"
                        vitalsymbol="deg C"
                        label1="Low Threshold"
                        inputValue1={thresholds.temperature.min}
                        label2="High Threshold"
                        inputValue2={thresholds.temperature.max}
                        onThresholdChange={updateThreshold} />
                </div>
            </div>
            <SaveChanges />
        </section>
    );
}
