import { useState, useEffect } from "react";
import { X, Sparkles, Copy, Printer, Check } from "lucide-react";
import { fetchClinicalSummary } from "../services/aiServices";

export default function AISummaryModal({ patient, vitalsArray, notesArray, setIsAIModalOpen, onClose }) {

    const [loading, setLoading] = useState(true); //sets the modal to show the loading animation while the AI  
    const [summaryData, setSummaryData] = useState(null); //starts as null and holds the SBAR Object once fetchClinicalSummary finishes
    const [copied, setCopied] = useState(false); //starts as false, and  toggles to true for 2 seconds when the user clicks "Copy SBAR"




    useEffect(() => {
        async function getSummary() {
            setLoading(true);
            try {
                const data = await fetchClinicalSummary(patient, vitalsArray, notesArray);
                setSummaryData(data);
            } catch (error) {
                console.error("AI Clinical Summary Error:", error);
            } finally {
                setLoading(false);
            }
        }

        if (patient) {
            getSummary();
        }
    }, [patient, vitalsArray, notesArray]);

    const handleCopy = () => { //this function will be triggered whenever the user clicks Copy SBAR button
        if (!summaryData) return; //if summary Data hasn't loaded yet, return 

        const formattedSBAR = `
        SBAR CLINICAL SUMMARY - ${patient.name}\n
        Risk Level: ${summaryData.riskLevel}\n 

        SITUATION: ${summaryData.sbar.situation}\n
        BACKGROUND: ${summaryData.sbar.background}\n
        ASSESSMENT: ${summaryData.sbar.assessment}\n
        RECOMMENDATION: ${summaryData.sbar.recommendation}\n
        `
        //navigator.clipboard is the browser's built-in tool that talks to your operating system's clipboard memory
        //writeText automatically copies our formatted text string into memory just like pressing ctrl + C
        navigator.clipboard.writeText(formattedSBAR);
        setCopied(true); //updates the copy state to show the green checkmark for 2 seconds
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}


                <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight">AI Clinical Health Summary</h2>
                            <span className="text-slate-400 text-xs">CareArc Intelligence Engine • SBAR Handover</span>
                        </div>
                    </div>
                    <button onClick={() => setIsAIModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/*Modal Body*/}
                <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    {loading ? (
                        /*Loading Skeleton State */
                        <div className="space-y-4 py-8 animate-pulse">
                            <div className="h-10 bg-slate-100 rounded-xl w-3/4"></div>
                            <div className="h-24 bg-slate-100 rounded-xl"></div>
                            <div className="h-24 bg-slate-100 rounded-xl"></div>
                        </div>
                    ) : summaryData ? (
                        <>
                            {/* Risk Stratification Badge */}
                            <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50 border-slate-200">
                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Triage Acuity Risk</span>
                                    <span className={`inline-block mt-1 px-3 py-1 text-xs font-bold rounded-full border ${summaryData.riskBadgeColor}`}>
                                        {summaryData.riskLevel}
                                    </span>
                                </div>
                                <div className="text-right text-xs text-slate-400 font-mono">
                                    Generated: {new Date(summaryData.generatedAt).toLocaleTimeString()}
                                </div>
                            </div>

                            {/* Key Insights List */}
                            <div className="space-y-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Vital Trajectory Insights</h3>
                                <ul className="space-y-1.5 pl-2">
                                    {summaryData.keyInsights.map((insight, idx) => (
                                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                                            <span>{insight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* SBAR Grid */}
                            <div className="space-y-3 pt-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">SBAR Structured Handover</h3>

                                {/*SBAR Situation*/}
                                <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
                                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">S — Situation</span>
                                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{summaryData.sbar.situation}</p>
                                </div>

                                {/*SBAR Situation*/}
                                <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl">
                                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">B — Background</span>
                                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{summaryData.sbar.background}</p>
                                </div>

                                {/*SBAR ASSESSMENT*/}
                                <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl">
                                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">A - Assessment</span>
                                    <p className="text-sm text-amber-800 mt-1 leading-relaxed">{summaryData.sbar.assessment}</p>
                                </div>

                                {/*SBAR Situation*/}
                                <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">R — Recommendation </span>
                                    <p className="text-sm text-emerald-800 mt-1 leading-relaxed">{summaryData.sbar.recommendation}</p>
                                </div>
                            </div>

                        </>
                    ) : null}
                </div>
                <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-between items-center">
                    <button onClick={() => setIsAIModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer">
                        Close
                    </button>
                    <div className="flex gap-2">
                        <button onClick={handleCopy} className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition cursor-pointer">
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied SBAR!" : "Copy SBAR"}
                        </button>
                        <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition cursor-pointer">
                            <Printer className="w-4 h-4" />
                            Print Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}