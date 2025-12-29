"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function IntegrationsSection() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.2)

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div 
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 20}px)`
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Works with your workflow
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Navi integrates with the platforms your team trusts.
          </p>
        </div>

        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `scale(${0.95 + scrollProgress * 0.05})`
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-xl bg-card border border-border flex items-center justify-center text-3xl transition-transform duration-300 hover:scale-110">
              💬
            </div>
            <p className="font-semibold">Slack</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-xl bg-card border border-border flex items-center justify-center text-3xl transition-transform duration-300 hover:scale-110">
              👥
            </div>
            <p className="font-semibold">Microsoft Teams</p>
          </div>
        </div>
      </div>
    </section>
  )
}