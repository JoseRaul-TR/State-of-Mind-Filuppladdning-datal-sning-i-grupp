import Button from "./Button";
import { AiOutlineFilePdf } from "react-icons/ai";

export default function ExportButton({ onExport }) {
  return (
    <div className="fixed right-6 bottom-6 z-40">
      <Button
        clickHandler={onExport}
        className="flex !h-18 !w-18 items-center justify-center !rounded-full !p-4 !shadow-xl"
        buttonText={<AiOutlineFilePdf className="text-4xl text-white" />}
      />
    </div>
  );
}
