"use client"

import { useEffect, useRef, useState } from "react"

export function FeaturesGrid() {
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

  const features = [
    {
      icon: "🎯",
      title: "Onboarding Automation",
      description: "Guide new hires through every step with contextual reminders and resources.",
    },
    {
      icon: "📊",
      title: "Engagement Tracking",
      description: "Keep employees connected beyond the first 30 days with proactive support.",
    },
    {
      icon: "🎓",
      title: "Learning Recommendations",
      description: "Surface learning paths based on role, tenure, and development goals.",
    },
    {
      icon: "💬",
      title: "HR Support Channel",
      description: "Answer questions instantly. Reduce support tickets with self-service resources.",
    },
    {
      icon: "📋",
      title: "Policy Distribution",
      description: "Share and track policy adoption. Ensure everyone has access to current docs.",
    },
    {
      icon: "🤝",
      title: "Performance Guidance",
      description: "Surface performance conversation frameworks and calibration tools.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Capabilities Built In</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 bg-card border border-border rounded-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
