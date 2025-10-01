import { useState, useCallback, useEffect } from "react";
import { fetchTodosApi } from "@/api/todos";

export function useTodosData() {
    const [allTodos, setAllTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const firstRes = await fetchTodosApi(1, 0);
            const totalCount = firstRes.total || 0;

            const allRes = await fetchTodosApi(totalCount > 0 ? totalCount : 200, 0);
            const fetchedTodos = (allRes.todos || []).map((t) => ({
                ...t,
                id: String(t.id),
                todo: t.todo || t.task || `Задача ${t.id}`
            }));

            setAllTodos(fetchedTodos);
        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllTodos();
    }, [fetchAllTodos]);

    return {
        allTodos,
        setAllTodos,
        isLoading,
        error,
        fetchAllTodos
    };
}