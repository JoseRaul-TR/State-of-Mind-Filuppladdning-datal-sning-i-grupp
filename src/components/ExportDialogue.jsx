import {
  AiOutlineFilePdf,
  AiOutlineDownload,
  AiOutlineClose,
  AiOutlineReload,
} from "react-icons/ai";
import Button from "./Button";

// Props: exportStatus, pdfUrl, filename, onTryAgain, onCancel
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
      <div className="relative z-10 mt-7 pt-7 text-center text-2xl">
        We have nothing for you to download at the moment, but you just wait..!
        <br />
        🎩🪄
      </div>
    );
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center bg-gray-100 p-4 backdrop-blur-sm sm:p-6">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl sm:p-8">
        {/* Close button */}
        <div className="group absolute top-2 right-2 sm:top-4 sm:right-4">
          <button
            onClick={onCancel}
            className="cursor-pointer text-gray-400 transition-all hover:scale-110 hover:text-gray-600"
          >
            <AiOutlineClose className="size-6 sm:size-7" />
          </button>
          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded-md bg-gray-800 p-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Close
          </span>
        </div>

        {exportStatus === "success" ? (
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">
              Your export has been successful!
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Here is the PDF file.
            </p>
            <div className="flex flex-col space-y-3">
              <Button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-sm font-medium text-white"
                >
                  <AiOutlineFilePdf className="mr-2" />
                  Open the PDF in a new tab
                </a>
              </Button>
              <Button>
                <a
                  href={pdfUrl}
                  download={filename}
                  className="flex items-center justify-center text-sm font-medium text-white"
                >
                  <AiOutlineDownload className="mr-2" />
                  Download the PDF file
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="mb-2 text-xl font-bold text-red-600 sm:text-2xl">
              Your export was not successful.
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Please try again or go back to the home page.
            </p>
            <div className="flex flex-row space-y-3">
              <Button
                onClick={onTryAgain}
                className="flex items-center justify-center text-sm font-medium text-white"
              >
                <AiOutlineReload className="mr-2" />
                Try again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
