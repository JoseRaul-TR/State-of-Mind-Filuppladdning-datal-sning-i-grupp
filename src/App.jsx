import { useState } from "react";

import ExportDialogue from "./components/ExportDialogue";
import UploadFile from "./components/UploadFile";
import EditableTable from "./components/EditableTable";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";

// Explicitly apply the plugin once outside the component
// This ensures it runs and extends the jsPDF prototype.
applyPlugin(jsPDF);

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
      const doc = new jsPDF();

      // ––– Debug code –––
      // if (typeof doc.autoTable !== "function") {
      //   console.error("jsPDF-Autotable is not loaded correctly!");
      //   // Fallback to error handling or alert user
      //   throw new Error("PDF generation dependency missing.");
      // }
      // ––– End Debug code –––
      
      const finalData = editedData.length > 0 ? editedData : rowData;

      const columns = Object.keys(finalData[0] || {}).map((key) => ({
        header: key.replace(/_/g, ""),
        dataKey: key,
      }));
      const rows = finalData;

      doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: rows.map((row) => columns.map((col) => row[col.dataKey])),
        startY: 20,
      });

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setExportStatus("succes");
      setProgress("export");
    } catch (error) {
      console.error("Error generating PDF:", error);
      setExportStatus("error");
      setProgress("export");
    }
  };

  //Villkorlig visning av komponenter, baserat på progress-state
  return (
    <>
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
        <EditableTable
          data={rowData}
          workbook={workbook}
          setProgress={setProgress}
          onDataChange={handleDataChange}
          onExport={handleExportToPdf}
        />
      )}

      {progress === "export" && (
        <ExportDialogue
          exportStatus={exportStatus}
          pdfUrl={pdfUrl}
          filename="edited_table.pdf"
          onCancel={() => setProgress("editTable")}
          onTryAgain={handleExportToPdf}
        />
      )}
    </>
  );
}

export default App;
