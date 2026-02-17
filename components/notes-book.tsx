"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const NOTES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/images/notes/Note${i + 1}.jpg`,
  label: `Handwritten Note ${i + 1}`,
}))

export function NotesBook() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const handleNext = () => {
    if (isFlipping || currentIndex >= NOTES.length - 1) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentIndex((prev) => Math.min(prev + 1, NOTES.length - 1))
      setIsFlipping(false)
    }, 500)
  }

  const handlePrev = () => {
    if (isFlipping || currentIndex <= 0) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
      setIsFlipping(false)
    }, 500)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") handleNext()
    if (e.key === "ArrowLeft") handlePrev()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentIndex, isFlipping])

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-background via-background to-background/95 overflow-hidden px-4 md:px-8 py-20">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-6">
            Handwritten Dreams
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance mb-4">
            A Book of{" "}
            <span className="text-primary italic noor-text-glow">Notes</span>
          </h1>
          <p className="font-script text-xl md:text-2xl text-primary/70">
            Written straight from the heart
          </p>
        </motion.div>

        {/* Book Display */}
        <div className="flex flex-col items-center gap-12">
          {/* Book Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-7xl aspect-[8/3] md:aspect-[100/38]"
          >
            {/* Book shadow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-2xl blur-2xl" />

            {/* Book frame */}
            <div className="relative h-full bg-foreground/5 backdrop-blur-sm rounded-2xl border border-primary/20 overflow-hidden shadow-2xl">
              {/* Book spine effect */}
              <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-foreground/10 to-transparent rounded-l-2xl" />

              {/* Page transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                  style={{ perspective: "1000px" }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={NOTES[currentIndex].src}
                      alt={NOTES[currentIndex].label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />

                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none rounded-2xl" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Interactive hint */}
              {currentIndex === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-primary/50 font-script"
                >
                  Swipe or use arrows to flip
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-8 md:gap-16"
          >
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0 || isFlipping}
              className="group relative p-3 rounded-full border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous note"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Page counter */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                <p className="font-sans text-sm font-semibold text-foreground">
                  {currentIndex + 1}
                </p>
                <p className="font-sans text-xs text-muted-foreground/60">of {NOTES.length}</p>
              </div>

              {/* Progress dots */}
              <div className="flex gap-1 mt-2">
                {NOTES.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => {
                      if (!isFlipping) setCurrentIndex(i)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-8 bg-primary"
                        : "w-1.5 bg-muted/40 hover:bg-primary/40"
                    }`}
                    aria-label={`Go to note ${i + 1}`}
                    disabled={isFlipping}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === NOTES.length - 1 || isFlipping}
              className="group relative p-3 rounded-full border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next note"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>

          {/* Info text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-script text-lg md:text-xl text-primary/60 text-center"
          >
            {currentIndex === NOTES.length - 1
              ? "You've reached the last page... but the memories are endless ✨"
              : "Each page holds a moment, a feeling, a memory..."}
          </motion.p>
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <a
            href="/dashboard"
            className="inline-block px-6 py-2 border border-primary/40 text-primary/70 hover:text-primary hover:border-primary/60 rounded-full transition-all duration-300 font-sans text-sm tracking-wider"
          >
            ← Back to Journey
          </a>
        </motion.div>
      </div>
    </div>
  )
}
