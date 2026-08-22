export default function DeltaIndicator({ delta }) {
    if (!delta) return null;

    const { change, percentChange, direction, severity, unit } = delta;

    const arrow = delta.direction === "increasing" ? "↑" : delta.direction === "decreasing" ? "↓" : "→";
    const sign = delta.change > 0 ? "+" : "";


    let badgeStyle;
    if (severity === "significant" && direction === "increasing") {
        badgeStyle = "text-red-700 border border-red-200 bg-red-50";
    } else if (severity === "significant" && direction === "decreasing") {
        badgeStyle = "text-green-700 border border-green-200 bg-green-50";
    } else if (severity === "moderate") {
        badgeStyle = "text-amber-700 border border-amber-200 bg-amber-50"
    } else if (severity === "minimal") {
        badgeStyle = "text-slate-700 border border-slate-200 bg-white";
    } else
        badgeStyle = "text-slate-700 border border-slate-200 bg-white";

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyle}`}>{arrow}{sign}{change} {unit} </span>
    )
}
