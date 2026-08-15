import { useState } from "react";

export default function AddNoteForm({ setIsNoteFormOpen, setNotesArray, patientId }) {

    const [noteData, setNoteData] = useState({
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newNote = {
            ...noteData,
            id: `NOTE-${Date.now()}`,
            patientId: patientId,
            timestamp: new Date().toISOString()
        }
        //Update state for immediate recovery
        setNotesArray(prev => [...prev, newNote]);

        setNoteData({ content: "" });
        setIsNoteFormOpen(false);

    };
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex flex-col w-full px-6 py-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                    <h2 className="font-semibold text-xl">Add Clinical Note</h2>
                    <button
                        type="button"
                        onClick={() => setIsNoteFormOpen(false)}
                        className="text-gray-400 hover:text-gray-600 font-bold"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    <textarea
                        rows={6}
                        className="w-full p-3 border border-gray-200 rounded-lg outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none text-sm placeholder:text-gray-400"
                        placeholder="Enter clinical notes, observations, or updates..."
                        value={noteData.content}
                        onChange={(e) => {
                            setNoteData({ ...noteData, content: e.target.value })
                        }}
                        required
                    />


                    <div className="flex flex-row justify-end gap-3 mt-2 border-t border-gray-100 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsNoteFormOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition"
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            </div>

        </form>

    )
}