import { AnimatedButton } from "@/components/ui/animated-button"

export function FeaturesCTA() {
  return (
    <section className="py-20 md:py-32 border-t border-border bg-muted/40">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">See how these features work together</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Navi puts HR at the center of your team's communication. Schedule a demo to see it in action.
        </p>
        <AnimatedButton text="Meet the Team" href="/book-demo" />
      </div>
    </section>
  )
}