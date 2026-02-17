"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wind } from 'lucide-react'

const PHRASES = [
  'Tujhe har dukh se bachana, ab mera hi farz hai.',
  "Take a deep breath. I’m holding your hand right now.",
  'You are safe here. My heart is your safe corner.',
]

const PHASE_LABELS = ['Breathe in', 'Hold', 'Breathe out']
const DURATIONS = [4000, 2000, 4000] // ms

export default function SukoonMode() {
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!open) return

    document.body.classList.add('sukoon-active')
    document.body.style.overflow = 'hidden'

    let i = 0
    const run = () => {
      setPhase(i % 3)
      const dur = DURATIONS[i % 3]
      timerRef.current = window.setTimeout(() => {
        i = (i + 1) % 3
        run()
      }, dur)
    }
    run()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      document.body.classList.remove('sukoon-active')
      document.body.style.overflow = ''
    }
  }, [open])

  const totalCycle = DURATIONS.reduce((a, b) => a + b, 0)

  return (
    <>
      {/* FAB */}
      <button
        aria-label="Open Sukoon Mode"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl sukoon-fab"
        style={{
          background: 'linear-gradient(180deg,#fffaf3, #fff1d6)',
          boxShadow: '0 8px 30px rgba(255,200,120,0.28), 0 0 30px rgba(255,220,150,0.12)',
        }}
      >
        <Wind className="text-amber-600" />
      </button>

      {open && (
        <div className="sukoon-overlay" role="dialog" aria-modal="true">
          {/* Backdrop layer (covers page and provides blur/dim) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'rgba(6,6,8,0.62)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              zIndex: 9998,
            }}
            onClick={() => setOpen(false)}
          />

          {/* Interactive content above backdrop */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-6">
            <div className="relative max-w-2xl w-full text-center pointer-events-auto">
              {/* Close button moved below the guiding text so it's not obscured */}

              {/* Circle and text wrapper */}
              <div className="flex flex-col items-center justify-center">
                <div style={{ position: 'relative' }}>
                  <motion.div
                    aria-hidden
                    className="mx-auto"
                    style={{
                      width: 260,
                      height: 260,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 30% 25%, #ffd88a 0%, #fff9f0 60%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                    }}
                    animate={{ scale: [1, 1.5, 1.5, 1] }}
                    transition={{
                      duration: totalCycle / 1000,
                      times: [0, 0.4, 0.6, 1],
                      ease: 'easeInOut',
                      repeat: Infinity,
                    }}
                  />

                  {/* Phase label placed above the circle so it's never hidden by the scale */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}>
                    <div className="text-2xl text-amber-700/90 font-semibold" style={{ filter: 'drop-shadow(0 6px 18px rgba(255,180,60,0.12))' }}>
                      {PHASE_LABELS[phase]}
                    </div>
                  </div>
                </div>

                <div className="mt-16 text-center px-6 z-30" style={{ position: 'relative' }}>
                  <p
                    className="text-lg leading-relaxed text-white/95"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 20 }}
                  >
                    {PHRASES[phase]}
                  </p>
                  <p className="mt-4 text-sm text-neutral-200/80" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
                    {Math.round(DURATIONS[phase] / 1000)} sec • {PHASE_LABELS[phase]}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full px-6 py-2 text-sm bg-transparent text-neutral-200/90 hover:bg-white/5 transition"
                    style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
                  >
                    I feel better now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
