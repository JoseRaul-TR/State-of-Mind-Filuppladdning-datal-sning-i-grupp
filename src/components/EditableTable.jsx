import { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import ExportButton from "./ExportButton";

// Enkel input-cell
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

export default function EditableTable({ data = [], onDataChange, onExport }) {
  const [rowsData, setRowsData] = useState([]);
  const [process, setProcess] = useState("start"); // 🔸 NEW: intern state för processen

export default function EditableTable({ data = [], onDataChange, onExport, onReset }) { // 🔸 NEW onReset
  const [rowsData, setRowsData] = useState([]);
  const [process, setProcess] = useState("start");

  // 🔸 NEW reset-funktion
  const handleResetAll = () => {
    setRowsData([]);
    setProcess("start");
    onDataChange?.([]); // meddela App att tabellen är tom
    onReset?.();        // meddela App att hela flödet ska startas om
  };

  return (
    <div className="relative mx-auto mt-6 w-full max-w-5xl rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700">Editable Table</h2>
          <p className="text-sm text-gray-500">
            Rows: {rowsData.length} | Columns: {columns.length} | Status: {process}
          </p>
        </div>

        {/* 🔸 NEW: Reset-knapp i headern */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetAll}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Starta om
          </button>
          <ExportButton onExport={onExport} />
        </div>
      </div>
      
      {/* Resten av tabellen oförändrat */}

  // När data ändras från App → uppdatera state här inne
  useEffect(() => {
    if (data && data.length > 0) {
      setRowsData(data);
      setProcess("loaded");
    } else {
      setRowsData([]);
      setProcess("start");
    }
  }, [data]);

  // När en cell editeras
  const handleCellChange = (rowIndex, columnId, newValue) => {
    const updatedRows = [...rowsData];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [columnId]: newValue };
    setRowsData(updatedRows);
    onDataChange?.(updatedRows);
    if (process !== "edited") setProcess("edited");
  };

  // Dynamiskt bygga kolumner
  const columns = useMemo(() => {
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
  }, [rowsData]);

  const table = useReactTable({
    data: rowsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!rowsData.length) {
    return (
      <div className="mx-auto mt-6 w-full max-w-3xl rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 p-8 text-center shadow">
        <h2 className="mb-2 text-2xl font-semibold text-indigo-700">
          Editable Table
        </h2>
        <p className="text-gray-600">No data shows yet</p>
        <p className="mt-2 text-xs text-gray-500">Status: {process}</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-6 w-full max-w-5xl rounded-xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700">
            Editable Table
          </h2>
          <p className="text-sm text-gray-500">
            Rows: {rowsData.length} | Columns: {columns.length} | Status:{" "}
            {process}
          </p>
        </div>
        <ExportButton onExport={onExport} />
      </div>

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
                      header.getContext()
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

      <pre className="mt-6 max-h-64 overflow-auto rounded-lg bg-gray-100 p-4 text-left text-sm text-gray-700 shadow-inner">
        {JSON.stringify(rowsData, null, 2)}
      </pre>
    </div>
  );
}
