"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const poemStanzas = [
  [
    "I did not find you by looking",
    "nor by waiting at the edge of silence \u2014",
    "you arrived the way dawn does:",
    "gently, then all at once.",
  ],
  [
    "Your name is written in the language",
    "of rivers and old prayers,",
    "of candle smoke rising",
    "into rooms no one else remembers.",
  ],
  [
    "When the world forgets to be kind,",
    "I return to the sound of your breathing,",
    "the cathedral of your arms,",
    "and every wound learns a new word: home.",
  ],
]

export function PoemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="relative py-32 md:py-48 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto text-center">
        {/* Section header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-6"
        >
          An Original Verse
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-16 text-balance"
        >
          The Way{" "}
          <span className="text-primary italic noor-text-glow">Light</span>{" "}
          Arrives
        </motion.h2>

        {/* Poem stanzas */}
        <div className="space-y-12">
          {poemStanzas.map((stanza, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + si * 0.3 }}
              className="space-y-1"
            >
              {stanza.map((line, li) => (
                <p
                  key={li}
                  className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed italic"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Ornamental ending */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="gold-line h-px w-12" />
          <span className="text-primary text-2xl" aria-hidden="true">
            {"*"}
          </span>
          <div className="gold-line h-px w-12" />
        </motion.div>
      </div>
    </section>
  )
}
