"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function FeaturesConnection() {
  const [hasLoaded, setHasLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setHasLoaded(true)
          // Disconnect after first load - never reset
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasLoaded])

  // Full 12 logos per row - exactly as before
  const firstRowLogos = [
    { name: "Microsoft Teams", file: "teams.svg" },
    { name: "Slack", file: "slack.svg" },
    { name: "Workday", file: "workday.svg" },
    { name: "SAP SuccessFactors", file: "sap.svg" },
    { name: "BambooHR", file: "bamboo.svg" },
    { name: "Rippling", file: "rippling.svg" },
    { name: "Darwinbox", file: "darwinbox.svg" },
    { name: "Zoho People", file: "zoho.svg" },
    { name: "greytHR", file: "greythr.svg" },
    { name: "Keka", file: "keka.svg" },
    { name: "Greenhouse", file: "greenhouse.svg" },
    { name: "Lever", file: "lever.svg" },
  ]

  const secondRowLogos = [
    { name: "Google Drive", file: "drive.svg" },
    { name: "SharePoint", file: "sharepoint.svg" },
    { name: "Confluence", file: "confluence.svg" },
    { name: "Notion", file: "notion.svg" },
    { name: "Zendesk", file: "zendesk.svg" },
    { name: "Freshdesk", file: "freshdesk.svg" },
    { name: "ServiceNow", file: "servicenow.svg" },
    { name: "Coursera", file: "coursera.svg" },
    { name: "Azure AD", file: "azure.svg" },
    { name: "Okta", file: "okta.svg" },
    { name: "Google Calendar", file: "calendar.svg" },
    { name: "Outlook 365", file: "outlook.svg" },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div
          className={`text-center transition-all duration-700 ${
            hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamlessly connects to your HR workplace systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ACENAVI integrates with the tools you already use, creating a unified experience across your entire tech stack
          </p>
        </div>
      </div>

      {/* First row - Left to Right */}
      <div className="relative mb-16 overflow-hidden w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="logo-scroll-container">
          <div className="logo-scroll-content">
            {/* Triple the logos for seamless infinite scroll */}
            {[...firstRowLogos, ...firstRowLogos, ...firstRowLogos].map((logo, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={idx < firstRowLogos.length ? logo.name : ""}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
                  loading="eager"
                  priority={idx < 6}
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second row - Right to Left */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="logo-scroll-container">
          <div className="logo-scroll-content-reverse">
            {/* Triple the logos for seamless infinite scroll */}
            {[...secondRowLogos, ...secondRowLogos, ...secondRowLogos].map((logo, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={idx < secondRowLogos.length ? logo.name : ""}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
                  loading="eager"
                  priority={idx < 6}
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-scroll-container {
          display: flex;
          overflow: hidden;
        }

        .logo-scroll-content,
        .logo-scroll-content-reverse {
          display: flex;
          flex-shrink: 0;
          animation-play-state: running;
        }

        .logo-scroll-content {
          animation: scroll-left 40s linear infinite;
        }

        .logo-scroll-content-reverse {
          animation: scroll-right 40s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(-100% / 3), 0, 0);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translate3d(calc(-100% / 3), 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* Performance optimizations */
        .logo-scroll-content,
        .logo-scroll-content-reverse {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-scroll-content,
          .logo-scroll-content-reverse {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}