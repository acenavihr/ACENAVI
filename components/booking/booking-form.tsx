"use client"

import { useState, useEffect } from "react"
import { Clock, Mail } from "lucide-react"

export function BookingForm() {
  const [bookingComplete, setBookingComplete] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showCustomRequest, setShowCustomRequest] = useState(false)
  const [customRequestForm, setCustomRequestForm] = useState({
    name: "",
    email: "",
    timezone: "",
    preferredTimes: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Listen for Calendly event completion
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        const email = e.data.payload?.invitee?.email || "your email"
        setUserEmail(email)
        setBookingComplete(true)
        
        setTimeout(() => {
          setBookingComplete(false)
          setUserEmail("")
        }, 5000)
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    return () => window.removeEventListener('message', handleCalendlyEvent)
  }, [])

  const handleCustomRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email via your API route
      const response = await fetch('/api/custom-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customRequestForm)
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setCustomRequestForm({
          name: "",
          email: "",
          timezone: "",
          preferredTimes: "",
          message: ""
        })
        
        setTimeout(() => {
          setShowCustomRequest(false)
          setSubmitSuccess(false)
        }, 5000)
      }
    } catch (error) {
      console.error('Error submitting custom request:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

            {/* Custom Time Request CTA */}
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                <h4 className="font-semibold text-sm mb-1">Can't find a suitable time?</h4>
<p className="text-xs text-muted-foreground mb-3">
  Request a custom time that works for your schedule and timezone.
</p>
                  <button
                    onClick={() => setShowCustomRequest(true)}
                    className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    Request Custom Time
                  </button>
                </div>
              </div>
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

          {/* Right: Calendly, Custom Request Form, or Success */}
          <div className="lg:col-span-2 lg:-mt-30">
            {bookingComplete ? (
              // Calendly Success
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
            ) : showCustomRequest ? (
              // Custom Time Request Form
              <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Request Sent!</h3>
                    <p className="text-muted-foreground">
                      We'll reach out within 24 hours to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold">Request Custom Time</h3>
                      <button
                        onClick={() => setShowCustomRequest(false)}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        ← Back to calendar
                      </button>
                    </div>

                    <form onSubmit={handleCustomRequestSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customRequestForm.name}
                          onChange={(e) => setCustomRequestForm({...customRequestForm, name: e.target.value})}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={customRequestForm.email}
                          onChange={(e) => setCustomRequestForm({...customRequestForm, email: e.target.value})}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Timezone *
                        </label>
                        <input
                          type="text"
                          required
                          value={customRequestForm.timezone}
                          onChange={(e) => setCustomRequestForm({...customRequestForm, timezone: e.target.value})}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="e.g., EST, PST, GMT+5"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Preferred Times *
                        </label>
                        <textarea
                          required
                          value={customRequestForm.preferredTimes}
                          onChange={(e) => setCustomRequestForm({...customRequestForm, preferredTimes: e.target.value})}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                          rows={3}
                          placeholder="e.g., Monday-Friday 9AM-12PM EST, or weekends anytime"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Additional Message (Optional)
                        </label>
                        <textarea
                          value={customRequestForm.message}
                          onChange={(e) => setCustomRequestForm({...customRequestForm, message: e.target.value})}
                          className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                          rows={3}
                          placeholder="Any specific questions or requirements?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Send Request"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              // Calendly Embed
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