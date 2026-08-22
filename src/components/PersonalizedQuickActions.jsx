export default function PersonalizedQuickActions ({ icon:Icon, quickActionTitle }) {
    return (
        <div className="flex gap-2.5 items-center border border-gray-200/60 px-3.5 py-2 font-semibold text-sm text-gray-700 rounded-xl bg-white hover:bg-blue-600 cursor-pointer hover:text-white hover:border-blue-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <Icon className="w-4.5 h-4.5" />
            <span>{quickActionTitle}</span>
        </div>
    )
}