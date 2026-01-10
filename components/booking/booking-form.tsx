"use client"

import { useState, useEffect } from "react"

export function BookingForm() {
  const [bookingComplete, setBookingComplete] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  // Listen for Calendly event completion
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        // Extract email if available from Calendly payload
        const email = e.data.payload?.invitee?.email || "your email"
        setUserEmail(email)
        setBookingComplete(true)
        
        // Reset after 5 seconds
        setTimeout(() => {
          setBookingComplete(false)
          setUserEmail("")
        }, 5000)
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left: Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What to expect</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-accent font-bold text-base">✓</span>
                  <span>15-20 minute walkthrough of ACENAVI's core features</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold text-base">✓</span>
                  <span>Live demo of Slack and Teams integration</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold text-base">✓</span>
                  <span>Custom pricing based on your organization size</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold text-base">✓</span>
                  <span>Q&A and next steps discussion</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="text-lg font-semibold mb-2">Questions?</h3>
              <p className="text-sm text-muted-foreground">
                Email us at{" "}
                <a 
                  href="mailto:contact@acenavi.in" 
                  className="text-accent hover:underline font-medium"
                >
                  contact@acenavi.in
                </a>
              </p>
            </div>
          </div>

          {/* Right: Calendly or Success - Aligned to top */}
          <div className="lg:col-span-2 lg:-mt-30">
            {bookingComplete ? (
              // Success Message
              <div className="bg-card border border-border rounded-xl p-12 text-center shadow-lg">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">Demo Scheduled!</h3>
                <p className="text-lg text-muted-foreground mb-2">
                  We've sent a calendar invite to{" "}
                  <span className="font-medium text-foreground">{userEmail}</span>
                </p>
                <p className="text-muted-foreground">
                  Looking forward to showing you ACENAVI!
                </p>
              </div>
            ) : (
              // Calendly Embed - No container, scrolls with page
              <div className="calendly-inline-widget min-h-[1000px]">
                <iframe
                  src="https://calendly.com/acenavidemo/30min"
                  width="100%"
                  height="1000"
                  frameBorder="0"
                  style={{ minHeight: '1000px' }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}