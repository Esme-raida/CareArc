import { Link, useLocation } from "react-router-dom";

export default function IndividualPage({ Icon, name, to, onClick }) {
    const location = useLocation();

    // Determine if the current route is active
    const isActive = to === "/dashboard"
        ? location.pathname === "/dashboard"
        : location.pathname.startsWith(to);

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`group flex items-center gap-3 px-3.5 py-2.5 w-full rounded-xl transition-all duration-150 text-xs sm:text-sm ${
                isActive
                    ? "bg-blue-50 text-blue-700 font-semibold shadow-2xs"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
            }`}
        >
            {Icon && (
                <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                />
            )}
            <span className="truncate">{name}</span>
        </Link>
    );
}