"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HeroBackground } from "./hero-background"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      {/* Gradient blend overlay - seamlessly transitions to page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-[5]" />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 py-20">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-balance">
            Clarity at work.<br />Before friction builds.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-balance">
            Navi is an AI-powered people support layer that lives inside the tools your teams already use — helping
            organizations scale guidance, conversations, and support across the entire employee lifecycle.
          </p>

          <div className="pt-2 md:pt-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 md:h-14 px-8 md:px-10 text-base md:text-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="/book-demo">Meet the Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}