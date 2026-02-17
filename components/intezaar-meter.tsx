"use client"

import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

// Set a target date — change this to your actual reunion date
const TARGET_DATE = new Date("2025-03-14T18:00:00")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime()
  const target = TARGET_DATE.getTime()
  const diff = Math.max(0, target - now)

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

export function IntezaarMeter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const units: { label: string; value: number }[] = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: 0.2 }}
      className="flex flex-col items-center gap-5"
    >
      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
        The Intezaar Meter
      </p>

      {/* Full phrase: "Days : Hours : Minutes : Seconds until I hold you again." */}
      <p className="font-sans text-[10px] md:text-xs font-extralight tracking-[0.2em] text-muted-foreground/80 text-center mb-4 max-w-md">
        Days : Hours : Minutes : Seconds until I hold you again.
      </p>

      {/* Timer display — thin, elegant numbers */}
      <div className="flex items-center gap-2 md:gap-4">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2 md:gap-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <span
                  className="font-sans text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-foreground tabular-nums"
                  style={{ fontVariantNumeric: "tabular-nums", fontWeight: 200 }}
                >
                  {pad(unit.value)}
                </span>
              </div>
              <span className="font-sans text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-1 font-extralight">
                {unit.label}
              </span>
            </div>

            {/* Separator colon */}
            {i < units.length - 1 && (
              <span className="text-primary/40 text-2xl md:text-4xl font-extralight -mt-4 animate-pulse-glow">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
