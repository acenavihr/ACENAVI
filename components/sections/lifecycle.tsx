"use client"

import { motion } from "framer-motion"
import { LifecycleStage } from "./lifecycle-stage"

const STAGES = [
  { 
    icon: "UserCheck", 
    title: "Onboarding", 
    subtitle: "Employee Experience",
    points: [
      "Clear answers from Day 1 — without hesitation",
      "Guidance on tools, policies, and expectations",
      "Feels welcomed, prepared, and supported"
    ]
  },
  { 
    icon: "BookOpen", 
    title: "Policy Navigation", 
    subtitle: "Employee Experience",
    points: [
      "Understands policies in simple language",
      "Gets real-world guidance on \"what this means for me\"",
      "Avoids confusion, worry, or guesswork"
    ]
  },
  { 
    icon: "Users", 
    title: "Manager Support", 
    subtitle: "Manager View",
    points: [
      "Guidance for meaningful conversations",
      "Nudges for structured 1:1s",
      "Support through complex people situations"
    ]
  },
  { 
    icon: "TrendingUp", 
    title: "Career Growth", 
    subtitle: "Employee Experience",
    points: [
      "Sees possible pathways and next steps",
      "Gets help having growth conversations",
      "Feels supported — not lost or stuck"
    ]
  },
  { 
    icon: "AlertCircle", 
    title: "Early Awareness", 
    subtitle: "Employee Experience",
    points: [
      "Learns culture & expectations early",
      "Understands how decisions get made",
      "Builds confidence from the start"
    ]
  },
  { 
    icon: "Target", 
    title: "Goal Setting", 
    subtitle: "Employee Experience",
    points: [
      "Understands \"what good looks like\"",
      "Gets help shaping meaningful goals",
      "Stays aligned without confusion"
    ]
  },
  { 
    icon: "MessageSquare", 
    title: "Feedback", 
    subtitle: "Employee Experience",
    points: [
      "Learns how to give & receive feedback",
      "Feels psychologically safe in conversations",
      "Turns feedback into growth"
    ]
  },
  { 
    icon: "Award", 
    title: "Recognition", 
    subtitle: "Manager View",
    points: [
      "Smart nudges to recognise the right moments",
      "Stronger team morale & belonging",
      "Builds a culture of appreciation"
    ]
  },
  { 
    icon: "GraduationCap", 
    title: "Learning", 
    subtitle: "Employee Experience",
    points: [
      "Knows what skills matter next",
      "Gets guidance on where to start",
      "Applies learning confidently at work"
    ]
  },
  { 
    icon: "Shield", 
    title: "Wellbeing", 
    subtitle: "Employee Experience",
    points: [
      "A safe space to ask real-life work questions",
      "Support during stress or uncertainty",
      "Gentle nudges toward balance & clarity"
    ]
  },
  { 
    icon: "Compass", 
    title: "Transitions", 
    subtitle: "Employee Experience",
    points: [
      "Clarity through change or role shifts",
      "Support in navigating uncertainty",
      "Respect and dignity — always"
    ]
  },
] as const

export function LifecycleSection() {
  return (
    <section className="section-padding px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-20">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Across the Employee Lifecycle
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          ACENAVI supports meaningful moments at every stage
        </motion.p>
      </div>

      <div className="relative">
        {/* DESKTOP SVG - UNCHANGED */}
        <svg
          className="absolute top-0 left-0 w-full h-full hidden lg:block pointer-events-none"
          viewBox="0 0 1000 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M 125 90 H 875 C 950 80 950 390 875 390 H 125 C 50 390 50 690 125 690 H 625"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeDasharray="12 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2f5bff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#2f5bff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2f5bff" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* MOBILE VERTICAL LINE */}
<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-20 w-0.5 bg-gradient-to-b from-[#2f5bff]/40 via-[#2f5bff]/80 to-[#2f5bff]/40 lg:hidden" />

        {/* DESKTOP GRID - UNCHANGED */}
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 relative min-h-[700px]">
          {/* Row 1: Stages 1-4 */}
          {STAGES.slice(0, 4).map((stage, i) => (
            <div key={stage.title} className="flex justify-center items-center h-[180px]">
              <LifecycleStage
                iconName={stage.icon as any}
                title={stage.title}
                subtitle={stage.subtitle}
                points={stage.points}
                index={i}
                showIndex={false}
              />
            </div>
          ))}

          {/* Row 2: Stages 5-8 (reversed for right-to-left flow) */}
          <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 h-[180px]">
            <div className="hidden lg:contents">
              {[...STAGES.slice(4, 8)].reverse().map((stage, i) => (
                <div key={stage.title} className="flex justify-center items-center">
                  <LifecycleStage
                    iconName={stage.icon as any}
                    title={stage.title}
                    subtitle={stage.subtitle}
                    points={stage.points}
                    index={7 - i}
                    showIndex={false}
                  />
                </div>
              ))}
            </div>
            <div className="contents lg:hidden">
              {STAGES.slice(4, 8).map((stage, i) => (
                <div key={stage.title} className="flex justify-center items-center">
                  <LifecycleStage
                    iconName={stage.icon as any}
                    title={stage.title}
                    subtitle={stage.subtitle}
                    points={stage.points}
                    index={i + 4}
                    showIndex={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Stages 9-11 - Right aligned */}
          <div className="col-span-full grid grid-cols-2 lg:grid-cols-4 h-[180px]">
            {STAGES.slice(8, 11).map((stage, i) => (
              <div key={stage.title} className="flex justify-center items-center">
                <LifecycleStage
                  iconName={stage.icon as any}
                  title={stage.title}
                  subtitle={stage.subtitle}
                  points={stage.points}
                  index={i + 8}
                  showIndex={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERTICAL LIST */}
        <div className="flex flex-col gap-8 lg:hidden items-center">
          {STAGES.map((stage, i) => (
            <div key={stage.title} className="flex justify-center">
              <LifecycleStage
                iconName={stage.icon as any}
                title={stage.title}
                subtitle={stage.subtitle}
                points={stage.points}
                index={i}
                showIndex={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}