import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";

// Explicitly apply the plugin to the jsPDF class once when the utility is loaded.
applyPlugin(jsPDF);

// Function to generate a PDF blob from the JS table array data.
export function generatePdfBlob(data) {
    const doc = new jsPDF();

    if (data.length === 0) {
        // Return a null or throw an error specific to the utility
        throw new Error('Cannot generate PDF: No data provided.');
    }

    // 1. Define Columns and Rows for autoTable
    const columns = Object.keys(data[0] || {}).map((key) => ({
        header: key.replace(/_/g, ''), // Use space instead of underscore for clean header names
        dataKey: key,
    }));

    const bodyRows = data.map((row) =>
    columns.map((col) => row[col.dataKey])
);

// 2. Generate the table using doc.autoTable
doc.autoTable({
    head: [columns.map((col) => col.header)],
    body: bodyRows,
    startY: 20,
});

// 3. Return the PDF as a Blob
return doc.output('blob');
}