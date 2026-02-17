"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface NoorButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: "primary" | "ghost"
  className?: string
}

export function NoorButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}: NoorButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-sans text-sm tracking-widest uppercase transition-all duration-500 overflow-hidden group"

  const variants = {
    primary:
      "px-8 py-4 border border-gold/40 text-primary bg-transparent hover:bg-primary hover:text-primary-foreground noor-glow-sm hover:noor-glow",
    ghost:
      "px-6 py-3 text-muted-foreground hover:text-primary",
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 bg-primary/10"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Component>
  )
}
