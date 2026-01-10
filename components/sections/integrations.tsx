"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Users, CheckCircle, Sparkle } from "lucide-react"
import Image from "next/image"

export function IntegrationsSection() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.2)
  const [activeIntegration, setActiveIntegration] = useState(0)

  const integrations = [
    {
      num: "1",
      title: "Slack Integration",
      desc: "HR guidance surfaces directly in conversations where employees already are.",
      color: "#4A154B", // Slack purple
      preview: "slack"
    },
    {
      num: "2",
      title: "Microsoft Teams Integration",
      desc: "Contextual HR experiences for Teams users. No switching required.",
      color: "#6264A7", // Teams purple
      preview: "teams"
    },
    {
      num: "3",
      title: "Seamless Experience",
      desc: "Single source of truth for HR policies, learning, and employee guidance.",
      color: "#ff8c28", // Your accent color
      preview: "seamless"
    },
  ]

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="text-center mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            We are where you work
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            ACENAVI lives in the tools your team already uses every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Integration Points */}
          <div className="space-y-8">
            {integrations.map((item, idx) => {
              const delay = idx * 0.15
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.4))
              const isActive = activeIntegration === idx
              
              return (
                <div
                  key={idx}
                  className="flex gap-4 transition-all duration-500 ease-out cursor-pointer group"
                  style={{
                    opacity: itemProgress,
                    transform: `translateX(${(1 - itemProgress) * -20}px)`,
                  }}
                  onMouseEnter={() => setActiveIntegration(idx)}
                >
                  <div 
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? "bg-accent text-accent-foreground scale-110 shadow-lg" 
                        : "bg-muted text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent"
                    }`}
                  >
                    {item.num}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Animated Preview Box */}
          <div 
            className="relative h-96 bg-card rounded-xl border border-border overflow-hidden shadow-lg transition-all duration-700 ease-out"
            style={{
              opacity: scrollProgress,
              transform: `scale(${0.95 + scrollProgress * 0.05})`,
            }}
          >
            <AnimatePresence mode="wait">
              {activeIntegration === 0 && (
                <SlackPreview key="slack" />
              )}
              {activeIntegration === 1 && (
                <TeamsPreview key="teams" />
              )}
              {activeIntegration === 2 && (
                <SeamlessPreview key="seamless" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// Slack Preview Animation
function SlackPreview() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 bg-gradient-to-br from-[#4A154B]/5 to-background"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Slack Logo */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#4A154B] flex items-center justify-center overflow-hidden">
          <Image 
            src="/chat_slack.png" 
            alt="Slack" 
            width={28} 
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 object-contain"
          />
        </div>
        <div>
          <p className="font-semibold text-base md:text-lg">Slack</p>
          <p className="text-xs text-muted-foreground">HR Support Channel</p>
        </div>
      </div>

      {/* Animated Messages */}
      <div className="space-y-3 md:space-y-4">
        {/* Employee Message - Slides from Left */}
        <motion.div
          className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-muted/60 border border-border rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            x: [-50, 0, 0, -50]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.1, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-accent/30 flex items-center justify-center text-xs font-bold flex-shrink-0">
            E
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium mb-1">Employee</p>
            <p className="text-xs md:text-sm text-muted-foreground">How do I request time off?</p>
          </div>
        </motion.div>

        {/* ACENAVI Response - Slides from Right */}
        <motion.div
          className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#4A154B]/10 border border-[#4A154B]/30 rounded-lg ml-4 md:ml-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0],
            x: [50, 50, 0, 0, 50]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.15, 0.25, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-[#4A154B] flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image 
              src="/chat_navi.png" 
              alt="ACENAVI" 
              width={20} 
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium mb-1 text-[#4A154B]">ACENAVI</p>
            <p className="text-xs md:text-sm">You can request time off through the HR portal. I'll guide you through the steps...</p>
          </div>
        </motion.div>

        {/* Connected message */}
        <motion.div
          className="flex items-center gap-2 p-2 md:p-3 bg-accent/5 border border-accent/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.9, 0.9, 0.9, 1, 1, 0.9]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.25, 0.35, 0.45, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
          <p className="text-xs text-muted-foreground">Connected to ACENAVI HR Assistant</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Microsoft Teams Preview Animation
function TeamsPreview() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 bg-gradient-to-br from-[#6264A7]/5 to-background"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Teams Logo */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#6264A7] flex items-center justify-center overflow-hidden">
          <Image 
            src="/chat_teams.png" 
            alt="Teams" 
            width={28} 
            height={28}
            className="w-6 h-6 md:w-7 md:h-7 object-contain"
          />
        </div>
        <div>
          <p className="font-semibold text-base md:text-lg">Teams</p>
          <p className="text-xs text-muted-foreground">People & Culture Team</p>
        </div>
      </div>

      {/* Animated Chat */}
      <div className="space-y-3 md:space-y-4">
        {/* Employee Message - Slides from Left */}
        <motion.div
          className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-muted/60 border border-border rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            x: [-50, 0, 0, -50]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.1, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent/30 flex items-center justify-center text-xs font-bold flex-shrink-0">
            E
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium mb-1">Employee</p>
            <p className="text-xs md:text-sm text-muted-foreground">What's our parental leave policy?</p>
          </div>
        </motion.div>

        {/* ACENAVI Response - Slides from Right */}
        <motion.div
          className="flex items-start gap-2 md:gap-3 p-3 md:p-4 bg-[#6264A7]/10 border border-[#6264A7]/30 rounded-lg ml-4 md:ml-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: [0, 0, 1, 1, 0],
            x: [50, 50, 0, 0, 50]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.15, 0.25, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded bg-[#6264A7] flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image 
              src="/chat_navi.png" 
              alt="ACENAVI" 
              width={20} 
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium mb-1 text-[#6264A7]">ACENAVI</p>
            <p className="text-xs md:text-sm">Our parental leave policy offers 16 weeks fully paid. Here's what you need to know...</p>
          </div>
        </motion.div>

        {/* Connected message */}
        <motion.div
          className="flex items-center gap-2 p-2 md:p-3 bg-accent/5 border border-accent/20 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: [0, 0, 0, 1, 1, 0],
            scale: [0.9, 0.9, 0.9, 1, 1, 0.9]
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.25, 0.35, 0.45, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0" />
          <p className="text-xs text-muted-foreground">Powered by ACENAVI AI</p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Seamless Experience Preview Animation
function SeamlessPreview() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-accent/5 to-background"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main centered container */}
      <div className="relative flex flex-col items-center">
        {/* Animation area - contains icon + orbits + waves */}
        <div className="relative w-64 h-64 mb-8">
          {/* Pulsing Rings - Centered exactly on the tick */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            {/* Wave 1 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#2f5bff]/50"
              animate={{ 
                scale: [1, 3],
                opacity: [0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "linear"
              }}
            />
            {/* Wave 2 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#2f5bff]/50"
              animate={{ 
                scale: [1, 3],
                opacity: [0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "linear",
                delay: 2
              }}
            />
            {/* Wave 3 */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-[#2f5bff]/50"
              animate={{ 
                scale: [1, 3],
                opacity: [0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "linear",
                delay: 4
              }}
            />
          </div>

          {/* Central CheckCircle Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <CheckCircle className="w-16 h-16 text-[#2f5bff]" strokeWidth={2.5} />
          </div>

          {/* Rotating container for orbiting icons */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {/* Three orbiting icons at 0°, 120°, 240° */}
            {[
              { angle: 0, icon: MessageSquare },
              { angle: 120, icon: Users },
              { angle: 240, icon: Sparkle }
            ].map((item, idx) => {
              const radius = 80 // Distance from center
              const angleRad = (item.angle * Math.PI) / 180
              const x = Math.cos(angleRad) * radius
              const y = Math.sin(angleRad) * radius
              const Icon = item.icon
              
              return (
                <motion.div
                  key={idx}
                  className="absolute w-12 h-12 rounded-full bg-card border-2 border-[#2f5bff] flex items-center justify-center shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    marginTop: `${y}px`,
                    marginLeft: `${x}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <Icon className="w-6 h-6 text-[#2f5bff]" strokeWidth={2} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Text - Below the animation */}
        <motion.div
          className="text-center space-y-2 relative z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-semibold text-lg">One Platform</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Unified HR guidance across Slack, Teams, and your entire workflow
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}