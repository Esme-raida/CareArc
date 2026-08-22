export const getStatus = (latestVitals, thresholds) => {
    if (!latestVitals) return "No Data";

    const hasCritical = Object.keys(latestVitals).some((vital) => {
        if (!thresholds[vital]) return false;
        const value = latestVitals[vital];
        const min = thresholds[vital].min;
        const max = thresholds[vital].max;

        if (value == null) return false;
        return (value < min * 0.8 || value > max * 1.2) //way outside normal range
    });

    const hasWarning = Object.keys(latestVitals).some(vital => {
        if (!thresholds[vital]) return false;

        const value = latestVitals[vital];
        const min = thresholds[vital].min;
        const max = thresholds[vital].max;

        if (value == null) return false;
        return (value < min || value > max)   //slightly outside the normal range
    })

    //FINAL DECISION LOGIC 
    if (hasCritical) return "Critical";
    if (hasWarning) return "Warning";
    return "Stable";
}

export const statusDotStyles = {
    Review: "bg-red-500",
    Watch: "bg-amber-500",
    Improving: "bg-emerald-500",
    Stable: "bg-blue-500",
    "No Data": "bg-gray-300"
};

