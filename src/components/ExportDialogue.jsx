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
  
  if(!exportStatus) return null; // Don't render anything if there is no status to display

  return (
    <div className="">
      {exportStatus === "success" ? (
        <>
          <h3 className="">Din export har lyckats!</h3>
          <p className="">Här din PDF-fil.</p>
          <div className="">
            <button className="">
              <a href="" target="_blank">
                <AiOutlineFilePdf /> Öppna PDF-filen
              </a>
            </button>
            <button className="">
              <a href="" download>
                <AiOutlineDownload /> Ladda ner PDF-filen
              </a>
            </button>
            <button className="" onClick={onCancel}>
              <AiOutlineClose /> Avbrytt
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="">Din export har inte lyckats.</h3>
          <p className="">
            Vänlingen försök igen eller gå tillbaka till startsidan{" "}
          </p>
          <button onClick={onTryAgain} className="">
            <AiOutlineReload /> Försok igen
          </button>
          <button onClick={onCancel} className="">
            <AiOutlineHome /> Till startsidan
          </button>
        </>
      )}
    </div>
  );
}
