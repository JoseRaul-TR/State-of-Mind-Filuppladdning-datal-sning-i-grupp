import Button from "./Button";
import { AiOutlineFilePdf } from "react-icons/ai";

export default function ExportButton({ onExport }) {
  return (
    <div>
      <Button
        clickHandler={onExport}
        buttonText={
          <span className="flex items-center">
            <AiOutlineFilePdf className="mr-2" />
            Export to PDF
          </span>
        }
      />
    </div>
  );
}
