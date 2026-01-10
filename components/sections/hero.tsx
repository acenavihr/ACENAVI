"use client"

import { HeroBackground } from "./hero-background"
import { AnimatedButton } from "@/components/ui/animated-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      {/* Gradient blend overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-[5]" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10 py-20">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            AI-Powered People Support —<br />
            Right Inside Teams
          </motion.h1>

          {/* Sub-headline */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            ACENAVI helps your people get instant guidance, proactive nudges, and everyday support 
            across the employee lifecycle — without switching tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatedButton text="Book a Demo" href="/book-demo" />
            <SecondaryButton text="Watch 60-Second Overview" href="/demo-video" />
          </motion.div>

          {/* Micro-trust text */}
          <motion.p 
            className="text-sm text-muted-foreground/80 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Built for modern teams. Secure. Enterprise-ready.
          </motion.p>
        </div>
      </div>
    </section>
  )
}