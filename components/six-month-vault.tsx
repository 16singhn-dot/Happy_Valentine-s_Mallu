"use client"

import { useState, useRef, useEffect } from "react"
import React from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

// Month data
const MONTHS_DATA = [
  {
    title: "The Beginning",
    message: "This was the month I stopped being okay with just talking to you.",
    imageUrl: "/images/vault/month1.jpeg",
    letter: "M",
  },
  {
    title: "The Warmth",
    message: "I found myself smiling at my phone like an idiot. I didn't mind.",
    imageUrl: "/images/vault/Month2.jpeg",
    letter: "E",
  },
  {
    title: "The Realisation",
    message:
      "I noticed the way you laugh before the joke even lands. I've been noticing everything.",
    imageUrl: "/images/vault/Month3.jpeg",
    letter: "R",
  },
  {
    title: "The Comfort",
    message:
      "Somewhere between the late nights and the random calls, you became home.",
    imageUrl: "/images/vault/month4.jpeg",
    letter: "L",
  },
  {
    title: "Sukoon",
    message: "You're not just someone I love. You're where I rest.",
    imageUrl: "/images/vault/month5.jpeg",
    letter: "I",
  },
  {
    title: "Right Now",
    message:
      "Six months. I'd choose every single second of it again. Happy anniversary, Ammu.",
    imageUrl: "/images/vault/month6.jpeg",
    letter: "N",
  },
]

const MERLIN_IMAGE_URL = "/images/vault/merlin.jpeg"

// Crack SVG paths (6 progressive cracks) - realistic glass fracture pattern
const CRACK_PATHS = [
  "M 150 20 Q 155 60 150 100 Q 145 140 155 180 L 160 250",
  "M 80 80 Q 70 130 85 170 Q 95 200 105 240 L 110 290",
  "M 220 70 Q 235 110 225 150 Q 215 190 230 240 L 240 290",
  "M 40 160 Q 60 190 75 230 L 85 280 Q 88 310 85 340",
  "M 260 140 Q 280 170 275 210 L 270 280 Q 265 320 270 360",
  "M 150 260 Q 130 285 140 320 L 155 375 Q 160 390 165 400",
]

export function SixMonthVault() {
  const [revealedMonths, setRevealedMonths] = useState<boolean[]>(
    Array(6).fill(false)
  )
  const [isShattering, setIsShattering] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const slabRef = useRef<HTMLDivElement>(null)

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreenImage) {
        setFullscreenImage(null)
      }
    }

    if (fullscreenImage) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fullscreenImage])

  const allRevealed = revealedMonths.every(Boolean)
  const revealedCount = revealedMonths.filter(Boolean).length

  const handleMonthInView = (index: number) => {
    setRevealedMonths((prev) => {
      const updated = [...prev]
      updated[index] = true
      return updated
    })
  }

  const handleShatter = () => {
    setIsShattering(true)
    // After shatter animation completes, reveal the photo and title
    setTimeout(() => {
      setIsRevealed(true)
    }, 1500)
  }

  return (
    <section className="relative w-full py-24 md:py-32 px-4" ref={containerRef}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20 md:mb-32"
      >
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary/60 mb-6">
          Our Story
        </p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance">
          <span className="text-primary noor-text-glow">6 Months</span> of Us
        </h2>
      </motion.div>

      {/* Main layout: Timeline + Slab */}
      <div className="max-w-5xl mx-auto">
        <div className="relative flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Timeline column */}
          <div className="flex-1 relative">
            {/* Vertical gold line - center on desktop, left on mobile */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute left-1/2 lg:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 origin-top hidden md:block"
              aria-hidden="true"
            />

            {/* Mobile timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute left-4 md:hidden top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 origin-top"
              aria-hidden="true"
            />

            {/* Months */}
            <div className="space-y-24 md:space-y-32">
              {MONTHS_DATA.map((month, index) => (
                <MonthBlock
                  key={index}
                  month={month}
                  index={index}
                  isRevealed={revealedMonths[index]}
                  onInView={() => handleMonthInView(index)}
                  onImageClick={() => setFullscreenImage(month.imageUrl)}
                />
              ))}
            </div>
          </div>

          {/* Merlin Slab - Sticky on desktop, static on mobile */}
          <div className="w-full lg:w-72 flex justify-center">
            <MerlinSlab
              revealedCount={revealedCount}
              allRevealed={allRevealed}
              isShattering={isShattering}
              isRevealed={isRevealed}
              onShatter={handleShatter}
              ref={slabRef}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen image modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            key="fullscreen"
            onClick={() => setFullscreenImage(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.img
              src={fullscreenImage}
              alt="Fullscreen view"
              className="max-w-4xl max-h-[90vh] object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <motion.div
              className="absolute top-6 right-6 text-white/60 text-sm font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Press ESC or click outside to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface MonthBlockProps {
  month: (typeof MONTHS_DATA)[0]
  index: number
  isRevealed: boolean
  onInView: () => void
  onImageClick: () => void
}

function MonthBlock({ month, index, isRevealed, onInView, onImageClick }: MonthBlockProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-15% 0px" })

  const isEven = index % 2 === 0

  // Trigger reveal callback
  if (inView && !isRevealed) {
    onInView()
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isRevealed ? { opacity: 1 } : {}}
      className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-8 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline node */}
      <motion.div
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary noor-glow z-10 mt-6 md:mt-0 flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
        aria-hidden="true"
      />

      {/* Mobile spacer */}
      <div className="w-12 flex-shrink-0 md:hidden" />

      {/* Content wrapper */}
      <div
        className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}
      >
        {/* Month label */}
        <motion.h3
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary noor-text-glow mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Month {index + 1}: {month.title}
        </motion.h3>

        {/* Photo */}
        <motion.div
          onClick={onImageClick}
          className={`mb-6 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ${
            index === 2 ? "-translate-y-6" : ""
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageWithFallback
            src={month.imageUrl}
            alt={`Month ${index + 1}: ${month.title}`}
            className={`w-full max-w-sm mx-auto md:mx-0 aspect-square object-cover rounded-lg border border-primary/20 noor-glow-sm ${
              index === 2 ? "object-[center_25%]" : ""
            }`}
          />
        </motion.div>

        {/* Message */}
        <motion.p
          className="font-serif text-base md:text-lg text-foreground/85 text-center md:text-inherit leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {month.message}
        </motion.p>
      </div>

      {/* Empty side for spacing on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  )
}

interface MerlinSlabProps {
  revealedCount: number
  allRevealed: boolean
  isShattering: boolean
  isRevealed: boolean
  onShatter: () => void
}

const MerlinSlab = React.forwardRef<HTMLDivElement, MerlinSlabProps>(
  ({ revealedCount, allRevealed, isShattering, isRevealed, onShatter }, ref) => {
    const letters = "MERLIN".split("")

    return (
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            key="slab"
            ref={ref}
            className="w-full max-w-xs lg:fixed lg:right-8 lg:top-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {/* Cracked slab */}
            <motion.div
              className="relative w-full aspect-square rounded-lg border-2 border-primary/30 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 flex flex-col items-center justify-center overflow-hidden"
              animate={isShattering ? { x: [-5, 5, -5, 5, 0], scale: 1.05 } : {}}
              transition={
                isShattering ? { duration: 0.3, ease: "easeInOut" } : {}
              }
            >
              {/* Slab texture using box-shadow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  boxShadow: `
                    inset 0 0 30px rgba(212, 175, 55, 0.1),
                    inset 0 2px 5px rgba(255, 255, 255, 0.05),
                    inset 0 -2px 5px rgba(0, 0, 0, 0.5)
                  `,
                }}
                aria-hidden="true"
              />

              {/* Glass cracks - SVG overlays */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 300 300"
                aria-hidden="true"
              >
                {CRACK_PATHS.map((path, i) => (
                  <motion.path
                    key={i}
                    d={path}
                    stroke="rgba(212, 175, 55, 0.4)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      i < revealedCount
                        ? { pathLength: 1, opacity: 0.6 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Main content */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Starting text or letter slots */}
                {revealedCount === 0 ? (
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 1 }}
                    animate={isShattering ? { opacity: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="font-serif text-lg text-primary/60">
                      Hidden Message 😋
                    </p>
                  </motion.div>
                ) : null}

                {/* Letter slots */}
                <div className="flex gap-2 justify-center text-2xl font-bold tracking-widest">
                  {letters.map((letter, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-8 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={i < revealedCount ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 400,
                      }}
                    >
                      {i < revealedCount ? (
                        <span className="text-primary noor-text-glow">
                          {letter}
                        </span>
                      ) : (
                        <span className="text-primary/10">_</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Shatter button - only after all revealed */}
              <AnimatePresence>
                {allRevealed && !isShattering && (
                  <motion.button
                    key="shatter-btn"
                    onClick={onShatter}
                    className="absolute bottom-6 px-6 py-2 bg-transparent border border-primary/50 text-primary text-sm font-sans tracking-widest uppercase hover:bg-primary/10 transition-colors duration-300 rounded noor-glow-sm"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Shatter the slab"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Shatter It
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Status text */}
            <motion.p
              className="text-center text-xs text-primary/50 mt-4 font-sans tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {revealedCount}/6 Revealed
            </motion.p>
          </motion.div>
        ) : (
          // Post-shatter reveal
          <motion.div
            key="reveal"
            className="w-full max-w-xs lg:fixed lg:right-8 lg:top-20 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Shattered fragments */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2
              const distance = 200
              const tx = Math.cos(angle) * distance
              const ty = Math.sin(angle) * distance
              return (
                <motion.div
                  key={`shard-${i}`}
                  className="absolute w-16 h-16 md:w-20 md:h-20 bg-slate-900 border border-primary/30 rounded-sm"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: tx,
                    y: ty,
                    opacity: 0,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    delay: i * 0.05,
                  }}
                  aria-hidden="true"
                />
              )
            })}

            {/* Revealed photo */}
            <motion.div
              className="relative w-full aspect-square rounded-lg overflow-hidden border border-primary/40"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
            >
              <ImageWithFallback
                src={MERLIN_IMAGE_URL}
                alt="Merlin - Your Love Story"
                className="w-full h-full object-cover noor-glow-lg"
              />
            </motion.div>

            {/* Revealed title */}
            <motion.h3
              className="text-center font-serif text-lg md:text-xl text-primary noor-text-glow mt-6 italic text-balance px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Enikku ninne valare snehikkunnu, Ente thanne aayirikkane,
              forever ❤️
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

MerlinSlab.displayName = "MerlinSlab"

// Image component with fallback
interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

function ImageWithFallback({ src, alt, className, ...props }: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div
        className={`bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-primary/20 rounded-lg flex items-center justify-center noor-glow-sm ${className}`}
        {...(props as any)}
      >
        <div className="text-center">
          <div className="text-primary/60 text-sm font-sans tracking-widest">Add Image</div>
          <div className="text-primary/40 text-xs font-sans mt-2 px-2">📁 /public/images/vault/</div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      {...props}
    />
  )
}

export default SixMonthVault
