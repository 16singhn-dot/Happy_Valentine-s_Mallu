"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { NoorButton } from "./noor-button"
import { NothingButton } from "./nothing-button"
import ExitGuard from "./exit-guard"
import { useState } from "react"

export function ClosingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative min-h-screen flex flex-col justify-end py-32 md:py-48 px-6" ref={ref}>
      {/* Large ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-8">
            The Promise
          </p>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground text-balance leading-tight mb-8">
            This Light Is{" "}
            <span className="text-primary italic noor-text-glow">Yours</span>
          </h2>

          <p className="font-script text-2xl md:text-3xl text-primary/70 mb-4">
            Today, tomorrow, and in every lifetime after
          </p>

          <div className="gold-line h-px w-32 mx-auto my-10" />

          <p className="font-sans text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-14">
            Love is not a destination. It is the walk itself, 
            hand in hand, through every season. 
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <ExitButton />

          <p className="font-sans text-xs text-muted-foreground/50 tracking-wide">
            {"Because every love story deserves to be read again"}
          </p>
        </motion.div>

        {/* Nothing Button moved below promise section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <NothingButton />
        </motion.div>
      </div>
    </section>
  )
}

function ExitButton() {
  const [showGuard, setShowGuard] = useState(false)

  const performReverseZoom = (immediate = false) => {
    const delay = immediate ? 50 : 800
    setTimeout(() => {
      try {
        sessionStorage.setItem('hasSeenExitGuard', 'true')
        sessionStorage.setItem('showExitToast', 'true')
      } catch {}
      // Smooth fade out and navigate
      const el = document.getElementById('noor-dashboard-root')
      if (el) {
        el.style.opacity = '0'
        el.style.transition = 'opacity 0.5s ease-out'
      }
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    }, delay)
  }

  const handleClick = () => {
    try {
      const seen = sessionStorage.getItem('hasSeenExitGuard') === 'true'
      if (!seen) {
        setShowGuard(true)
        return
      }
    } catch {
      // if sessionStorage not available, still show guard once
      setShowGuard(true)
      return
    }
    // already seen, perform reverse zoom immediately
    performReverseZoom()
  }

  return (
    <>
      <NoorButton onClick={handleClick} variant="primary">
        Exit the World
      </NoorButton>

      {showGuard && (
        <ExitGuard
          onStay={() => {
            try {
              sessionStorage.setItem('hasSeenExitGuard', 'true')
            } catch {}
            setShowGuard(false)
          }}
          onLeave={() => {
            setShowGuard(false)
            performReverseZoom()
          }}
        />
      )}
    </>
  )
}
