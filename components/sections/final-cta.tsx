"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function FinalCTASection() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.2)

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLElement>} 
      className="py-24 md:py-32 bg-background border-t border-border"
    >
      <div 
        className="max-w-4xl mx-auto px-6 text-center transition-all duration-700 ease-out"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 30}px)`
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Ready to transform your HR experience?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Schedule a demo to see how Navi integrates with Slack and Teams.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 md:h-14 px-8 md:px-10 text-base md:text-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <Link href="/book-demo">Meet the Team</Link>
        </Button>
      </div>
    </section>
  )
}