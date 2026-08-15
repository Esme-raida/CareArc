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
            <div className="flex flex-col border border-gray-200 shadow-sm rounded-xl w-full px-6 pt-8 pb-32 bg-white">
                <header className="flex flex-row gap-1">
                    <ActivityIcon className="h-7 w-7 p-1" />
                    <h2 className="font-semibold text-2xl">Vital Signs Normal Ranges</h2>
                </header>
                <span className="mb-8 text-gray-500">Set baseline clinical reference ranges for patient monitoring</span>

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
