import { NavLink, useLocation } from "react-router-dom";

export default function IndividualNavLink({ to, end, name, patientNotes }) {
  const location = useLocation();

  const isDefaultSettingsTab =
    (location.pathname === "/dashboard/settings" || location.pathname === "/dashboard/settings/") &&
    to === "profile";

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive || isDefaultSettingsTab
          ? "px-3 py-1.5 rounded-lg bg-white text-blue-600 font-semibold shadow-xs whitespace-nowrap"
          : "px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-black transition whitespace-nowrap"
      }
    >
      <span className="flex items-center gap-2">
        {name}

        {name === "Notes" && patientNotes && (
          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {patientNotes.length}
          </span>
        )}
      </span>
    </NavLink>
  );
}