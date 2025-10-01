import { useState, useMemo, useEffect } from "react";

export function useTodosFilterSearchPagination(allTodos, options = { initialLimit: 10 }) {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(options.initialLimit);

    const filteredTodos = useMemo(() => {
        let result = [...allTodos];
        if (filter === "active") result = result.filter((t) => !t.completed);
        else if (filter === "completed") result = result.filter((t) => t.completed);
        return result;
    }, [allTodos, filter]);

    const searchedTodos = useMemo(() => {
        const q = (searchTerm || "").trim().toLowerCase();
        if (!q) return filteredTodos;

        return filteredTodos.filter((t) =>
            String(t.todo || t.task || "").toLowerCase().includes(q)
        );
    }, [filteredTodos, searchTerm]);

    const paginatedTodos = useMemo(() => {
        if (limitPerPage === -1) return searchedTodos;
        const start = (currentPage - 1) * limitPerPage;
        return searchedTodos.slice(start, start + limitPerPage);
    }, [searchedTodos, currentPage, limitPerPage]);

    const totalPages = useMemo(() => {
        if (limitPerPage === -1) return 1;
        return Math.max(1, Math.ceil(searchedTodos.length / limitPerPage));
    }, [searchedTodos, limitPerPage]);

    const stats = useMemo(() => {
        const total = searchedTodos.length;
        const completed = searchedTodos.filter((t) => t.completed).length;
        return { total, completed, remaining: total - completed };
    }, [searchedTodos]);

    const globalStats = useMemo(() => {
        const total = allTodos.length;
        const completed = allTodos.filter((t) => t.completed).length;
        return { total, completed, remaining: total - completed };
    }, [allTodos]);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
    const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));

    const setLimit = (limit) => {
        setLimitPerPage(limit);
        setCurrentPage(1);
    };

    return {
        filter, setFilter,
        searchTerm, setSearchTerm,
        currentPage, totalPages,
        paginatedTodos, stats, globalStats,
        goToNextPage, goToPrevPage,
        setLimit, limitPerPage,
        totalTodos: searchedTodos.length
    };
}