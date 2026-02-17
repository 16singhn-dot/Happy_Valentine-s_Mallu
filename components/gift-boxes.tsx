"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"

interface GiftBoxesProps {
  giftIndices: number[]
  onOpenGift: (index: number) => void
  openedGiftIndices: number[]
}

export function GiftBoxes({ giftIndices, onOpenGift, openedGiftIndices }: GiftBoxesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center font-serif text-lg md:text-xl text-foreground mb-2"
      >
        Tumhari kismat ne{" "}
        <span className="text-primary noor-text-glow font-bold">{giftIndices.length}</span>{" "}
        tohfe chuney hain
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-10"
      >
        Har ek mein ek kahaani hai
      </motion.p>

      <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
        {giftIndices.map((giftIndex, displayIndex) => {
          const isOpened = openedGiftIndices.includes(giftIndex)
          const isNew = !isOpened // Newly unlocked if not yet opened
          return (
            <motion.div
              key={giftIndex}
              initial={{ opacity: 0, scale: 0, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.6 + displayIndex * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              {/* Shimmer border for new gifts */}
              {isNew && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)",
                    borderRadius: "8px",
                    padding: "2px",
                    zIndex: -1,
                  }}
                  animate={{ opacity: [0.15, 0.45, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden="true"
                />
              )}

              <motion.button
                onClick={() => onOpenGift(giftIndex)}
                disabled={isOpened}
                className={`relative group flex flex-col items-center justify-center w-32 h-36 md:w-40 md:h-44 rounded-lg border transition-all duration-500 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isOpened
                    ? "border-primary/30 bg-primary/5"
                    : isNew
                      ? "border-primary/60 bg-card/60 backdrop-blur-sm hover:border-primary/80 noor-glow-sm"
                      : "border-gold/20 bg-card/60 backdrop-blur-sm hover:border-primary/50"
                }`}
                whileHover={!isOpened ? { scale: 1.05, y: -4 } : {}}
                whileTap={!isOpened ? { scale: 0.95 } : {}}
                aria-label={`Gift box ${giftIndex + 1}${isOpened ? " (opened)" : ""}`}
              >
                {/* Glow effect on hover */}
                {!isOpened && (
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 noor-glow" aria-hidden="true" />
                )}

                {/* Gift icon */}
                <motion.div
                  animate={!isOpened ? { y: [0, -3, 0] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: displayIndex * 0.3 }}
                >
                  <Gift
                    className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-300 ${
                      isOpened ? "text-primary/40" : isNew ? "text-primary noor-text-glow" : "text-primary group-hover:noor-text-glow"
                    }`}
                    strokeWidth={1.2}
                  />
                </motion.div>

                {/* Number label */}
                <span className={`mt-3 font-serif text-base md:text-lg ${
                  isOpened ? "text-muted-foreground" : "text-foreground"
                }`}>
                  {isOpened ? "Khula" : `Tohfa ${giftIndex + 1}`}
                </span>

                {/* Subtle shimmer for unopened gifts */}
                {!isOpened && (
                  <motion.div
                    className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
                    aria-hidden="true"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: displayIndex * 0.5 }}
                    />
                  </motion.div>
                )}
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
