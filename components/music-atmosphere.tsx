"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Music } from "lucide-react"

export function MusicAtmosphere() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

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
            Atmosphere
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mb-4 text-balance">
            Music for the{" "}
            <span className="text-primary noor-text-glow">Day</span>
          </h2>
          <p className="font-script text-lg md:text-xl text-foreground/70 leading-relaxed">
            {"\"A collection of songs that sound like you.\""}
          </p>
        </motion.div>

        {/* Spotify Embed Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Outer glow border */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/20 via-gold/5 to-transparent pointer-events-none" />

          <div className="relative rounded-2xl border border-gold/10 bg-card/30 backdrop-blur-sm overflow-hidden p-4 md:p-5">
            {/* Decorative top bar */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gold/8">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 noor-glow-sm">
                <Music className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans text-xs text-foreground/80 font-medium">
                  Noor Playlist
                </p>
                <p className="font-sans text-[10px] text-muted-foreground">
                  Curated with love
                </p>
              </div>
              {/* Animated music bars */}
              <div className="ml-auto flex items-end gap-0.5 h-4" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-primary/40"
                    animate={{
                      height: ["4px", "14px", "6px", "12px", "4px"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Spotify Embed - styled dark to match theme */}
            <div className="rounded-xl overflow-hidden">
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/5WylaG8n8KxuShwVn1YxPX?utm_source=generator&theme=0"
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Noor Playlist - Spotify"
                className="opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            {/* Bottom text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 pt-4 border-t border-gold/8 text-center"
            >
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60">
                Press play. Close your eyes. Think of us.
              </p>
            </motion.div>
          </div>

          {/* Ambient glow beneath */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Additional poetic text below */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="gold-line h-px w-12 mx-auto mb-6 opacity-30" />
          <p className="font-serif text-sm md:text-base text-muted-foreground italic leading-relaxed max-w-lg mx-auto text-balance">
            Kuch gaane hain jo sunke lagta hai, jaise koi apni baat keh raha hai.
            Ye playlist wohi gaane hain.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
