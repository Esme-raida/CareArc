export default function DashboardCard({ icon: Icon, iconColor, cardTitle, action, children }) {
    return (
        <div className="flex flex-col border border-gray-200/60 shadow-sm rounded-2xl w-full gap-4 px-5 py-6 bg-white hover:shadow-md transition-all duration-200">
            <header className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2.5 items-center">
                    <div className="bg-gray-50 rounded-lg p-1.5">
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <h2 className="font-semibold text-gray-800">{cardTitle}</h2>
                </div>
                {action && <div>{action}</div>}
            </header>
            {children}
        </div>
    )
}