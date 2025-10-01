"use client"

import { CheckCircle2, Moon, Sun, MousePointer2, MousePointerClick } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useCursor } from '@/contexts/CursorContext'

export default function Header() {
    const { theme, toggleTheme, mounted } = useTheme()
    const { cursorEnabled, toggleCursor } = useCursor()

    return (
        <header className="sticky top-0 z-40 border-b border-border/50 bg-card/95 backdrop-blur-sm transition-colors duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 animate-slide-up">
                        <div className="relative">
                            <div className="absolute inset-0 gradient-bg rounded-full blur-lg opacity-50 animate-glow" />
                            <CheckCircle2 className="w-8 h-8 text-primary relative z-10" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold gradient-text">Сучасний Todo</h1>
                            <p className="text-xs text-muted-foreground">Керуйте завданнями з задоволенням</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleCursor}
                            className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-110 relative group"
                            aria-label="Toggle custom cursor"
                            title={cursorEnabled ? "Вимкнути кастомний курсор" : "Увімкнути кастомний курсор"}
                        >
                            {cursorEnabled ? (
                                <MousePointerClick className="w-5 h-5 text-primary" />
                            ) : (
                                <MousePointer2 className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {cursorEnabled ? "Вимкнути" : "Увімкнути"}
                            </span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-110 relative group"
                            aria-label="Toggle theme"
                            title={theme === "dark" ? "Світла тема" : "Темна тема"}
                        >
                            {mounted && theme === "dark" ? (
                                <Sun className="w-5 h-5 text-primary" />
                            ) : (
                                <Moon className="w-5 h-5 text-primary" />
                            )}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {theme === "dark" ? "Світла" : "Темна"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}