import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FeaturesHero } from "@/components/features/features-hero"
import { FeaturesGrid } from "@/components/features/features-grid"
import { FeaturesWorkflow } from "@/components/features/features-workflow"
import { FeaturesCTA } from "@/components/features/features-cta"

export const metadata = {
  title: "Features - Navi",
  description: "Explore how Navi integrates HR into Slack and Microsoft Teams.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <FeaturesHero />
      <FeaturesWorkflow />
      <FeaturesGrid />
      <FeaturesCTA />
      <Footer />
    </main>
  )
}
