"use client"

import { AnimationProvider } from "@/contexts/AnimationContext"
import { HeroSection } from "@/app/(home)/sections/HeroSection"
import { SafetyDomainsSection } from "@/app/(home)/sections/SafetyDomainsSection"
import { PlatformSection } from "@/app/(home)/sections/PlatformSection"
import { FeaturedProductsSection } from "@/app/(home)/sections/FeaturedProductsSection"
import { DoctrineSection } from "@/app/(home)/sections/DoctrineSection"
import { EvidenceSection } from "@/app/(home)/sections/EvidenceSection"

/**
 * HomePage — Safety Systems Design identity
 *
 * Flow per contract: Identity → Domains → Platform → Products → Doctrine → Evidence
 * Creative Chaos design system throughout.
 *
 * Previous flow: Hero → Superpowers → Resume → CTA → Portfolio
 * New flow: Hero (identity) → Domains (4 safety domains) → Platform (SentinelOS) →
 *           Products (real domain products) → Doctrine (4-point) → Evidence (verification)
 */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <AnimationProvider>
        <HeroSection />
        <SafetyDomainsSection />
        <PlatformSection />
        <FeaturedProductsSection />
        <DoctrineSection />
        <EvidenceSection />
      </AnimationProvider>
    </div>
  )
}
