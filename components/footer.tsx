"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Heart } from "lucide-react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <footer ref={ref} className="relative py-16 px-6 border-t border-primary/5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-3 h-3 text-primary/40" />
        </div>

        <p className="font-script text-lg text-primary/40 mb-2">
          Made with light and love
        </p>

      </motion.div>
    </footer>
  )
}
