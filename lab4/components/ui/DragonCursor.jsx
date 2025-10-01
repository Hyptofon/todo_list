"use client"

import { useEffect, useRef, useState } from "react"
import { useCursor } from "@/contexts/CursorContext"

export default function DragonCursor() {
    const canvasRef = useRef(null)
    const { cursorEnabled } = useCursor()
    const animationRef = useRef(null)
    const dragonRef = useRef(null)
    const trailsRef = useRef([])
    const targetRef = useRef({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (cursorEnabled) {
            setIsVisible(true)
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [cursorEnabled])

    useEffect(() => {
        if (!isVisible) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d", { alpha: true })

        function resizeCanvas() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            if (!dragonRef.current) {
                dragonRef.current = {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    size: 20,
                    angle: 0,
                    speed: 0.05,
                }
                targetRef.current = {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                }
            }
        }

        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        const getColors = () => {
            const isDark = document.documentElement.classList.contains('dark')
            return {
                dragon: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
                trail: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            }
        }

        function drawDragon(x, y, size, angle, color) {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(angle)

            ctx.beginPath()
            ctx.moveTo(-size, size)
            ctx.lineTo(size, 0)
            ctx.lineTo(-size, -size)
            ctx.closePath()

            ctx.fillStyle = color
            ctx.fill()
            ctx.restore()
        }

        function drawTrail(trails, trailColor) {
            for (let i = trails.length - 1; i >= 0; i--) {
                const trail = trails[i]

                ctx.save()
                ctx.translate(trail.x, trail.y)
                ctx.rotate(trail.angle)
                ctx.globalAlpha = trail.alpha

                ctx.beginPath()
                ctx.moveTo(-trail.size, trail.size)
                ctx.lineTo(trail.size, 0)
                ctx.lineTo(-trail.size, -trail.size)
                ctx.closePath()

                ctx.fillStyle = trailColor
                ctx.fill()
                ctx.restore()

                trail.alpha -= 0.02
                trail.size *= 0.98

                if (trail.alpha <= 0) {
                    trails.splice(i, 1)
                }
            }
        }

        function updateDragon() {
            const dragon = dragonRef.current
            const target = targetRef.current

            const dx = target.x - dragon.x
            const dy = target.y - dragon.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            dragon.angle = Math.atan2(dy, dx)

            if (distance > 1) {
                dragon.x += dx * dragon.speed
                dragon.y += dy * dragon.speed
            }

            trailsRef.current.push({
                x: dragon.x,
                y: dragon.y,
                size: dragon.size,
                angle: dragon.angle,
                alpha: 1,
            })

            if (trailsRef.current.length > 50) {
                trailsRef.current.shift()
            }
        }

        function animate() {
            const colors = getColors()

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            drawTrail(trailsRef.current, colors.trail)
            updateDragon()

            const dragon = dragonRef.current
            drawDragon(dragon.x, dragon.y, dragon.size, dragon.angle, colors.dragon)

            animationRef.current = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e) => {
            targetRef.current.x = e.clientX
            targetRef.current.y = e.clientY
        }

        window.addEventListener("mousemove", handleMouseMove)
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", handleMouseMove)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isVisible])

    if (!isVisible) {
        return null
    }

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
                cursorEnabled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ mixBlendMode: "normal" }}
        />
    )
}