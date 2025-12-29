"use client"

import { useState } from "react"

export function PricingFAQ() {
  const [expanded, setExpanded] = useState<number | null>(0)

  const faqs = [
    {
      question: "Can I change plans later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll pro-rate your billing accordingly.",
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer:
        "Yes. Organizations that commit to annual billing receive a 20% discount. Contact our sales team to discuss annual options.",
    },
    {
      question: "What does 'custom pricing' mean?",
      answer:
        "Our pricing is based on your employee count, feature needs, and integration requirements. Schedule a demo with our sales team to get a custom quote.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We offer a 14-day free trial for qualified teams. Your trial includes full access to all features. No credit card required.",
    },
    {
      question: "What happens to my data if I cancel?",
      answer:
        "Your data remains yours. We can export all your data in standard formats within 30 days of cancellation.",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full px-6 py-4 text-left font-semibold hover:bg-muted/50 transition flex items-center justify-between"
              >
                {faq.question}
                <span className={`transition-transform ${expanded === idx ? "rotate-180" : ""}`}>▼</span>
              </button>
              {expanded === idx && (
                <div className="px-6 py-4 border-t border-border bg-muted/30 text-muted-foreground">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
