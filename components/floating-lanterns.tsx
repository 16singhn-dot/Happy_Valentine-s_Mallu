"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Lantern {
  id: string
  delay: number // Initial delay before spawn
  size: number // 30-80px
  duration: number // 15-25s vertical drift
  startX: number // Random horizontal start position
  startY: number // Random vertical start position to spread them across screen height
  blur: number // More blur for smaller/background lanterns
  month?: string // Optional month label
}

interface MousePos {
  x: number
  y: number
}

export function FloatingLanterns() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState<MousePos>({ x: 0, y: 0 })
  const [lanterns, setLanterns] = useState<Lantern[]>([])

  // Generate lanterns on mount
  useEffect(() => {
    const months = ["October", "November", "December", "January"]
    const newLanterns: Lantern[] = []
    const lanternCount = 14 // Reduced from 20

    for (let i = 0; i < lanternCount; i++) {
      const size = Math.random() * 50 + 25 // 25-75px
      const sizeNormalized = (size - 25) / 50 // 0-1
      const blur = 1 + (1 - sizeNormalized) * 3 // 1-4px
      const duration = 35 + sizeNormalized * 20 // 35-55s drift time

      // Proper random distribution across entire width and height
      const startX = Math.random() * 100
      const startY = window.innerHeight // Start from bottom of screen

      newLanterns.push({
        id: `lantern-${i}`,
        delay: Math.random() * 4, // 0-4s random spawn delay
        size,
        duration,
        startX,
        startY,
        blur,
        month: undefined,
      })
    }

    setLanterns(newLanterns)
  }, [])

  // Track mouse movement for repulsion effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <AnimatePresence>
        {lanterns.map((lantern, index) => (
          <LanternElement
            key={lantern.id}
            lantern={lantern}
            mousePos={mousePos}
            isLabelVisible={index < 4} // First 4 show month labels
          />
        ))}
      </AnimatePresence>


    </div>
  )
}

interface LanternElementProps {
  lantern: Lantern
  mousePos: MousePos
  isLabelVisible: boolean
}

function LanternElement({ lantern, mousePos, isLabelVisible }: LanternElementProps) {
  const lanternRef = useRef<HTMLDivElement>(null)
  const [repulsion, setRepulsion] = useState({ x: 0, y: 0 })

  // Calculate repulsion from mouse - only when you move the mouse
  useEffect(() => {
    const calculateRepulsion = () => {
      if (!lanternRef.current) return

      const rect = lanternRef.current.getBoundingClientRect()
      const lanternCenterX = rect.left + rect.width / 2
      const lanternCenterY = rect.top + rect.height / 2

      const dx = lanternCenterX - mousePos.x
      const dy = lanternCenterY - mousePos.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const threshold = 120 // Gentle repulsion triggers within 120px

      if (distance < threshold && distance > 0) {
        const force = (threshold - distance) / threshold * 0.3 // Much gentler sway
        const angle = Math.atan2(dy, dx)
        setRepulsion({
          x: Math.cos(angle) * force * 5, // Reduced sway force
          y: Math.sin(angle) * force * 5,
        })
      } else {
        setRepulsion({ x: 0, y: 0 })
      }
    }

    calculateRepulsion()
  }, [mousePos])

  return (
    <motion.div
      ref={lanternRef}
      initial={{ 
        opacity: 0, 
        y: lantern.startY,
        left: `${lantern.startX}%`,
        translateX: 0,
        translateY: 0,
      }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
        y: -(window.innerHeight * 1.8),
        left: [
          `${lantern.startX}%`,
          `${(lantern.startX + 35) % 100}%`,
          `${(lantern.startX - 35 + 100) % 100}%`,
          `${lantern.startX}%`,
        ],
        translateX: repulsion.x,
        translateY: repulsion.y,
      }}
      exit={{ opacity: 0 }}
      transition={{
        delay: lantern.delay,
        duration: lantern.duration,
        ease: "linear",
        y: {
          delay: lantern.delay,
          duration: lantern.duration,
          ease: "linear",
        },
        opacity: {
          delay: lantern.delay,
          duration: lantern.duration,
          ease: "linear",
        },
        left: {
          duration: lantern.duration * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        translateX: { duration: 0.4, ease: "easeOut" },
        translateY: { duration: 0.4, ease: "easeOut" },
      }}
      style={{
        width: lantern.size,
        height: lantern.size * 1.2,
        filter: `blur(${lantern.blur}px)`,
      }}
      className="absolute rounded-full pointer-events-none"
    >
      {/* Lantern outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at 30% 30%, rgba(255, 191, 0, 0.8), rgba(212, 175, 55, 0.4), rgba(212, 175, 55, 0))`,
          boxShadow: `0 0 ${lantern.size}px rgba(255, 191, 0, 0.6), 0 0 ${lantern.size * 1.5}px rgba(212, 175, 55, 0.3)`,
        }}
      />

      {/* Lantern core with flicker pulse */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `linear-gradient(135deg, #FFBF00, #D4AF37)`,
        }}
        animate={{ opacity: [0.7, 1, 0.8, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Month label - subtle, centered */}
      {isLabelVisible && lantern.month && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0.5, 0] }}
          transition={{
            delay: lantern.delay + lantern.duration * 0.4,
            duration: 2,
          }}
        >
          <span
            className="font-serif text-white text-center"
            style={{
              fontSize: `${lantern.size * 0.25}px`,
              fontWeight: 300,
              textShadow: `0 0 ${lantern.size * 0.3}px rgba(255, 191, 0, 0.8)`,
            }}
          >
            {lantern.month}
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
