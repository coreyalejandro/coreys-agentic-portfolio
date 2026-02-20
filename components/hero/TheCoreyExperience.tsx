"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useAnimation } from "@/hooks/useAnimation"
import { AudioSection } from "@/components/audio-experience/audio-section"
import { AudioButton } from "@/components/audio-experience/audio-button"
import { BreathingBackground, ParticleField, FloatingElement } from "@/components/creative-chaos"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

/**
 * TheCoreyExperience - Hero section with orbiting title
 * 
 * DUPLICATED from HeroSection - ONLY words changed, styling preserved exactly
 * Changes:
 * - "Neural" → "Corey"
 * - "Depth" → "Alejandro"  
 * - "Magic" → "Experience"
 * - Added "The" orbiting (same styling as "Alejandro"/"Depth")
 * - Replaced description card with AccomplishmentCard
 */

interface Accomplishment {
  title: string
  description: string
}

const ACCOMPLISHMENTS: Accomplishment[] = [
  {
    title: "Creator of PROACTIVE AI",
    description: "A safety-first training and fine-tuning framework: Intention Is All We Need",
  },
  {
    title: "Builder of MADMall",
    description: "An agentic, orchestrated luxury virtual mall and wellness & research center catering to Black women with Graves disease",
  },
  {
    title: "Architect of OC Global",
    description: "A mobile-first, R&D-driven accelerated online college",
  },
  {
    title: "Maker of MobileU",
    description: "A machine-learning and SMS-based course development and delivery platform",
  },
]

// DUPLICATED Floating Description Card - scaled 2x bigger
function AccomplishmentCard({ time, mousePosition }: { time: number; mousePosition: { x: number; y: number } }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCOMPLISHMENTS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])
  
  const current = ACCOMPLISHMENTS[currentIndex]

  return (
    <div
      className="absolute right-12 top-1/3 max-w-2xl"
      style={{
        transform: `translate(${-mousePosition.x * 0.01}px, ${mousePosition.y * 0.02}px) rotate(${-Math.sin(time * 0.7) * 1}deg)`,
      }}
    >
      {/* EXACT same card styling as HeroSection but scaled bigger */}
      <div className="bg-white/10 backdrop-blur-md rounded-[4rem] p-12 border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span className="text-base uppercase tracking-[0.25em] text-white/60 font-medium">
            Now Playing
          </span>
        </div>
        
        {/* Cycling Accomplishment */}
        <div className="relative min-h-[200px]">
          {ACCOMPLISHMENTS.map((acc, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-all duration-700",
                i === currentIndex 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-4"
              )}
            >
              <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                {acc.title}
              </h3>
              <p className="text-xl text-white/70 leading-relaxed">
                {acc.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress dots */}
        <div className="flex gap-3 mt-8">
          {ACCOMPLISHMENTS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                i === currentIndex ? "w-12 bg-amber-500" : "w-3 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TheCoreyExperience() {
  const { time, mousePosition } = useAnimation()

  return (
    <AudioSection
      id="hero"
      title="The Corey Alejandro Experience"
      description="Creator of PROACTIVE AI, Builder of MADMall, Architect of OC Global, Maker of MobileU."
      position={{ x: 0, y: 0, z: -5 }}
    >
      <section className="relative min-h-screen rounded-3xl mb-16 overflow-hidden">
        {/* EXACT same orbiting headline as HeroSection */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          aria-hidden
        >
          <div
            className="absolute text-7xl md:text-8xl font-black text-white/30 select-none whitespace-nowrap transition-opacity duration-300"
            style={{
              transform: `
                rotate(${time * 15}deg)
                translateX(min(42vw, 380px))
                rotate(${-time * 15}deg)
              `,
              opacity: (() => {
                const angle = ((time * 15) % 360) * (Math.PI / 180)
                const y = Math.sin(angle)
                return y > 0 ? 0.4 : Math.max(0.02, 0.4 + y * 0.45)
              })(),
            }}
          >
            The Experience
          </div>
        </div>

        {/* EXACT same background */}
        <BreathingBackground time={time} variant="hero" className="rounded-3xl" />

        {/* EXACT same particles */}
        <ParticleField time={time} count={15} mouseInteraction={true} />

        {/* Main Hero Content */}
        <div className="relative z-10 h-screen flex items-center">
          <div className="container mx-auto px-4">
            
            {/* Main Title - EXACT same positioning and styling */}
            <div
              className="absolute left-8 top-1/4"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.015}px) rotate(${Math.sin(time) * 2}deg)`,
              }}
            >
              {/* "The" - Orbiting independently with SAME styling as "Alejandro" */}
              <div
                className="absolute -left-32 -top-16"
                style={{
                  transform: `
                    translate(${Math.cos(time * 0.4) * 60}px, ${Math.sin(time * 0.3) * 40}px)
                    rotate(${Math.sin(time * 0.5) * 15}deg)
                  `,
                }}
              >
                <span className="block text-7xl md:text-8xl font-black bg-linear-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  The
                </span>
              </div>

              <h1 className="text-8xl md:text-9xl font-black text-white leading-none">
                {/* EXACT same styling: transform -rotate-3 */}
                <span className="block transform -rotate-3">Corey</span>
                {/* EXACT same styling as "Depth": rotate-2 ml-12 bg-linear-to-r from-amber-200 to-orange-200 */}
                <span className="block transform rotate-2 ml-12 bg-linear-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Alejandro
                </span>
                {/* EXACT same styling as "Magic": -rotate-1 ml-6 text-7xl */}
                <span className="block transform -rotate-1 ml-6 text-7xl">Experience</span>
              </h1>
            </div>

            {/* Accomplishment Card - scaled 2x bigger, same position as description card */}
            <AccomplishmentCard time={time} mousePosition={mousePosition} />

            {/* EXACT same scattered element */}
            <FloatingElement
              time={time}
              index={0}
              amplitude={{ x: 20, y: 15 }}
              speed={{ x: 1.2, y: 1.0 }}
              className="bottom-32 left-1/4"
            >
              <div className="bg-linear-to-br from-orange-400 to-red-500 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform text-white font-bold text-2xl">
                ▶
              </div>
            </FloatingElement>

          </div>
        </div>
      </section>
    </AudioSection>
  )
}
