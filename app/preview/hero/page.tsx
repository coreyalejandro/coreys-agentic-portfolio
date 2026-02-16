"use client"

import { TheCoreyExperience } from "@/components/hero/TheCoreyExperience"

/**
 * Preview page for TheCoreyExperience hero section
 * This is isolated - it doesn't affect your main portfolio
 */

export default function HeroPreviewPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <TheCoreyExperience />
      
      {/* Simple footer for preview */}
      <div className="fixed bottom-4 left-4 text-xs text-white/30 font-mono">
        Preview Mode - Branch: feature/hero-orbiter-section
      </div>
    </main>
  )
}
