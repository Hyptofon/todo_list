"use client"

import {LoadingSpinner} from "@/components/ui/LoadingSpinner"
import { AlertCircle, Inbox } from "lucide-react"

export default function TodoStatus({ status, message, onRetry }) {
    if (status === "loading") {
        return (
            <div className="py-12">
                <LoadingSpinner />
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="glass-card rounded-2xl p-8 text-center space-y-4 animate-scale-in">
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-destructive/10">
                        <AlertCircle className="w-12 h-12 text-destructive" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Виникла помилка</h3>
                    <p className="text-sm text-muted-foreground">{message}</p>
                </div>
                <button
                    onClick={onRetry}
                    className="gradient-bg text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
                >
                    Спробувати знову
                </button>
            </div>
        )
    }

    if (status === "empty") {
        return (
            <div className="glass-card rounded-2xl p-12 text-center space-y-4 animate-scale-in">
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-muted">
                        <Inbox className="w-12 h-12 text-muted-foreground" />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold gradient-text mb-2">Немає завдань</h3>
                    <p className="text-sm text-muted-foreground">{message || "Додайте нове завдання, щоб почати!"}</p>
                </div>
            </div>
        )
    }

    return null
}
