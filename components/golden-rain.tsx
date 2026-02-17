import { useEffect, useRef, useState } from "react"

interface Raindrop {
  x: number
  y: number
  life: number
  maxLife: number
  speed: number
  size: number
}

interface GoldenRainProps {
  trigger: boolean
}

export function GoldenRain({ trigger }: GoldenRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const raindropsRef = useRef<Raindrop[]>([])
  const triggerRef = useRef(trigger)
  const hasRainedRef = useRef(false)

  useEffect(() => {
    triggerRef.current = trigger
  }, [trigger])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Burst of raindrops when triggered
    const createRain = () => {
      if (!triggerRef.current || hasRainedRef.current) return
      hasRainedRef.current = true

      // Create many raindrops across the screen
      const count = 80 + Math.random() * 40
      for (let i = 0; i < count; i++) {
        raindropsRef.current.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 100,
          life: 0,
          maxLife: 2000 + Math.random() * 1000, // 2-3 seconds
          speed: 2 + Math.random() * 4,
          size: 2 + Math.random() * 3,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (triggerRef.current && !hasRainedRef.current) {
        createRain()
      }

      // Update and draw raindrops
      const newRaindrops = raindropsRef.current.filter((drop) => {
        drop.life += 16 // ~60fps
        drop.y += drop.speed
        drop.x += Math.sin(drop.life * 0.002) * 0.3 // Slight sway

        // Fading opacity
        const lifeRatio = drop.life / drop.maxLife
        const opacity = Math.cos((1 - lifeRatio) * Math.PI / 2) // Ease out

        // Draw drop with glow
        const gradient = ctx.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, drop.size * 2)
        gradient.addColorStop(0, `rgba(212, 175, 55, ${opacity * 0.8})`)
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")

        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.size * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`
        ctx.fill()

        return drop.life < drop.maxLife
      })

      raindropsRef.current = newRaindrops

      if (raindropsRef.current.length > 0 || !hasRainedRef.current) {
        requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    />
  )
}
