import {
  AiOutlineFilePdf,
  AiOutlineDownload,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineHome,
} from "react-icons/ai";

// This component expects props: {
//  exportStatus, ('success' | 'error')
//  pdfUrl,
//  filename,
//  onTryAgain,
//  onCancle'
// } from parent component
// 'exportStatus' can be 'success' or 'error'
// To test it also takes onTryAgain and onCancel-props

export default function ExportDialogue({
  exportStatus,
  pdfUrl,
  filename,
  onTryAgain,
  onCancel,
  setProgress,
}) {
  if (!exportStatus) {
    setTimeout(() => setProgress("start"), 2000);
    return (
      <div className="mt-7 pt-7 text-center text-2xl">
        We have nothing for you to download at the moment, but you just wait..!
        <br />
        🎩🪄
      </div>
    );
  }
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-100 p-4 backdrop-blur-sm sm:p-6">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl sm:p-8">
        {/* Close button with tooltip for export modal */}
        <div className="group absolute top-2 right-2 sm:top-4 sm:right-4">
          <button
            onClick={onCancel}
            className="cursor-pointer text-gray-400 transition-all hover:scale-110 hover:text-gray-600"
          >
            <AiOutlineClose className="size-6 sm:size-7" />
          </button>
          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-gray-800 p-2 px-2 py-1 text-sm whitespace-nowrap text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Stäng
          </span>
        </div>

        {exportStatus === "success" ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">
              Din export har lyckats!
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Här är din PDF-fil.
            </p>
            <div className="flex flex-col space-y-3">
              <Button>
                <a
                  href={pdfUrl} // Takes pdfUrl here
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-indigo-700 sm:px-6 sm:py-3"
                >
                  <AiOutlineFilePdf className="mr-2" />
                  Öppna PDF-filen i en ny flik
                </a>
              </Button>
              <Button>
                <a
                  href={pdfUrl} // Takes pdfUrl here for download
                  download={filename} // Set the filename for donwloading
                  className="flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:scale-105 hover:bg-gray-50 sm:px-6 sm:py-3"
                >
                  <AiOutlineDownload className="mr-2" />
                  Ladda ner PDF-filen
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="mb-2 text-xl font-bold text-red-600 sm:text-2xl">
              Din export har inte lyckats.
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Vänlingen försök igen eller gå tillbaka till startsidan{" "}
            </p>
            <div className="flex flex-row space-y-3">
              <Button
                onClick={onTryAgain}
                className="flex cursor-pointer items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-indigo-700 sm:px-6 sm:py-3"
              >
                <AiOutlineReload className="mr-2" /> Försok igen
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
