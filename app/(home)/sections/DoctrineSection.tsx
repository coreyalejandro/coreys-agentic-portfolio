"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { ParticleField, FloatingElement } from "@/components/creative-chaos"

/**
 * DoctrineSection — 4-point Safety Systems Design doctrine
 *
 * Creative Chaos design: scattered doctrine blocks at varied angles,
 * living conic gradient, floating accents, organic drift.
 * Each doctrine point is a floating glassmorphic panel, NOT a list.
 */

const DOCTRINE = [
  {
    number: 1,
    statement: "Safety is the whole system",
    elaboration: "Not a feature, not a layer, not a checkbox. Safety is the architecture itself.",
    rotation: -4,
    x: 8,
    y: 0,
  },
  {
    number: 2,
    statement: "No failure is meaningless",
    elaboration: "Every failure is a signal. Every near-miss is data. Systems that discard failure data are unsafe.",
    rotation: 6,
    x: 45,
    y: 60,
  },
  {
    number: 3,
    statement: "Systems must govern truth, behavior, and human outcomes",
    elaboration: "Epistemic correctness alone is insufficient. Systems must also govern how humans interpret and act on outputs.",
    rotation: -3,
    x: 5,
    y: 260,
  },
  {
    number: 4,
    statement: "Alignment includes human interpretation",
    elaboration: "A model that produces correct outputs but enables incorrect human action is not aligned. Safety extends past the API boundary.",
    rotation: 5,
    x: 42,
    y: 340,
  },
] as const

export function DoctrineSection() {
  const { time, mousePosition } = useAnimation()

  return (
    <section id="doctrine" className="relative min-h-screen rounded-3xl mb-16 overflow-hidden">
      {/* Living conic gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from ${time * 15}deg at 60% 50%, rgba(251,191,36,0.06) 0%, rgba(194,65,12,0.04) 33%, rgba(239,68,68,0.06) 66%, rgba(251,191,36,0.04) 100%)`,
        }}
      />

      <ParticleField time={time} count={8} mouseInteraction />

      <div className="relative z-10 py-32">
        <div className="container mx-auto px-4">
          {/* Title — organic rotation + mouse parallax */}
          <div
            className="mb-24"
            style={{
              transform: `translate(${mousePosition.x * 0.012}px, ${mousePosition.y * 0.008}px) rotate(${Math.sin(time * 0.5) * 2}deg)`,
            }}
          >
            <div className="font-mono text-[10px] tracking-widest text-amber-600/70 mb-4">
              ✦ DOCTRINE
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none">
              <span className="block transform -rotate-2">What I</span>
              <span className="block transform rotate-3 ml-12 bg-linear-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                Believe
              </span>
            </h2>
          </div>

          {/* Scattered doctrine blocks */}
          <div className="relative" style={{ minHeight: "600px" }}>
            {DOCTRINE.map((point, i) => (
              <div
                key={point.number}
                className="absolute w-[85%] md:w-[48%] group"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}px`,
                  transform: `rotate(${point.rotation + Math.sin(time * 0.3 + i * 0.7) * 2}deg) translate(${Math.cos(time * 0.25 + i) * 6}px, ${Math.sin(time * 0.35 + i) * 5}px)`,
                  zIndex: 10 + i,
                }}
              >
                <div className="bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-7 md:p-10 border border-white/10 group-hover:border-amber-500/25 transition-all duration-500 shadow-xl">
                  {/* Number — large, faded, Creative Chaos style */}
                  <span
                    className="text-6xl md:text-7xl font-black text-amber-500/15 font-mono leading-none block mb-3"
                    style={{ transform: `rotate(${-point.rotation * 0.5}deg)` }}
                  >
                    {point.number}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight text-balance">
                    {point.statement}
                  </h3>

                  <p className="text-white/40 text-sm leading-relaxed">
                    {point.elaboration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accent */}
      <FloatingElement
        time={time}
        index={3}
        amplitude={{ x: 25, y: 18 }}
        speed={{ x: 0.7, y: 0.5 }}
        className="top-1/3 right-12"
      >
        <div className="bg-linear-to-br from-orange-400 to-red-500 rounded-full w-20 h-20 flex items-center justify-center text-white font-black text-xs text-center leading-tight shadow-lg shadow-orange-500/20">
          4-Point<br />Doctrine
        </div>
      </FloatingElement>
    </section>
  )
}
