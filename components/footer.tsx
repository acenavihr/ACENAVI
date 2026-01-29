"use client"

import { useState } from "react"

export function Footer() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-sm">
            <div className="text-sm font-semibold mb-2 text-muted-foreground">
              ACENAVI
            </div>
            <p className="text-sm leading-relaxed font-medium text-muted-foreground">
              Context-aware HR infrastructure that adapts to how your organization already works.
            </p>
          </div>

          <div className="flex gap-16">
          <div>
  <h3 className="text-xs font-semibold uppercase tracking-wide mb-4 text-muted-foreground">
    Legal
  </h3>
  <ul className="space-y-3">
    <li onMouseEnter={() => setHoveredItem("privacy")} onMouseLeave={() => setHoveredItem(null)}>
      <a 
        href="https://claude.ai/public/artifacts/4aa9d86e-7cc6-4664-953b-fd18b7f1a92e" 
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-medium transition-colors ${hoveredItem === "privacy" ? "text-accent" : "text-muted-foreground"}`}
      >
        Privacy Policy
      </a>
    </li>
    <li onMouseEnter={() => setHoveredItem("terms")} onMouseLeave={() => setHoveredItem(null)}>
      <a 
        href="https://claude.ai/public/artifacts/ca2b714a-3b79-498e-83db-9288497a5fc4" 
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-medium transition-colors ${hoveredItem === "terms" ? "text-accent" : "text-muted-foreground"}`}
      >
        Terms of Service
      </a>
    </li>
  </ul>
</div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide mb-4 text-muted-foreground">
                Contact
              </h3>
              <div onMouseEnter={() => setHoveredItem("email")} onMouseLeave={() => setHoveredItem(null)}>
                <a href="mailto:contact@acenavi.in" className={`text-sm font-medium transition-colors ${hoveredItem === "email" ? "text-accent" : "text-muted-foreground"}`}>
                  contact@acenavi.in
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-medium text-muted-foreground">
            © {new Date().getFullYear()} ACENAVI™. All rights reserved.
          </div>

          <div className="flex gap-6">
            <div onMouseEnter={() => setHoveredItem("instagram")} onMouseLeave={() => setHoveredItem(null)}>
              <a href="https://www.instagram.com/naviai.in/" target="_blank" rel="noopener noreferrer" className={`text-xs font-medium transition-colors ${hoveredItem === "instagram" ? "insta-col" : "text-muted-foreground"}`}>
                Instagram
              </a>
            </div>

            <div onMouseEnter={() => setHoveredItem("linkedin")} onMouseLeave={() => setHoveredItem(null)}>
              <a href="https://www.linkedin.com/company/navihr/" target="_blank" rel="noopener noreferrer" className={`text-xs font-medium transition-colors ${hoveredItem === "linkedin" ? "in-col" : "text-muted-foreground"}`}>
                LinkedIn
              </a>
            </div>

            <div onMouseEnter={() => setHoveredItem("youtube")} onMouseLeave={() => setHoveredItem(null)}>
              <a href="https://www.youtube.com/@ACENAVINudges" target="_blank" rel="noopener noreferrer" className={`text-xs font-medium transition-colors ${hoveredItem === "youtube" ? "yt-col" : "text-muted-foreground"}`}>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}