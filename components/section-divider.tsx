"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="flex items-center justify-center py-8" aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
        className="flex items-center gap-4"
      >
        <div className="gold-line h-px w-16 md:w-24" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse-glow" />
        <div className="gold-line h-px w-16 md:w-24" />
      </motion.div>
    </div>
  )
}
