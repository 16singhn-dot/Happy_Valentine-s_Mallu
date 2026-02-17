"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "./sparkles"

interface MemoryConstellationProps {
  litStars: number // 0..10
}

// 10 star positions arranged in a heart shape (normalized 0-1 coords)
const HEART_STARS: { x: number; y: number }[] = [
  { x: 0.50, y: 0.22 }, // top center
  { x: 0.30, y: 0.15 }, // upper-left lobe
  { x: 0.15, y: 0.28 }, // left peak
  { x: 0.18, y: 0.48 }, // mid-left
  { x: 0.30, y: 0.65 }, // lower-left
  { x: 0.70, y: 0.15 }, // upper-right lobe
  { x: 0.85, y: 0.28 }, // right peak
  { x: 0.82, y: 0.48 }, // mid-right
  { x: 0.70, y: 0.65 }, // lower-right
  { x: 0.50, y: 0.82 }, // bottom point
]

// The line order that traces the heart shape
const HEART_LINE_ORDER = [2, 1, 0, 5, 6, 7, 8, 9, 4, 3, 2]

export function MemoryConstellation({ litStars }: MemoryConstellationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const transitionTimeRef = useRef<number>(0)
  const [dimensions, setDimensions] = useState({ w: 400, h: 400 })
  const allComplete = litStars >= 10
  const [isTextClicked, setIsTextClicked] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (parent) {
      const rect = parent.getBoundingClientRect()
      const size = Math.min(rect.width, 400)
      setDimensions({ w: size, h: size })
      canvas.width = size * 2 // retina
      canvas.height = size * 2
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const padX = w * 0.1
    const padY = h * 0.08
    const drawW = w - padX * 2
    const drawH = h - padY * 2

    const getPos = (i: number) => ({
      x: padX + HEART_STARS[i].x * drawW,
      y: padY + HEART_STARS[i].y * drawH,
    })

    const animate = () => {
      timeRef.current += 0.016
      const t = timeRef.current
      
      // Update transition time if we're in a transition
      if (showSparkles) {
        transitionTimeRef.current += 16 // ~16ms per frame
      }
      
      ctx.clearRect(0, 0, w, h)

      // Draw connection lines (only between lit stars when all complete)
      if (allComplete) {
        ctx.beginPath()
        const first = getPos(HEART_LINE_ORDER[0])
        ctx.moveTo(first.x, first.y)
        for (let i = 1; i < HEART_LINE_ORDER.length; i++) {
          const p = getPos(HEART_LINE_ORDER[i])
          ctx.lineTo(p.x, p.y)
        }
        ctx.closePath()
        const lineAlpha = 0.4 + 0.15 * Math.sin(t * 1.5)
        ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha})`
        ctx.lineWidth = 1.5
        ctx.shadowColor = "rgba(212, 175, 55, 0.6)"
        ctx.shadowBlur = 8
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Draw stars
      for (let i = 0; i < 10; i++) {
        const pos = getPos(i)
        const isLit = i < litStars

        if (isLit) {
          // Lit star: golden radiance
          const pulseSize = 1 + 0.2 * Math.sin(t * 2 + i * 0.7)
          const radius = 5 * pulseSize

          // Outer glow
          const outerGrad = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, radius * 4
          )
          outerGrad.addColorStop(0, "rgba(212, 175, 55, 0.3)")
          outerGrad.addColorStop(0.5, "rgba(212, 175, 55, 0.08)")
          outerGrad.addColorStop(1, "rgba(212, 175, 55, 0)")
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = outerGrad
          ctx.fill()

          // Core glow
          const coreGrad = ctx.createRadialGradient(
            pos.x, pos.y, 0,
            pos.x, pos.y, radius
          )
          coreGrad.addColorStop(0, "rgba(245, 245, 241, 0.95)")
          coreGrad.addColorStop(0.4, "rgba(212, 175, 55, 0.8)")
          coreGrad.addColorStop(1, "rgba(212, 175, 55, 0)")
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = coreGrad
          ctx.fill()
        } else {
          // Dim star: subtle dot
          const dimPulse = 0.15 + 0.08 * Math.sin(t + i * 1.2)
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 175, 55, ${dimPulse})`
          ctx.fill()
        }
      }

      // Draw "N" initial in the center when all complete
      if (allComplete) {
        const centerX = w / 2
        const centerY = padY + HEART_STARS[0].y * drawH + drawH * 0.22
        const nAlpha = 0.7 + 0.3 * Math.sin(t * 1.2)

        // Adjust font size based on text being displayed
        const fontSize = isTextClicked ? w * 0.05 : w * 0.07
        ctx.font = `italic bold ${fontSize}px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.shadowColor = "rgba(212, 175, 55, 0.8)"
        ctx.shadowBlur = 20
        
        // Calculate fade effect for transition (1200ms transition time)
        const transitionDuration = 1200 // ms
        const fadeInTime = 400 // ms for fade in
        const fadeOutTime = 400 // ms for fade out
        const fadeAlpha = transitionTimeRef.current <= fadeOutTime 
          ? 1 - (transitionTimeRef.current / fadeOutTime) // Fade out
          : transitionTimeRef.current <= fadeOutTime + (transitionDuration - fadeOutTime - fadeInTime)
          ? 0 // Stay invisible
          : (transitionTimeRef.current - (fadeOutTime + (transitionDuration - fadeOutTime - fadeInTime))) / fadeInTime // Fade in
        
        const displayAlpha = Math.max(0, Math.min(1, fadeAlpha))
        
        // Show appropriate text based on click state with fade effect
        if (isTextClicked) {
          // Draw Malayalam text on two lines with fade effect
          const lineHeight = fontSize * 1.4
          const line1 = "Ninne njan oruppadu"
          const line2 = "snehikkunnundu"
          ctx.fillStyle = `rgba(212, 175, 55, ${nAlpha * displayAlpha})`
          ctx.fillText(line1, centerX, centerY - lineHeight * 0.35)
          ctx.fillText(line2, centerX, centerY + lineHeight * 0.35)
        } else {
          // Draw English text on one line
          ctx.fillStyle = `rgba(212, 175, 55, ${nAlpha})`
          ctx.fillText("I LOVE YOU", centerX, centerY)
        }
        ctx.shadowBlur = 0
      }

      // Tiny ambient sparkles
      for (let i = 0; i < 20; i++) {
        const sx = (Math.sin(t * 0.3 + i * 47.1) * 0.5 + 0.5) * w
        const sy = (Math.cos(t * 0.2 + i * 31.7) * 0.5 + 0.5) * h
        const sAlpha = 0.03 + 0.03 * Math.sin(t * 1.5 + i)
        ctx.beginPath()
        ctx.arc(sx, sy, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${sAlpha})`
        ctx.fill()
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameRef.current)
  }, [litStars, allComplete, isTextClicked, showSparkles])

  // Handle click on canvas to transition text
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !allComplete || isTextClicked) return

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if click is near the center text area (within ~100px)
      const centerX = dimensions.w / 2
      const centerY = dimensions.w / 2
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

      if (distance < 100) {
        transitionTimeRef.current = 0 // Reset transition time
        setShowSparkles(true)
        setTimeout(() => {
          setIsTextClicked(true)
          setShowSparkles(false)
        }, 1200) // Extended animation duration for smoother fade effect
      }
    }

    canvas.addEventListener("click", handleCanvasClick)
    return () => canvas.removeEventListener("click", handleCanvasClick)
  }, [allComplete, isTextClicked, dimensions.w])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: dimensions.w, height: dimensions.w }}>
        <canvas
          ref={canvasRef}
          style={{ 
            width: dimensions.w, 
            height: dimensions.w,
            cursor: allComplete && !isTextClicked ? "pointer" : "default"
          }}
          className="block"
          aria-label={`Memory constellation: ${litStars} of 10 stars lit${allComplete ? ", heart complete with N glowing" : ""}`}
          role="img"
        />
        {showSparkles && <Sparkles isActive={true} />}
      </div>

      {/* Progress label */}
      <div className="text-center">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
          Memory Map
        </p>
        <p className="font-serif text-sm text-foreground/70">
          {allComplete ? (
            <span className="text-primary noor-text-glow">
              Saare sitaare roshan ho gaye. Ye dil sirf tumhara hai.
            </span>
          ) : (
            <>
              <span className="text-primary">{litStars}</span>
              <span className="text-muted-foreground">{" / 10 "}</span>
              <span className="text-foreground/50 italic">yaadein roshan</span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
