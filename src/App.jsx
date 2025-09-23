import EditableTable from "./components/EditableTable";
import UploadFile from "./components/UploadFile";
import ExportButton from "./components/Button";
import TempParseComponent from "./utils/SheetParse";

function App() {
  return (
    <>
      <h1 className="bg-red-600">GRUPPARBETE TJOHO</h1>

      <UploadFile />
      <TempParseComponent />
    </>
  );
}

export default App;
