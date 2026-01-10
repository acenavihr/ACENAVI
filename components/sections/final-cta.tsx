"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { AnimatedButton } from "@/components/ui/animated-button"

export function FinalCTASection() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.2)

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>} 
      className="section-padding bg-background"
    >
      <div 
        className="max-w-4xl mx-auto px-6 text-center transition-all duration-700 ease-out"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 30}px)`
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          See ACENAVI in action inside Slack & Teams
        </h2>
        
        <div className="flex justify-center mb-6">
          <AnimatedButton text="Book a Demo" href="/book-demo" />
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          No pressure. Just a conversation.
        </p>
      </div>
    </section>
  )
}