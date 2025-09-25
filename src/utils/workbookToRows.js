//Docs for ExcelJS, för att se inbyggda metoder etc: https://github.com/exceljs/exceljs
//Utility function som översätter ExcelJS-informationen till data som EditableTable kan använda


export function workbookToRows(workbook) {
    if (!workbook || !workbook.worksheets || workbook.worksheets.length === 0) {
        return [];
    }

    const worksheet = workbook.worksheets[0]; //Tar första bladet i Excelfilen. Vill vi kunna välja eller hantera flera, behöver vi utveckla logiken.
    const rows = [];
    const maxCols = worksheet.columnCount || 0; //Hur många kolumner worksheeten har, inbyggd property från ExcelJS

    worksheet.eachRow((row) => {
        const obj = {}; //Objekt för varje rad, som kommer att innehålla key för kolumnen och value för varje cells faktiska värde, blir typ såhär: {Column_1: "Cellvärde", column_2: "Nästa cellvärde"  .. osv}

        for (let col = 1; col <= maxCols; col++) {
            const cell = row.getCell(col).text; //getCell(<kolumn>) är också en inbyggd ExcelJS-metod, om det ligger något annat än en sträng i cellen så kommer .text att returnera den rimligaste tolkningen i text, om jag har förstått det rätt
            let cellVal = cell?.value ?? ""; //nullish coalescing operator (= ??) returnerar det vänstra värdet om inte det är null eller undefined, annars skickar den tillbaka det högra värdet (i det här fallet en tom sträng). 

            obj[`Column_${col}`] = String(cellVal);
        }

        rows.push(obj);
        console.log(obj);
    });

    return rows;
}