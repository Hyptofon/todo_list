"use client"

import { useState } from "react"
import { Plus, Sparkles } from "lucide-react"
import { z } from "zod"

const todoSchema = z.object({
    task: z
        .string()
        .trim()
        .min(3, "Завдання повинно містити щонайменше 3 символи")
        .max(100, "Завдання не може перевищувати 100 символів"),
})

export default function AddTodoForm({ onAdd }) {
    const [task, setTask] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        const result = todoSchema.safeParse({ task })

        if (!result.success) {
            const message = result.error.issues?.[0]?.message || "Невідома помилка"
            setError(message)
            return
        }

        setError("")
        onAdd(result.data.task)
        setTask("")
    }

    const charCount = task.length
    const isTooLong = charCount > 100

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div
                className={`relative transition-all duration-300 ${
                    isFocused ? "scale-[1.02]" : ""
                }`}
            >
                <input
                    type="text"
                    value={task}
                    onChange={(e) => {
                        setTask(e.target.value)
                        setError("")
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Додайте нове завдання..."
                    className={`w-full px-4 py-4 pr-12 rounded-2xl bg-secondary/50 border-2 border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground 
                     ${isTooLong ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`}
                    maxLength={120}
                />
                <Sparkles
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary transition-all duration-300 ${
                        isFocused ? "opacity-100 rotate-12" : "opacity-40"
                    }`}
                />
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Введіть від 3 до 100 символів</span>
                <span className={isTooLong ? "text-red-500 font-medium" : ""}>
          {charCount}/100
        </span>
            </div>

            {error && (
                <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={isTooLong}
                className={`w-full gradient-bg text-primary-foreground rounded-2xl px-6 py-4 font-semibold flex items-center justify-center gap-2 
          hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 
          hover:scale-[1.02] active:scale-[0.98] 
          ${isTooLong ? "opacity-60 cursor-not-allowed" : ""}`}
            >
                <Plus className="w-5 h-5" /> Додати завдання
            </button>
        </form>
    )
}
