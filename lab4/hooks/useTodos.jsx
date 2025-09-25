"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchTodosApi, deleteTodoApi, toggleTodoApi } from "../api/todos";

export default function useTodos(limit = 20) {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchTodosApi(limit);
            setTodos(data.map((t) => ({ ...t, id: String(t.id) })));
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const addTodo = useCallback((task) => {
        const newTodo = {
            id: `local_${Date.now()}`,
            todo: task,
            completed: false,
            userId: 0,
        };
        setTodos((prev) => [newTodo, ...prev]);
        return newTodo;
    }, []);

    const deleteTodo = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);
        setTodos((prev) => prev.filter((t) => String(t.id) !== String(id)));
        try {
            await deleteTodoApi(id);
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const toggleTodo = useCallback(async (id) => {
        setIsLoading(true);
        setError(null);

        setTodos((prev) =>
            prev.map((t) =>
                String(t.id) === String(id) ? { ...t, completed: !t.completed } : t
            )
        );

        const todo = todos.find((t) => String(t.id) === String(id));
        try {
            await toggleTodoApi(id, !todo.completed);
        } catch (err) {
            setTodos((prev) =>
                prev.map((t) =>
                    String(t.id) === String(id) ? { ...t, completed: todo.completed } : t
                )
            );
            setError(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [todos]);

    const refresh = useCallback(() => fetchTodos(), [fetchTodos]);

    return {
        todos,
        isLoading,
        error,
        addTodo,
        deleteTodo,
        toggleTodo,
        refresh,
    };
}
