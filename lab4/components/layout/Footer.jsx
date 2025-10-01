"use client"

import { Heart, Github } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2024)

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
    }, [])

    return (
        <footer className="border-t border-border/50 mt-auto bg-card transition-colors duration-300">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Створено з</span>
                        <Heart className="w-4 h-4 text-destructive animate-pulse" />
                        <span>у {currentYear}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Hyptofon"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full hover:bg-primary/10 transition-all hover-lift"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        <span className="gradient-text font-semibold">React Design Patterns</span> • v1.0.0
                    </div>
                </div>
            </div>
        </footer>
    )
}
