"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Background image when "Don't Click" is opened (exposure 0.5)
const DONTCLICK_BG_IMAGE = "/images/dont-click-bg.png"

export function NothingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSecondHalf, setShowSecondHalf] = useState(false)

  const handleClick = useCallback(() => {
    setShowSecondHalf(false)
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setShowSecondHalf(false)
  }, [])

  // 2-second delay for second half of text
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      setShowSecondHalf(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [isOpen])

  return (
    <>
      {/* The tiny, almost hidden button — far-right corner */}
      <button
        type="button"
        onClick={handleClick}
        className="font-sans text-[8px] md:text-[9px] text-muted-foreground/55 hover:text-muted-foreground/75 transition-colors duration-700 cursor-pointer select-none tracking-widest"
        aria-label="A hidden message"
      >
        Don&apos;t click.
      </button>

      {/* The Nothing Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-6"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label="A poetic reflection"
          >
            {/* Background image - only show when second half appears */}
            <AnimatePresence>
              {showSecondHalf && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.2 }}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${DONTCLICK_BG_IMAGE})`,
                    filter: "brightness(0.7) contrast(1.2) saturate(1.3)",
                  }}
                  aria-hidden="true"
                />
              )}
            </AnimatePresence>
            {/* Subtle overlay for text contrast */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/20 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 max-w-lg w-full text-center py-16 px-8"
            >
              {/* Decorative top line */}
              <div className="gold-line h-px w-10 mx-auto mb-10 opacity-30" />

              {/* First half — always visible */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-lg md:text-xl lg:text-2xl text-foreground italic leading-relaxed"
                style={{
                  textShadow: "0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.15)",
                }}
              >
                What am I thinking about right now?
              </motion.p>

              {/* Pause indicator */}
              <AnimatePresence>
                {!showSecondHalf && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-center gap-1.5 mt-8"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-primary/50"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Second half — appears after 2 seconds */}
              <AnimatePresence>
                {showSecondHalf && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="mt-8"
                  >
                    <p
                      className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary font-medium leading-snug text-balance"
                      style={{
                        textShadow: "0 0 30px rgba(212, 175, 55, 0.5), 0 0 60px rgba(212, 175, 55, 0.25)",
                      }}
                    >
                      Nothing...
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="font-script text-base md:text-lg text-foreground mt-6 leading-relaxed"
                      style={{
                        textShadow: "0 0 15px rgba(212, 175, 55, 0.2), 0 0 30px rgba(212, 175, 55, 0.1)",
                      }}
                    >
                      because Nothing is just another word for you.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative bottom line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showSecondHalf ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="gold-line h-px w-10 mx-auto mt-12 opacity-30"
              />

              {/* Close hint */}
              {showSecondHalf && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                  className="font-sans text-[9px] tracking-[0.3em] uppercase text-muted-foreground/30 mt-8"
                >
                  tap anywhere to close
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
