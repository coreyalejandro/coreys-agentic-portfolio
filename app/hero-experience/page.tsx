"use client"

import { TheCoreyExperience } from "@/components/hero/TheCoreyExperience"

/**
 * Hero Experience – composition route for The Corey Alejandro Experience.
 * Linked from the main nav for easy access.
 */
export default function HeroExperiencePage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <TheCoreyExperience />
    </main>
  )
}
