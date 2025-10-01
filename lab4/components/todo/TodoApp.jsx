"use client"

import TodoList from "./TodoList"

export default function TodoApp() {
    return (
        <div className="max-w-4xl mx-auto animate-scale-in">
            <div className="text-center mb-8 space-y-3">
                <h2 className="text-4xl md:text-5xl font-bold gradient-text">Ваші Завдання</h2>
                <p className="text-muted-foreground text-lg">Організуйте свій день ефективно та стильно ✨</p>
            </div>

            <div className="bg-card/95 border border-border/50 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
                <TodoList />
            </div>
        </div>
    )
}
