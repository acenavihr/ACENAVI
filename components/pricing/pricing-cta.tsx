import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingCTA() {
  return (
    <section className="py-20 md:py-32 border-t border-border bg-muted/40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Get the plan that's right for you</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Our sales team will work with you to find the perfect fit for your organization.
        </p>
        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/book-demo">Schedule a Demo</Link>
        </Button>
      </div>
    </section>
  )
}
