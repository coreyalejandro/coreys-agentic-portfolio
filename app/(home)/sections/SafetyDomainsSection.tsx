"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { BreathingBackground, ParticleField, FloatingElement } from "@/components/creative-chaos"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { safetyDomains } from "@/config/domains"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

/**
 * SafetyDomainsSection — Four domains of safety
 *
 * Creative Chaos design: scattered absolute-positioned domain cards,
 * orbiting badges, breathing background, collage layout, organic drift.
 * NOT a SaaS grid. Each card is placed, rotated, floating independently.
 */

const CARD_POSITIONS = [
  { x: 5, y: 15, rotation: -6, size: "large" as const },
  { x: 55, y: 5, rotation: 8, size: "medium" as const },
  { x: 10, y: 60, rotation: 12, size: "medium" as const },
  { x: 52, y: 55, rotation: -4, size: "large" as const },
]

const SIZE_CLASSES = {
  large: "w-[420px] md:w-[520px]",
  medium: "w-[360px] md:w-[440px]",
}

export function SafetyDomainsSection() {
  const { time, mousePosition } = useAnimation()

  return (
    <AudioSection
      id="domains"
      title="Four Domains of Safety"
      description="Epistemic, Human, Cognitive, and Empirical — each addressing a distinct class of harm."
      position={{ x: 0, y: 1, z: -6 }}
    >
      <section
        id="domains"
        className="relative rounded-3xl mb-16 overflow-visible"
        style={{
          background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
          transition: "background 3s ease-in-out",
        }}
      >
        {/* Living background */}
        <BreathingBackground time={time} variant="hero" className="rounded-3xl" />
        <ParticleField time={time} count={10} mouseInteraction />

        {/* Floating section title */}
        <div className="relative min-h-[50vh] flex items-center justify-center p-8">
          <div
            className="text-center z-20"
            style={{
              transform: `translate(${Math.sin(time * 0.3) * 60}px, ${Math.cos(time * 0.3) * 30}px) rotate(${Math.sin(time * 0.2) * 3}deg)`,
            }}
          >
            <h2
              className="text-7xl md:text-8xl font-black drop-shadow-2xl"
              style={{
                background: "linear-gradient(90deg, var(--theme-accent), var(--theme-text))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FOUR
            </h2>
            <div
              className="text-5xl md:text-6xl font-light mt-2"
              style={{
                transform: `rotate(${Math.cos(time * 0.4) * 6}deg)`,
                color: "var(--theme-text)",
              }}
            >
              DOMAINS
            </div>
          </div>

          {/* Orbiting domain badges */}
          {["Epistemic", "Human", "Cognitive", "Empirical"].map((name, i) => (
            <Badge
              key={name}
              className="absolute backdrop-blur-sm font-semibold z-10"
              style={{
                backgroundColor: "var(--theme-card)",
                borderColor: "var(--theme-border)",
                color: "var(--theme-text)",
                transform: `translate(${180 + Math.cos(time * 0.4 + i * 1.57) * 160}px, ${180 + Math.sin(time * 0.4 + i * 1.57) * 120}px) rotate(${time * 8 + i * 90}deg)`,
              }}
            >
              {name} Safety
            </Badge>
          ))}
        </div>

        {/* Scattered domain cards — absolute, rotated, drifting */}
        <section className="relative py-16 px-8 pb-48">
          <div className="relative max-w-7xl mx-auto" style={{ minHeight: "1200px" }}>
            {safetyDomains.map((domain, i) => {
              const pos = CARD_POSITIONS[i]
              const statusColors: Record<string, { bg: string; text: string }> = {
                implemented: { bg: "rgba(16,185,129,0.15)", text: "#6ee7b7" },
                partial: { bg: "rgba(245,158,11,0.15)", text: "#fcd34d" },
                prototype: { bg: "rgba(139,92,246,0.15)", text: "#c4b5fd" },
                planned: { bg: "rgba(161,161,170,0.15)", text: "#a1a1aa" },
              }
              const sc = statusColors[domain.primaryProduct.status] ?? statusColors.planned

              return (
                <div
                  key={domain.id}
                  className={`absolute group cursor-pointer transition-all duration-700 hover:scale-105 hover:z-30 ${SIZE_CLASSES[pos.size]} shadow-2xl`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y + i * 220}px`,
                    transform: `rotate(${pos.rotation + Math.sin(time * 0.3 + i) * 3}deg) translateX(${Math.sin(time * 0.2 + i) * 10}px)`,
                    zIndex: 10 + i,
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-[2.5rem] border"
                    style={{
                      background: `linear-gradient(145deg, ${domain.color}15, rgba(0,0,0,0.6))`,
                      borderColor: `${domain.color}40`,
                    }}
                  >
                    {/* Domain color glow */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                      style={{ backgroundColor: domain.color }}
                    />

                    <div className="relative p-8 md:p-10">
                      {/* Icon + domain name */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{domain.icon}</span>
                        <h3
                          className="text-2xl font-black"
                          style={{ color: domain.color }}
                        >
                          {domain.name}
                        </h3>
                      </div>

                      <p className="text-xs font-mono text-white/40 mb-4">{domain.focus}</p>

                      {/* Failure class */}
                      <p className="text-white/60 text-sm leading-relaxed mb-6">
                        {domain.failureClass}
                      </p>

                      {/* Product block — glassmorphic */}
                      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-bold text-lg">
                            {domain.primaryProduct.name}
                          </span>
                          <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            {domain.primaryProduct.status}
                          </span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {domain.primaryProduct.headline}
                        </p>
                        {domain.primaryProduct.evidence && (
                          <div
                            className="mt-3 px-3 py-2 rounded-xl text-xs font-mono"
                            style={{ background: "rgba(16,185,129,0.08)", color: "#6ee7b7", border: "1px solid rgba(16,185,129,0.2)" }}
                          >
                            {domain.primaryProduct.evidence}
                          </div>
                        )}
                      </div>

                      {/* Repo link */}
                      <Link
                        href={domain.primaryProduct.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-xs text-white/30 hover:text-white/60 transition-colors font-mono"
                      >
                        view repo →
                      </Link>
                    </div>

                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.5rem]"
                      style={{ background: `linear-gradient(135deg, ${domain.color}10, transparent)` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>
    </AudioSection>
  )
}
