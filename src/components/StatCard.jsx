export default function StatCard ({cardLabel, CardValue, icon: Icon, iconColor}) {
    return (
        <div className="flex flex-row justify-between items-center border border-gray-200/60 shadow-sm rounded-2xl w-full px-6 py-7 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex flex-col gap-1">
                <h2 className="text-gray-500 text-sm font-medium">{cardLabel}</h2>
                <span className="font-bold text-3xl text-gray-900">{CardValue}</span>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
                <Icon className={`h-7 w-7 ${iconColor}`}/>
            </div>
        </div>
    )
}