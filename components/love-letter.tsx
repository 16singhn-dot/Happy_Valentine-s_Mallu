"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Mail, ChevronLeft, ChevronRight } from "lucide-react"

// Letter pages - your handwritten letter images
const LETTER_PAGES = [
  "/images/vault/pg1.jpeg",
  "/images/vault/pg2.jpeg",
  "/images/vault/pg3.jpeg"
]

export function LoveLetter() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true)
    setTimeout(() => setShowLetter(true), 800)
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % LETTER_PAGES.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + LETTER_PAGES.length) % LETTER_PAGES.length)
  }

  return (
    <section className="relative w-full py-24 md:py-32 px-4" ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 md:mb-32"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 text-primary noor-text-glow mb-4"
        >
          <Heart className="w-6 h-6 fill-current" />
          <span className="font-serif text-2xl md:text-3xl">A Letter From My Heart</span>
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground/70 text-lg max-w-2xl mx-auto"
        >
          Words that come straight from my soul, written just for you
        </motion.p>
      </motion.div>

      {/* Envelope Container */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          {/* Envelope */}
          <motion.div
            onClick={handleEnvelopeClick}
            className={`relative mx-auto w-80 h-56 md:w-96 md:h-64 cursor-pointer transition-all duration-500 ${
              isEnvelopeOpen ? 'cursor-default' : 'hover:scale-105'
            }`}
            whileHover={!isEnvelopeOpen ? { scale: 1.05 } : {}}
            whileTap={!isEnvelopeOpen ? { scale: 0.95 } : {}}
          >
            {/* Envelope Back */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/30 rounded-lg shadow-2xl noor-glow-sm"
              animate={isEnvelopeOpen ? {
                rotateX: 180,
                y: -20,
                opacity: 0.3
              } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Envelope Front */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/15 to-primary/10 border-2 border-primary/40 rounded-lg shadow-xl noor-glow"
              animate={isEnvelopeOpen ? {
                rotateX: -15,
                y: 10
              } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-primary/40 to-primary/20 rounded-t-lg origin-bottom"
                animate={isEnvelopeOpen ? {
                  rotateX: -180,
                  y: -40
                } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Heart Seal */}
              <motion.div
                className="absolute top-2 right-4 w-8 h-8"
                animate={isEnvelopeOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Heart className="w-full h-full fill-primary text-primary" />
              </motion.div>

              {/* Click prompt */}
              <AnimatePresence>
                {!isEnvelopeOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-center"
                    >
                      <Mail className="w-12 h-12 mx-auto mb-2 text-primary/60" />
                      <p className="text-primary/80 font-serif text-sm">Click to open</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Letter Content */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mt-12 mx-auto max-w-4xl"
              >
                {/* Letter Pages Container */}
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 md:p-8 rounded-lg shadow-2xl border border-primary/20 relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 opacity-20"
                  >
                    <Sparkles className="w-6 h-6 text-primary" />
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-4 left-4 opacity-20"
                  >
                    <Heart className="w-5 h-5 text-primary" />
                  </motion.div>

                  {/* Page Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.button
                      onClick={prevPage}
                      disabled={LETTER_PAGES.length <= 1}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-5 h-5 text-primary" />
                    </motion.button>

                    <div className="text-primary/80 font-serif text-sm">
                      Page {currentPage + 1} of {LETTER_PAGES.length}
                    </div>

                    <motion.button
                      onClick={nextPage}
                      disabled={LETTER_PAGES.length <= 1}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-5 h-5 text-primary" />
                    </motion.button>
                  </div>

                  {/* Letter Image */}
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <img
                      src={LETTER_PAGES[currentPage]}
                      alt={`Letter Page ${currentPage + 1}`}
                      className="w-full h-auto rounded-lg shadow-lg border border-primary/10"
                      style={{ maxHeight: '70vh', objectFit: 'contain' }}
                    />
                  </motion.div>

                  {/* Page indicators */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {LETTER_PAGES.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentPage(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentPage ? 'bg-primary' : 'bg-primary/30'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}