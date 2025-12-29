"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Footer() {
  const { scrollProgress, elementRef } = useScrollAnimation(0.1)

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
    ],
  }

  return (
    <footer 
      ref={elementRef as React.RefObject<HTMLElement>}
      className="bg-background border-t border-border py-16 md:py-20"
    >
      <div 
        className="max-w-7xl mx-auto px-6 transition-all duration-700 ease-out"
        style={{
          opacity: scrollProgress,
          transform: `translateY(${(1 - scrollProgress) * 20}px)`
        }}
      >
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Product */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-tight">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-tight">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-tight">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4 tracking-tight">Contact</h3>
            <a 
              href="mailto:hello@navi.hr"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
            >
              hello@navi.hr
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Navi. All rights reserved.
          </div>
          
          {/* Social links (optional - remove if not needed) */}
          <div className="flex gap-6">
            <a 
              href="https://twitter.com/navi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a 
              href="https://linkedin.com/company/navi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}