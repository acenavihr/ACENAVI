"use client"

import { useState, useEffect } from "react"
import { Clock, Mail, Calendar as CalendarIcon } from "lucide-react"

export function BookingForm() {
  const [bookingComplete, setBookingComplete] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showCustomRequest, setShowCustomRequest] = useState(false)
  const [customRequestForm, setCustomRequestForm] = useState({
    name: "",
    email: "",
    timezone: "America/New_York",
    selectedDates: [] as { date: string; time: string }[],
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [tempDate, setTempDate] = useState("")
  const [tempTime, setTempTime] = useState("")

  // Common timezones
  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Phoenix", label: "Arizona Time (AZ)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
    { value: "Europe/London", label: "London (GMT/BST)" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)" },
    { value: "Europe/Berlin", label: "Berlin (CET/CEST)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)" },
    { value: "Australia/Sydney", label: "Sydney (AEDT/AEST)" },
  ]

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
      // Format the dates for email
      const formattedDates = customRequestForm.selectedDates
        .map(d => `${d.date} at ${d.time}`)
        .join('\n')

      const response = await fetch('/api/custom-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customRequestForm.name,
          email: customRequestForm.email,
          timezone: customRequestForm.timezone,
          preferredTimes: formattedDates,
          message: customRequestForm.message
        })
      })

      if (response.ok) {
        setSubmitSuccess(true)
        setCustomRequestForm({
          name: "",
          email: "",
          timezone: "America/New_York",
          selectedDates: [],
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

  const addDateSlot = () => {
    if (tempDate && tempTime) {
      setCustomRequestForm({
        ...customRequestForm,
        selectedDates: [...customRequestForm.selectedDates, { date: tempDate, time: tempTime }]
      })
      setTempDate("")
      setTempTime("")
      setShowDatePicker(false)
    }
  }

  const removeDateSlot = (index: number) => {
    setCustomRequestForm({
      ...customRequestForm,
      selectedDates: customRequestForm.selectedDates.filter((_, i) => i !== index)
    })
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
            {bookingComplete || submitSuccess ? (
              // Success Message (for both Calendly and Custom Request)
              <div className="bg-card border border-border rounded-xl p-12 text-center shadow-lg mt-32">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✓</span>
                </div>
                <h3 className="text-3xl font-bold mb-3">
                  {bookingComplete ? "Demo Scheduled!" : "Request Sent!"}
                </h3>
                <p className="text-lg text-muted-foreground mb-2">
                  {bookingComplete ? (
                    <>
                      We've sent a calendar invite to{" "}
                      <span className="font-medium text-foreground">{userEmail}</span>
                    </>
                  ) : (
                    "We'll reach out within 24 hours to schedule your demo."
                  )}
                </p>
                <p className="text-muted-foreground">
                  Looking forward to showing you ACENAVI!
                </p>
              </div>
            ) : showCustomRequest ? (
              // Custom Time Request Form
              <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
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
                    <select
                      required
                      value={customRequestForm.timezone}
                      onChange={(e) => setCustomRequestForm({...customRequestForm, timezone: e.target.value})}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Date & Time Slots *
                    </label>
                    
                    {/* Show selected dates */}
                    {customRequestForm.selectedDates.length > 0 && (
                      <div className="mb-3 space-y-2">
                        {customRequestForm.selectedDates.map((slot, index) => (
                          <div key={index} className="flex items-center justify-between bg-accent/10 px-3 py-2 rounded-lg">
                            <span className="text-sm">
                              {new Date(slot.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })} at {slot.time}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeDateSlot(index)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add new date/time */}
                    {showDatePicker ? (
                      <div className="space-y-3 border border-border rounded-lg p-4 bg-background/50">
                        <div>
                          <label className="block text-xs font-medium mb-1">Date</label>
                          <input
                            type="date"
                            value={tempDate}
                            onChange={(e) => setTempDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-1">Time</label>
                          <input
                            type="time"
                            value={tempTime}
                            onChange={(e) => setTempTime(e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={addDateSlot}
                            disabled={!tempDate || !tempTime}
                            className="flex-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Add Slot
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setShowDatePicker(false)
                              setTempDate("")
                              setTempTime("")
                            }}
                            className="px-4 py-2 border border-border rounded text-sm hover:bg-accent/10"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowDatePicker(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg hover:border-accent hover:bg-accent/5 transition-colors"
                      >
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">Add Date & Time</span>
                      </button>
                    )}
                    
                    {customRequestForm.selectedDates.length === 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Add at least one preferred date and time
                      </p>
                    )}
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
                    disabled={isSubmitting || customRequestForm.selectedDates.length === 0}
                    className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </button>
                </form>
              </div>
            ) : (
              // Calendly Embed with Loading State
              <div className="relative min-h-[1000px]">
                {!calendlyLoaded && (
                  <div className="absolute inset-0 bg-card border border-border rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading calendar...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://calendly.com/acenavidemo/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=000000&primary_color=1F44FF&embed_type=Inline&embed_domain=acenavi.in"
                  width="100%"
                  height="1000"
                  frameBorder="0"
                  style={{ minHeight: '1000px', opacity: calendlyLoaded ? 1 : 0, background: 'transparent' }}
                  onLoad={() => setCalendlyLoaded(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}