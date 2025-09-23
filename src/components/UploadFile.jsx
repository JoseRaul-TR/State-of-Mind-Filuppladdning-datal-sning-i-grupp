import { useState } from "react";

// UploadFile tar emot prop "onSubmit"
export default function UploadFile({ onSubmit }) {
  // State för att visa formuläret eller startknappen
  const [showForm, setShowForm] = useState(false);

  // State för att spara den fil användaren väljer
  const [file, setFile] = useState(null);

  // När användaren väljer en fil i inputfältet
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // När användaren klickar på Submit
  const handleSubmit = () => {
    if (file) {
      onSubmit({ file });
    } else {
      alert("Vänligen välj en Excel-fil");
    }
  };

  // När användaren klickar på Cancel
  const handleCancel = () => {
    setShowForm(false); // Göm formuläret
    setFile(null); // Rensa filen
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Startknapp */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          UPLOAD FILE
        </button>
      )}

      {/* Formulär */}
      {showForm && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Upload your Excel file</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label>Upload Excel (.xlsx)</label>
            <input type="file" accept=".xlsx" onChange={handleFileChange} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={handleCancel}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              style={{ padding: "5px 10px", cursor: "pointer" }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
