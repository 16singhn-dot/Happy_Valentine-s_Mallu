"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const links = [
  { label: "Letter", href: "#letter" },
  { label: "Chapters", href: "#chapters" },
  { label: "Verse", href: "#verse" },
  { label: "Echoes", href: "#echoes" },
]

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80"
          aria-label="Return to top"
        >
          <Heart className="w-4 h-4" />
          <span className="font-serif text-lg tracking-wider">Noor</span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile heart */}
        <div className="md:hidden">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-primary/60">
            XIV.II
          </span>
        </div>
      </nav>
    </motion.header>
  )
}
