import { SaveIcon, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SaveChanges({ onSave }) {
    const [showToast, setShowToast] = useState(false);

    const handleClick = () => {
        if (onSave) onSave();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="relative flex justify-end mt-7">
            {showToast && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-emerald-700 text-white px-4 py-3 rounded-xl shadow-xl transition-all animate-bounce text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                    <span>Normal Ranges Saved Successfully!</span>
                </div>
            )}
            <button 
                type="button"
                onClick={handleClick}
                className="flex flex-row items-center gap-2 bg-blue-600 px-5 py-2.5 text-white text-sm font-semibold rounded-xl hover:scale-105 hover:bg-blue-700 transition-all shadow-sm"
            >
                <SaveIcon className="w-4 h-4"/>
                <span>Save Changes</span>
            </button>
        </div> 
    );
}