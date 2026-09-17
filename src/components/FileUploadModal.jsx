import { useState } from "react";
import useFiles from "../hooks/useFiles.jsx";
import useAuth from "../hooks/useAuth.jsx";
import { X, Camera } from "lucide-react";

export default function FileUploadModal({ setIsFileModalOpen, patientId }) {

    const [formData, setFormData] = useState({
        title: "",
        category: "Lab Result", // default category unless changed
        fileName: "",
        summary: ""
    });

    const { user } = useAuth();
    const { addFile } = useFiles();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFile = {
            patientId,
            ...formData,
            uploadedBy: user?.name || "Dr. Staff"
        }

        addFile(newFile);
        setIsFileModalOpen(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg bg-white border border-gray-200 shadow-xl rounded-xl p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="font-semibold text-xl text-gray-700">Upload Medical File / Lab</h2>
                <button
                    type="button"
                    onClick={() => setIsFileModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <label className="text-slate-700 font-semibold text-sm">Title: </label>
                <input className="border border-gray-200 rounded-md px-3 py-1.5 text-sm flex-1" type="text" placeholder="Abdominal Ultrasound"
                    value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}></input>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                <label className="text-slate-700 font-semibold text-sm">
                    Category:
                </label>
                <select className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-700 cursor-pointer focus:border-blue-500 outline-none flex-1"
                    value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option value="Lab Result">Lab Result</option>
                    <option value="Imaging">Imaging (X-Ray, CT, MRI)</option>
                    <option value="Referral">Referral / Clinical Letter</option>
                    <option value="Other">Other Document</option>
                </select>
            </div>
            <div className="mt-5">
                <label htmlFor="file-upload"
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center
                    justify-center cursor-pointer transition text-center hover:bg-gray-50 h-50">

                    {/*Upload Box/Input*/}
                    <input id="file-upload" type="file" accept="image/*, .pdf" className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {

                                //calculating the file size now
                                const fileSizeInMb = (file.size / (1024 * 1024)).toFixed(1);
                                const formattedSize = fileSizeInMb > 0 ? `${fileSizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;

                                //Reading file so we can view it later 

                                const reader = new FileReader();
                                //The FileReader interface lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer
                                reader.onloadend = () => {
                                    setFormData(prev => ({
                                        ...prev,
                                        fileName: file.name,
                                        title: formData.title,
                                        fileSize: formattedSize,
                                        fileUrl: reader.result //saves the image/document data!
                                    }));
                                };

                                //This triggers the reading process and eventually calls the onloadend function above.
                                reader.readAsDataURL(file);
                            }
                        }}
                    />

                    {/*Camera Icon*/}
                    <Camera className="w-15 h-15 text-blue-500 mb-2"></Camera>
                    {formData.fileName ? (
                        <p className="text-sm font-medium text-blue-600 mt-2">
                            📄 {formData.fileName}
                        </p>
                    ) : (
                        <div className="text-center mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">Click to take photo or choose file</p>
                            <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                        </div>
                    )}

                </label>
                <div className="flex flex-col gap-1">
                    <label className="text-slate-700 font-semibold text-sm mt-4">
                        Findings:
                    </label>
                    <textarea
                        rows={3}
                        className="border border-gray-200 rounded-md p-2 text-sm outline-none focus:border-blue-500 resize-none"
                        placeholder="e.g. Normal sinus rhythm, no active lesions, elevated WBC..."
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    />
                </div>

            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                    type="button"
                    onClick={() => setIsFileModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
                >
                    Upload File
                </button>
            </div>


        </form>


    )
}