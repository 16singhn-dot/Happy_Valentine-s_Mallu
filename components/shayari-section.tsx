"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Mic2 } from "lucide-react"

const SHAYARI_TRACKS = [
  { id: 1, src: "/audio/shayari1.mp3", label: "Tum Khwaab Ho Mera" },
  { id: 2, src: "/audio/shayari2.mp3", label: "Farishtoon" },
  { id: 3, src: "/audio/shayari3.mp3", label: "Sabse Haseen Rup" },
  { id: 4, src: "/audio/shayari4.mp3", label: "Tera Paigaam" },
  { id: 5, src: "/audio/shayari5.mp3", label: "Aakhein Tumhe Dhundhti Hai" },
  { id: 6, src: "/audio/shayari6.mp3", label: "Kaise Tum Itni Pyaari Ho" },
  { id: 7, src: "/audio/shayari7.mp3", label: "Ishq Ke Dariya Mein Utre" },
  { id: 8, src: "/audio/shayari8.mp3", label: "Aap Ghar Ho Mera" },
  { id: 9, src: "/audio/shayari9.mp3", label: "Aakhri Khwahish" },
  { id: 10, src: "/audio/shayari10.mp3", label: "Tum Par Sab Acha Lagta Hai" },
]

const WAVEFORM_BARS = 36

export function ShayariSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  const [playingId, setPlayingId] = useState<number | null>(null)
  const [waveform, setWaveform] = useState<number[]>(Array(WAVEFORM_BARS).fill(0.12))
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const rafRef = useRef<number>(0)
  const dataArrayRef = useRef<Uint8Array | null>(null)

  const stopCurrent = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
      audioRef.current = null
    }
    if (ctxRef.current?.state !== "closed") {
      ctxRef.current?.close().catch(() => {})
      ctxRef.current = null
    }
    analyserRef.current = null
    dataArrayRef.current = null
    setPlayingId(null)
    setWaveform(Array(WAVEFORM_BARS).fill(0.12))
  }, [])

  const playTrack = useCallback(
    (id: number) => {
      const track = SHAYARI_TRACKS.find((t) => t.id === id)
      if (!track) return

      if (playingId === id) {
        stopCurrent()
        return
      }

      stopCurrent()

      const audio = new Audio(track.src)
      audioRef.current = audio

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      ctxRef.current = ctx

      const source = ctx.createMediaElementSource(audio)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.6
      source.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.fftSize)
      dataArrayRef.current = dataArray

      setPlayingId(id)

      audio.addEventListener("ended", () => stopCurrent())
      audio.addEventListener("error", () => stopCurrent())

      function updateWaveform() {
        if (!analyserRef.current || !dataArrayRef.current) return
        analyserRef.current.getByteTimeDomainData(dataArrayRef.current)
        const arr = dataArrayRef.current
        const step = Math.max(1, Math.floor(arr.length / WAVEFORM_BARS))
        const next = Array.from({ length: WAVEFORM_BARS }, (_, i) => {
          let sum = 0
          const start = i * step
          for (let j = 0; j < step && start + j < arr.length; j++) {
            const v = arr[start + j]
            sum += Math.abs((v - 128) / 128)
          }
          const avg = sum / step
          return Math.min(1, 0.2 + avg * 0.8)
        })
        setWaveform(next)
        rafRef.current = requestAnimationFrame(updateWaveform)
      }

      const startVisualizer = () => {
        rafRef.current = requestAnimationFrame(updateWaveform)
      }

      audio.addEventListener("playing", startVisualizer, { once: true })

      ctx.resume().then(() => {
        audio.play().catch(() => stopCurrent())
      })
      rafRef.current = requestAnimationFrame(updateWaveform)
    },
    [playingId, stopCurrent]
  )

  useEffect(() => {
    return () => stopCurrent()
  }, [stopCurrent])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4">
            Voice
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
            <span className="text-primary noor-text-glow">Shayari</span>
          </h2>
          <p className="font-script text-lg md:text-xl text-foreground/70 leading-relaxed">
            {"\"In your voice, every word is a verse.\""}
          </p>
        </motion.div>

        {/* Waveform + card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/20 via-gold/5 to-transparent pointer-events-none" />
          <div className="relative rounded-2xl border border-gold/10 bg-card/30 backdrop-blur-sm overflow-hidden p-6 md:p-8">
            {/* Waveform visualizer — bars animate with audio */}
            <div
              className="flex items-end justify-center gap-1 h-20 md:h-24 mb-8"
              style={{ minHeight: "5rem" }}
              aria-hidden="true"
            >
              {waveform.map((h, i) => (
                <motion.div
                  key={i}
                  className="w-2 rounded-full bg-primary/60 flex-shrink-0"
                  style={{
                    height: `${Math.max(8, Math.round(h * 100))}%`,
                    maxHeight: "100%",
                    boxShadow: playingId !== null ? "0 0 10px rgba(212, 175, 55, 0.35)" : "none",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              ))}
            </div>

            {/* Track list */}
            <div className="space-y-2">
              {SHAYARI_TRACKS.map((track, index) => {
                const isPlaying = playingId === track.id
                return (
                  <motion.button
                    key={track.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    onClick={() => playTrack(track.id)}
                    className={`w-full flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isPlaying
                        ? "border-primary/30 bg-primary/10"
                        : "border-gold/10 bg-background/30 hover:border-gold/20 hover:bg-background/50"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                        isPlaying ? "border-primary/50 bg-primary/20" : "border-gold/20 bg-card/60"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 text-primary" strokeWidth={2} />
                      ) : (
                        <Play className="w-4 h-4 text-primary ml-0.5" strokeWidth={2} />
                      )}
                    </div>
                    <div className="flex-1 flex items-center gap-3 min-w-0">
                      <Mic2 className="w-4 h-4 text-primary/50 flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-sm md:text-base text-foreground truncate">
                        {track.label}
                      </span>
                    </div>
                    {isPlaying && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-sans text-[10px] tracking-wider text-primary/80 uppercase"
                      >
                        Playing
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 text-center mt-6">
              Tap to play — one at a time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
