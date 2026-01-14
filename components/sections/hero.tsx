"use client"

import { HeroBackground } from "./hero-background"
import { AnimatedButton } from "@/components/ui/animated-button"
import { SecondaryButton } from "@/components/ui/secondary-button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play video when modal opens
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play()
    }
  }, [showVideo])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideo(false)
    }
    
    if (showVideo) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [showVideo])

  const handleVideoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowVideo(true)
  }

  const closeVideo = () => {
    setShowVideo(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <>
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
              <SecondaryButton 
                text="Watch 60-Second Overview" 
                onClick={handleVideoClick}
              />
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

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeVideo}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm"
                aria-label="Close video"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Video Container with Aspect Ratio */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                >
                  <source src="/acenavi_vid.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}