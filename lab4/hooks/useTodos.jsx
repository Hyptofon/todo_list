import { useState } from "react";
import { useTodosData } from "./useTodosData";
import { useTodosFilterSearchPagination } from "./useTodosFilterSearchPagination";
import { useTodosActions } from "./useTodosActions";

export default function useTodos(initialLimit = 10) {
    const { allTodos, setAllTodos, isLoading, error, fetchAllTodos } = useTodosData();

    const {
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        currentPage,
        totalPages,
        paginatedTodos,
        stats,
        globalStats,
        goToNextPage,
        goToPrevPage,
        setLimit,
        limitPerPage,
        totalTodos
    } = useTodosFilterSearchPagination(allTodos, { initialLimit });

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const updateGlobalStats = () => {};

    const { addTodo, deleteTodo, toggleTodo, editTodoTitle } =
        useTodosActions(allTodos, setAllTodos, updateGlobalStats, setLoading, setErr);

    return {
        todos: paginatedTodos,
        isLoading, error,
        addTodo, deleteTodo, toggleTodo, editTodoTitle,
        limitPerPage, searchTerm, setSearchTerm,
        filter, setFilter,
        currentPage, totalPages, totalTodos,
        goToNextPage, goToPrevPage, setLimit,
        refresh: fetchAllTodos,
        stats,
        globalStats,
    };
}
