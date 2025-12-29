// hooks/use-scroll-animation.ts
"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(element)

    const handleScroll = () => {
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress (0 to 1) as element moves through viewport
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top - windowHeight * 0.2) / (windowHeight * 0.6))
      )
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return { isVisible, scrollProgress, elementRef }
}