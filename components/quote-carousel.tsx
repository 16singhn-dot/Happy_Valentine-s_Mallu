"use client"

import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const quotes = [
  {
    text: "I have loved you in numberless forms, numberless times, in life after life, in age after age forever.",
    author: "Rabindranath Tagore",
  },
  {
    text: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Bront\u00eb",
  },
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou",
  },
  {
    text: "Love is not love which alters when it alteration finds. It is an ever-fixed mark that looks on tempests and is never shaken.",
    author: "William Shakespeare",
  },
  {
    text: "The minute I heard my first love story, I started looking for you, not knowing how blind that was. Lovers don't finally meet somewhere. They're in each other all along.",
    author: "Rumi",
  },
]

export function QuoteCarousel() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % quotes.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(next, 8000)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="relative py-32 md:py-48 px-6" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/3 blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto relative">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-16 text-center"
        >
          Echoes of Love
        </motion.p>

        {/* Quote area */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="text-center px-4"
            >
              {/* Opening quote mark */}
              <span className="block font-serif text-6xl text-primary/30 mb-4 leading-none" aria-hidden="true">
                {"\u201C"}
              </span>

              <p className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed text-balance mb-8">
                {quotes[current].text}
              </p>

              {/* Divider */}
              <div className="gold-line h-px w-16 mx-auto mb-6" />

              <p className="font-sans text-sm tracking-[0.15em] uppercase text-primary/70">
                {quotes[current].author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all duration-300 hover:noor-glow-sm"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "bg-primary w-6 noor-glow-sm"
                    : "bg-primary/20 hover:bg-primary/40"
                }`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/40 transition-all duration-300 hover:noor-glow-sm"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
