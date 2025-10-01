"use client"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import TodoApp from "@/components/todo/TodoApp"

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <TodoApp />
            </main>
            <Footer />
        </div>
    )
}
