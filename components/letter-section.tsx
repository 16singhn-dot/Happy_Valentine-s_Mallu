"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function LetterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const letterLines = [
    "My Dearest,",
    "",
    "There are no words vast enough to hold what I feel,",
    "so I offer you these small ones, imperfect and trembling,",
    "like candlelight in a cathedral.",
    "",
    "You are the silence between notes that makes the music whole.",
    "You are the warmth I didn't know I was missing",
    "until the cold no longer reached me.",
    "",
    "In a world of noise, you are my quiet.",
    "In a lifetime of searching, you are my finding.",
    "",
    "Forever & Always,",
    "Your Heart's Keeper",
  ]

  return (
    <section id="letter" className="relative py-32 md:py-48 px-6" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-2xl mx-auto relative">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-12 text-center"
        >
          A Letter Unfolded
        </motion.p>

        {/* Letter container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative border border-primary/10 bg-card/50 backdrop-blur-sm p-8 md:p-12 lg:p-16"
        >
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/30" aria-hidden="true" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/30" aria-hidden="true" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/30" aria-hidden="true" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/30" aria-hidden="true" />

          {/* Letter text */}
          <div className="space-y-1">
            {letterLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.12 }}
                className={`font-script text-lg md:text-xl leading-relaxed ${
                  line === "" ? "h-6" : ""
                } ${
                  i === 0
                    ? "text-primary text-2xl md:text-3xl mb-2"
                    : i >= letterLines.length - 2
                      ? "text-primary/80"
                      : "text-foreground/90"
                }`}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
