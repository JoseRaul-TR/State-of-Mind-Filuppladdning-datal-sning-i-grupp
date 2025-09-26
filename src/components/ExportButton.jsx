import Button from "./Button";
import { AiOutlineFilePdf } from "react-icons/ai";

export default function ExportButton({ onExport }) {
  return (
    <div className="fixed right-20 bottom-25 z-40">
      <Button
        clickHandler={onExport}
        className="flex !h-25 !w-25 items-center justify-center !rounded-full !p-5 !shadow-xl"
        buttonText={<AiOutlineFilePdf className="text-6xl text-white" />}
      />
    </div>
  );
}
