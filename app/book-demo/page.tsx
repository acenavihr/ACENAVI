export const revalidate = 3600

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingHero } from "@/components/booking/booking-hero"
import { BookingForm } from "@/components/booking/booking-form"

export const metadata = {
  title: "Book a Demo - Navi",
  description: "Schedule a personalized demo of Navi with our team.",
}

export default function BookDemoPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BookingHero />
      <BookingForm />
      <Footer />
    </main>
  )
}
