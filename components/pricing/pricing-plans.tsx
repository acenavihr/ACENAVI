"use client"

import { useEffect, useRef, useState } from "react"

export function PricingPlans() {
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

  const trustIndicators = [
    {
      value: "2-4 weeks",
      label: "Average implementation time",
    },
    {
      value: "40%",
      label: "Reduction in HR support tickets",
    },
    {
      value: "Enterprise",
      label: "Security & compliance ready",
    },
  ]

  // Generate random characters for lottery effect
  const getRandomChar = (char: string) => {
    if (char === ' ' || char === '-') return char
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz%'
    return chars[Math.floor(Math.random() * chars.length)]
  }

  const LotteryText = ({ text, delay, shouldAnimate }: { text: string; delay: number; shouldAnimate: boolean }) => {
    const [displayText, setDisplayText] = useState(text)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
      if (!shouldAnimate) {
        setDisplayText(text)
        return
      }

      setIsAnimating(true)
      const chars = text.split('')
      let iterations = 0
      const maxIterations = 12

      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          setDisplayText(text)
          setIsAnimating(false)
          clearInterval(interval)
          return
        }

        setDisplayText(
          chars
            .map((char, index) => {
              if (iterations > index * 2) {
                return text[index]
              }
              return getRandomChar(char)
            })
            .join('')
        )

        iterations++
      }, 50)

      return () => clearInterval(interval)
    }, [shouldAnimate, text])

    return <span>{displayText}</span>
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by HR teams across India</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organizations of all sizes use ACENAVI to transform their employee experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustIndicators.map((indicator, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`text-center p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ 
                transitionDelay: `${idx * 80}ms`,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: hoveredIndex === idx ? '#1F44FF' : '#DADADA',
                backgroundColor: '#F9FAFE'
              }}
            >
              <div 
                className="text-4xl font-bold mb-2"
                style={{ 
                  color: hoveredIndex === idx ? '#1F44FF' : '#000000',
                  transition: 'color 0.3s ease'
                }}
              >
                <LotteryText 
                  text={indicator.value} 
                  delay={idx * 100} 
                  shouldAnimate={(isVisible && hoveredIndex === null) || hoveredIndex === idx}
                  key={`${idx}-${hoveredIndex === idx ? Date.now() : 'initial'}`}
                />
              </div>
              <p 
                className="text-sm"
                style={{ 
                  color: hoveredIndex === idx ? '#1F44FF' : '#000000',
                  transition: 'color 0.3s ease'
                }}
              >
                {indicator.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}