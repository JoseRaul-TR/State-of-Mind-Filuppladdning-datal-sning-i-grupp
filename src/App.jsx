// App.jsx
import { useState } from "react";

import ExportDialogue from "./components/ExportDialogue";
import UploadFile from "./components/UploadFile";
import EditableTable from "./components/EditableTable";
import Layout from "./components/Layout"; // <-- Nytt: Layout importeras här

function App() {
  // State för att spara den fil användaren väljer
  const [file, setFile] = useState(null); //Användarens uppladdade fil
  const [workbook, setWorkbook] = useState(null); //Parsed excel till JS, med ExcelJS
  const [rowData, setRowData] = useState([]); //Data enligt formatet som EditableTable förväntar sig
  const [progress, setProgress] = useState("start"); //Trackar användarens position i "flödet". Kan vara: start, editTable, export

  //Villkorlig visning av komponenter, baserat på progress-state
  return (
    <Layout>
      {" "}
      {/* <-- Nytt: Allt innehåll omsluts av Layout så header/footer syns */}
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
        />
      )}
      {progress === "export" && <ExportDialogue setProgress={setProgress} />}
    </Layout>
  );
}

export default App;
