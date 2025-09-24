import ExcelJS from "exceljs";
import { useState, useEffect } from "react";
import Button from "./Button";

// UploadFile tar emot prop "onSubmit"
export default function UploadFile({
  file,
  setFile,
  setWorkbook,
  setProgress,
}) {
  // State för att visa formuläret eller startknappen
  const [showForm, setShowForm] = useState(false);

  // När användaren väljer en fil i inputfältet
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // När användaren klickar på Submit
  const handleSubmit = () => {
    if (file) {
      setProgress("editTable");
    } else {
      alert("Please select an Excel file");
    }
  };

  // När användaren klickar på Cancel
  const handleCancel = () => {
    setShowForm(false); // Göm formuläret
    setFile(null); // Rensa filen
  };

  useEffect(() => {
    async function fetchExcel() {
      const buffer = await file.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer);
      setWorkbook(wb);
    }

    if (file) {
      fetchExcel();
    }
  }, [file, setWorkbook]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      {/* Startknapp */}
      {!showForm && (
        <>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white shadow transition hover:bg-indigo-700"
          >
            UPLOAD FILE
          </button>
        </>
      )}

      {/* Formulär */}
      {showForm && (
        <div className="mt-4 flex w-full max-w-md flex-col gap-6 rounded-xl bg-white p-6 shadow-lg">
          <h2 className="text-center text-2xl font-semibold">
            Upload your Excel file
          </h2>

          {/* Inputfält för Excel-fil – tydligare styling */}
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
          </div>

          {/* Knappar */}
          <div className="mt-4 flex justify-between">
            <Button clickHandler={handleCancel} buttonText={"Cancel"} />
            <Button clickHandler={handleSubmit} buttonText={"Edit"} />
          </div>
        </div>
      )}
    </main>
  );
}
