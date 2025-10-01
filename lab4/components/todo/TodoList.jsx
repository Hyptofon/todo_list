"use client"

import { useMemo } from "react"
import AddTodoForm from "./AddTodoForm"
import TodoItem from "./TodoItem"
import TodoFilters from "./TodoFilters"
import TodoStatus from "./TodoStatus"
import TodoPagination from "./TodoPagination"
import TodoStats from "./TodoStats"
import { useTodosContext as useTodos } from "@/contexts/TodosContext"
import { useTodoActions } from "./useTodoActions"

export default function TodoList() {
    const {
        todos,
        isLoading, error,
        addTodo, deleteTodo, toggleTodo, editTodoTitle,
        refresh,
        currentPage, limitPerPage, totalTodos, totalPages,
        goToNextPage, goToPrevPage, setLimit,
        searchTerm, setSearchTerm,
        filter, setFilter,
        stats,
        globalStats,
    } = useTodos(10)

    const { handleAddTodo, handleDelete, handleToggle, handleEditTitle } = useTodoActions({
        addTodo, deleteTodo, toggleTodo, editTodoTitle,
    })

    const todoItems = useMemo(
        () =>
            todos.map((todo, index) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    task={todo.todo || todo.task}
                    completed={todo.completed}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                    onEditTitle={handleEditTitle}
                    index={index}
                />
            )),
        [todos],
    )

    return (
        <div className="space-y-6">
            <AddTodoForm onAdd={handleAddTodo} />

            <TodoStats globalStats={globalStats} />

            <TodoFilters
                filter={filter}
                setFilter={setFilter}
                query={searchTerm}
                setQuery={setSearchTerm}
                remaining={stats.remaining}
            />

            <TodoStatus
                status={isLoading ? "loading" : error ? "error" : todos.length === 0 ? "empty" : "ok"}
                message={error ? String(error.message || error) : "Немає завдань за критеріями"}
                onRetry={refresh}
            />

            {todos.length > 0 && <div className="space-y-2">{todoItems}</div>}

            {totalTodos > 0 && (
                <TodoPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    limitPerPage={limitPerPage}
                    setLimit={setLimit}
                    goToNextPage={goToNextPage}
                    goToPrevPage={goToPrevPage}
                    totalItems={totalTodos}
                />
            )}
        </div>
    )
}