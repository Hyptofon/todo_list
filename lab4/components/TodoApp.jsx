"use client"

import TodoList from "./TodoList"

export default function TodoApp() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-glow animate-fade-in">
                    Task Management
                </h1>

                <p className="mt-4 text-xl sm:text-2xl font-medium tracking-wide text-glow animate-fade-in delay-200">
                    Organize your tasks with a clean and intuitive interface
                </p>
            </div>

            <div className="bg-white/60 border border-border/40 rounded-2xl shadow-xl p-10 backdrop-blur-md animate-fade-in delay-300">
                <TodoList />
            </div>
        </div>
    )
}
