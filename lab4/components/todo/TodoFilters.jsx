"use client"

import { Search, Filter } from "lucide-react"

export default function TodoFilters({ filter, setFilter, query, setQuery, remaining }) {
    const filters = [
        { id: "all", label: "Усі", emoji: "📋" },
        { id: "active", label: "Активні", emoji: "⚡" },
        { id: "completed", label: "Виконані", emoji: "✅" },
    ]

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Пошук завдань..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-input backdrop-blur-sm border border-border focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Фільтр:</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                filter === f.id
                                    ? "gradient-bg text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                                    : "bg-input hover:bg-muted text-foreground hover:scale-105"
                            }`}
                        >
                            <span className="mr-1">{f.emoji}</span>
                            {f.label}
                        </button>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20">
                    <span className="text-sm text-muted-foreground">Залишилось:</span>
                    <span className="text-lg font-bold gradient-text">{remaining}</span>
                </div>
            </div>
        </div>
    )
}
