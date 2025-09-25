"use client"

import { useState } from "react"
import AddTodoForm from "./AddTodoForm"
import TodoItem from "./TodoItem"
import { toast } from "sonner"
import { nanoid } from "nanoid"
import { ListTodo, CheckCircle2, Trash2, RefreshCw } from "lucide-react" // Іконки

export default function TodoList() {
    const [todos, setTodos] = useState([])

    const handleAddTodo = (task) => {
        const newTodo = { id: nanoid(), task: task.trim(), completed: false }
        setTodos((prev) => [...prev, newTodo])
        toast.success(
            <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Завдання додано
            </span>
        )
    }

    const handleDeleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id))
        toast.error(
            <span className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-500" />
                Завдання видалено
            </span>
        )
    }

    const handleToggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        )
        toast.info(
            <span className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-500" />
                Статус завдання оновлено
            </span>
        )
    }

    return (
        <div className="space-y-6">

            <AddTodoForm onAddTodo={handleAddTodo} />

            <div className="space-y-3">
                {todos.length === 0 ? (
                    <div className="text-center py-12 animate-fade-in">
                        <ListTodo className="w-14 h-14 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-600 text-lg">
                            Немає завдань. Додайте перше!
                        </p>
                    </div>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            task={todo.task}
                            completed={todo.completed}
                            onDelete={handleDeleteTodo}
                            onToggle={handleToggleTodo}
                        />
                    ))
                )}
            </div>

            {todos.length > 0 && (
                <div className="text-center pt-4 border-t border-border">
                    <p className="text-sm text-gray-600">
                        {todos.length} {todos.length === 1 ? "завдання" : "завдань"} всього
                    </p>
                </div>
            )}
        </div>
    )
}
