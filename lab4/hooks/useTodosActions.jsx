import { useCallback } from "react";
import { deleteTodoApi, toggleTodoApi, editTodoApi } from "@/api/todos";

export function useTodosActions(allTodos, setAllTodos, updateGlobalStats, setIsLoading, setError) {
    const addTodo = useCallback((task) => {
        const newTodo = { id: `local_${Date.now()}`, todo: task, completed: false };
        setAllTodos((prev) => {
            const updated = [newTodo, ...prev];
            updateGlobalStats(updated);
            return updated;
        });
        return newTodo;
    }, [setAllTodos, updateGlobalStats]);

    const deleteTodo = useCallback(async (id) => {
        setIsLoading(true); setError(null);
        try {
            if (!String(id).startsWith("local_")) await deleteTodoApi(id);
            setAllTodos((prev) => {
                const updated = prev.filter((t) => String(t.id) !== String(id));
                updateGlobalStats(updated);
                return updated;
            });
        } catch (err) { setError(err); throw err; } finally { setIsLoading(false); }
    }, [setAllTodos, updateGlobalStats]);

    const toggleTodo = useCallback(async (id) => {
        setIsLoading(true); setError(null);
        try {
            const found = allTodos.find((t) => String(t.id) === String(id));
            const newCompleted = !found?.completed;
            if (!String(id).startsWith("local_")) await toggleTodoApi(id, newCompleted);
            setAllTodos((prev) => {
                const updated = prev.map((t) => String(t.id) === String(id) ? { ...t, completed: newCompleted } : t);
                updateGlobalStats(updated);
                return updated;
            });
        } catch (err) { setError(err); throw err; } finally { setIsLoading(false); }
    }, [allTodos, setAllTodos, updateGlobalStats]);

    const editTodoTitle = useCallback(async (id, newTitle) => {
        setIsLoading(true); setError(null);
        try {
            let newText = newTitle;
            if (!String(id).startsWith("local_")) {
                const updated = await editTodoApi(id, newTitle);
                newText = updated.todo || updated.title || newTitle;
            }
            setAllTodos((prev) => prev.map((t) => String(t.id) === String(id) ? { ...t, todo: newText } : t));
            return newText;
        } catch (err) { setError(err); throw err; } finally { setIsLoading(false); }
    }, [setAllTodos]);

    return { addTodo, deleteTodo, toggleTodo, editTodoTitle };
}
