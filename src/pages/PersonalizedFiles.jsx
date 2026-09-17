import { useState, useContext } from "react";
import { PatientDetailContext } from "../context/PatientsDetailContext";
import useFiles from "../hooks/useFiles";
import { FileText, Image, ExternalLink } from "lucide-react";


export default function PersonalizedFiles() {
    const { patient } = useContext(PatientDetailContext);
    const { filesArray } = useFiles();
    const patientFiles = filesArray.filter((file) => file.patientId === patient?.id);
    const [selectedFileForPreview, setSelectedFileForPreview] = useState(null);

    return (
        <div className="flex flex-col gap-2 border border-gray-200/60 shadow-sm rounded-2xl w-full p-4 sm:p-6 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                <header className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    <h1 className="text-base sm:text-lg font-bold text-gray-800">
                        Medical Files & Diagnostic Reports
                    </h1>
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60 rounded-full shrink-0">
                        {patientFiles.length} {patientFiles.length === 1 ? "File" : "Files"}
                    </span>
                </header>
            </div>

            {/* 2. The Condition (Empty vs. List) */}
            {patientFiles.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                    <p className="font-semibold text-gray-600">No medical files uploaded yet</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Lab reports, imaging scans, and doctor notes attached to this patient will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {patientFiles.map((file) => (
                        <div key={file.id} className="p-4 rounded-xl border border-gray-200/80 bg-slate-50/40 
                        hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all flex flex-col justify-between gap-3">

                            {/*Title + Category Pill */}
                            <div>
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-sm font-bold text-gray-800">{file.title}</h3>
                                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full border bg-blue-50 text-blue-500 border-blue-200 shrink-0">
                                        {file.category}
                                    </span>
                                </div>
                                <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">
                                    {file.fileName} • {file.fileSize}
                                </span>
                            </div>

                            {/*Clinical Findings/summary */}
                            {file.summary && (
                                <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-gray-100 leading-relaxed">
                                    <span className="font-semibold text-slate-700">Findings: </span>
                                    {file.summary}
                                </p>
                            )}
                            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                                <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                                <span>{file.uploadedBy}</span>
                                {/* Click to open preview */}
                                <button
                                    onClick={() => setSelectedFileForPreview(file)}
                                    className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-md transition"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                    {selectedFileForPreview && (
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-5 flex flex-col gap-4 max-h-[90vh]">
                                {/* Modal Header */}
                                <div className="flex justify-between items-center border-b pb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">
                                            {selectedFileForPreview.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {selectedFileForPreview.category} • {selectedFileForPreview.fileName}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFileForPreview(null)}
                                        className="text-gray-400 hover:text-gray-600 text-lg p-1"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Document / Image Viewer */}
                                <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-50 rounded-lg p-2 min-h-[300px]">
                                    {selectedFileForPreview.fileUrl ? (
                                        selectedFileForPreview.fileName?.toLowerCase().endsWith(".pdf") ? (
                                            /*Iframe for viewing pdfs*/
                                            <iframe
                                                src={selectedFileForPreview.fileUrl}
                                                title={selectedFileForPreview.title}
                                                className="w-full h-full rounded-lg border border-gray-200" />
                                        ) : (
                                            /*Image viewer*/
                                            <img
                                                src={selectedFileForPreview.fileUrl}
                                                alt={selectedFileForPreview.title}
                                                className="max-h-[60vh] object-contain rounded-md shadow-sm"
                                            />
                                        )
                                    ) : (
                                        /*Fallback for pdfs without URLS*/
                                        <div className="text-center p-8 text-gray-400">
                                            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                            <p className="font-semibold text-gray-600">Preview not available</p>
                                            <p className="text-xs mt-1">This document cannot be previewed directly in the browser ({selectedFileForPreview.fileName ? selectedFileForPreview.fileName : "Blank document"})</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}