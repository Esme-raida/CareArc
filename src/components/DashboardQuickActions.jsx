export default function DashboardQuickActions( {quickActionTitle, icon: Icon} ) {
    return (
        <div className="flex flex-row items-center border border-gray-200/60 shadow-sm rounded-xl w-full gap-2.5 px-4 py-3.5 bg-white hover:bg-blue-50 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200">
            <div className="bg-blue-50 rounded-lg p-1.5">
                <Icon className="h-5 w-5 text-blue-600"/>
            </div>
            <span className="font-semibold text-sm text-gray-700"> {quickActionTitle} </span>
        </div>
    )
}