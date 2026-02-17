"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CinematicLanding } from "@/components/cinematic-landing"
import { DiceDashboard } from "@/components/dice-dashboard"

export default function NoorValentine() {
  const [hasEntered, setHasEntered] = useState(false)

  const handleEnter = useCallback(() => {
    setHasEntered(true)
  }, [])

  return (
    <>
      {/* Cinematic Landing Gate */}
      <AnimatePresence>
        {!hasEntered && <CinematicLanding onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Dice of Destiny Dashboard - revealed after cinematic zoom */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <DiceDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
