"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingPlans() {
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

  const plans = [
    {
      name: "Starter",
      description: "For teams just starting their HR transformation.",
      price: "Custom",
      features: [
        "Up to 50 employees",
        "Slack integration",
        "Basic onboarding workflows",
        "Email support",
        "Policy distribution",
      ],
    },
    {
      name: "Growth",
      description: "For growing companies scaling their HR operations.",
      price: "Custom",
      featured: true,
      features: [
        "Up to 500 employees",
        "Slack & Microsoft Teams",
        "Advanced workflows",
        "Learning & development tools",
        "Priority support",
        "Custom integrations",
      ],
    },
    {
      name: "Enterprise",
      description: "For large organizations with advanced requirements.",
      price: "Custom",
      features: [
        "Unlimited employees",
        "All integrations",
        "Advanced analytics",
        "Dedicated support",
        "Custom features",
        "SLA guarantee",
      ],
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Pricing Plans</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-card border rounded-lg transition-all duration-500 ${
                plan.featured ? "md:ring-2 ring-accent border-accent" : "border-border"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-6 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <p className="text-3xl font-bold">{plan.price}</p>
                  <p className="text-xs text-muted-foreground mt-1">Contact sales for custom pricing</p>
                </div>

                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-8">
                  <Link href="/book-demo">Schedule Demo</Link>
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
