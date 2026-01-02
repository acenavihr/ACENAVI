"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Footer() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.1)

  return (
    <footer
      ref={elementRef as React.RefObject<HTMLElement>}
      className="border-t border-border bg-card"
    >
      <div
        className="max-w-6xl mx-auto px-6 py-16 transition-all duration-700 ease-out"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 16}px)`,
        }}
      >
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand / Trust */}
          <div className="max-w-sm">
            <div className="text-sm font-semibold text-foreground mb-2">
              Navi
            </div>
            <p className="text-sm text-foreground/75 leading-relaxed">
              Context-aware HR infrastructure that adapts to how your
              organization already works.
            </p>
          </div>

          {/* Legal + Contact */}
          <div className="flex gap-16">
            {/* Legal */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground mb-4">
                Contact
              </h3>
              <a
                href="mailto:hello@navi.hr"
                className="text-sm text-foreground/80 hover:text-accent transition-colors"
              >
                hello@navi.hr
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} Navi. All rights reserved.
          </div>

          <div className="flex gap-6">
            <a
              href="https://instagram.com/navi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/navi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
