"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display, Dancing_Script } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing' })

interface ExitGuardProps {
  onStay: () => void
  onLeave: () => void
}

export default function ExitGuard({ onStay, onLeave }: ExitGuardProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Timeline: show first line immediately, pause 2s, reveal second line at 3s, show buttons at 4.5s
    const t1 = setTimeout(() => setPhase(1), 800) // fade in first
    const t2 = setTimeout(() => setPhase(2), 3000) // reveal second
    const t3 = setTimeout(() => setPhase(3), 4500) // show buttons
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const easing: number[] = [0.43, 0.13, 0.23, 0.96]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-[20000] flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,1)' }}
      >
        <div className="max-w-3xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: easing }}
            className={`text-3xl md:text-4xl lg:text-5xl text-white ${playfair.variable}`}
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Abhi na jao chhod kar...
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
            className={`mt-6 text-2xl md:text-3xl text-amber-100 ${dancing.variable}`}
            style={{ fontFamily: 'var(--font-dancing), "Dancing Script", cursive', textShadow: '0 0 22px rgba(212,175,55,0.14)' }}
          >
            ...ki dil abhi bhara nahi.
          </motion.h3>

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easing }}
              className="mt-10 flex gap-4 justify-center"
            >
              <button
                onClick={() => {
                  try {
                    sessionStorage.setItem('hasSeenExitGuard', 'true')
                  } catch {}
                  onStay()
                }}
                className="px-6 py-2 rounded-full border border-amber-400 text-amber-100 bg-transparent"
              >
                Ek Pal Aur
              </button>

              <button
                onClick={() => {
                  try {
                    sessionStorage.setItem('hasSeenExitGuard', 'true')
                  } catch {}
                  onLeave()
                }}
                className="px-6 py-2 rounded-full bg-amber-200 text-[#0b0b0b]"
              >
                Bye Stupid 
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
