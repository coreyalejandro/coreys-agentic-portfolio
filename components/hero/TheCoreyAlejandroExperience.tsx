"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

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

function AccomplishmentCard({ time, mousePosition }: { time: number; mousePosition: { x: number; y: number } }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCOMPLISHMENTS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute right-12 top-1/3 max-w-md"
      style={{
        transform: `translate(${-mousePosition.x * 0.01}px, ${mousePosition.y * 0.02}px) rotate(${-Math.sin(time * 0.7) * 1}deg)`,
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-[4rem] p-8 border border-white/20">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <span className="text-base uppercase tracking-[0.25em] text-white/60 font-medium">
            Now Playing
          </span>
        </div>

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

        <div className="flex gap-2 mt-6">
          {ACCOMPLISHMENTS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TheCoreyAlejandroExperience() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [time, setTime] = useState(0)
  const requestRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      setTime((prev) => prev + 0.016)
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden rounded-3xl">
      <div className="relative min-h-screen">
        {/* Home link - positioned first per design (matches landing template) */}
        <Link
          href="/"
          className="shrink-0 px-2 py-0.5 rounded text-[13px] font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white/50"
          style={{
            background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
            color: "white",
          }}
          aria-label="Home"
          role="menuitem"
        >
          Home
        </Link>
        {/* Breathing, Living Background */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `
              radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%,
                rgba(251, 191, 36, 0.8) 0%,
                rgba(239, 68, 68, 0.6) 30%,
                rgba(194, 65, 12, 0.9) 70%,
                rgba(120, 53, 15, 1) 100%),
              radial-gradient(ellipse at ${80 + Math.cos(time * 1.2) * 8}% ${70 + Math.sin(time * 0.9) * 12}%,
                rgba(251, 146, 60, 0.7) 0%,
                transparent 50%)
            `,
            transform: `scale(${1 + Math.sin(time * 0.5) * 0.05}) rotate(${Math.sin(time * 0.3) * 2}deg)`,
          }}
        />

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${10 + ((i * 7) % 80)}%`,
                top: `${15 + ((i * 11) % 70)}%`,
                transform: `
                  translate(
                    ${Math.sin(time + i) * 54 + mousePosition.x * 0.018}px,
                    ${Math.cos(time * 0.8 + i) * 36 + mousePosition.y * 0.014}px
                  )
                  rotate(${time * 18 + i * 45}deg)
                  scale(${0.5 + Math.sin(time + i) * 0.5})
                `,
              }}
            >
              <div className={`w-${3 + (i % 4)} h-${3 + (i % 4)} rounded-full bg-white/20 backdrop-blur-sm`} />
            </div>
          ))}
        </div>

        {/* "The Experience" orbiting text - full 360 around title block */}
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
            The
          </div>
        </div>

        <div className="relative h-[555px] flex items-center">
          <div className="container mx-auto px-4">
            {/* Main Title - Positioned Organically */}
            <div
              className="absolute left-8 top-1/4"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.015}px) rotate(${Math.sin(time) * 2}deg)`,
              }}
            >
              <h1 className="text-8xl md:text-9xl font-black text-white leading-none">
                <span className="block transform -rotate-3">Corey</span>
                <span className="block transform rotate-2 ml-12 bg-linear-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Alejandro
                </span>
                <span className="block transform -rotate-1 ml-6 text-7xl">Experience</span>
              </h1>
            </div>

            {/* Accomplishment Card - same position and card shell as hero template description */}
            <AccomplishmentCard time={time} mousePosition={mousePosition} />

            {/* Scattered Interactive Elements */}
            <div
              className="absolute bottom-32 left-1/4"
              style={{
                transform: `translate(${Math.sin(time * 1.2) * 20}px, ${Math.cos(time) * 15}px)`,
              }}
            >
              <div className="bg-linear-to-br from-orange-400 to-red-500 rounded-full w-24 h-24 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform text-white font-bold text-sm">
                Play
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="relative">
        {/* Collage-Style Feature Section */}
        <section className="py-32 relative overflow-hidden">
          <div
            className="absolute right-0 bottom-0 w-full h-full bg-linear-to-br from-amber-50 to-orange-100 rounded-3xl"
            style={{
              clipPath: `polygon(0 ${10 + Math.sin(time) * 5}%, 100% 0%, 100% ${90 + Math.cos(time) * 5}%, 0% 100%)`,
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="grid grid-cols-12 gap-8 items-center">
              {/* Large Feature */}
              <div
                className="col-span-12 md:col-span-7"
                style={{
                  transform: `translate(${Math.sin(time * 0.6) * 10}px, ${Math.cos(time * 0.4) * 8}px) rotate(${Math.sin(time * 0.3) * 1}deg)`,
                }}
              >
                <div className="bg-linear-to-br from-white to-amber-50 rounded-[4rem] p-12 shadow-2xl border border-orange-200/50">
                  <h3 className="text-4xl font-bold mb-4 text-balance">Neural Depth Revolution</h3>
                  <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                    Experience interfaces that breathe, respond, and evolve with your every interaction
                  </p>
                </div>
              </div>

              {/* Stacked Small Features */}
              <div className="col-span-12 md:col-span-5 space-y-6">
                <div
                  className="bg-linear-to-r from-orange-500 to-red-600 rounded-3xl p-6 text-white transform rotate-2"
                  style={{
                    transform: `rotate(${2 + Math.sin(time * 0.8) * 2}deg) translate(${Math.cos(time) * 5}px, ${Math.sin(time * 1.1) * 3}px)`,
                  }}
                >
                  <h4 className="text-xl font-semibold mb-2">Motion Poetry</h4>
                  <p className="text-sm opacity-90">Every scroll tells a story</p>
                </div>

                <div
                  className="bg-white rounded-3xl p-6 shadow-lg transform -rotate-1"
                  style={{
                    transform: `rotate(${-1 + Math.cos(time * 0.7) * 1.5}deg) translate(${-Math.sin(time * 0.9) * 8}px, ${Math.cos(time * 0.6) * 4}px)`,
                  }}
                >
                  <h4 className="text-xl font-semibold mb-2">Parallax Dreams</h4>
                  <p className="text-sm text-muted-foreground">Beyond traditional scrolling</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              left: "-1px",
              top: "-1px",
              background: `
                linear-gradient(${45 + Math.sin(time) * 10}deg,
                  rgba(251, 191, 36, 0.1) 0%,
                  rgba(239, 68, 68, 0.1) 50%,
                  rgba(194, 65, 12, 0.1) 100%)
              `,
            }}
          />

          <div className="relative container mx-auto px-4">
            <div className="text-center mb-20">
              <h2
                className="text-7xl font-black text-balance leading-none"
                style={{
                  transform: `rotate(${Math.sin(time * 0.5) * 3}deg)`,
                }}
              >
                <span className="block text-orange-600">Interactive</span>
                <span className="block transform rotate-1 ml-8">Neural</span>
                <span className="block transform -rotate-2 -ml-4 bg-linear-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </div>

            <div className="max-w-6xl mx-auto">
              <div
                className="relative group cursor-none"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`,
                }}
              >
                {/* Floating cursor follower */}
                <div
                  className="absolute w-8 h-8 bg-linear-to-r from-amber-400 to-orange-500 rounded-full pointer-events-none z-20 transition-all duration-100"
                  style={{
                    left: mousePosition.x * 0.02,
                    top: mousePosition.y * 0.02,
                    transform: `scale(${1 + Math.sin(time * 2) * 0.2})`,
                  }}
                />

                <div className="bg-linear-to-br from-white via-amber-50 to-orange-100 rounded-[5rem] p-16 shadow-2xl border border-orange-200/30">
                  <div
                    className="text-center"
                    style={{
                      transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`,
                    }}
                  >
                    <div className="text-8xl font-black bg-linear-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-transparent mb-8">
                      Neural Magic
                    </div>
                    <p className="text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                      Move your cursor to feel the organic response of neural depth in action
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
