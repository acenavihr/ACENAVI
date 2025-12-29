"use client"

import { useEffect, useRef, useState } from "react"

export function FeaturesWorkflow() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const workflows = [
    {
      number: "01",
      title: "Contextual Surfacing",
      description:
        "HR information appears at the moment employees need it. During onboarding, during performance conversations, or when benefits questions arise.",
    },
    {
      number: "02",
      title: "Slack-First Experience",
      description:
        "Your Slack channel becomes the hub for HR guidance. Policies, learning resources, and employee support—all accessible without leaving the conversation.",
    },
    {
      number: "03",
      title: "Microsoft Teams Integration",
      description:
        "Teams users get the same seamless experience. Navi tabs, bots, and notifications work naturally within Teams workflows.",
    },
    {
      number: "04",
      title: "Real-Time Guidance",
      description:
        "HR teams proactively surface guidance, reminders, and resources. Reduce support tickets by answering questions before they're asked.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {workflows.map((workflow, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="md:col-span-3">
                <p className="text-5xl md:text-6xl font-bold text-muted-foreground/30">{workflow.number}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">{workflow.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{workflow.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
