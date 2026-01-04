"use client"

import { useEffect, useRef, useState } from "react"
import { Target, BarChart3, GraduationCap, MessageCircle, FileText, Users } from "lucide-react"

export function FeaturesGrid() {
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

  const features = [
    {
      icon: Target,
      title: "Onboarding Automation",
      description: "Guide new hires through every step with contextual reminders and resources.",
    },
    {
      icon: BarChart3,
      title: "Engagement Tracking",
      description: "Keep employees connected beyond the first 30 days with proactive support.",
    },
    {
      icon: GraduationCap,
      title: "Learning Recommendations",
      description: "Surface learning paths based on role, tenure, and development goals.",
    },
    {
      icon: MessageCircle,
      title: "HR Support Channel",
      description: "Answer questions instantly. Reduce support tickets with self-service resources.",
    },
    {
      icon: FileText,
      title: "Policy Distribution",
      description: "Share and track policy adoption. Ensure everyone has access to current docs.",
    },
    {
      icon: Users,
      title: "Performance Guidance",
      description: "Surface performance conversation frameworks and calibration tools.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Capabilities Built In</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            const isHovered = hoveredIndex === idx
            
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-8 bg-card rounded-lg transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: `${idx * 80}ms`,
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: isHovered ? '#1F44FF' : 'var(--border)',
                }}
              >
                <div 
                  className="mb-4 transition-colors duration-300"
                  style={{ color: isHovered ? '#1F44FF' : 'var(--foreground)' }}
                >
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 
                  className="text-lg font-semibold mb-3 transition-colors duration-300"
                  style={{ color: isHovered ? '#1F44FF' : 'var(--foreground)' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}