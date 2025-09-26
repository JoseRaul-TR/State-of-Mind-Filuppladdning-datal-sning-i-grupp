import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import ExportButton from "./ExportButton";

// Enkel input-cell som behåller fokus när man skriver
function TableInputCell({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  // Om värdet från props ändras uppdateras local state
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      type="text"
      value={inputValue}
      className="w-full rounded border p-1 focus:outline-blue-400"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => onChange(inputValue)} // uppdatera när man lämnar cellen
      onKeyDown={(e) => {
        if (e.key === "Enter") onChange(inputValue); // uppdatera även på Enter
      }}
    />
  );
}

export default function EditableTable({
  data = [],
  onDataChange,
  setProgress,
  onExport,
}) {
  // Lokal state för tabellrader
  const [rowsData, setRowsData] = useState([]);

  // Synkronisera props-data med lokal state
  useEffect(() => {
    if (data && data.length > 0) {
      setRowsData(data);
    } else {
      setRowsData([]);
    }
  }, [data]);

  // Uppdatera cellvärde och meddela föräldern
  const handleCellChange = (rowIndex, columnId, newValue) => {
    const updatedRows = [...rowsData];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [columnId]: newValue };
    setRowsData(updatedRows);
    if (onDataChange) onDataChange(updatedRows);

    // Test-logg så att man ser när värdet ändras
    console.log("Cell ändrad:", rowIndex, columnId, newValue);
  };

  // Funktion för att generera kolumner dynamiskt
  const generateColumns = () => {
    if (!rowsData.length) return [];
    const keys = Object.keys(rowsData[0]);
    return keys.map((key) => ({
      accessorKey: key,
      header: key,
      cell: ({ row, column }) => (
        <TableInputCell
          value={rowsData[row.index][column.id]}
          onChange={(val) => handleCellChange(row.index, column.id, val)}
        />
      ),
    }));
  };

  const columns = generateColumns();

  const table = useReactTable({
    data: rowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!rowsData.length)
    return (
      <div className="border-2 border-dashed border-blue-300 p-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-blue-600">
          Redigerbar tabell
        </h2>
        <p className="text-gray-500">Ingen data att visa ännu</p>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold text-green-700">
        Tabell{" "}
        {/* <span
          onClick={() => setProgress("export")}
          className="ml-7 cursor-pointer pl-7 text-pink-500"
        >
          TILLFÄLLIG LÄNK TILL NÄSTA STEG
        </span> */}
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Rader: {rowsData.length} | Kolumner: {columns.length}
      </p>

      <div className="overflow-x-auto rounded border border-gray-300">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b px-4 py-2 text-left font-medium text-gray-700"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border-b px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ExportButton onExport={onExport} />
      {/* Visa datan under tabellen så att man ser ändringar direkt */}
      <pre className="mt-4 rounded bg-gray-100 p-2 text-left">
        {JSON.stringify(rowsData, null, 2)}
      </pre>
    </div>
  );
}
