"use client"

import { createContext, useContext, useState, useCallback, useMemo } from "react"

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
    mounted: false,
})

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light")
    const [mounted, setMounted] = useState(true)

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === "light" ? "dark" : "light"

            requestAnimationFrame(() => {
                if (newTheme === "dark") {
                    document.documentElement.classList.add("dark")
                    document.body.classList.add("dark")
                } else {
                    document.documentElement.classList.remove("dark")
                    document.body.classList.remove("dark")
                }
            })

            return newTheme
        })
    }, [])

    const value = useMemo(
        () => ({ theme, toggleTheme, mounted }),
        [theme, toggleTheme, mounted]
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
