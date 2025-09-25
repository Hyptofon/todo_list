"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"   // ⬅️ Іконка додавання

export default function AddTodoForm({ onAddTodo }) {
  const [task, setTask] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim()) {
      onAddTodo(task)
      setTask("")
    }
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <div className="flex gap-3">
          <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Введіть нове завдання..."
              maxLength={200}
              className="flex-1 px-4 py-3 rounded-xl bg-white/80 text-black border-2 border-border placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />

          <button
              type="submit"
              disabled={!task.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-md hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <PlusCircle className="w-5 h-5" /> Додати
          </button>
        </div>

        {task.length > 180 && (
            <p className="text-sm text-muted-foreground">
              {200 - task.length} символів залишилось
            </p>
        )}
      </form>
  )
}
