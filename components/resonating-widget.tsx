"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Music } from "lucide-react"

interface ResonatingWidgetProps {
  isPlaying: boolean
  title: string
}

export function ResonatingWidget({ isPlaying, title }: ResonatingWidgetProps) {
  return (
    <AnimatePresence>
      {isPlaying && title && (
        <motion.div
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -30, y: 10 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-[80] flex items-center gap-3 px-5 py-3 rounded-full border border-gold/20 bg-card/40 backdrop-blur-xl"
          style={{
            boxShadow:
              "0 0 30px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(245, 245, 241, 0.03)",
          }}
          role="status"
          aria-live="polite"
        >
          {/* Animated music bars */}
          <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
            {[0, 0.15, 0.3].map((delay, i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-primary"
                animate={{
                  height: ["6px", "16px", "10px", "14px", "6px"],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                }}
              />
            ))}
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground leading-none mb-1">
              Currently Resonating
            </span>
            <span className="font-serif text-sm text-primary noor-text-glow leading-tight">
              {title}
            </span>
          </div>

          {/* Subtle icon */}
          <Music className="w-3.5 h-3.5 text-primary/40 ml-1" strokeWidth={1.5} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
