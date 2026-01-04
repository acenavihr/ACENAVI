"use client"

import { useEffect, useRef, useState } from "react"

export function FeaturesWorkflow() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
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
      title: "Instant Answers to Employee Questions",
      description:
        "Fast, accurate responses to HR, policy, IT, and workplace queries — anytime.",
    },
    {
      number: "02",
      title: "Guided Onboarding & Lifecycle Support",
      description:
        "Structured guidance and reminders across every key employee milestone.",
    },
    {
      number: "03",
      title: "Built-In Manager Assistance",
      description:
        "Clear, practical support for people decisions and conversations.",
    },
    {
      number: "04",
      title: "Smart HR & IT Escalations",
      description:
        "Seamlessly convert conversations into tickets — with full context.",
    },
    {
      number: "05",
      title: "Personalized & Role-Aware Responses",
      description:
        "Policies and answers tailored to role, grade, location, and eligibility.",
    },
    {
      number: "06",
      title: "Enterprise-Grade Security & Compliance",
      description:
        "SSO, encryption, and access controls built for enterprise environments.",
    },
    {
      number: "07",
      title: "Works Globally Across Devices",
      description:
        "Consistent support for hybrid, remote, and distributed teams.",
    },
    {
      number: "08",
      title: "Simple Admin Insights & Analytics",
      description:
        "Actionable trends to improve policy, communication, and experience.",
    },
    
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-16">
          {workflows.map((workflow, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-700 cursor-default ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="md:col-span-3">
                <p 
                  className="text-5xl md:text-6xl font-bold text-muted-foreground/30 transition-transform duration-300 ease-out"
                  style={{
                    transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {workflow.number}
                </p>
              </div>
              <div className="md:col-span-9">
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-4 transition-colors duration-300 ease-out"
                  style={{
                    color: hoveredIndex === idx ? '#1F44FF' : 'inherit'
                  }}
                >
                  {workflow.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{workflow.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}