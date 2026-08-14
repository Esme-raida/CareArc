export const getIndividualVitalStatus = (vitalRate, vital, thresholds) => {
    if (vitalRate == null || !thresholds[vital]) return "No Data";

    const min = thresholds[vital].min;
    const max = thresholds[vital].max;

    //Critical Condition
    if (vitalRate < min * 0.8 || vitalRate > max * 1.2) return "Critical";

    //Warning Condition
    if (vitalRate > max || vitalRate < min) return "Warning";
    return "Stable";
};