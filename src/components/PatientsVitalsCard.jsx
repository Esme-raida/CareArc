import DeltaIndicator from "./DeltaIndicator";

export default function PatientsVitalsCard({ icon: Icon, iconColor, iconTextColor, vital, vitalName, vitalRate, unit, delta }) {
    return (
        <div className="flex flex-col gap-5 sm:gap-6 justify-between border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-5 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <header className="text-gray-500 font-medium text-sm flex justify-between items-start">
                <div className="flex gap-2 sm:gap-2.5 flex-col">
                    <Icon className={`w-8 h-8 sm:w-9 sm:h-9 p-1.5 sm:p-2 rounded-xl ${iconColor} ${iconTextColor}`} />
                    <span className="text-gray-500 font-medium text-xs sm:text-sm">{vitalName}</span>
                </div>
            </header>
            <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                    <div className="flex items-baseline gap-1.5">
                        <h2 className="font-bold text-xl sm:text-2xl text-gray-900">{vitalRate}</h2>
                        <span className="text-gray-400 text-xs sm:text-sm font-medium">{unit}</span>
                    </div>
                    <div className="flex shrink-0">
                        <DeltaIndicator delta={delta} />
                    </div>
                </div>
            </div>
        </div>
    );
}