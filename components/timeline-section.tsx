"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Star, Sparkles, Sun, Moon } from "lucide-react"

const milestones = [
  {
    icon: Sparkles,
    date: "The First Glance",
    title: "When Eyes Spoke",
    description:
      "Before a single word was exchanged, something ancient stirred. A recognition. As if two stars, separated by galaxies, finally remembered each other.",
  },
  {
    icon: Heart,
    date: "The First Word",
    title: "Hello Became Everything",
    description:
      "A simple greeting, yet it carried the weight of a thousand unspoken poems. The air shifted. The story had already begun writing itself.",
  },
  {
    icon: Star,
    date: "The First Silence",
    title: "Comfort in Quiet",
    description:
      "The moment silence stopped being empty and started being full. No words needed. Just the sound of two hearts learning to beat in the same rhythm.",
  },
  {
    icon: Sun,
    date: "The First Storm",
    title: "Love Tested, Love Proven",
    description:
      "Rain came, as it always does. But love doesn't fear the storm \u2014 it dances in it. What bends together never breaks.",
  },
  {
    icon: Moon,
    date: "The Forever Vow",
    title: "An Eternal Promise",
    description:
      "Not a contract, but a choice made fresh every morning. To love again. To choose again. To stay, not because you have to, but because there's nowhere else your soul would rather be.",
  },
]

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="relative py-32 md:py-48 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-6">
            Chapters of Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            A Love Written in{" "}
            <span className="text-primary italic noor-text-glow">Moments</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-primary/20 origin-top hidden md:block"
            aria-hidden="true"
          />

          {/* Mobile line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute left-6 top-0 bottom-0 w-px bg-primary/20 origin-top md:hidden"
            aria-hidden="true"
          />

          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon
              const isEven = i % 2 === 0

              return (
                <TimelineMilestone
                  key={i}
                  icon={<Icon className="w-4 h-4" />}
                  date={milestone.date}
                  title={milestone.title}
                  description={milestone.description}
                  index={i}
                  isEven={isEven}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineMilestone({
  icon,
  date,
  title,
  description,
  index,
  isEven,
}: {
  icon: React.ReactNode
  date: string
  title: string
  description: string
  index: number
  isEven: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative flex items-start gap-8 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Dot on line */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary noor-glow-sm z-10 mt-2" aria-hidden="true" />

      {/* Mobile spacer */}
      <div className="w-12 flex-shrink-0 md:hidden" />

      {/* Content */}
      <div className={`md:w-1/2 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
        <div className="flex items-center gap-3 mb-3 text-primary">
          <span className={`${isEven ? "md:order-last md:ml-0" : ""}`}>
            {icon}
          </span>
          <span className="font-sans text-xs tracking-[0.2em] uppercase">
            {date}
          </span>
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-3">{title}</h3>
        <p className="font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Empty side for spacing on desktop */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  )
}
