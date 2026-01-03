"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { 
  AlertCircle, 
  Clock, 
  Layers, 
  Search,
  Sparkles,
  Shield,
  Target,
  MessageSquare
} from "lucide-react"

export function ProblemSolutionSection() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.2)

  const problems = [
    {
      icon: AlertCircle,
      text: "HR teams are stretched thin",
    },
    {
      icon: Clock,
      text: "Important conversations happen too late",
    },
    {
      icon: Layers,
      text: "Tools are fragmented",
    },
    {
      icon: Search,
      text: "Employees can't find answers when they need them",
    },
  ]

  const solutions = [
    {
      icon: Sparkles,
      text: "Proactive nudges across the employee journey",
    },
    {
      icon: Shield,
      text: "Secure, culture-aligned conversations",
    },
    {
      icon: Target,
      text: "HR freed up to focus on what matters most",
    },
    {
      icon: MessageSquare,
      text: "Instant support inside Slack & Microsoft Teams",
    },
  ]

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div 
          className="text-center mb-20 transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 30}px)`
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Navi Solves This — Calmly, Quietly, Inside Work
          </h2>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* LEFT: The Problem */}
          <div 
            className="space-y-12 transition-all duration-700 ease-out"
            style={{
              opacity: scrollProgress,
              transform: `translateX(${(1 - scrollProgress) * -30}px)`
            }}
          >
            <div className="mb-8">
              <h3 className="text-4xl md:text-5xl font-bold mb-2 text-destructive/90">
                The Problem
              </h3>
            </div>
            
            {problems.map((problem, idx) => {
              const delay = idx * 0.1
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.4))
              const Icon = problem.icon
              
              return (
                <div
                  key={idx}
                  className="flex items-start gap-6 transition-all duration-500 ease-out"
                  style={{
                    opacity: itemProgress,
                    transform: `translateY(${(1 - itemProgress) * 20}px)`,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                      {problem.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: The Solution */}
          <div 
            className="space-y-12 transition-all duration-700 ease-out"
            style={{
              opacity: scrollProgress,
              transform: `translateX(${(1 - scrollProgress) * 30}px)`
            }}
          >
            <div className="mb-8">
              <h3 className="text-4xl md:text-5xl font-bold mb-2 text-accent">
                The Solution
              </h3>
            </div>
            
            {solutions.map((solution, idx) => {
              const delay = idx * 0.1 + 0.15
              const itemProgress = Math.max(0, Math.min(1, (scrollProgress - delay) / 0.4))
              const Icon = solution.icon
              
              return (
                <div
                  key={idx}
                  className="flex items-start gap-6 transition-all duration-500 ease-out"
                  style={{
                    opacity: itemProgress,
                    transform: `translateY(${(1 - itemProgress) * 20}px)`,
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-foreground">
                      {solution.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Closing Line */}
        <div 
          className="text-center mt-24 transition-all duration-700 ease-out"
          style={{
            opacity: Math.max(0, (scrollProgress - 0.3) / 0.7),
            transform: `translateY(${(1 - Math.max(0, (scrollProgress - 0.3) / 0.7)) * 20}px)`
          }}
        >
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Navi isn't another HR system.<br />
            <span className="text-foreground">It's the quiet layer of clarity that lives where your people already work.</span>
          </p>
        </div>
      </div>
    </section>
  )
}