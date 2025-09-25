"use client"

import { Trash2, CheckCircle2, Circle } from "lucide-react"

export default function TodoItem({ id, task, completed, onDelete, onToggle }) {
    return (
        <div className="flex flex-col gap-2 p-4 rounded-2xl border border-border bg-white/70 backdrop-blur-md shadow-lg transition-all duration-200 hover:shadow-xl hover:bg-white/90 animate-fade-in">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onToggle(id)}
                    className="text-green-600 hover:scale-110 transition-transform"
                    aria-label="Завершити"
                >
                    {completed ? (
                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                    ) : (
                        <Circle className="w-7 h-7 text-gray-400 hover:text-black" />
                    )}
                </button>

                <span className={`flex-1 text-lg font-medium text-black ${completed ? "line-through opacity-60" : ""}`}>
          {task}
        </span>

                <button
                    onClick={() => onDelete(id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
                    aria-label="Видалити"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {completed && (
                <p className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Завдання виконане
                </p>
            )}
        </div>
    )
}
