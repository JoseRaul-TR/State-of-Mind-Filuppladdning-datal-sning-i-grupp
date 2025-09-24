import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button";
import ExportDialogue from "./components/ExportDialogue";
import { useState } from "react";

/* DO NOT MERGE THIS APP CODE!!!! 
JUST FOR TESTING COMPONENT ExportDialogue.jsx */
function App() {
  // Simulate exportStatus to develop this component.
  // ** Replace with code to handle exportStatus result ExportButon.jsx component! **
  const [exportStatus, setExportStatus] = useState(null);

  const handleExportSucces = () => {
      setExportStatus("success");
  };

  const handleExportError = () => {
      setExportStatus("error");
  };

  const handleTryAgain = () => {
    setExportStatus(null); // Clear the status to hide the dialogue
  };

  const handleCancel = () => {
    setExportStatus(null); // Hide the dialogue
  };
  // ******************************************

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Simulate Export Status</h1>
      <div className="flex space-x-4 mb-8">
        {/* Button to simulate a successful export */}
        <button
          onClick={handleExportSucces}
          className="px-6 py-3 rounded-md text-white font-semibold transition-transform duration-200 transform hover:scale-105 bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Simulate Success
        </button>

        {/* Button to simulate an export error */}
        <button
          onClick={handleExportError}
          className="px-6 py-3 rounded-md text-white font-semibold transition-transform duration-200 transform hover:scale-105 bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Simulate Error
        </button>
      </div>

      <ExportDialogue
        exportStatus={exportStatus}
        onTryAgain={handleTryAgain}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;
