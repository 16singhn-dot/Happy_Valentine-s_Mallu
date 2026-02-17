"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const galleryItems = [
  {
    src: "/images/moment-1.jpg",
    alt: "Hands gently clasped in golden candlelight",
    caption: "The First Touch",
  },
  {
    src: "/images/moment-2.jpg",
    alt: "Two silhouettes under a starlit sky",
    caption: "Under Stars",
  },
  {
    src: "/images/moment-3.jpg",
    alt: "A single rose resting on an open book of poetry",
    caption: "Words Unspoken",
  },
]

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section className="relative py-32 md:py-48 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-6">
            Captured Light
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            Moments of{" "}
            <span className="text-primary italic noor-text-glow">Radiance</span>
          </h2>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-primary/10">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Golden overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
              </div>

              {/* Caption */}
              <motion.p className="mt-4 font-script text-lg text-primary/70 text-center">
                {item.caption}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
