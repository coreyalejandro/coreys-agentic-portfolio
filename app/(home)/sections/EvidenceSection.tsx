"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { ParticleField, FloatingElement } from "@/components/creative-chaos"
import Link from "next/link"

/**
 * EvidenceSection — Verifiable evidence
 *
 * Creative Chaos design: scattered evidence cards with organic rotation,
 * living gradient, glassmorphic containers, floating accents.
 * NOT a data table. Each evidence artifact is its own floating block.
 */

const EVIDENCE = [
  {
    artifact: "PROACTIVE validation (n=200)",
    proves: "100% detection rate, 0% false positive rate on TruthfulQA benchmark",
    domain: "Epistemic Safety",
    color: "#f59e0b",
    link: "https://github.com/coreyalejandro/28441830",
    rotation: -5,
    x: 5,
    y: 0,
  },
  {
    artifact: "UICare-System Docker",
    proves: "MonitorAgent + RescueAgent containerized and running on ports 3001/3002",
    domain: "Human Safety",
    color: "#ef4444",
    link: "https://github.com/coreyalejandro/uicare-system",
    rotation: 7,
    x: 50,
    y: 30,
  },
  {
    artifact: "IIUI prototype",
    proves: "Evaluator interface with rubric system, evidence states, and journey-map flow",
    domain: "Cognitive Safety",
    color: "#8b5cf6",
    link: "https://github.com/coreyalejandro/instructional-integrity-ui",
    rotation: -3,
    x: 8,
    y: 220,
  },
  {
    artifact: "ConsentChain API routes",
    proves: "Consent ledger operational with full gateway pipeline and cryptographic signing",
    domain: "Empirical Safety",
    color: "#06b6d4",
    link: "https://github.com/coreyalejandro/consentchain",
    rotation: 5,
    x: 48,
    y: 260,
  },
] as const

export function EvidenceSection() {
  const { time, mousePosition } = useAnimation()

  return (
    <section id="evidence" className="relative min-h-screen rounded-3xl mb-16 overflow-hidden">
      {/* Living gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${160 + Math.sin(time * 0.3) * 15}deg, rgba(16,185,129,0.04) 0%, rgba(251,191,36,0.03) 50%, rgba(6,182,212,0.04) 100%)`,
        }}
      />

      <ParticleField time={time} count={6} mouseInteraction />

      <div className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          {/* Title — organic rotation */}
          <div
            className="mb-24"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px) rotate(${Math.sin(time * 0.4) * 1.5}deg)`,
            }}
          >
            <div className="font-mono text-[10px] tracking-widest text-emerald-500/70 mb-4">
              ✦ VERIFICATION
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none">
              <span className="block transform rotate-1">Every Claim</span>
              <span className="block transform -rotate-2 ml-8 bg-linear-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Is Verifiable
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-6 max-w-md font-mono">
              I2: No Phantom Work — Nothing is described that does not exist.
            </p>
          </div>

          {/* Scattered evidence cards */}
          <div className="relative" style={{ minHeight: "550px" }}>
            {EVIDENCE.map((row, i) => (
              <Link
                key={i}
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-[85%] md:w-[44%] group block"
                style={{
                  left: `${row.x}%`,
                  top: `${row.y}px`,
                  transform: `rotate(${row.rotation + Math.sin(time * 0.3 + i * 0.6) * 2}deg) translate(${Math.cos(time * 0.2 + i) * 6}px, ${Math.sin(time * 0.3 + i) * 4}px)`,
                  zIndex: 10 + i,
                }}
              >
                <div
                  className="relative overflow-hidden rounded-[2rem] p-7 md:p-8 border transition-all duration-500 shadow-xl group-hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(145deg, ${row.color}10, rgba(0,0,0,0.5))`,
                    borderColor: `${row.color}25`,
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: row.color }}
                  />

                  <div className="relative">
                    {/* Domain tag */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: row.color }}
                      />
                      <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: row.color }}>
                        {row.domain}
                      </span>
                    </div>

                    {/* Artifact name */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                      {row.artifact}
                    </h3>

                    {/* What it proves */}
                    <p className="text-white/50 text-sm leading-relaxed">
                      {row.proves}
                    </p>

                    <span className="inline-block mt-4 text-[10px] font-mono text-white/25 group-hover:text-white/50 transition-colors">
                      verify →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent */}
      <FloatingElement
        time={time}
        index={4}
        amplitude={{ x: 20, y: 14 }}
        speed={{ x: 0.6, y: 0.8 }}
        className="bottom-32 left-1/4"
      >
        <div className="bg-linear-to-br from-emerald-400 to-cyan-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-mono text-[10px] font-bold text-center leading-tight shadow-lg shadow-emerald-500/20">
          n=200<br />0% FPR
        </div>
      </FloatingElement>
    </section>
  )
}
