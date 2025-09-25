"use client"

export default function TodoFilters({ filter, setFilter, query, setQuery, remaining }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-2 rounded-md font-medium ${filter === "all" ? "bg-accent text-accent-foreground" : "bg-white/60"}`}
                >Усі</button>
                <button
                    onClick={() => setFilter("active")}
                    className={`px-3 py-2 rounded-md font-medium ${filter === "active" ? "bg-accent text-accent-foreground" : "bg-white/60"}`}
                >Активні</button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-3 py-2 rounded-md font-medium ${filter === "completed" ? "bg-accent text-accent-foreground" : "bg-white/60"}`}
                >Виконані</button>
            </div>

            <div className="flex items-center gap-3">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Пошук завдань..."
                    className="px-3 py-2 rounded-md bg-white/80 border border-border outline-none"
                />

                <div className="text-sm text-muted-foreground">
                    <strong>{remaining}</strong> {remaining === 1 ? "task left" : "tasks left"}
                </div>
            </div>
        </div>
    )
}