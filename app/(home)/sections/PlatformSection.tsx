"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { BreathingBackground, ParticleField, FloatingElement } from "@/components/creative-chaos"
import Link from "next/link"

/**
 * PlatformSection — SentinelOS operating layer
 *
 * Creative Chaos design: collage-style layout with floating invariant cards,
 * living gradient background, scattered elements, organic rotation.
 * SentinelOS is the platform, not the identity.
 */

const INVARIANTS = [
  { id: "I1", name: "Evidence-First", desc: "Every claim must cite verifiable evidence", rotation: -4, x: 8, y: 0 },
  { id: "I2", name: "No Phantom Work", desc: "Nothing is described that does not exist", rotation: 6, x: 52, y: 5 },
  { id: "I3", name: "Confidence Requires Verification", desc: "Certainty demands proof", rotation: -2, x: 15, y: 180 },
  { id: "I4", name: "Traceability Mandatory", desc: "Every output traces to a requirement", rotation: 8, x: 58, y: 170 },
  { id: "I5", name: "Safety Over Fluency", desc: "Correct beats eloquent", rotation: -7, x: 5, y: 340 },
  { id: "I6", name: "Fail Closed", desc: "Ambiguity produces a safety flag, not a pass", rotation: 3, x: 50, y: 350 },
] as const

export function PlatformSection() {
  const { time, mousePosition } = useAnimation()

  return (
    <section id="platform" className="relative min-h-screen rounded-3xl mb-16 overflow-hidden">
      {/* Living conic gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${time * 20}deg at 30% 40%, rgba(251,191,36,0.08) 0%, rgba(239,68,68,0.06) 25%, rgba(194,65,12,0.08) 50%, rgba(251,191,36,0.04) 75%, rgba(239,68,68,0.06) 100%)`,
        }}
      />

      <ParticleField time={time} count={8} mouseInteraction />

      <div className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          {/* Platform identity — asymmetric left positioning with organic drift */}
          <div
            className="max-w-lg mb-24"
            style={{
              transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.01}px) rotate(${Math.sin(time * 0.6) * 1.5}deg)`,
            }}
          >
            <div className="font-mono text-[10px] tracking-widest text-amber-600/70 mb-4">
              ✦ PLATFORM
            </div>
            <h2
              className="text-7xl md:text-8xl font-black text-white leading-none mb-6"
              style={{ transform: `rotate(${Math.sin(time * 0.3) * 2}deg)` }}
            >
              <span className="block transform -rotate-2">Sentinel</span>
              <span className="block transform rotate-1 ml-8 bg-linear-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                OS
              </span>
            </h2>

            <div className="bg-white/8 backdrop-blur-md rounded-[3rem] p-8 border border-white/15">
              <p className="text-white/80 leading-relaxed text-pretty mb-4">
                Six invariants enforced at every system boundary. Every product is a
                domain-specific instantiation of the same architectural pattern:
              </p>
              <p className="text-sm font-mono text-amber-500/80">
                extract claims → validate I1–I6 → produce safe output → log evidence
              </p>
              <Link
                href="/sentinel"
                className="inline-block mt-6 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2.5 text-sm transition-colors"
              >
                View architecture
              </Link>
            </div>
          </div>

          {/* Scattered invariant cards — absolute, rotated, floating */}
          <div className="relative" style={{ minHeight: "520px" }}>
            {INVARIANTS.map((inv, i) => (
              <div
                key={inv.id}
                className="absolute w-[42%] md:w-[38%] group"
                style={{
                  left: `${inv.x}%`,
                  top: `${inv.y}px`,
                  transform: `rotate(${inv.rotation + Math.sin(time * 0.4 + i * 0.8) * 2.5}deg) translate(${Math.cos(time * 0.3 + i) * 8}px, ${Math.sin(time * 0.5 + i) * 6}px)`,
                  zIndex: 10 + i,
                }}
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 border border-white/10 group-hover:border-amber-500/30 transition-all duration-500 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-black font-mono text-amber-500/80">
                      {inv.id}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {inv.name}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{inv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent orb */}
      <FloatingElement
        time={time}
        index={2}
        amplitude={{ x: 30, y: 20 }}
        speed={{ x: 0.8, y: 0.6 }}
        className="bottom-24 right-16"
      >
        <div className="bg-linear-to-br from-amber-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-mono text-xs font-bold shadow-lg shadow-amber-500/20">
          I1–I6
        </div>
      </FloatingElement>
    </section>
  )
}
