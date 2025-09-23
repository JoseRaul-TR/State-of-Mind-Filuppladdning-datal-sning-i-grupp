import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button";
import ExportDialogue from "./components/ExportDialogue";
import { useState } from "react";

function App() {
  // Simulate exportStatus to develop this component.
  // ** Replace with code to handle exportStatus result ExportButon.jsx component! **
  const [exportStatus, setExportStatus] = useState(null);

  const handleExport = () => {
    // Simulate your export logic here
    console.log("Starting export...");
    const isSuccess = Math.random() > 0.5;
    if (isSuccess) {
      setExportStatus("success");
    } else {
      setExportStatus("error");
    }
  };

  const handleTryAgain = () => {
    setExportStatus(null); // Clear the status to hide the dialogue
    handleExport(); // Try the export again
  };

  const handleCancel = () => {
    setExportStatus(null); // Hide the dialogue
  };
  // ******************************************
  return (
    <>
      <h1 className="bg-red-600">GRUPPARBETE TJOHO</h1>
      {/* Button to simulate export for test */}
      <button onClick={handleExport}>Fake Export</button>

      <ExportDialogue
        exportStatus={exportStatus}
        onTryAgain={handleTryAgain}
        onCancel={handleCancel}
      />
    </>
  );
}

export default App;
