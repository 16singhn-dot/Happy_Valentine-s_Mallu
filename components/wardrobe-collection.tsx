"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const wardrobeItems = [
  {
    name: "Malmal",
    urdu: "ململ",
    subtitle: "The Whisper of White",
    description: "Ethereal, weightless, like a dream that refuses to end.",
    image: "/images/wardrobe-malmal.jpg",
  },
  {
    name: "Resham",
    urdu: "ریشم",
    subtitle: "The Language of Silk",
    description: "Rich, luminous, the way light moves when you enter a room.",
    image: "/images/wardrobe-resham.jpg",
  },
  {
    name: "Khaddar",
    urdu: "کھدر",
    subtitle: "The Earth Remembers",
    description: "Grounded, textured, authentic like a handwritten letter.",
    image: "/images/wardrobe-khaddar.jpg",
  },
]

export function WardrobeCollection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-primary/60 mb-4">
            Wardrobe
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
            A Collection of{" "}
            <span className="text-primary noor-text-glow">Fabrics</span>
          </h2>
          <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Har kapde mein ek kahani hai, aur har kahani tumhari hai.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {wardrobeItems.map((item, index) => (
            <WardrobeCard
              key={item.name}
              item={item}
              index={index}
              isInView={isInView}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            />
          ))}
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="font-script text-xl md:text-2xl text-foreground/80 leading-relaxed">
            {"\"Achcha lagna, tum par achcha lagta hai.\""}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function WardrobeCard({
  item,
  index,
  isInView,
  isExpanded,
  onToggle,
}: {
  item: (typeof wardrobeItems)[0]
  index: number
  isInView: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left group relative rounded-xl border border-gold/10 bg-card/40 backdrop-blur-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors hover:border-gold/25"
        animate={{
          height: isExpanded ? "auto" : undefined,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-expanded={isExpanded}
        aria-label={`${item.name} - ${item.subtitle}`}
      >
        {/* Collapsed state - minimal elegant card */}
        <div className="p-6 md:p-7">
          {/* Urdu script accent */}
          <span className="absolute top-5 right-5 font-serif text-2xl text-primary/10 select-none" aria-hidden="true">
            {item.urdu}
          </span>

          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-primary/50 mb-3">
            {"0" + (index + 1)}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1.5 group-hover:text-primary transition-colors duration-500">
            {item.name}
          </h3>
          <p className="font-sans text-xs text-muted-foreground tracking-wide">
            {item.subtitle}
          </p>

          {/* Expand indicator */}
          <motion.div
            className="mt-4 flex items-center gap-2"
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="gold-line h-px w-6 opacity-30" />
            <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50">
              Tap to reveal
            </span>
          </motion.div>
        </div>

        {/* Expanded state - image + description */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          {/* Image */}
          <div className="relative mx-4 mb-4 rounded-lg overflow-hidden noor-glow-sm aspect-[4/5]">
            <Image
              src={item.image}
              alt={`${item.name} style`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
          </div>

          {/* Description */}
          <div className="px-6 pb-6">
            <p className="font-sans text-sm text-foreground/70 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>

        {/* Bottom glow line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    </motion.div>
  )
}
