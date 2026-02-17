"use client"

import { useEffect, useCallback, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Heart } from "lucide-react"
import type { GiftContent } from "@/lib/gift-data"

const VIDEO_FALLBACK = "/videos/sequence-03.mp4"

interface GiftModalProps {
  isOpen: boolean
  onClose: () => void
  gift: GiftContent | null
  giftIndex: number
}

export function GiftModal({
  isOpen,
  onClose,
  gift,
  giftIndex,
}: GiftModalProps) {
  const [videoError, setVideoError] = useState(false)
  const [fallbackFailed, setFallbackFailed] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [videoAspect, setVideoAspect] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Derive displayed src so the video is never null on first paint when modal is open
  const displayVideoSrc =
    isOpen && gift
      ? videoError
        ? VIDEO_FALLBACK
        : gift.videoSrc
      : null

  // Reset error state when opening or switching gifts
  useEffect(() => {
    if (isOpen && gift) {
      setVideoError(false)
      setFallbackFailed(false)
      setAutoplayBlocked(false)
    }
  }, [isOpen, giftIndex, gift?.videoSrc])

  // Auto-play when modal opens: try immediately and when video is ready
  useEffect(() => {
    if (!isOpen || !displayVideoSrc || fallbackFailed) return
    const v = videoRef.current
    if (!v) return
    const doPlay = () => {
      v.play()
        .then(() => setAutoplayBlocked(false))
        .catch(() => setAutoplayBlocked(true))
    }
    doPlay()
    if (v.readyState < 2) {
      v.addEventListener("loadeddata", doPlay, { once: true })
      v.addEventListener("canplay", doPlay, { once: true })
      const t1 = setTimeout(doPlay, 100)
      const t2 = setTimeout(doPlay, 500)
      return () => {
        v.removeEventListener("loadeddata", doPlay)
        v.removeEventListener("canplay", doPlay)
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [isOpen, displayVideoSrc, fallbackFailed])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!gift) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Soft light flash overlay on open (shimmer, not blinding) */}
          <motion.div
            className="absolute inset-0 bg-amber-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} // cubic-bezier easing
            aria-hidden="true"
          />

          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />

          {/* Modal content - Glassmorphism card */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/15 bg-card/30 backdrop-blur-2xl"
            style={{
              boxShadow:
                "0 0 60px rgba(212, 175, 55, 0.08), inset 0 1px 0 rgba(245, 245, 241, 0.05)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Gift ${giftIndex + 1}`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full border border-gold/20 bg-background/40 text-muted-foreground hover:text-foreground hover:border-gold/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close gift"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Inner padding */}
            <div className="p-6 md:p-8">
              {/* Gift number header */}
              <div className="flex items-center gap-3 mb-8">
                <Heart className="w-4 h-4 text-primary animate-pulse-glow" strokeWidth={1.5} />
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {"Tohfa " + (giftIndex + 1)}
                </span>
                <div className="flex-1 gold-line h-px opacity-30" />
              </div>

              {/* Section 1: Khat — handwritten note only */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary/60 mb-4">
                  Khat
                </p>
                {/* Note image with warm, soft lighting to match the site aesthetic */}
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(212, 175, 55, 0.06), 0 0 0 1px rgba(212, 175, 55, 0.08), 0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 60px -20px rgba(212, 175, 55, 0.12)",
                    background: "linear-gradient(145deg, hsl(240 25% 9%) 0%, hsl(240 20% 11%) 100%)",
                  }}
                >
                  <div className="p-3 md:p-4">
                    <img
                      src={`/images/notes/Note${Math.min(giftIndex + 1, 10)}.jpg`}
                      alt={`Handwritten note for Tohfa ${giftIndex + 1}`}
                      className="w-full h-auto object-contain rounded-lg"
                      style={{
                        filter:
                          "brightness(0.92) contrast(1.05) saturate(0.85) sepia(0.08)",
                      }}
                    />
                  </div>
                  {/* Soft vignette so the note sits in the same light as the UI */}
                  <div
                    className="absolute inset-0 pointer-events-none rounded-xl"
                    style={{
                      background:
                        "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 60%, rgba(10, 10, 26, 0.12) 100%)",
                      boxShadow: "inset 0 0 100px -30px rgba(212, 175, 55, 0.04)",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>

              {/* Section 2: Video Player */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary/60 mb-4">
                  The Edit
                </p>
                <div className="relative rounded-xl overflow-hidden border border-gold/10 noor-glow-sm">
                  {fallbackFailed ? (
                    <div className="w-full aspect-video flex items-center justify-center bg-background/50 rounded-xl border border-gold/10">
                      <p className="p-4 font-sans text-sm text-muted-foreground text-center">
                        Video not available yet
                      </p>
                    </div>
                  ) : displayVideoSrc ? (
                    <div
                      className="relative w-full bg-background rounded-xl min-h-[200px]"
                      style={videoAspect ? { aspectRatio: videoAspect } : undefined}
                    >
                      <video
                        key={`${giftIndex}-${displayVideoSrc}`}
                        ref={videoRef}
                        controls
                        playsInline
                        autoPlay
                        preload="auto"
                        className="w-full h-full object-contain rounded-xl"
                        src={displayVideoSrc}
                        onLoadedMetadata={(e) => {
                          const v = e.currentTarget
                          if (v.videoWidth && v.videoHeight) {
                            setVideoAspect(`${v.videoWidth}/${v.videoHeight}`)
                          }
                        }}
                        onPlay={() => setAutoplayBlocked(false)}
                        onError={() => {
                          if (displayVideoSrc !== VIDEO_FALLBACK) {
                            setVideoError(true)
                          } else {
                            setFallbackFailed(true)
                          }
                        }}
                      />
                      {autoplayBlocked && (
                        <button
                          type="button"
                          onClick={() => {
                            videoRef.current?.play().then(() => setAutoplayBlocked(false)).catch(() => {})
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          aria-label="Play video"
                        >
                          <span className="px-5 py-2.5 font-sans text-sm tracking-wider uppercase border border-gold/50 text-primary rounded-sm hover:bg-primary/10 transition-colors">
                            Click to play
                          </span>
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
