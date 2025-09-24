import ExcelJS from "exceljs";
import { useState, useEffect } from "react";
//THIS FILE WILL BE CONVERTED TO A .js ONCE DONE OR REPLACED WITH INTEGRATED CODE IN COMPONENT! IT IS ONLY TEMPORARILY A REACT COMPONENT ON ITS OWN

export default function TempParseComponent() {
  const [workbook, setWorkbook] = useState(null);

  //github.com/exceljs/exceljs?tab=readme-ov-file#rows

  useEffect(() => {
    async function fetchExcel() {
      //Based on description @ https://builtin.com/software-engineering-perspectives/exceljs?utm_source=chatgpt.com

      const response = await fetch("/dev_files_tbd/TESTER.xlsx");
      const buffer = await response.arrayBuffer();
      const wb = new ExcelJS.Workbook();
      await wb.xlsx.load(buffer);

      console.log("log", wb);

      setWorkbook(wb);
    }

    fetchExcel();
  }, []);

  return (
    <div className="m-7 mr-auto ml-auto w-3/5 border-4 border-dashed border-pink-500 p-7">
      <h1 className="text-2xl text-pink-500">
        Temporarily shown on UI: SHEET PARSER ™
      </h1>
      <h2 className="mt-7 mb-7">
        {" "}
        {workbook
          ? `Excelfilen har laddats in. Den skapades ${workbook.created.toDateString()}, enligt data som hämtats från den parse'ade filen 🤓`
          : "Det laddades aldrig upp någon fil... 😫"}
      </h2>
      <p className="italic"> Check console for log with data structure</p>
    </div>
  );
}
