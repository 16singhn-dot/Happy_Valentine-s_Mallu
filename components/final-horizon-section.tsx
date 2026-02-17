"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { MemoryConstellation } from "@/components/memory-constellation"
import { GoldenRain } from "@/components/golden-rain"
import { FloatingLanterns } from "@/components/floating-lanterns"
import { usePersistentProgress } from "@/hooks/use-persistent-progress"

interface FinalHorizonSectionProps {
  /** Number of unique gifts viewed (0–10). Stars light up and heart forms at 10. */
  litStars: number
}

export function FinalHorizonSection({ litStars }: FinalHorizonSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const journeyComplete = litStars === 10
  const [showLanterns, setShowLanterns] = useState(false)
  const { openedGiftIndices, isHydrated } = usePersistentProgress()

  // Persisted finale flag key
  const FINALE_KEY = "noor_finale_shown"

  // Trigger lanterns after 2-second delay to let constellation animation finish
  useEffect(() => {
    if (journeyComplete) {
      const timer = setTimeout(() => {
        setShowLanterns(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [journeyComplete])

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 px-6 border-t border-primary/5"
      aria-label="Final Horizon"
    >
      {/* Golden rain celebration when journey completes */}
      <GoldenRain trigger={journeyComplete} />

      {/* Grand finale: floating lanterns with final message */}
      <AnimatePresence>
        {showLanterns && <FloatingLanterns />}
      </AnimatePresence>

      {/* Subtle ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.03] blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Memory Map — canvas constellation - sticky at top when journey complete */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={`flex justify-center mb-16 md:mb-20 ${journeyComplete ? 'sticky top-24 z-20 bg-background/50 backdrop-blur-sm py-4 rounded-lg' : ''}`}
        >
          <MemoryConstellation litStars={litStars} />
        </motion.div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-2">
            {journeyComplete ? "Your Journey Glows Complete" : "The horizon where time meets longing"}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground">
            {journeyComplete ? (
              <span>
                Every Light Ignites the{" "}
                <span className="text-primary italic noor-text-glow">Heart</span>
              </span>
            ) : (
              <span>
                Final <span className="text-primary italic noor-text-glow">Horizon</span>
              </span>
            )}
          </h2>
        </motion.div>

        {/* Message when journey completes */}
        {journeyComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center mb-12"
          >
            <p className="font-serif text-lg md:text-xl text-primary/80 italic">
              All 10 lights of love have been revealed. Your constellation is complete.
            </p>
          </motion.div>
        )}
        {/* Footer row: subtle attribution - nothing button removed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-4 pt-8 border-t border-primary/5"
        >
        </motion.div>
      </div>
    </section>
  )
}
