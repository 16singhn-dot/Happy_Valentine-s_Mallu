"use client"

import { motion } from "framer-motion"
import { NoorButton } from "./noor-button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Radial glow behind heading */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Small overline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-8"
        >
          A Valentine{"'"}s Ode
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight text-foreground text-balance"
        >
          Every Soul Has a
          <br />
          <span className="text-primary noor-text-glow italic">Light</span> That
          <br />
          Never Fades
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-script text-2xl md:text-3xl text-primary/80 mt-8 mb-4"
        >
          Noor
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="gold-line h-px w-48 mx-auto mb-10"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-sans text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-12"
        >
          A celebration of love{"'"}s quiet radiance. The kind that lives
          in stolen glances, whispered words, and the warmth of a hand
          held in the dark.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <NoorButton href="#letter">Begin the Journey</NoorButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border border-primary/30 rounded-full flex justify-center pt-1.5"
          >
            <motion.div className="w-1 h-2 rounded-full bg-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
