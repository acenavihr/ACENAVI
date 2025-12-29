"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function LifecycleSection() {
  const { isVisible, scrollProgress, elementRef } = useScrollAnimation(0.1)

  const stages = [
    {
      title: "Onboarding",
      description: "Welcome new hires with contextual guidance in their first day.",
    },
    {
      title: "Engagement",
      description: "Keep employees connected beyond Day 30 with proactive HR support.",
    },
    {
      title: "Learning",
      description: "Surface learning opportunities at moments that matter.",
    },
    {
      title: "Performance",
      description: "Support meaningful conversations with data and guidance.",
    },
  ]

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 20}px)`
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Across the Employee Lifecycle
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-3">
            Navi supports meaningful moments at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const delay = idx * 0.1
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.25))
            
            return (
              <div
                key={idx}
                className="p-8 bg-card border border-border rounded-lg transition-all duration-500 ease-out"
                style={{
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 30}px)`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4 font-semibold text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2 tracking-tight">{stage.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {stage.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}