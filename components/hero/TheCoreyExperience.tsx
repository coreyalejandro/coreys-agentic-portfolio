"use client"

import { useState, useEffect } from "react"
import { useAnimation } from "@/hooks/useAnimation"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

/**
 * TheCoreyExperience - Hero section with orbiting title
 * 
 * Style notes:
 * - Jittery/erratic motion using Math.sin(time * X) with different frequencies
 * - Glassmorphism cards: bg-white/10 backdrop-blur-md rounded-[4rem] border border-white/20
 * - Slight rotations on elements (transform rotate-X)
 * - Warm amber/orange theme
 * - Organic, breathing feel
 */

interface Accomplishment {
  title: string
  description: string
  icon?: React.ReactNode
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

// --- Orbiter Component ---
// Can orbit text, images, or pure motion around any center point

interface OrbiterProps {
  children: React.ReactNode
  radius: number // Orbit radius in px
  speed: number // Rotation speed
  time: number
  startAngle?: number
  className?: string
  jitterAmount?: number // How much erratic movement
}

function Orbiter({ 
  children, 
  radius, 
  speed, 
  time, 
  startAngle = 0,
  className,
  jitterAmount = 2
}: OrbiterProps) {
  // Base orbit rotation
  const angle = startAngle + time * speed
  
  // Jittery/erratic motion layered on top
  const jitterX = Math.sin(time * 3.7) * jitterAmount + Math.cos(time * 2.3) * (jitterAmount * 0.5)
  const jitterY = Math.cos(time * 4.1) * jitterAmount + Math.sin(time * 1.9) * (jitterAmount * 0.5)
  const jitterRotation = Math.sin(time * 5.5) * (jitterAmount * 0.8)
  
  const x = Math.cos(angle) * radius + jitterX
  const y = Math.sin(angle) * radius + jitterY

  return (
    <div
      className={cn("absolute", className)}
      style={{
        transform: `
          translate(${x}px, ${y}px) 
          rotate(${jitterRotation}deg)
        `,
        transition: "none", // No smooth transition for erratic feel
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}

// --- Accomplishment Card ---
// Transparent card with cycling headlines

function AccomplishmentCard({ time }: { time: number }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Cycle through accomplishments every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCOMPLISHMENTS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  const current = ACCOMPLISHMENTS[currentIndex]
  
  // Erratic card movement
  const cardX = Math.sin(time * 0.8) * 8 + Math.cos(time * 1.3) * 5
  const cardY = Math.cos(time * 0.6) * 6 + Math.sin(time * 1.1) * 4
  const cardRotation = Math.sin(time * 0.4) * 1.5

  return (
    <div
      className="absolute right-8 top-1/3 w-[380px]"
      style={{
        transform: `translate(${cardX}px, ${cardY}px) rotate(${cardRotation}deg)`,
      }}
    >
      {/* Card with your glassmorphism style */}
      <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase tracking-[0.2em] text-white/60 font-medium">
            Now Playing
          </span>
        </div>
        
        {/* Cycling Accomplishment */}
        <div className="relative h-32">
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
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {acc.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {acc.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Progress dots */}
        <div className="flex gap-2 mt-4">
          {ACCOMPLISHMENTS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === currentIndex 
                  ? "w-8 bg-amber-500" 
                  : "w-2 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Decorative orbiting element around card */}
      <Orbiter
        radius={200}
        speed={0.3}
        time={time}
        startAngle={Math.PI / 4}
        jitterAmount={1}
        className="pointer-events-none"
      >
        <div className="w-3 h-3 rounded-full bg-amber-500/50 blur-sm" />
      </Orbiter>
    </div>
  )
}

// --- Main Component ---

export function TheCoreyExperience() {
  const { time, mousePosition } = useAnimation()
  
  // Erratic movement for main title
  const titleX = Math.sin(time * 0.5) * 10 + Math.cos(time * 0.9) * 6
  const titleY = Math.cos(time * 0.4) * 8 + Math.sin(time * 1.2) * 5
  const titleRotation = Math.sin(time * 0.3) * 2

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background with breathing effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at ${30 + Math.sin(time * 0.2) * 10}% ${50 + Math.cos(time * 0.15) * 10}%, rgba(251, 191, 36, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at ${70 + Math.cos(time * 0.25) * 10}% ${30 + Math.sin(time * 0.2) * 10}%, rgba(244, 63, 94, 0.1) 0%, transparent 50%),
            rgba(15, 23, 42, 1)
          `,
        }}
      />
      
      {/* Main content container */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-4">
          
          {/* Title composition */}
          <div className="relative max-w-4xl">
            
            {/* "The" - Orbiting independently */}
            <Orbiter
              radius={280}
              speed={0.4}
              time={time}
              startAngle={-Math.PI / 2}
              jitterAmount={3}
              className="left-0 top-0"
            >
              <span 
                className="text-5xl md:text-6xl font-black text-white/40"
                style={{
                  transform: `rotate(${Math.sin(time * 2) * 5}deg)`,
                }}
              >
                The
              </span>
            </Orbiter>
            
            {/* "Corey Alejandro" - Grouped with erratic movement */}
            <div
              className="relative"
              style={{
                transform: `
                  translate(${titleX}px, ${titleY}px) 
                  rotate(${titleRotation}deg)
                `,
              }}
            >
              <h1 className="text-8xl md:text-9xl font-black leading-[0.85]">
                <span className="block text-white transform -rotate-2">
                  Corey
                </span>
                <span 
                  className="block text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-orange-300 to-rose-300 ml-8 transform rotate-1"
                >
                  Alejandro
                </span>
              </h1>
            </div>
            
            {/* "Experience" - Unbound with micro-movement */}
            <div
              className="mt-4 ml-16"
              style={{
                transform: `
                  translateX(${Math.sin(time * 1.5) * 15 + Math.cos(time * 2.5) * 8}px)
                  translateY(${Math.cos(time * 1.8) * 10}px)
                  rotate(${Math.sin(time * 0.7) * 3}deg)
                `,
              }}
            >
              <span className="text-6xl md:text-7xl font-black text-white/80">
                Experience
              </span>
            </div>
            
            {/* Decorative orbiting elements */}
            <Orbiter
              radius={350}
              speed={-0.25}
              time={time}
              startAngle={0}
              jitterAmount={2}
            >
              <div className="w-4 h-4 rounded-full bg-amber-500/60 blur-sm" />
            </Orbiter>
            
            <Orbiter
              radius={320}
              speed={0.35}
              time={time}
              startAngle={Math.PI}
              jitterAmount={2.5}
            >
              <div className="w-2 h-2 rounded-full bg-rose-500/60 blur-sm" />
            </Orbiter>
          </div>
          
          {/* Accomplishment card on right */}
          <AccomplishmentCard time={time} />
          
        </div>
      </div>
      
      {/* Mouse-responsive floating elements */}
      <div
        className="absolute bottom-1/4 left-1/4 pointer-events-none"
        style={{
          transform: `
            translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)
            translateY(${Math.sin(time * 0.8) * 20}px)
          `,
        }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-md" />
      </div>
    </section>
  )
}
