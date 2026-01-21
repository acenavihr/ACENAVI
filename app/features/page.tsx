export const dynamic = 'force-dynamic'

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FeaturesHero } from "@/components/features/features-hero"
import { FeaturesGrid } from "@/components/features/features-grid"
import { FeaturesWorkflow } from "@/components/features/features-workflow"
import { FeaturesCTA } from "@/components/features/features-cta"
import { FeaturesConnection } from "@/components/features/features-connection"
import { FeaturesTestimonials } from "@/components/features/features-testimonials"

export const metadata = {
  title: "Features - ACENAVI",
  description: "Explore how ACENAVI integrates HR into Slack and Microsoft Teams.",
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <FeaturesHero />
      <FeaturesWorkflow />
      <FeaturesConnection />
      {/*<FeaturesConnection />*/}
      <FeaturesGrid />
      {/*<FeaturesTestimonials />*/}
      <FeaturesCTA />
      <Footer />
    </main>
  )
}
