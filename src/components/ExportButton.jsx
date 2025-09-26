import Button from "./Button";
import { AiOutlineFilePdf } from "react-icons/ai";

export default function ExportButton({ onExport }) {
  return (
    // Fixed position to make it float on the bottom right corner
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        clickHandler={onExport}
        className="!h-18 !w-18 !p-4 flex items-center justify-center !rounded-full !shadow-xl"
        buttonText={<AiOutlineFilePdf className="text-4xl text-white" />}
      />
    </div>
  );
}
