import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button";
import { useState } from "react";

function App() {
  // State för att spara den fil användaren väljer
  const [file, setFile] = useState(null);
  const [workbook, setWorkbook] = useState(null);

  return (
    <main className="m-7 p-7 text-center">
      <UploadFile
        file={file}
        setFile={setFile}
        workbook={workbook}
        setWorkbook={setWorkbook}
      />
    </main>
  );
}

export default App;
