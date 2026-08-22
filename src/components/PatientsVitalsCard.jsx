import DeltaIndicator from "./DeltaIndicator";
export default function PatientsVitalsCard({ icon: Icon, iconColor, iconTextColor, vital, vitalName, vitalRate, unit, delta }) {


    return (
        <div className="flex flex-col gap-8 justify-between border border-gray-200/60 shadow-sm rounded-2xl w-full px-5 py-5 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <header className="text-gray-500 font-medium text-sm flex justify-between">
                <div className="flex gap-2.5 flex-col">
                    <Icon className={`w-9 h-9 p-2 rounded-xl ${iconColor} ${iconTextColor}`} />
                    <span className="text-gray-500">{vitalName}</span>
                </div>
            </header>
            <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-1.5">
                    <h2 className="font-bold text-2xl text-gray-900">{vitalRate}</h2>
                    <span className="text-gray-400 text-sm">{unit}</span>
                </div>
                <div className="flex">
                    {/* Getting the delta value for comparison...telling the user if the value is increasing or decreasing */}
                    <DeltaIndicator delta={delta} />
                </div>
            </div>
        </div>
    )
}