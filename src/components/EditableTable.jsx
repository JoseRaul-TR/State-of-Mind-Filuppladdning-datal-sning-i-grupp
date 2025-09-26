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

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <input
      type="text"
      value={inputValue}
      className="w-full rounded-lg border-2 border-indigo-300 bg-indigo-50 p-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => onChange(inputValue)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onChange(inputValue);
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
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setRowsData(data);
    } else {
      setRowsData([]);
    }
  }, [data]);

  const handleCellChange = (rowIndex, columnId, newValue) => {
    const updatedRows = [...rowsData];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [columnId]: newValue };
    setRowsData(updatedRows);
    if (onDataChange) onDataChange(updatedRows);
    console.log("Cell ändrad:", rowIndex, columnId, newValue);
  };

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
      <div className="mx-auto mt-6 w-full max-w-3xl rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-8 text-center shadow">
        <h2 className="mb-2 text-2xl font-semibold text-indigo-700">
          Redigerbar tabell
        </h2>
        <p className="text-gray-600">Ingen data att visa ännu</p>
      </div>
    );

  return (
    <div className="relative mx-auto mt-6 w-full max-w-5xl rounded-xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-indigo-700">
        Redigerbar tabell
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Rader: {rowsData.length} | Kolumner: {columns.length}
      </p>

      <div className="overflow-x-auto rounded-lg border border-indigo-200 shadow">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-indigo-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-indigo-700"
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
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? "bg-white" : "bg-indigo-50/50"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
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
      <pre className="mt-6 max-h-64 overflow-auto rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-700 shadow-inner">
        {JSON.stringify(rowsData, null, 2)}
      </pre>
    </div>
  );
}
