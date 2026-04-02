"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Mail } from "lucide-react"

// Letter content - you can replace this with your actual letter
const LETTER_CONTENT = `My Dearest Love,

Every beat of my heart whispers your name, every star in the sky reminds me of your smile. You are the poetry that flows through my veins, the melody that fills my soul, the light that guides me through every darkness.

From the moment our paths crossed, I knew destiny had written our story in the stars. Your eyes hold galaxies I could explore forever, your touch sends electricity through my entire being, and your love makes me believe in miracles.

I cherish every laugh we've shared, every secret we've whispered, every dream we've built together. You see the real me - the me I hide from the world - and you love me anyway. You make me want to be better, to dream bigger, to love deeper.

Thank you for choosing me, for loving me, for being my forever. You are my sunrise and sunset, my calm in the storm, my everything.

Forever yours,
With all my love 💕`

export function LoveLetter() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  const handleEnvelopeClick = () => {
    setIsEnvelopeOpen(true)
    setTimeout(() => setShowLetter(true), 800)
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
                className="mt-12 mx-auto max-w-2xl"
              >
                {/* Letter Paper */}
                <motion.div
                  initial={{ rotateY: 90 }}
                  animate={{ rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 md:p-12 rounded-lg shadow-2xl border border-primary/20 relative overflow-hidden"
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

                  {/* Letter Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="font-serif text-foreground leading-relaxed text-base md:text-lg space-y-4"
                  >
                    {LETTER_CONTENT.split('\n\n').map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                        className="text-justify"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </motion.div>

                  {/* Signature flourish */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 2, ease: "easeOut" }}
                    className="mt-8 flex justify-end"
                  >
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}