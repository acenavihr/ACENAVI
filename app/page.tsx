import { HeroSection } from "@/components/sections/hero"
import { ProblemSection } from "@/components/sections/problem"
import { SolutionSection } from "@/components/sections/solution"
import { LifecycleSection } from "@/components/sections/lifecycle"
import { IntegrationsSection } from "@/components/sections/integrations"
import { FinalCTASection } from "@/components/sections/final-cta"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <><Navigation /><main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <LifecycleSection />
      <IntegrationsSection />
      <FinalCTASection />
      <Footer />
    </main></>
  )
}
