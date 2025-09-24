import {
  AiOutlineFilePdf,
  AiOutlineDownload,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineHome,
} from "react-icons/ai";

// This component takes a 'exportStatus'-prop from ExportButton
// 'exportStatus' can be 'success' or 'error'
// To test it also takes onTryAgain and onCancel-props

export default function ExportDialogue({ exportStatus, onTryAgain, onCancel }) {
  if (!exportStatus) return null; // Don't render anything if there is no status to display

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
        {/* Button close modal */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 transition-all hover:text-gray-600 hover:scale-105"
        >
          <AiOutlineClose size={24} />
        </button>

        {exportStatus === "success" ? (
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-sl mb-2 font-bold text-gray-800">
              Din export har lyckats!
            </h3>
            <p className="mb-4 text-gray-600">Här är din PDF-fil.</p>
            <div className="flex flex-col space-y-3">
              <a
                href=""
                target="_blank"
                className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all cursor-pointer hover:bg-blue-700 hover:scale-105"
              >
                <AiOutlineFilePdf className="mr-2" />
                Öppna PDF-filen
              </a>
              <a
                href=""
                download
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all cursor-pointer hover:bg-gray-50 hover:scale-105"
              >
                <AiOutlineDownload className="mr-2" />
                Ladda ner PDF-filen
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h3 className="mb-2 text-xl font-bold text-red-600">
              Din export har inte lyckats.
            </h3>
            <p className="mb-4 text-gray-600">
              Vänlingen försök igen eller gå tillbaka till startsidan{" "}
            </p>
            <div className="flex flex-row space-y-3">
              <button
                onClick={onTryAgain}
                className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all cursor-pointer hover:bg-blue-700 hover:scale-105"
              >
                <AiOutlineReload className="mr-2" /> Försok igen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
