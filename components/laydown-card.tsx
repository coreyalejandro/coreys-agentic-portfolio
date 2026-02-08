"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface LaydownCardProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
  image?: React.ReactNode
}

const designProcessSteps = [
  { step: 1, title: "Discover", description: "Reject cookie-cutter SaaS. Embrace chaos and creativity." },
  { step: 2, title: "Saturate", description: "Deep, rich colors that break conventions and demand attention." },
  { step: 3, title: "Breathe", description: "Living interfaces that pulse, morph, and respond organically." },
  { step: 4, title: "Float", description: "Elements scatter naturally, creating asymmetric beauty." },
  { step: 5, title: "Delight", description: "Every interaction evokes joy and surprise." },
]

export function LaydownCard({ title, description, children, className, image }: LaydownCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [time, setTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollDepth, setScrollDepth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const requestRef = useRef<number>(0)

  useEffect(() => {
    const animate = () => {
      setTime((prev) => prev + 0.016)
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleWheel = (e: WheelEvent) => {
      if (isHovered && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault()
        setScrollDepth((prev) => Math.max(0, Math.min(prev + e.deltaY * 0.002, 1)))
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      cancelAnimationFrame(requestRef.current)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [isHovered])

  // Tunnel travel: card recedes into tunnel (away from user) when hovered; same level, no vertical rise
  const travelPhase = isHovered ? (time * 0.025) % 1 : 0
  const travelZ = -travelPhase * 280
  const warpStreakCount = 24

  return (
    <div
      ref={containerRef}
      className={cn("relative group", className)}
      style={{
        perspective: "2000px",
        perspectiveOrigin: "center center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setScrollDepth(0)
      }}
    >
      {/* Black hole travel: card recedes into vortex — dark center, accretion ring, spiral-in streaks */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
        style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
      >
        {/* Singularity: dark center (black hole) */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse 35% 35% at 50% 50%, rgba(0, 0, 0, ${0.5 + travelPhase * 0.15}) 0%, rgba(30, 0, 0, 0.25) 40%, transparent 70%)`
              : "radial-gradient(ellipse 45% 45% at 50% 50%, rgba(0, 0, 0, 0.2) 0%, transparent 55%)",
            transition: "background 0.5s ease-out",
          }}
        />
        {/* Accretion ring: hot matter orbiting the hole */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse 55% 55% at 50% 50%, transparent 18%, rgba(234, 88, 12, ${0.06 + travelPhase * 0.03}) 22%, rgba(185, 28, 28, 0.08) 28%, rgba(234, 88, 12, 0.04) 32%, transparent 38%)`
              : "radial-gradient(ellipse 55% 55% at 50% 50%, transparent 22%, rgba(234, 88, 12, 0.04) 26%, transparent 32%)",
            transition: "background 0.5s ease-out",
          }}
        />
        {/* Spiral-in streaks: matter/light pulled toward center — no lines, gradients only */}
        {[...Array(warpStreakCount)].map((_, i) => {
          const baseAngle = (i / warpStreakCount) * 360
          const spiralAngle = baseAngle + (isHovered ? travelPhase * 180 : 0)
          const streakOpacity = isHovered ? 0.06 + (Math.sin(i * 0.7 + time * 1.5) * 0.02 + 0.02) : 0.02
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 w-full origin-center blur-xl"
              style={{
                height: "6%",
                transform: `translate(-50%, -50%) rotate(${spiralAngle}deg)`,
                background: `linear-gradient(90deg, transparent 0%, transparent 25%, rgba(234, 88, 12, ${streakOpacity * 0.5}) 45%, rgba(251, 191, 36, ${streakOpacity}) 55%, rgba(185, 28, 28, ${streakOpacity * 0.6}) 70%, transparent 100%)`,
                transition: "transform 0.4s ease-out, background 0.3s ease-out",
              }}
            />
          )
        })}
        {/* Gravitational lensing: soft bent-light halo at the edge */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: isHovered
              ? `radial-gradient(ellipse 95% 95% at 50% 50%, transparent 55%, rgba(234, 88, 12, ${0.02 * (1 - travelPhase)}) 75%, transparent 90%)`
              : "none",
            transition: "opacity 0.5s ease-out",
          }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => {
          const pathProgress = scrollDepth * 5 - i * 0.3
          const isIlluminated = pathProgress > 0 && pathProgress < 1.5
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + ((i * 13) % 70)}%`,
                top: `${10 + ((i * 17) % 80)}%`,
                transform: `
                  translate(
                    ${Math.sin(time + i * 0.5) * 20 + (isHovered ? mousePosition.x * 0.005 : 0)}px,
                    ${Math.cos(time * 0.8 + i * 0.7) * 15 + (isHovered ? mousePosition.y * 0.003 : 0)}px
                  ) 
                  rotate(${time * 15 + i * 45}deg)
                  scale(${0.6 + Math.sin(time + i) * 0.2})
                `,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div
                className="w-2 h-2 rounded-full backdrop-blur-sm"
                style={{
                  background: isIlluminated ? "rgba(251, 191, 36, 0.9)" : "rgba(255, 255, 255, 0.3)",
                  boxShadow: isIlluminated
                    ? `0 0 ${20 + Math.sin(time + i) * 10}px rgba(251, 191, 36, 0.9), 0 0 40px rgba(251, 191, 36, 0.6)`
                    : `0 0 ${10 + Math.sin(time + i) * 5}px rgba(251, 191, 36, 0.6)`,
                  transition: "all 0.5s ease-out",
                }}
              />
            </div>
          )
        })}
      </div>

      <Card
        className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-1000 ease-out border-white/20 relative"
        style={{
          transform: isHovered
            ? `
                rotateX(88deg) 
                translateY(-150px)
                translateZ(${-200 - scrollDepth * 600 + travelZ}px) 
                scaleY(${2 + scrollDepth * 3}) 
                scale(0.85)
              `
            : `
                rotateX(${Math.sin(time * 0.3) * 2}deg) 
                translateZ(0px) 
                scale(${1 + Math.sin(time * 0.4) * 0.02}) 
                translateY(${Math.sin(time * 0.5) * 5}px) 
                rotate(${Math.sin(time * 0.2) * 0.5}deg)
              `,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          background: `
            linear-gradient(
              ${135 + Math.sin(time * 0.3) * 10}deg, 
              rgba(234, 88, 12, ${0.95 + Math.sin(time * 0.5) * 0.05}) 0%, 
              rgba(185, 28, 28, ${0.9 + Math.cos(time * 0.4) * 0.05}) 50%, 
              rgba(217, 119, 6, ${0.95 + Math.sin(time * 0.6) * 0.05}) 100%
            )
          `,
        }}
      >
        {image && (
          <div
            className="relative h-48 overflow-hidden bg-linear-to-br from-orange-600 via-red-700 to-amber-800"
            style={{
              transform: isHovered
                ? `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.008}px) scale(1.05)`
                : `scale(${1 + Math.sin(time * 0.3) * 0.02})`,
            }}
          >
            {image}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              style={{
                transform: `translateX(${-100 + ((time * 20) % 200)}%)`,
                transition: "transform 0.1s linear",
              }}
            />
          </div>
        )}

        <CardHeader
          style={{
            transform: isHovered
              ? `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.006}px)`
              : `translateY(${Math.sin(time * 0.6) * 2}px)`,
          }}
        >
          <CardTitle className="text-3xl font-black text-white drop-shadow-lg">{title}</CardTitle>
          <CardDescription className="text-lg text-white/90 leading-relaxed">{description}</CardDescription>
        </CardHeader>

        {children && (
          <CardContent
            className="text-white/80"
            style={{
              transform: isHovered
                ? `translate(${mousePosition.x * 0.006}px, ${mousePosition.y * 0.008}px)`
                : `translateY(${Math.cos(time * 0.5) * 3}px)`,
            }}
          >
            {children}
          </CardContent>
        )}

        {isHovered && (
          <div className="absolute inset-0 flex flex-col justify-around p-8 pointer-events-none">
            {designProcessSteps.map((step, index) => {
              const stepProgress = Math.max(0, Math.min(1, scrollDepth * 5 - index))
              const isActive = stepProgress > 0.3
              return (
                <div
                  key={step.step}
                  className="text-center relative"
                  style={{
                    opacity: 0.3 + stepProgress * 0.7,
                    transform: `
                      translateZ(${index * 150}px) 
                      scale(${1 - index * 0.08})
                      translateY(${-index * 30}px)
                    `,
                    filter: `blur(${index * 0.3}px)`,
                    transition: "all 0.6s ease-out",
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute inset-0 -z-10 rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at center, rgba(251, 191, 36, ${stepProgress * 0.4}) 0%, transparent 70%)`,
                        filter: "blur(30px)",
                        transform: "scale(1.5)",
                      }}
                    />
                  )}
                  <div
                    className="text-6xl font-black drop-shadow-2xl mb-2"
                    style={{
                      color: isActive ? "rgba(251, 191, 36, 1)" : "rgba(255, 255, 255, 0.9)",
                      textShadow: isActive
                        ? "0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.5)"
                        : "0 4px 8px rgba(0, 0, 0, 0.5)",
                      transition: "all 0.5s ease-out",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    className="text-2xl font-bold drop-shadow-lg mb-1"
                    style={{
                      color: isActive ? "rgba(255, 255, 255, 1)" : "rgba(251, 191, 36, 0.9)",
                      transition: "all 0.5s ease-out",
                    }}
                  >
                    {step.title}
                  </div>
                  <div className="text-sm text-white/70 drop-shadow-md max-w-md mx-auto">{step.description}</div>
                </div>
              )
            })}
          </div>
        )}

        <div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-orange-400/20 via-red-500/20 to-amber-500/20 pointer-events-none"
          style={{
            opacity: isHovered ? 0.6 : 0.2 + Math.sin(time * 0.5) * 0.1,
            background: `
              radial-gradient(
                ellipse at ${50 + Math.sin(time * 0.4) * 20}% ${50 + Math.cos(time * 0.3) * 20}%,
                rgba(251, 191, 36, ${isHovered ? 0.3 : 0.15}) 0%,
                rgba(239, 68, 68, ${isHovered ? 0.2 : 0.1}) 50%,
                transparent 70%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `
              inset 0 0 ${20 + Math.sin(time * 0.8) * 10}px rgba(251, 191, 36, ${0.3 + Math.sin(time * 0.6) * 0.2}),
              0 0 ${30 + Math.cos(time * 0.7) * 15}px rgba(239, 68, 68, ${0.2 + Math.cos(time * 0.5) * 0.15})
            `,
          }}
        />
      </Card>

      <div
        className="absolute inset-0 -z-10 rounded-xl blur-2xl"
        style={{
          left: 456,
          top: 357,
          background: `
            radial-gradient(
              ellipse at center,
              rgba(234, 88, 12, ${0.4 + Math.sin(time * 0.5) * 0.2}) 0%,
              rgba(185, 28, 28, ${0.3 + Math.cos(time * 0.4) * 0.15}) 50%,
              transparent 70%
            )
          `,
          transform: `
            scale(${(1.1 + Math.sin(time * 0.4) * 0.05) * (isHovered ? 1 - travelPhase * 0.06 : 1)})
            translateY(${10 + Math.sin(time * 0.3) * 5}px)
          `,
          transition: "transform 0.4s ease-out",
        }}
      />

      {isHovered && scrollDepth < 0.1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm animate-bounce pointer-events-none">
          Scroll to walk the footbridge →
        </div>
      )}
    </div>
  )
}
