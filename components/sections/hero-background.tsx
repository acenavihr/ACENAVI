"use client"

import { useEffect, useRef, useState } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    let animationId: number
    let time = 0

    // Particle system for abstract motion
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      hue: number
    }

    const particles: Particle[] = []
    const particleCount = 40

    // Initialize particles with blue hues
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 40 + 220, // Blue hues (220-260 = blue range)
      })
    }

    const animate = () => {
      time += 0.003
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Base gradient background - clean white
      const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.98)")
      gradient.addColorStop(0.5, "rgba(250, 251, 255, 0.95)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0.98)")
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Flowing ambient waves with blue tones
      const waveCount = 4
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(31, 68, 255, ${0.04 + i * 0.015})`
        ctx.lineWidth = 2

        const waveHeight = canvas.offsetHeight * (0.2 + i * 0.2)
        const waveAmplitude = 40 + i * 10
        const waveFrequency = 0.004

        for (let x = 0; x <= canvas.offsetWidth; x += 5) {
          const y = waveHeight + 
            Math.sin((x + time * 60) * waveFrequency + i) * waveAmplitude +
            Math.cos((x + time * 40) * waveFrequency * 0.7 + i * 2) * (waveAmplitude * 0.5)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Animated particles with connections
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1

        // Pulse opacity
        const pulseOpacity = particle.opacity + Math.sin(time * 2 + i) * 0.1

        // Draw particle with blue gradient
        ctx.beginPath()
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        
        particleGradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${pulseOpacity})`)
        particleGradient.addColorStop(1, `hsla(${particle.hue}, 100%, 60%, 0)`)
        
        ctx.fillStyle = particleGradient
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections between nearby particles
        particles.forEach((otherParticle, j) => {
          if (i >= j) return
          
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(31, 68, 255, ${(1 - distance / 150) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Large ambient orbs with subtle motion - blue tones
      const orbCount = 3
      for (let i = 0; i < orbCount; i++) {
        const orbX = canvas.offsetWidth * (0.25 + i * 0.25) + Math.sin(time * 0.4 + i * 2) * 60
        const orbY = canvas.offsetHeight * 0.5 + Math.cos(time * 0.3 + i * 2) * 80
        const orbRadius = 120 + Math.sin(time + i) * 20

        const orbGradient = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbRadius)
        
        const orbOpacity = 0.06 + Math.sin(time * 0.5 + i) * 0.02
        
        orbGradient.addColorStop(0, `rgba(31, 68, 255, ${orbOpacity})`)
        orbGradient.addColorStop(0.5, `rgba(77, 106, 255, ${orbOpacity * 0.5})`)
        orbGradient.addColorStop(1, "rgba(77, 106, 255, 0)")

        ctx.fillStyle = orbGradient
        ctx.beginPath()
        ctx.arc(orbX, orbY, orbRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [mounted])

  if (!mounted) {
    // Render placeholder to prevent hydration mismatch
    return <div className="absolute inset-0 w-full h-full bg-background" aria-hidden="true" />
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true" 
    />
  )
}