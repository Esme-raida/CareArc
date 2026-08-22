export default function ActionCards({ action, actionInfo }) {
    return (
            <div className="flex flex-col gap-2 border border-gray-200/60 shadow-sm rounded-2xl px-6 py-5 bg-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer transition-all duration-200">
                <header className="font-semibold text-gray-800">{action}</header>
                <span className="text-gray-500 text-sm">{actionInfo}</span>
            </div>
    )
} 