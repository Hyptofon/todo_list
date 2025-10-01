"use client"

import { createContext, useContext } from "react"
import useTodosApi from "@/hooks/useTodos"

const TodosContext = createContext(null)

export function TodosProvider({ children }) {
    const todos = useTodosApi()
    return <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
}

export function useTodosContext() {
    const context = useContext(TodosContext)
    if (!context) {
        throw new Error("useTodosContext must be used within a TodosProvider")
    }
    return context
}
