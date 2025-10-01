import "./globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { CursorProvider } from "@/contexts/CursorContext"
import DragonCursor from "@/components/ui/DragonCursor"
import { TodosProvider } from "@/contexts/TodosContext" // <-- імпорт нового провайдера

export const metadata = {
    title: "Сучасний Todo",
    description: "Інтерактивний список завдань",
}

export default function RootLayout({ children }) {
    return (
        <html lang="uk" suppressHydrationWarning>
        <body>
        <ThemeProvider>
            <CursorProvider>
                <TodosProvider>
                    {children}
                    <DragonCursor />
                    <Toaster richColors position="top-right" />
                </TodosProvider>
            </CursorProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
