"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function ProblemSection() {
  const { isVisible, scrollProgress, elementRef } = useScrollAnimation(0.1)

  const problems = [
    {
      title: "Fragmented Tools",
      description: "Your HR stack is scattered. Employees toggle between Slack, Teams, email, and HR systems.",
    },
    {
      title: "Lost After Day 30",
      description: "Engagement drops when onboarding ends. Critical HR moments get missed.",
    },
    {
      title: "Reactive, Not Proactive",
      description: "HR teams respond to issues instead of surfacing guidance at the right time.",
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">The Problem</h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-3">
            Modern HR tools create friction instead of flow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, idx) => {
            const delay = idx * 0.15
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.3))
            
            return (
              <div
                key={idx}
                className="p-8 bg-card border border-border rounded-lg transition-all duration-500 ease-out"
                style={{
                  opacity: cardProgress,
                  transform: `translateY(${(1 - cardProgress) * 30}px)`,
                }}
              >
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{problem.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}