"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface AnimatedButtonProps {
  text?: string
  href?: string
}

export function AnimatedButton({ text = "Book a Demo", href = "/book-demo" }: AnimatedButtonProps) {
  return (
    <motion.a
      href={href}
      className="group relative inline-flex items-center gap-8 bg-accent hover:bg-accent/90 text-accent-foreground pl-8 pr-2 py-2 rounded-full font-semibold transition-all duration-300 ease-out shadow-lg hover:shadow-xl hover:shadow-accent/20 active:scale-95 overflow-hidden"
      whileHover="hover"
      initial="initial"
    >
      <span className="text-lg relative z-10">{text}</span>

      <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0">
        {/* Primary Arrow: Slides out to top-right */}
        <motion.div
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 40, y: -40 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-accent absolute"
        >
          <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
        </motion.div>

        {/* Secondary Arrow: Slides in from bottom-left */}
        <motion.div
          variants={{
            initial: { x: -40, y: 40 },
            hover: { x: 0, y: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-accent absolute"
        >
          <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
        </motion.div>
      </div>

      {/* Subtle shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        variants={{
          hover: {
            translateX: ["100%", "-100%"],
            transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          },
        }}
      />
    </motion.a>
  )
}