export async function fetchClinicalSummary(patient, vitals, notes) {

    const latestVital = vitals && vitals.length > 0 ? vitals[vitals.length - 1] : null;
    await new Promise(resolve => setTimeout(resolve, 1200))
    return (
        {
            summary: `AI Clinical Assessment for ${patient?.name || "Patient"}: Vitals trajectories indicate physiological stability. Heart Rate is stable at ${latestVital?.heartRate || "--"} BPM and 
            Blood Oxygen is resting at ${latestVital?.oxygen || "--"}%.`,
            riskLevel: "Low",
            recommendations: ["Continue standard vitals checking schedule.",
                "Review patient comfort and fluid intake."
            ]

        }
    )
}