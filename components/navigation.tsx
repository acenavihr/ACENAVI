"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { Menu, X, Home, Sparkles, IndianRupee } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const isActive = (path: string) => pathname === path
  const isBookDemoPage = pathname === "/book-demo"
  const isPricingPage = pathname === "/pricing"

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/features", label: "Features", icon: Sparkles },
    { href: "/pricing", label: "Pricing", icon: IndianRupee },
  ]

  // Dynamic button text based on page
  const buttonText = {
    full: isPricingPage ? "Contact Sales" : "Meet the Team",
    short: isPricingPage ? "Contact" : "Meet"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div 
        className={`transition-all duration-700 ease-out pointer-events-auto ${
          scrolled 
            ? "mt-4" 
            : "mt-0 w-full"
        }`}
      >
        <div 
          className={`transition-all duration-700 ease-out ${
            scrolled
              ? "mx-auto w-fit"
              : "max-w-7xl mx-auto px-6"
          }`}
        >
          <div 
            className={`flex items-center transition-all duration-700 ease-out ${
              scrolled
                ? "backdrop-blur-xl bg-background/80 border border-border shadow-2xl rounded-full px-4 py-3 gap-2"
                : "bg-transparent h-20 justify-between"
            }`}
          >
            {/* Logo - Animated transition between full logo and symbol */}
            <Link 
              href="/" 
              className={`relative flex items-center overflow-hidden transition-all duration-700 ease-out hover:opacity-80 ${
                scrolled ? "w-8 h-8" : "w-auto h-10"
              }`}
            >
              {scrolled ? (
                <Image
                  src="/navi_symbol.png"
                  alt="Navi"
                  width={32}
                  height={32}
                  className="dark:invert-0 invert transition-all duration-700"
                />
              ) : (
                <Image
                  src="/navi_logo.png"
                  alt="Navi"
                  width={120}
                  height={40}
                  className="dark:invert-0 invert transition-all duration-700"
                />
              )}
            </Link>

            {/* Desktop nav - Animated icons/text transition */}
            <div 
              className={`hidden md:flex items-center transition-all duration-700 ease-out ${
                scrolled ? "gap-1" : "gap-8"
              }`}
            >
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative transition-all duration-700 ease-out flex items-center justify-center ${
                      scrolled 
                        ? "w-9 h-9 rounded-full hover:bg-accent/10" 
                        : "px-0 py-2"
                    } ${
                      isActive(link.href) 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={scrolled ? link.label : undefined}
                  >
                    <div className={`transition-all duration-700 ease-out ${
                      scrolled ? "scale-100 opacity-100" : "scale-0 opacity-0 absolute"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span 
                      className={`text-sm font-medium transition-all duration-700 ease-out whitespace-nowrap ${
                        scrolled ? "scale-0 opacity-0 w-0" : "scale-100 opacity-100"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              })}
            </div>

            {/* CTA Button - Animated width and text transition - Hidden on book-demo page */}
            {!isBookDemoPage && (
              <Button 
                asChild 
                className={`hidden md:inline-flex bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-700 ease-out hover:scale-105 shadow-sm rounded-full overflow-hidden ${
                  scrolled ? "px-4 py-2 text-xs h-9" : "px-6 py-2 text-sm h-10"
                }`}
              >
                <Link href="/book-demo" className="relative flex items-center justify-center">
                  <span 
                    className={`transition-all duration-700 ease-out absolute ${
                      scrolled ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  >
                    {buttonText.short}
                  </span>
                  <span 
                    className={`transition-all duration-700 ease-out whitespace-nowrap ${
                      scrolled ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                  >
                    {buttonText.full}
                  </span>
                </Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 text-foreground hover:text-accent transition-all duration-300 ${
                scrolled ? "ml-2" : ""
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-background/95 backdrop-blur-xl transition-all duration-300 pointer-events-auto ${
          mobileMenuOpen 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ top: scrolled ? "80px" : "80px" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-medium transition-all duration-300 ${
                isActive(link.href) 
                  ? "text-foreground scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 50}ms` : "0ms"
              }}
            >
              {link.label}
            </Link>
          ))}
          
          {/* Hide button in mobile menu on book-demo page */}
          {!isBookDemoPage && (
            <Button 
              asChild 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-lg mt-4"
            >
              <Link href="/book-demo">{buttonText.full}</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}