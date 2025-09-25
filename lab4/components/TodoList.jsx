"use client";

import { useMemo, useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import TodoStatus from "./TodoStatus";
import TodoPagination from "./TodoPagination";
import useTodos from "../hooks/useTodos";
import { notify } from "./utils/notify";

export default function TodoList() {
    const { todos, isLoading, error, addTodo, deleteTodo, toggleTodo, refresh } = useTodos(50);
    const [filter, setFilter] = useState("all");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => setCurrentPage(1), [filter, query]);

    const remaining = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return todos.filter((t) => {
            const matchesQuery = !q || String(t.todo || t.task || "").toLowerCase().includes(q);
            if (!matchesQuery) return false;
            if (filter === "all") return true;
            if (filter === "active") return !t.completed;
            if (filter === "completed") return t.completed;
            return true;
        });
    }, [todos, filter, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / (perPage === -1 ? filtered.length : perPage)));
    const startIndex = (currentPage - 1) * perPage;
    const visibleTodos = perPage === -1 ? filtered : filtered.slice(startIndex, startIndex + perPage);

    const handleAddTodo = (task) => { addTodo(task); notify.success("Завдання додано"); setCurrentPage(1); };
    const handleDelete = async (id) => { try { await deleteTodo(id); notify.error("Завдання видалено"); } catch { notify.error("Не вдалося видалити"); } };
    const handleToggle = async (id) => { try { await toggleTodo(id); notify.info("Статус оновлено"); } catch { notify.error("Не вдалося оновити статус"); } };

    return (
        <div className="space-y-6">
            <AddTodoForm onAdd={handleAddTodo} />
            <TodoFilters filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} remaining={remaining} />
            <TodoStatus
                status={isLoading ? "loading" : error ? "error" : visibleTodos.length === 0 ? "empty" : "ok"}
                message={error ? String(error.message || error) : "Немає завдань за критеріями"}
                onRetry={refresh}
            />
            {visibleTodos.map(todo => (
                <TodoItem key={todo.id} id={todo.id} task={todo.todo || todo.task} completed={todo.completed} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
            {filtered.length > 0 && (
                <TodoPagination currentPage={currentPage} totalPages={totalPages} perPage={perPage} setPerPage={setPerPage} setCurrentPage={setCurrentPage} />
            )}
            {todos.length > 0 && (
                <div className="text-center text-sm text-gray-600">
                    {todos.length} {todos.length === 1 ? "завдання" : "завдань"} всього — <strong>{remaining} left</strong>
                </div>
            )}
        </div>
    );
}
