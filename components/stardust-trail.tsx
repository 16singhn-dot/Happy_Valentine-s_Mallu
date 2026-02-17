import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export function StardustTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef<number>(0)

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

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Create particles at mouse position (increased: spawn 4-6 particles per move)
      const particleCount = Math.floor(Math.random() * 3) + 4 // 4-6 particles
      for (let i = 0; i < particleCount; i++) {
        // Slightly more drift: particles spread out a bit more
        const xDrift = (Math.random() - 0.5) * 0.4 // Increased horizontal drift
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: xDrift, // More horizontal movement
          vy: 0.08, // Slightly slower downward drift
          life: 0,
          maxLife: 1000 + Math.random() * 300, // 1.0-1.3 seconds (longer)
          size: 1.5 + Math.random() * 1.5, // Larger: 1.5-3px instead of 1-2px
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      const newParticles = particlesRef.current.filter((p) => {
        p.life += 16 // ~60fps
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05 // Slight gravity

        // Linear fade (starts at 0.3, fades to 0)
        const lifeRatio = p.life / p.maxLife
        const initialOpacity = 0.5 // Start at increased opacity
        const opacity = initialOpacity * (1 - lifeRatio) // Linear decay

        // Particle size shrinks as it decays
        const sizeMultiplier = 1 - lifeRatio * 0.6 // Shrink to ~40% its original size

        // Draw particle with soft champagne gold (#E8D3A3 = rgb(232, 211, 163))
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3 * sizeMultiplier)
        gradient.addColorStop(0, `rgba(232, 211, 163, ${opacity * 0.8})`)
        gradient.addColorStop(0.5, `rgba(232, 211, 163, ${opacity * 0.3})`)
        gradient.addColorStop(1, "rgba(232, 211, 163, 0)")

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3 * sizeMultiplier, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core dot (smaller)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.3 * sizeMultiplier, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 211, 163, ${opacity})`
        ctx.fill()

        return p.life < p.maxLife
      })

      particlesRef.current = newParticles

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationIdRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ cursor: "none" }}
    />
  )
}
