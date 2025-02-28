"use client";

import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender
} from "@tanstack/react-table";

export default function TableComponent({ columns, data }) {
    const [pageIndex, setPageIndex] = useState(0);
    const [filters, setFilters] = useState({});
    const pageSize = 10;

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            Object.keys(filters).every((key) =>
                filters[key] ? String(item[key]).toLowerCase().includes(filters[key].toLowerCase()) : true
            )
        );
    }, [data, filters]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { pagination: { pageIndex, pageSize } },
        onPaginationChange: (updater) => {
            setPageIndex(updater({ pageIndex, pageSize }).pageIndex);
        },
    });

    return (
        <div className="p-4 rounded-lg shadow-lg bg-[#fafafa] dark:bg-[#171717] text-black dark:text-white transition-colors duration-300">

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-[#FAFAFA] dark:bg-[#171717] text-black dark:text-white">
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 text-center font-semibold">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))
                        )}
                    </tr>

                    <tr>
                        {columns.map((column) => (
                            <th key={column.accessorKey} className="px-4 py-2">
                                <input
                                    type="text"
                                    placeholder={`Buscar`}
                                    value={filters[column.accessorKey] || ""}
                                    onChange={(e) => setFilters({ ...filters, [column.accessorKey]: e.target.value })}
                                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-[#FAFAFA] dark:bg-[#171717] text-black dark:text-white text-center"
                                />
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr 
                            key={row.id} 
                            className="hover:bg-[#E5E5E5] dark:hover:bg-black transition"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td 
                                    key={cell.id} 
                                    className="px-4 py-3 text-center border-b"
                                    style={{ borderBottomColor: "rgba(34,42,66,.7)", borderBottomWidth: "1px" }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
                    disabled={pageIndex === 0}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
                >
                    {"<<"} Anterior
                </button>

                <span className="text-sm">
                    Página {pageIndex + 1} de {table.getPageCount()}
                </span>

                <button
                    onClick={() => setPageIndex((old) => (old < table.getPageCount() - 1 ? old + 1 : old))}
                    disabled={pageIndex >= table.getPageCount() - 1}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
                >
                    Siguiente {">>"}
                </button>
            </div>
        </div>
    );
}
