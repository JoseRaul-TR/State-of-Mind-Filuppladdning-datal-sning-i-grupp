import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button"; //krav från uppgiften enligt Anas
import { useState } from "react";

function App() {
  // State för att spara den fil användaren väljer
  const [file, setFile] = useState(null); //Användarens uppladdade fil
  const [workbook, setWorkbook] = useState(null); //Parsed excel till JS, med ExcelJS
  const [progress, setProgress] = useState("start"); //Trackar användarens position i "flödet". Kan vara: start, editTable, export

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
        />
      )}

      {progress === "editTable" && <EditableTable />}

      {progress === "export" && <ExportDialogue />}
    </>
  );
}

export default App;
