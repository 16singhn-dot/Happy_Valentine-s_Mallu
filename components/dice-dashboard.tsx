"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dice3D } from "@/components/dice-3d"
import { GiftBoxes } from "@/components/gift-boxes"
import { GiftModal } from "@/components/gift-modal"
import { GoldenParticles } from "@/components/golden-particles"
import { SectionDivider } from "@/components/section-divider"
import { MusicAtmosphere } from "@/components/music-atmosphere"
import { ShayariSection } from "@/components/shayari-section"
import { FinalHorizonSection } from "@/components/final-horizon-section"
import { SixMonthVault } from "@/components/six-month-vault"
import { ClosingSection } from "@/components/closing-section"
import { giftContents } from "@/lib/gift-data"
import { usePersistentProgress } from "@/hooks/use-persistent-progress"

const TOTAL_GIFTS = 10

export function DiceDashboard() {
  const {
    openedGiftIndices,
    currentRollGifts,
    isHydrated,
    recordGiftOpened,
    setCurrentRollGifts,
    resetCurrentRoll,
    clearAllProgress,
  } = usePersistentProgress()

  const [activeGiftIndex, setActiveGiftIndex] = useState<number | null>(null)

  // Select which gifts to show based on dice roll
  const selectGiftsForRoll = (diceValue: number) => {
    const unopened = Array.from({ length: TOTAL_GIFTS }, (_, i) => i).filter(
      (i) => !openedGiftIndices.includes(i)
    )

    const count = Math.min(diceValue, unopened.length)
    const selected = unopened.sort(() => Math.random() - 0.5).slice(0, count)
    return selected
  }

  const handleRollComplete = useCallback(
    (value: number) => {
      const gifts = selectGiftsForRoll(value)
      setCurrentRollGifts(gifts)
    },
    [openedGiftIndices, setCurrentRollGifts]
  )

  const handleOpenGift = useCallback(
    (index: number) => {
      recordGiftOpened(index)
      setActiveGiftIndex(index)
    },
    [recordGiftOpened]
  )

  const handleCloseGift = useCallback(() => {
    setActiveGiftIndex(null)
  }, [])

  const handleRollAgain = useCallback(() => {
    resetCurrentRoll()
  }, [resetCurrentRoll])

  // Keyboard shortcut to clear journey (hidden command: Ctrl+Alt+C or Ctrl+C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.altKey && e.key === "c") || (e.ctrlKey && e.key === "c")) {
        clearAllProgress()
        window.location.reload()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [clearAllProgress])

  // Avoid flash of "roll the dice" before we restore persisted state
  if (!isHydrated) {
    return (
      <div className="relative min-h-screen bg-background overflow-hidden">
        <GoldenParticles />
        <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-background/60 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 py-4 md:py-5 text-center">
            <p className="font-sans text-sm text-muted-foreground/60">Loading...</p>
          </div>
        </header>
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="font-sans text-xs tracking-widest text-muted-foreground animate-pulse">Noor</div>
        </main>
      </div>
    )
  }

  const hasRolled = currentRollGifts.length > 0
  const allRollGiftsOpened = currentRollGifts.every((i) => openedGiftIndices.includes(i))
  const journeyComplete = openedGiftIndices.length === TOTAL_GIFTS

  return (
    <div id="noor-dashboard-root" className="relative min-h-screen bg-background overflow-hidden reverse-zoom-animate">
      <GoldenParticles />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-background/60 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className="font-serif text-sm md:text-base lg:text-lg text-foreground/90 italic leading-relaxed text-balance">
              {"\"Har roll ek ittefaq hai, par tumhara milna meri sabse haseen kismat hai.\""}
            </p>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <a
              href="/notes"
              className="px-3 py-1.5 text-xs border border-gold/20 text-muted-foreground hover:text-primary hover:border-gold/40 rounded transition-colors duration-300 whitespace-nowrap"
              title="Read handwritten notes"
            >
              Notes
            </a>
            {hasRolled && !journeyComplete && (
              <button
                onClick={handleRollAgain}
                className="px-3 py-1.5 text-xs border border-gold/20 text-muted-foreground hover:text-primary hover:border-gold/40 rounded transition-colors duration-300 whitespace-nowrap"
                title="Reset dice and roll again"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        {/* Progress indicator */}
        <div className="max-w-5xl mx-auto px-4 pb-2 flex items-center justify-center gap-2">
          <p className="font-sans text-[10px] text-muted-foreground/40 tracking-widest">
            Journey Progress
          </p>
          <div className="flex gap-1">
            {Array.from({ length: TOTAL_GIFTS }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  openedGiftIndices.includes(i) ? "bg-primary noor-glow-sm" : "bg-muted/30"
                }`}
              />
            ))}
          </div>
          <p className="font-sans text-[10px] text-muted-foreground/60">
            {openedGiftIndices.length}/{TOTAL_GIFTS}
          </p>
        </div>
      </header>

      {/* Main content area */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-12 md:pt-20 pb-24">
        {/* Dice Section */}
        <AnimatePresence mode="wait">
          {!hasRolled && !journeyComplete ? (
            <motion.div
              key="dice-intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 mb-16"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
                  Dice of{" "}
                  <span className="text-primary noor-text-glow">Destiny</span>
                </h1>
                <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground">
                  Kismat ka faisla tumhare haathon mein hai
                </p>
              </motion.div>

              {/* 3D Dice */}
              <Dice3D onRollComplete={handleRollComplete} disabled={false} />
            </motion.div>
          ) : hasRolled && !journeyComplete ? (
            <motion.div
              key="dice-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4 mb-12"
            >
              <div className="text-center">
                <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-2 text-balance">
                  Dice of{" "}
                  <span className="text-primary noor-text-glow">Destiny</span>
                </h1>
              </div>

              {/* Small dice display showing count */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg border border-gold/30 bg-card/60 flex items-center justify-center noor-glow-sm">
                  <span className="font-serif text-2xl text-primary noor-text-glow font-bold">
                    {currentRollGifts.length}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    New gifts unlocked
                  </p>
                  <p className="font-serif text-sm text-foreground">
                    {currentRollGifts.length} {currentRollGifts.length === 1 ? "tohfa" : "tohfe"} tumhare naam
                  </p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Gift Boxes Grid */}
        <AnimatePresence>
          {hasRolled && currentRollGifts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full"
            >
              <GiftBoxes
                giftIndices={currentRollGifts}
                onOpenGift={handleOpenGift}
                openedGiftIndices={openedGiftIndices}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roll again hint */}
        {hasRolled && currentRollGifts.length > 0 && allRollGiftsOpened && !journeyComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="gold-line h-px w-16 mx-auto mb-6 opacity-40" />
            <p className="font-serif text-sm italic text-muted-foreground mb-6">
              {`${TOTAL_GIFTS - openedGiftIndices.length} more tohfe await you...`}
            </p>
            <button
              onClick={handleRollAgain}
              className="px-6 py-2 border border-gold/40 text-primary text-xs tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-500 noor-glow-sm hover:noor-glow"
            >
              Roll Again
            </button>
          </motion.div>
        )}

        {/* Music Atmosphere Section */}
        {hasRolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full"
          >
            <SectionDivider />
            <MusicAtmosphere />
          </motion.div>
        )}

        {/* Shayari Section — voice recordings + waveform */}
        {hasRolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full"
          >
            <SectionDivider />
            <ShayariSection />
          </motion.div>
        )}

        {/* Final Horizon footer: Memory Map, Nothing button */}
        {hasRolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="w-full"
          >
            <SectionDivider />
            <FinalHorizonSection litStars={openedGiftIndices.length} />
          </motion.div>
        )}

        {/* Six Month Vault Timeline */}
        {hasRolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="w-full"
          >
            <SectionDivider />
            <SixMonthVault />
          </motion.div>
        )}

      </main>

      {/* Closing Section with Exit Button - positioned at absolute bottom */}
      {hasRolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative w-full"
        >
          <SectionDivider />
          <ClosingSection />
        </motion.div>
      )}

      {/* Gift Modal */}
      <GiftModal
        isOpen={activeGiftIndex !== null}
        onClose={handleCloseGift}
        gift={activeGiftIndex !== null ? giftContents[activeGiftIndex] : null}
        giftIndex={activeGiftIndex ?? 0}
      />
    </div>
  )
}
