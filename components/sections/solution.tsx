"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function SolutionSection() {
  const { isVisible, scrollProgress, elementRef } = useScrollAnimation(0.1)

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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">We are where you work</h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-3">
            ACENAVI lives in the tools your team already uses every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {[
              {
                num: "1",
                title: "Slack Integration",
                desc: "HR guidance surfaces directly in conversations where employees already are.",
              },
              {
                num: "2",
                title: "Microsoft Teams Integration",
                desc: "Contextual HR experiences for Teams users. No switching required.",
              },
              {
                num: "3",
                title: "Seamless Experience",
                desc: "Single source of truth for HR policies, learning, and employee guidance.",
              },
            ].map((item, idx) => {
              const delay = idx * 0.2
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.3))
              
              return (
                <div
                  key={idx}
                  className="flex gap-4 transition-all duration-500 ease-out"
                  style={{
                    opacity: itemProgress,
                    transform: `translateX(${(1 - itemProgress) * -20}px)`,
                  }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                    {item.num}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div 
            className="relative h-96 bg-muted rounded-lg border border-border flex items-center justify-center overflow-hidden transition-all duration-700 ease-out"
            style={{
              opacity: scrollProgress,
              transform: `scale(${0.95 + scrollProgress * 0.05})`,
            }}
          >
            <div className="space-y-6 p-8">
              <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center text-lg">💬</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Help with benefits</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-accent/10 border border-accent rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded bg-accent/30 flex items-center justify-center text-lg">✓</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Connected to ACENAVI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}