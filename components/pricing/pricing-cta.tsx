import { AnimatedButton } from "@/components/ui/animated-button"

export function PricingCTA() {
  return (
    <section className="py-20 md:py-32 border-t border-border bg-muted/40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Reach out to us to discuss pricing</h2>
        <p className="text-lg text-muted-foreground mb-8">
          We'll work with you to find the best plan for your organisation.
        </p>
        <AnimatedButton text="Contact Sales" href="/book-demo" />
      </div>
    </section>
  )
}