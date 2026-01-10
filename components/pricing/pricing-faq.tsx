"use client"

import { useState } from "react"

export function PricingFAQ() {
  const [expanded, setExpanded] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does ACENAVI actually create value for our organization?",
      answer:
        "ACENAVI helps people feel supported, informed and connected at work. Instead of searching, waiting for replies, or feeling unsure about what to do next, employees and managers can simply ask ACENAVI and get clear, human guidance instantly. This means fewer HR tickets, more confident managers, and employees who feel seen and cared for — all without changing your existing systems or workflows.",
    },
    {
      question: "How does ACENAVI integrate with our existing systems?",
      answer:
        "ACENAVI lives inside the tools your people already use — like Microsoft Teams or Slack — and connects to your HR, learning and performance systems in the background. There’s no new platform for your teams to learn. ACENAVI simply makes everyday interactions smoother, kinder and easier.",
    },
    {
      question: "Is ACENAVI secure, and how do you handle data privacy?",
      answer:
        "Yes. ACENAVI is designed with enterprise security principles and strict governance. We align with India’s Digital Personal Data Protection (DPDP) Act and handle employee information with care and respect. Your organization’s data remains private and protected — always",
    },
    {
      question: "How long does implementation take, and what internal effort is required?",
      answer:
        "Most organizations go live within 2–4 weeks. ACENAVI is intentionally lightweight, so the burden on your internal teams is minimal. We work closely with HR and IT to configure ACENAVI to your people, your tone and your culture — ensuring a smooth and confident rollout.",
    },
    {
      question: "Who is ACENAVI designed for, and what size companies benefit most?",
      answer:
        "ACENAVI is built for organizations that care deeply about employee experience and communication. Whether you are a growing company or a large enterprise, ACENAVI helps HR and leadership create clarity, connection and support across the people journey — at scale.",
    },
    {
      question: "Does ACENAVI replace our HR platforms?",
      answer:
        "No — ACENAVI doesn’t replace your HR systems. It makes them work the way people actually live and work today. Employees shouldn’t have to dig through systems or wait days for answers. With ACENAVI, they can simply ask, act and move forward with confidence. That means less effort for HR — and a more human experience for everyone.",
    },
    {
      question: "Can managers and leaders use ACENAVI too?",
      answer:
        "Yes. ACENAVI supports leaders with insights, nudges and everyday guidance so they can show up better for their teams. Whether it’s onboarding, recognition, performance or simply staying connected — ACENAVI helps leaders build stronger, more trusting relationships at work.",
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
