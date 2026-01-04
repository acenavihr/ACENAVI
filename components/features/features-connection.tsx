"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function FeaturesConnection() {
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

  // First row - left to right
  const firstRowLogos = [
    { name: "Microsoft Teams", file: "teams.png" },
    { name: "Slack", file: "slack.png" },
    { name: "Workday", file: "workday.png" },
    { name: "SAP SuccessFactors", file: "sap.png" },
    { name: "BambooHR", file: "bamboo.png" },
    { name: "Rippling", file: "rippling.png" },
    { name: "Darwinbox", file: "darwinbox.png" },
    { name: "Zoho People", file: "zoho.png" },
    { name: "greytHR", file: "greythr.png" },
    { name: "Keka", file: "keka.png" },
    { name: "Greenhouse", file: "greenhouse.png" },
    { name: "Lever", file: "lever.png" },
  ]

  // Second row - right to left
  const secondRowLogos = [
    { name: "Google Drive", file: "drive.png" },
    { name: "SharePoint", file: "sharepoint.png" },
    { name: "Confluence", file: "confluence.png" },
    { name: "Notion", file: "notion.png" },
    { name: "Zendesk", file: "zendesk.png" },
    { name: "Freshdesk", file: "freshdesk.png" },
    { name: "ServiceNow", file: "servicenow.png" },
    { name: "Coursera", file: "coursera.png" },
    { name: "Azure AD", file: "azure.png" },
    { name: "Okta", file: "okta.png" },
    { name: "Google Calendar", file: "calendar.png" },
    { name: "Outlook 365", file: "outlook.png" },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-32 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamlessly connects to your HR workplace systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Navi integrates with the tools you already use, creating a unified experience across your entire tech stack
          </p>
        </div>
      </div>

      {/* First row - Left to Right */}
      <div className="relative mb-16 overflow-hidden w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="logo-scroll-container">
          <div className="logo-scroll-content animate-scroll-left">
            {firstRowLogos.map((logo, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
                />
              </div>
            ))}
          </div>
          <div className="logo-scroll-content animate-scroll-left" aria-hidden="true">
            {firstRowLogos.map((logo, idx) => (
              <div
                key={`first-duplicate-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
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
          <div className="logo-scroll-content animate-scroll-right">
            {secondRowLogos.map((logo, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
                />
              </div>
            ))}
          </div>
          <div className="logo-scroll-content animate-scroll-right" aria-hidden="true">
            {secondRowLogos.map((logo, idx) => (
              <div
                key={`second-duplicate-${idx}`}
                className="flex-shrink-0 mx-8"
              >
                <Image
                  src={`/${logo.file}`}
                  alt={logo.name}
                  width={140}
                  height={60}
                  className="object-contain opacity-70"
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

        .logo-scroll-content {
          display: flex;
          flex-shrink: 0;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  )
}