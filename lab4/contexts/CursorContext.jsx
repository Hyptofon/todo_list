"use client"

import { createContext, useContext, useState, useCallback, useMemo } from "react"

const CursorContext = createContext({
    cursorEnabled: true,
    toggleCursor: () => {},
})

export function CursorProvider({ children }) {
    const [cursorEnabled, setCursorEnabled] = useState(true)

    const toggleCursor = useCallback(() => {
        setCursorEnabled((prev) => !prev)
    }, [])

    const value = useMemo(
        () => ({ cursorEnabled, toggleCursor }),
        [cursorEnabled, toggleCursor]
    )

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export const useCursor = () => useContext(CursorContext)