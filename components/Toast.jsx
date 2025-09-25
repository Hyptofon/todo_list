"use client"

import { useEffect } from "react"

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            {message}
        </div>
    )
}
