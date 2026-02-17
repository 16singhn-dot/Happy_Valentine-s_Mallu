"use client"

import { useEffect, useRef } from "react"

interface SparkleProps {
  isActive: boolean
  onComplete?: () => void
}

export function Sparkles({ isActive, onComplete }: SparkleProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const sparkleCount = 40

    // Create sparkles
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div")
      const angle = (Math.PI * 2) / sparkleCount * i
      const velocity = 2 + Math.random() * 4
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      sparkle.style.position = "absolute"
      sparkle.style.left = "50%"
      sparkle.style.top = "50%"
      sparkle.style.width = "2px"
      sparkle.style.height = "2px"
      sparkle.style.borderRadius = "50%"
      sparkle.style.backgroundColor = `hsl(${45}, 100%, 70%)`
      sparkle.style.pointerEvents = "none"
      sparkle.style.boxShadow = "0 0 8px hsl(45, 100%, 60%)"
      sparkle.style.transform = "translate(-50%, -50%)"

      container.appendChild(sparkle)

      // Animate sparkle
      let x = 0
      let y = 0
      let life = 1
      const speed = 0.03

      const animate = () => {
        x += vx
        y += vy
        life -= speed

        sparkle.style.opacity = `${Math.max(0, life)}`
        sparkle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`

        if (life > 0) {
          requestAnimationFrame(animate)
        } else {
          sparkle.remove()
        }
      }

      animate()
    }

    // Call onComplete after animation
    const timer = setTimeout(() => {
      onComplete?.()
    }, 1200)

    return () => clearTimeout(timer)
  }, [isActive, onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  )
}
