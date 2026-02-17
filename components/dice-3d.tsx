"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"

// Maps dice value to the CSS rotation needed to show that face
const faceRotations: Record<number, { rotateX: number; rotateY: number }> = {
  1: { rotateX: 0, rotateY: 0 },
  2: { rotateX: 0, rotateY: -90 },
  3: { rotateX: -90, rotateY: 0 },
  4: { rotateX: 90, rotateY: 0 },
  5: { rotateX: 0, rotateY: 90 },
  6: { rotateX: 180, rotateY: 0 },
}

interface Dice3DProps {
  onRollComplete: (value: number) => void
  disabled?: boolean
}

export function Dice3D({ onRollComplete, disabled }: Dice3DProps) {
  const [isRolling, setIsRolling] = useState(false)
  const [currentFace, setCurrentFace] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 })
  const [rollSpin, setRollSpin] = useState<{ rotateX: number; rotateY: number } | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const rollDice = useCallback(() => {
    if (isRolling || disabled) return
    setIsRolling(true)

    // Play dice roll sound
    try {
      const audio = new Audio("data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAB/f39/f39/f39/f39/fw==")
      audio.volume = 0.3
      audio.play().catch(() => {})
      audioRef.current = audio
    } catch {}

    // Random tumble spin
    const spinX = 720 + Math.random() * 1080
    const spinY = 720 + Math.random() * 1080
    setRollSpin({ rotateX: spinX, rotateY: spinY })

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      const face = faceRotations[result]
      setRollSpin(null)
      setCurrentFace(face)
      setIsRolling(false)
      onRollComplete(result)
    }, 1800)
  }, [isRolling, disabled, onRollComplete])

  const dotPositions: Record<number, number[][]> = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
  }

  const DiceFace = ({ value }: { value: number }) => {
    const dots = dotPositions[value]
    return (
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-3 md:p-4">
        {Array.from({ length: 9 }).map((_, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const hasDot = dots.some(([r, c]) => r === row && c === col)
          return (
            <div key={i} className="flex items-center justify-center">
              {hasDot && (
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-primary noor-glow-sm" />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const size = "w-28 h-28 md:w-36 md:h-36"
  const faceBase = `absolute ${size} border border-gold/20 bg-card/90 backdrop-blur-sm`

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Dice container */}
      <div
        onClick={rollDice}
        className={`relative ${size} cursor-pointer`}
        style={{ perspective: "800px" }}
        role="button"
        tabIndex={0}
        aria-label={disabled ? "Dice already rolled" : isRolling ? "Dice is rolling" : "Click to roll the dice"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            rollDice()
          }
        }}
      >
        <motion.div
          className={`relative ${size} transform-gpu`}
          style={{ transformStyle: "preserve-3d" }}
          animate={
            rollSpin
              ? { rotateX: rollSpin.rotateX, rotateY: rollSpin.rotateY }
              : { rotateX: currentFace.rotateX, rotateY: currentFace.rotateY }
          }
          transition={
            rollSpin
              ? { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }
              : { duration: 0.8, ease: "easeOut" }
          }
        >
          {/* Face 1 - Front */}
          <div
            className={faceBase}
            style={{ transform: "translateZ(56px)" }}
          >
            <DiceFace value={1} />
          </div>

          {/* Face 6 - Back */}
          <div
            className={faceBase}
            style={{ transform: "rotateY(180deg) translateZ(56px)" }}
          >
            <DiceFace value={6} />
          </div>

          {/* Face 2 - Right */}
          <div
            className={faceBase}
            style={{ transform: "rotateY(90deg) translateZ(56px)" }}
          >
            <DiceFace value={2} />
          </div>

          {/* Face 5 - Left */}
          <div
            className={faceBase}
            style={{ transform: "rotateY(-90deg) translateZ(56px)" }}
          >
            <DiceFace value={5} />
          </div>

          {/* Face 3 - Top */}
          <div
            className={faceBase}
            style={{ transform: "rotateX(90deg) translateZ(56px)" }}
          >
            <DiceFace value={3} />
          </div>

          {/* Face 4 - Bottom */}
          <div
            className={faceBase}
            style={{ transform: "rotateX(-90deg) translateZ(56px)" }}
          >
            <DiceFace value={4} />
          </div>
        </motion.div>

        {/* Glow under dice */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-xl bg-primary/20 animate-pulse-glow"
          aria-hidden="true"
        />
      </div>

      {/* Click hint */}
      {!disabled && !isRolling && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground"
        >
          Tap the dice
        </motion.p>
      )}

      {isRolling && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-serif text-sm italic text-primary noor-text-glow"
        >
          Kismat ghoom rahi hai...
        </motion.p>
      )}
    </div>
  )
}
