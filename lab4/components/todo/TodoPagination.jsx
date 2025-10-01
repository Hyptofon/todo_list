"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TodoPagination({
                                           currentPage,
                                           totalPages,
                                           limitPerPage,
                                           setLimit,
                                           goToNextPage,
                                           goToPrevPage,
                                           totalItems,
                                       }) {
    return (
        <div className="glass-card rounded-2xl p-4 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-muted-foreground">Показувати:</label>
                    <select
                        value={limitPerPage}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className="px-3 py-2 rounded-lg bg-input border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
                    >
                        {[3, 5, 10, 20, -1].map((n) => (
                            <option key={n} value={n}>
                                {n === -1 ? "Усі" : n}
                            </option>
                        ))}
                    </select>
                </div>
                {limitPerPage !== -1 && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                            title="Попередня сторінка"
                        >
                            <ChevronLeft className="w-5 h-5 text-primary" />
                        </button>

                        <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                            <span className="text-sm font-medium">
                                <span className="gradient-text font-bold">{currentPage}</span>
                                <span className="text-muted-foreground"> / {totalPages}</span>
                            </span>
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 disabled:hover:scale-100"
                            title="Наступна сторінка"
                        >
                            <ChevronRight className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                )}

                <div className="text-sm text-muted-foreground">
                    Всього: <span className="font-bold gradient-text">{totalItems}</span>
                </div>
            </div>
        </div>
    )
}