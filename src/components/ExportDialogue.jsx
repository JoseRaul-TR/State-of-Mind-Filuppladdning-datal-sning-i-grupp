import {
  AiOutlineFilePdf,
  AiOutlineDownload,
  AiOutlineClose,
  AiOutlineReload,
  AiOutlineHome,
} from "react-icons/ai";
import Button from "./Button";

export default function ExportDialogue({
  exportStatus,
  pdfUrl,
  filename,
  onTryAgain,
  onCancel,
  onGoHome,
}) {
  /* Behöver vi den här längre? */
 // 🔸 NEW helt borttaget – vi behåller bara de riktiga exportStatus: "success" | "error"

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
            Close
          </span>
        </div>

        {exportStatus === "success" ? (
          <div className="flex flex-col items-center justify-center text-center">
            <svg
              className="mx-auto mb-4 size-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <h3 className="mb-2 text-xl font-bold text-gray-800 sm:text-2xl">
              Your export has been successful!
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              Here is the PDF file.
            </p>

            <div className="flex w-full flex-col space-y-3">
              <Button>
                <a
                  href={pdfUrl} // Takes pdfUrl here
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center text-white"
                >
                  <AiOutlineFilePdf className="mr-2 size-5" />
                  Open PDF
                </a>
              </Button>
              <Button>
                <a
                  href={pdfUrl} // Takes pdfUrl here for download
                  download={filename} // Set the filename for donwloading
                  className="flex w-full items-center justify-center text-white"
                >
                  <AiOutlineDownload className="mr-2 size-5" />
                  Download PDF
                </a>
              </Button>

              <Button
                clickHandler={onGoHome}
                className="!border !border-indigo-600 !bg-white !text-indigo-600 hover:!border-indigo-700 hover:!bg-indigo-50 hover:!text-indigo-700"
              >
                <AiOutlineHome className="mr-2 size-5" />
                Start new upload
              </Button>
            </div>
          </div>
        ) : (
          // Export Error Status
          <div className="flex flex-col items-center justify-center text-center">
            {/* Error Icon */}
            <svg
              className="mx-auto mb-4 size-16 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <h3 className="text-black-600 mb-2 text-xl font-bold sm:text-2xl">
              Export Failed.
            </h3>
            <p className="mb-4 text-sm text-gray-600 sm:text-base">
              We encountered an issue generating your PDF. Please try again or
              go back to the home page.
            </p>
            {/* Buttons container */}
            <div className="flex w-full flex-col space-y-3">
              <Button clickHandler={onTryAgain}>
                <AiOutlineReload className="mr-2 size-5" />
                Try again
              </Button>

              <Button
                clickHandler={onGoHome}
                className="!border !border-indigo-600 !bg-white !text-indigo-600 hover:!border-indigo-700 hover:!bg-indigo-50 hover:!text-indigo-700"
              >
                <AiOutlineHome className="mr-2 size-5" />
                Start new upload
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
