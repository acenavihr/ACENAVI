"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"

interface SecondaryButtonProps {
  text?: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
}

export function SecondaryButton({ text = "Watch Overview", href = "/demo-video", onClick }: SecondaryButtonProps) {
  const commonClasses = "group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold overflow-hidden border-2 border-border bg-background"
  
  const content = (
    <>
      {/* Background that fills from top to bottom on hover */}
      <motion.div
        className="absolute inset-0 bg-foreground"
        variants={{
          initial: { y: "-100%" },
          hover: { y: "0%" },
        }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Icon */}
      <motion.div
        className="relative z-10"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.25 }}
      >
        <Play className="w-4 h-4 text-foreground group-hover:text-white transition-colors duration-200" />
      </motion.div>

      {/* Text */}
      <span className="text-base relative z-10 text-foreground group-hover:text-white transition-colors duration-200">
        {text}
      </span>
    </>
  )

  // If onClick is provided, render as button
  if (onClick) {
    return (
      <motion.button
        onClick={onClick}
        className={commonClasses}
        whileHover="hover"
        initial="initial"
      >
        {content}
      </motion.button>
    )
  }

  // Otherwise render as link
  return (
    <motion.a
      href={href}
      className={commonClasses}
      whileHover="hover"
      initial="initial"
    >
      {content}
    </motion.a>
  )
}