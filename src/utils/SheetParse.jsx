import ExcelJS from "exceljs";
import { useState, useEffect } from "react";
//THIS FILE WILL BE CONVERTED TO A .js ONCE DONE, IT IS ONLY TEMPORARILY A REACT COMPONENT

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
    <div className="m-7 border-4 border-dashed border-pink-500 p-7">
      <h1 className="text-pink-500">SHEET PARSER ™</h1>
      <h2 className="mt-7">
        {" "}
        {workbook
          ? `Excelfilen har laddats upp. Den skapades ${workbook.created.toDateString()}, vilket är data som hämtats från den parse'ade filen`
          : "Det laddades aldrig upp någon fil..."}
      </h2>
    </div>
  );
}
