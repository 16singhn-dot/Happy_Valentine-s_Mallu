"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StardustTrail } from "@/components/stardust-trail"

// Support both filenames: "Sequence 03.mp4" (space) and "sequence-03.mp4" (hyphen)
const LANDING_VIDEO_PRIMARY = "/videos/Sequence%2003.mp4"   // "Sequence 03.mp4"
const LANDING_VIDEO_FALLBACK = "/videos/sequence-03.mp4"  // "sequence-03.mp4"

interface CinematicLandingProps {
  onEnter: () => void
}

export function CinematicLanding({ onEnter }: CinematicLandingProps) {
  const [textPhase, setTextPhase] = useState<0 | 1 | 2>(0)
  const [isExiting, setIsExiting] = useState(false)
  const [showExitToast, setShowExitToast] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const exitVideoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [videoSrc, setVideoSrc] = useState(LANDING_VIDEO_PRIMARY)

  // Text phase timeline: fade in line 1 -> pause -> swap to line 2
  useEffect(() => {
    const timer1 = setTimeout(() => setTextPhase(1), 800)
    const timer2 = setTimeout(() => setTextPhase(2), 4200)
    // If we arrived here after the reverse-zoom exit, show a tiny toast for 2s
    try {
      if (sessionStorage.getItem('showExitToast') === 'true') {
        setShowExitToast(true)
        sessionStorage.removeItem('showExitToast')
        setTimeout(() => setShowExitToast(false), 2000)
      }
    } catch {}
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Ensure landing video plays — try repeatedly until it works (browsers often block first attempt)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const attemptPlay = () => {
      v.play().catch(() => {})
    }
    const onCanPlay = () => {
      attemptPlay()
    }
    v.addEventListener("canplay", onCanPlay)
    v.addEventListener("loadeddata", attemptPlay)
    // Retry after a short delay (helps when autoplay is delayed)
    const t1 = setTimeout(attemptPlay, 100)
    const t2 = setTimeout(attemptPlay, 500)
    const t3 = setTimeout(attemptPlay, 1500)
    return () => {
      v.removeEventListener("canplay", onCanPlay)
      v.removeEventListener("loadeddata", attemptPlay)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  // When exiting, ensure exit-phase video plays
  useEffect(() => {
    if (!isExiting) return
    const v = exitVideoRef.current
    if (!v) return
    v.play().catch(() => {})
  }, [isExiting])

  const handleEnter = useCallback(() => {
    if (isExiting) return
    setIsExiting(true)
    // Allow the zoom animation to play, then notify parent
    setTimeout(() => onEnter(), 1400)
  }, [isExiting, onEnter])

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="landing"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden min-h-screen min-w-full"
          exit={{
            scale: 8,
            opacity: 0,
            filter: "blur(20px)",
          }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Base layer so something is always visible */}
          <div
            className="absolute inset-0 w-full h-full bg-[#0a0a1a]"
            aria-hidden="true"
          />

          {/* Stardust Trail following cursor */}
          <StardustTrail />

          {/* Video — Sequence 03 (file: public/videos/sequence-03.mp4) */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover"
            style={{ objectFit: "cover", filter: "brightness(0.5)" }}
            aria-hidden="true"
            src={videoSrc}
            onError={() => {
              if (videoSrc === LANDING_VIDEO_PRIMARY) {
                setVideoSrc(LANDING_VIDEO_FALLBACK)
              } else {
                setVideoError(true)
              }
            }}
          />

          {videoError && (
            <div
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0a0a1a] via-[#12121f] to-[#0a0a1a] z-[1]"
              aria-hidden="true"
            />
          )}

          {/* Dark overlay (0.4 opacity) so text is readable but video stays visible */}
          <div
            className="absolute inset-0 bg-black/40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Very subtle vignette only at edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(10,10,26,0.4) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-3xl mx-auto">
            {/* Small decorative line above */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="gold-line h-px w-16 mb-12"
            />

            {/* Text block - Urdu poetry lines */}
            <div className="min-h-[180px] md:min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {textPhase >= 1 && textPhase < 2 && (
                  <motion.h1
                    key="line-1"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(6px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="font-serif text-3xl md:text-5xl lg:text-6xl leading-snug text-foreground text-balance"
                    style={{
                      textShadow: "0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Duniya ke liye ye sirf{" "}
                    <span className="text-primary noor-text-glow italic">
                      ankhein
                    </span>{" "}
                    hain...
                  </motion.h1>
                )}

                {textPhase === 2 && (
                  <motion.h1
                    key="line-2"
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="font-serif text-3xl md:text-5xl lg:text-6xl leading-snug text-foreground text-balance"
                    style={{
                      textShadow: "0 0 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    ...mere liye ye{" "}
                    <span className="text-primary noor-text-glow italic">
                      sukoon
                    </span>{" "}
                    ka rasta hain.
                  </motion.h1>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative line below */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 4.8 }}
              className="gold-line h-px w-24 mt-10 mb-14"
            />

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 5.2 }}
            >
              <button
                onClick={handleEnter}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative inline-flex items-center justify-center px-10 py-4 font-sans text-sm tracking-[0.25em] uppercase text-primary border border-gold/40 bg-transparent transition-all duration-500 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Enter Her World"
              >
                {/* Glow background on hover */}
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  animate={isHovered ? { x: "0%" } : { x: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  aria-hidden="true"
                />

                {/* Pulse ring effect */}
                <motion.span
                  className="absolute inset-0 rounded-none border border-primary/30"
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.15, 1],
                          opacity: [0.6, 0, 0.6],
                        }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />

                {/* Second pulse ring - delayed */}
                <motion.span
                  className="absolute inset-0 rounded-none border border-primary/20"
                  animate={
                    isHovered
                      ? {
                          scale: [1, 1.25, 1],
                          opacity: [0.3, 0, 0.3],
                        }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  aria-hidden="true"
                />

                {/* Golden glow trail */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  animate={
                    isHovered
                      ? {
                          boxShadow: [
                            "0 0 15px rgba(212,175,55,0.2), 0 0 30px rgba(212,175,55,0.1)",
                            "0 0 25px rgba(212,175,55,0.4), 0 0 50px rgba(212,175,55,0.2), 0 0 80px rgba(212,175,55,0.1)",
                            "0 0 15px rgba(212,175,55,0.2), 0 0 30px rgba(212,175,55,0.1)",
                          ],
                        }
                      : {
                          boxShadow:
                            "0 0 10px rgba(212,175,55,0.15), 0 0 20px rgba(212,175,55,0.05)",
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  aria-hidden="true"
                />

                <span className="relative z-10">Enter Her World</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom breath indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.p
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
            >
              Click to begin
            </motion.p>
          </motion.div>
        </motion.div>
      ) : (
        /* Zoom-in exit animation container */
        <motion.div
          key="landing-exit"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: 8,
            opacity: 0,
            filter: "blur(20px)",
          }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Video stays during zoom */}
          <video
            ref={exitVideoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
            aria-hidden="true"
            src={videoSrc}
          />

          <div
            className="absolute inset-0 bg-background/60"
            aria-hidden="true"
          />

          {/* Zooming center focus point */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-primary noor-text-glow font-serif text-4xl"
            >
              Noor
            </motion.div>
          </div>
        </motion.div>
      )}
      {/* Small exit toast (appears when navigated here via the exit flow) */}
      <AnimatePresence>
        {showExitToast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[120] bg-black/70 text-white px-4 py-2 rounded-md text-sm"
          >
            Duniya se laut kar, sukoon yahin mila.
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
