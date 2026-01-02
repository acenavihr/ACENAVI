import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { ProblemSolutionSection } from "@/components/sections/problem-solution"
import { LifecycleSection } from "@/components/sections/lifecycle"
import { IntegrationsSection } from "@/components/sections/integrations"
import { FinalCTASection } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <ProblemSolutionSection />
        <LifecycleSection />
        <IntegrationsSection />
        <FinalCTASection />
        <Footer />
      </main>
    </>
  )
}