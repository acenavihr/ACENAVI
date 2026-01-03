// hooks/use-scroll-animation.ts
"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollAnimation(threshold = 0.2) {
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
      { 
        threshold,
        rootMargin: "-10% 0px -10% 0px" // Only trigger when element is truly in view
      }
    )

    observer.observe(element)

    const handleScroll = () => {
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Element enters from bottom of viewport
      const elementTop = rect.top
      const elementHeight = rect.height
      
      // Start animation when element is 30% into viewport
      const triggerPoint = windowHeight * 0.7
      // Complete animation when element is 30% visible
      const endPoint = windowHeight * 0.3
      
      // Calculate progress (0 to 1) - animates as element enters viewport
      let progress = 0
      
      if (elementTop <= triggerPoint && elementTop >= endPoint - elementHeight) {
        // Element is in the animation zone
        progress = Math.max(
          0,
          Math.min(1, (triggerPoint - elementTop) / (triggerPoint - endPoint))
        )
      } else if (elementTop < endPoint - elementHeight) {
        // Element has fully passed the animation zone
        progress = 1
      }
      
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