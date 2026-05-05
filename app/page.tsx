import { UrgencyBar } from '@/components/UrgencyBar'
import { SocialProofTicker } from '@/components/SocialProofTicker'
import { Hero } from '@/components/Hero'
import { TrustSection } from '@/components/TrustSection'
import { HowItWorks } from '@/components/HowItWorks'
import { Testimonials } from '@/components/Testimonials'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'
import { AIChatWidget } from '@/components/AIChatWidget'
import { StickyCTA } from '@/components/StickyCTA'

export default function Home() {
  return (
    <>
      <UrgencyBar />
      <SocialProofTicker />
      <Hero />
      <TrustSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <Footer />

      {/* Floating elements */}
      <AIChatWidget />
      <StickyCTA />
    </>
  )
}
