// App.jsx
import { useState } from "react";

import ExportDialogue from "./components/ExportDialogue";
import UploadFile from "./components/UploadFile";
import EditableTable from "./components/EditableTable";
import { generatePdfBlob } from "./utils/pdfGenerator";

import Layout from "./components/Layout"; // <-- Nytt: Layout importeras här

function App() {
  // State för att spara den fil användaren väljer
  const [file, setFile] = useState(null); //Användarens uppladdade fil
  const [workbook, setWorkbook] = useState(null); //Parsed excel till JS, med ExcelJS
  const [rowData, setRowData] = useState([]); //Data enligt formatet som EditableTable förväntar sig
  const [editedData, setEditedData] = useState([]); // Trackr när data redigeras i JS
  const [progress, setProgress] = useState("start"); //Trackar användarens position i "flödet". Kan vara: start, editTable, export
  const [pdfUrl, setPdfUrl] = useState(null); // Trackar pdf URL:en när skappas
  const [exportStatus, setExportStatus] = useState(null); // Trackar export status (success | error)

  const handleDataChange = (newData) => {
    setEditedData(newData);
  };

  const handleExportToPdf = () => {
    try {
      const finalData = editedData.length > 0 ? editedData : rowData;

      if (finalData.length === 0) {
        throw new Error("No data to export.");
      }

      // Call utility function to generate PDF
      const pdfBlob = generatePdfBlob(finalData);

      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setExportStatus("success");
      setProgress("export");
    } catch (error) {
      console.error("Error generating PDF:", error.message || error);
      setExportStatus("error");
      setProgress("export");
    }
  };

  // ******* Temporary function to test ExportState = 'error' *******
  const handleTestExportError = () => {
    setExportStatus("error");
    setProgress("export");
  };
  // ********************************************************

  //Villkorlig visning av komponenter, baserat på progress-state
  return (
    <Layout>
      {" "}
      {/* <-- Allt innehåll omsluts av Layout så header/footer syns */}
      {progress === "start" && (
        <UploadFile
          file={file}
          setFile={setFile}
          workbook={workbook}
          setWorkbook={setWorkbook}
          setProgress={setProgress}
          setRowData={setRowData}
        />
      )}
      
      {progress === "editTable" && (
  <>
    <EditableTable
      data={rowData}
      onDataChange={handleDataChange}
      onExport={handleExportToPdf}
      onReset={() => {                 // 🔸 NEW
        setFile(null);                 // nollställ fil
        setWorkbook(null);             // nollställ workbook
        setRowData([]);                // töm tabell-data
        setEditedData([]);             // töm redigerad data
        setPdfUrl(null);               // nollställ pdf-url
        setExportStatus(null);         // nollställ exportstatus
        setProgress("start");          // tillbaka till start
      }}
    />

          {/********** Temporary button for testing exportStatus error ***********/}{" "}
          <div className="fixed bottom-4 left-4">
            <button
              onClick={handleTestExportError}
              className="bg-red-700 p-3 text-white"
            >
              TEST EXPORT ERROR
            </button>
          </div>
          {/********** End of temporary button for testing exportStatus error ***********/}{" "}
        </>
      )}
      
      {progress === "export" && (
        <ExportDialogue
          exportStatus={exportStatus}
          pdfUrl={pdfUrl}
          filename="edited_table.pdf"
          onCancel={() => setProgress("editTable")}
          onTryAgain={handleExportToPdf}
          onGoHome={() => setProgress("start")}
        />
      )}
    </Layout>
  );
}

export default App;
