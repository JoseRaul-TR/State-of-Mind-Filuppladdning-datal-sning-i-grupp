import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button";
import TempParseComponent from "./utils/SheetParse";

function App() {
  return (
    <main className="m-7 p-7 text-center">
      <UploadFile />

      <TempParseComponent />
    </main>
  );
}

export default App;
