import { NavLink, useLocation } from "react-router-dom";

export default function IndividualNavLink({ to, end, name }) {
  const location = useLocation();

  const isDefaultSettingsTab =
    (location.pathname === "/dashboard/settings" || location.pathname === "/dashboard/settings/") &&
    to === "profile";

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => {
        const active = isActive || isDefaultSettingsTab;
        return [
          "px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0 transition flex items-center justify-center",
          active
            ? "bg-white text-blue-600 shadow-xs"
            : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
        ].join(" ");
      }}
    >
      <span>{name}</span>
    </NavLink>
  );
}
