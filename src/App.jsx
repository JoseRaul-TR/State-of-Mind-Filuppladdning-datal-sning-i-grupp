// Import the necessary jsPDF libraries
import { jsPDF } from "jspdf";
import autoTable from"jspdf-autotable";

import { useState } from "react";

import ExportDialogue from "./components/ExportDialogue";
import UploadFile from "./components/UploadFile";
import EditableTable from "./components/EditableTable";
import ExportButton from "./components/Button";

/* DO NOT MERGE THIS APP.jsx CODE!!!! ****
  JUST FOR TESTING COMPONENT ExportDialogue.jsx */
function App() {
  const [modalState, setModalState] = useState({
    status: null, // 'success' or 'error'
    pdfUrl: null,
    filename: '',
  });

  const handleExportSuccess = () => {
    try {
      // Create a fake PDF document
      const doc = new jsPDF();

      doc.text("Detta är en test-PDF", 10, 10);
      autoTable(doc, {
        head: [['Header 1', 'Header 2']],
        body: [['Data 1', 'Data 2']],
      });

      // Get the PDF as a Blob and create a URL
      const blob = doc.output('blob');
      const url = URL.createObjectURL(blob);
      
      setModalState({
        status: "success",
        pdfUrl: url,
        filename: "test-document.pdf",
      });
    } catch (error) {
      console.error("Failed to create mock PDF:", error);
      setModalState({ status: "error" });
    }
  };

  const handleExportError = () => {
    setModalState({ status: "error" });
  };

  const handleCancel = () => {
    if (modalState.pdfUrl) {
      URL.revokeObjectURL(modalState.pdfUrl);
    }
    setModalState({ status: null, pdfUrl: null, filename: '' });
  };
  
  const handleTryAgain = () => {
    setModalState({ status: null, pdfUrl: null, filename: '' });
    handleExportSuccess();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-600">Simulate ModalStatus</h1>
      <div className="flex space-x-4 mb-8">
        <button
          onClick={handleExportSuccess}
          className="px-6 py-3 rounded-md text-white font-semibold transition-transform duration-200 transform hover:scale-105 bg-green-500 hover:bg-green-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Simulate Success
        </button>
        <button
          onClick={handleExportError}
          className="px-6 py-3 rounded-md text-white font-semibold transition-transform duration-200 transform hover:scale-105 bg-red-500 hover:bg-red-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Simulate Error
        </button>
      </div>

      <ExportDialogue
        exportStatus={modalState.status}
        pdfUrl={modalState.pdfUrl}
        filename={modalState.filename}
        onTryAgain={handleTryAgain}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;