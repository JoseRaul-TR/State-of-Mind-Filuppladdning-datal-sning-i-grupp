import ExcelJS from "exceljs";
import { useState, useEffect } from "react";
import Button from "./Button";
import { workbookToRows } from "../utils/workbookToRows";

// UploadFile tar emot prop "onSubmit"
export default function UploadFile({
  file,
  setFile,
  setWorkbook,
  setProgress,
  setRowData,
}) {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null); // 🔸 NEW: error state

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // 🔸 NEW: rensa error om man väljer en fil
  };

  const handleSubmit = () => {
    if (file) {
      setProgress("editTable");
      setError(null); // 🔸 NEW
    } else {
      setError("Please select an Excel file"); // 🔸 NEW: ersätter alert
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFile(null);
    setError(null); // 🔸 NEW: rensa error när man avbryter
  };

  useEffect(() => {
    async function fetchExcel() {
      const buffer = await file.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer);
      setWorkbook(wb);
      setRowData(workbookToRows(wb));
    }

    if (file) {
      fetchExcel();
    }
  }, [file, setWorkbook, setRowData]); // 🔸 FIX


  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-100 p-6">
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px14 rounded-lg bg-indigo-600 px-12 py-6 text-white shadow transition hover:bg-indigo-700"
        >
          UPLOAD FILE
        </button>
      )}

      {showForm && (
        <div className="mt-4 flex w-full max-w-md flex-col gap-6 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-center text-2xl font-semibold">
            Upload your Excel file
          </h2>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Select Excel (.xlsx)</label>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="w-full cursor-pointer rounded-lg border-2 border-indigo-400 bg-indigo-50 p-3 text-indigo-700 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white file:transition hover:border-indigo-500 hover:bg-indigo-100 hover:file:bg-indigo-700"
            />
            {file && (
              <p className="mt-1 text-gray-600">
                Selected file: <span className="font-medium">{file.name}</span>
              </p>
            )}
            {/* 🔸 NEW: visa error-meddelande */}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="mt-4 flex justify-between">
            <Button clickHandler={handleCancel} buttonText={"Cancel"} />
            <Button clickHandler={handleSubmit} buttonText={"Edit"} />
          </div>
        </div>
      )}
    </main>
  );
}
