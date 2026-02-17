"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"

interface ShayariPlayerProps {
  title: string
  text: string
  audioSrc: string
  onPlayStateChange?: (isPlaying: boolean, title: string) => void
}

export function ShayariPlayer({ title, text, audioSrc, onPlayStateChange }: ShayariPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [revealPercent, setRevealPercent] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
        setProgress(0)
        setRevealPercent(100) // Keep text revealed after completion
        onPlayStateChange?.(false, title)
        if (intervalRef.current) clearInterval(intervalRef.current)
      })
      audioRef.current.addEventListener("error", () => {
        // If audio fails to load, still animate the text reveal
        simulatePlayback()
      })
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPlayStateChange?.(false, title)
      if (intervalRef.current) clearInterval(intervalRef.current)
    } else {
      const playPromise = audioRef.current.play()
      if (playPromise) {
        playPromise.then(() => {
          setIsPlaying(true)
          onPlayStateChange?.(true, title)
          startProgressTracking()
        }).catch(() => {
          // Audio not available, simulate playback for the shayari text reveal
          simulatePlayback()
        })
      }
    }
  }, [isPlaying, audioSrc, title, onPlayStateChange])

  const simulatePlayback = useCallback(() => {
    setIsPlaying(true)
    onPlayStateChange?.(true, title)
    const duration = 8000 // 8 seconds simulated reading time
    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(elapsed / duration, 1)
      setProgress(pct)
      setRevealPercent(pct * 100)
      if (pct >= 1) {
        setIsPlaying(false)
        onPlayStateChange?.(false, title)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, 50)
  }, [title, onPlayStateChange])

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (audioRef.current) {
        const pct = audioRef.current.duration
          ? audioRef.current.currentTime / audioRef.current.duration
          : 0
        setProgress(pct)
        setRevealPercent(pct * 100)
      }
    }, 50)
  }, [])

  // Split text into words for progressive reveal
  const words = text.split(" ")
  const revealedWordCount = Math.ceil((revealPercent / 100) * words.length)

  return (
    <div className="w-full">
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-4 h-4 text-primary/60" strokeWidth={1.5} />
        <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
          {title}
        </span>
      </div>

      {/* Shayari text reveal area */}
      <div className="mb-5 min-h-[60px] p-4 rounded-lg bg-background/40 border border-gold/10">
        <p className="font-script text-lg md:text-xl leading-relaxed">
          {words.map((word, i) => (
            <span key={i}>
              <AnimatePresence>
                {i < revealedWordCount ? (
                  <motion.span
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.4 }}
                    className="text-foreground"
                  >
                    {word}
                  </motion.span>
                ) : (
                  <span className="text-muted-foreground/20">{word}</span>
                )}
              </AnimatePresence>
              {" "}
            </span>
          ))}
        </p>
      </div>

      {/* Player controls */}
      <div className="flex items-center gap-4">
        {/* Play/pause button */}
        <motion.button
          onClick={togglePlay}
          className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gold/30 bg-card/60 text-primary transition-colors hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pause shayari" : "Play shayari"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" strokeWidth={2} />
          ) : (
            <Play className="w-4 h-4 ml-0.5" strokeWidth={2} />
          )}

          {/* Rotating ring when playing */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
          )}
        </motion.button>

        {/* Progress bar */}
        <div className="flex-1 h-1 rounded-full bg-muted/30 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary/60"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress percentage */}
        <span className="font-sans text-[10px] tracking-wider text-muted-foreground tabular-nums w-8 text-right">
          {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  )
}
