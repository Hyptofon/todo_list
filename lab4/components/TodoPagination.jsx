"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TodoPagination({ currentPage, totalPages, perPage, setPerPage, setCurrentPage }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border">
            <label className="flex items-center gap-2 text-sm">
                Показувати по:
                <select
                    value={perPage}
                    onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="border rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {[3, 5, 10, 20, -1].map((n) => (
                        <option key={n} value={n}>
                            {n === -1 ? "Усі" : n}
                        </option>
                    ))}
                </select>
            </label>

            {perPage !== -1 && (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-sm">
            Сторінка {currentPage} з {totalPages}
          </span>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full border hover:bg-gray-100 disabled:opacity-40"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
