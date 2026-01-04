"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { 
  AlertCircle, 
  Clock, 
  Layers, 
  Search,
  Sparkles,
  Shield,
  Target,
  MessageSquare,
  ArrowRight 
} from "lucide-react"

export function ProblemSolutionSection() {
  const [view, setView] = useState<"problem" | "solution">("solution")

  const problems = [
    {
      icon: AlertCircle,
      title: "HR Stretched Thin",
      desc: "Teams are bogged down by repetitive inquiries and manual data entry.",
    },
    {
      icon: Clock,
      title: "Delayed Conversations",
      desc: "Critical feedback and important manager-employee talks happen too late.",
    },
    {
      icon: Layers,
      title: "Fragmented Tools",
      desc: "Information is scattered across disconnected HR systems and spreadsheets.",
    },
    {
      icon: Search,
      title: "Support Gap",
      desc: "Employees can't find clear answers exactly when they need them.",
    },
  ]

  const solutions = [
    {
      icon: Sparkles,
      title: "Proactive Nudges",
      desc: "Automated prompts across the entire employee journey to keep things moving.",
    },
    {
      icon: Shield,
      title: "Culture-Aligned Chat",
      desc: "Secure, human-like conversations that reflect your company's values.",
    },
    {
      icon: Target,
      title: "Focus on Impact",
      desc: "HR teams are freed from busywork to focus on strategic people goals.",
    },
    {
      icon: MessageSquare,
      title: "Instant Integration",
      desc: "Seamless support delivered directly inside Slack and Microsoft Teams.",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Navi Solves This — Calmly, Quietly, Inside Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our platform transforms chaotic workflows into streamlined growth engines.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted/50 p-1 rounded-full flex gap-1 border border-border">
            <button
              onClick={() => setView("problem")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                view === "problem" 
                  ? "bg-white text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              The Old Way
            </button>
            <button
              onClick={() => setView("solution")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                view === "solution"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              The New Way
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Content Area */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl bg-[#F9FAFE] border group">

            
            {/* Problem Visual - RED THEME */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-700 ease-in-out",
                view === "problem" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
              )}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-center items-center gap-6">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                <div className="relative grid grid-cols-3 gap-2 w-full opacity-60 grayscale-[0.5] blur-[0.5px]">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="h-20 bg-red-100/40 border border-red-200/60 rounded-lg shadow-inner animate-pulse"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-red-500/80 font-medium font-mono text-sm uppercase tracking-widest mb-2">
                    Frustrated & Fragmented
                  </p>

                </div>
              </div>
            </div>

            {/* Solution Visual - BLUE THEME (FIXED) */}
<div
  className={cn(
    "absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out",
    view === "solution"
      ? "opacity-100 scale-100"
      : "opacity-0 scale-110 pointer-events-none",
  )}
>
  {/* CENTERED VISUAL CONTAINER */}
  <div className="relative w-full h-full max-w-4xl max-h-[28rem] p-8 flex items-center justify-center">

    {/* BASE CANVAS */}
    <div className="absolute inset-0 bg-red z-0" />

    {/* BLUE GRADIENT WASH */}
    <div className="absolute inset-0 bg-linear-to-br from-red/10 to-transparent z-0" />

    {/* FULL-SIZE GRID (CENTERED, SAME SIZE AS BEFORE) */}
    <div className="relative z-10 grid grid-cols-3 gap-2 w-full opacity-60">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="h-20 bg-blue-100/40 border border-blue-200/60 rounded-lg shadow-inner animate-pulse"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>

    {/* FLOATING CARD – CENTERED OVER GRID */}
    <div
      className="
        absolute z-30
        w-full max-w-md
        bg-white rounded-3xl border p-8
        shadow-lg shadow-blue-900/5
        transition-all duration-300 ease-out
        transform-gpu
        hover:-translate-y-1.5
        hover:shadow-2xl
        hover:shadow-blue-900/15
      "
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-accent animate-ping" />
        </div>

        <div className="space-y-2 flex-1">
          <div className="h-3 w-1/3 bg-muted rounded-full" />
          <div className="h-3 w-2/3 bg-muted rounded-full opacity-50" />
        </div>
      </div>

      <div className="space-y-4">
        
        <div className="h-4 w-full bg-[#1F44FF]/5 rounded-lg" />
        <div className="h-4 w-full bg-[#1F44FF]/5 rounded-lg" />
      </div>
    </div>

    {/* LABEL */}
<p className="absolute z-40 top-[10%] left-1/2 -translate-x-1/2 text-accent font-medium font-mono text-sm uppercase tracking-widest">
  Quietly Solved
</p>



  </div>
</div>



          </div>

          {/* Text Content Area - WITH GRID STACK FIX */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 grid-rows-1 min-h-[450px]">
              {(["problem", "solution"] as const).map((mode) => (
                <div
                  key={mode}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col gap-6 transition-all duration-700 ease-in-out",
                    view === mode 
                      ? "opacity-100 translate-y-0 relative z-10" 
                      : "opacity-0 translate-y-8 absolute z-0 pointer-events-none",
                  )}
                >
                  <h3
                    className={cn(
                      "text-3xl font-bold",
                      mode === "problem" ? "text-red-900" : "text-accent",
                    )}
                  >
                    {mode === "problem" ? "The Problem" : "The Solution"}
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {(mode === "problem" ? problems : solutions).map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 border border-border hover:bg-white transition-colors group"
                      >
                        <div
                          className={cn(
                            "p-3 rounded-xl border shrink-0 transition-transform group-hover:scale-110",
                            mode === "problem" ? "bg-red-50 text-red-600" : "bg-accent/5 text-accent",
                          )}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-20">
          <p className="text-xl md:text-2xl font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Navi isn't another HR system.<br />
            <span className="text-foreground">It's the quiet layer of clarity that lives where your people already work.</span>
          </p>
        </div>
      </div>
    </section>
  )
}