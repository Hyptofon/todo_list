"use client"
import { notify } from "@/lib/utils/notify"

export function useTodoActions({ addTodo, deleteTodo, toggleTodo, editTodoTitle }) {
    const handleAddTodo = async (task) => {
        try {
            await addTodo(task)
            notify.success("Завдання додано!")
        } catch {
            notify.error("Не вдалося додати завдання")
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            notify.success("Завдання видалено")
        } catch {
            notify.error("Не вдалося видалити")
        }
    }

    const handleToggle = async (id) => {
        try {
            await toggleTodo(id)
            notify.info("Статус оновлено")
        } catch {
            notify.error("Помилка оновлення статусу")
        }
    }

    const handleEditTitle = async (id, newTitle) => {
        try {
            await editTodoTitle(id, newTitle)
            notify.success("Заголовок оновлено")
        } catch {
            notify.error("Не вдалося оновити заголовок")
        }
    }

    return { handleAddTodo, handleDelete, handleToggle, handleEditTitle }
}
