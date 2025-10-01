"use client"

import { ListTodo, CheckCircle2, Clock, TrendingUp } from "lucide-react"

export default function TodoStats({ globalStats }) {
    const { total, completed, remaining } = globalStats;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const stats = [
        {
            icon: ListTodo,
            label: "Всього",
            value: total,
            gradient: "from-blue-500 to-cyan-500",
            shadowColor: "shadow-blue-500/30",
        },
        {
            icon: Clock,
            label: "Активні",
            value: remaining,
            gradient: "from-amber-500 to-orange-500",
            shadowColor: "shadow-amber-500/30",
        },
        {
            icon: CheckCircle2,
            label: "Виконано",
            value: completed,
            gradient: "from-green-500 to-emerald-500",
            shadowColor: "shadow-green-500/30",
        },
    ]

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.label}
                        className="glass-card rounded-2xl p-5 hover-lift animate-scale-in group"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg ${stat.shadowColor} group-hover:scale-110 transition-transform duration-300`}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {total > 0 && (
                <div
                    className="glass-card rounded-2xl p-5 space-y-3 hover-lift animate-scale-in"
                    style={{ animationDelay: "300ms" }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-foreground">Прогрес виконання</span>
                        </div>
                        <span className="text-2xl font-bold gradient-text">{completionRate}%</span>
                    </div>
                    <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full gradient-bg transition-all duration-1000 ease-out rounded-full relative overflow-hidden"
                            style={{ width: `${completionRate}%` }}
                        >
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
