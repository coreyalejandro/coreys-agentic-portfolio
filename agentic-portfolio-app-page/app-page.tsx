"use client"

import { AnimationProvider } from "@/contexts/AnimationContext"
import { HeroSection } from "@/app/(home)/sections/HeroSection"
import { CTASection } from "@/app/(home)/sections/CTASection"
import { PortfolioSection } from "@/app/(home)/sections/PortfolioSection"
import { ResumeSection as ResumeTemplate } from "@/components/resume/ResumeSection"
import { SuperpowerServicesSection } from "@/app/(home)/sections/SuperpowerServicesSection"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimationProvider>
        <HeroSection />
        <SuperpowerServicesSection />
        <ResumeTemplate />
        <CTASection />
        <PortfolioSection />
      </AnimationProvider>
    </div>
  )
}
