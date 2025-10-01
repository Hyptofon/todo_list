"use client"

import { useCallback, useState, memo } from "react"
import { Check, Trash2, Edit2, Save, X } from "lucide-react"

const TodoItem = memo(function TodoItem({ id, task, completed, onToggle, onDelete, onEditTitle, index = 0 }) {
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState(task || "")
    const [isHovered, setIsHovered] = useState(false)

    const startEdit = useCallback(() => {
        setDraft(task || "")
        setIsEditing(true)
    }, [task])

    const cancelEdit = useCallback(() => {
        setIsEditing(false)
        setDraft(task || "")
    }, [task])

    const saveEdit = useCallback(async () => {
        const trimmed = (draft || "").trim()
        if (!trimmed) return
        await onEditTitle(id, trimmed)
        setIsEditing(false)
    }, [draft, id, onEditTitle])

    return (
        <li
            className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-secondary/30 border border-border/50 animate-slide-up ${
                isHovered ? "scale-[1.02] shadow-xl border-primary/50" : "scale-100"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-4 p-4">
                <button
                    onClick={() => onToggle(id)}
                    className={`relative flex-shrink-0 w-8 h-8 rounded-xl border-2 transition-all duration-500 ${
                        completed
                            ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-500 shadow-lg shadow-green-500/50 rotate-[360deg]"
                            : "border-border hover:border-primary hover:scale-110 hover:rotate-12"
                    }`}
                    aria-label={completed ? "Позначити як невиконане" : "Позначити як виконане"}
                >
                    {completed && (
                        <Check className="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in" />
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    {!isEditing ? (
                        <span
                            className={`block text-base transition-all duration-500 ${
                                completed ? "task-completed text-muted-foreground" : "text-foreground font-medium"
                            }`}
                        >
              {task}
            </span>
                    ) : (
                        <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit()
                                if (e.key === "Escape") cancelEdit()
                            }}
                            className="w-full px-4 py-2 rounded-xl bg-background border-2 border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-foreground"
                            autoFocus
                        />
                    )}
                </div>

                <div
                    className={`flex items-center gap-2 transition-all duration-500 ${
                        isHovered || isEditing ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                    }`}
                >
                    {!isEditing ? (
                        <>
                            <button
                                onClick={startEdit}
                                className="p-2.5 rounded-xl bg-secondary/50 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
                                title="Редагувати"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => onDelete(id)}
                                className="p-2.5 rounded-xl bg-secondary/50 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-all duration-300 hover:scale-110 hover:rotate-12"
                                title="Видалити"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={saveEdit}
                                className="p-2.5 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-110"
                                title="Зберегти"
                            >
                                <Save className="w-4 h-4" />
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="p-2.5 rounded-xl bg-secondary/50 hover:bg-muted text-muted-foreground transition-all duration-300 hover:scale-110"
                                title="Скасувати"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div
                className={`absolute bottom-0 left-0 right-0 h-1 gradient-bg transition-all duration-500 ${
                    isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
            />
        </li>
    )
})

export default TodoItem
