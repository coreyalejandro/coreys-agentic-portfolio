"use client"

import { useState, useEffect, useRef, CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { MOTION_FRAME_RATE, prefersReducedMotion, getSafeFrameRate } from "@/lib/motion-tokens"

/**
 * Props for individual particle (orb) within the ParticleField
 */
interface ParticleProps {
  time: number
  index: number
  mousePosition: { x: number; y: number }
  basePosition: { left: string; top: string }
  className?: string
  reducedMotion: boolean
}

/**
 * Individual floating particle/orb component
 * Handles the rendering and animation of a single particle
 */
function Particle({ time, index, mousePosition, basePosition, className, reducedMotion }: ParticleProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Don't render on server
  }

  // Reduce animation intensity for reduced motion
  const motionMultiplier = reducedMotion ? 0.3 : 1
  const mouseMultiplier = reducedMotion ? 0 : 1

  const style: CSSProperties = {
    ...basePosition,
    transform: `
      translate(
        ${Math.sin(time + index) * 54 * motionMultiplier + mousePosition.x * 0.018 * mouseMultiplier}px,
        ${Math.cos(time * 0.8 + index) * 36 * motionMultiplier + mousePosition.y * 0.014 * mouseMultiplier}px
      )
      rotate(${reducedMotion ? 0 : time * 18 + index * 45}deg)
      scale(${reducedMotion ? 1 : 0.5 + Math.sin(time + index) * 0.5})
    `,
  }

  const size = 3 + (index % 4)

  return (
    <div className="absolute" style={style}>
      <div className={cn(`w-${size} h-${size} rounded-full bg-white/20 backdrop-blur-sm`, className)} />
    </div>
  )
}

/**
 * Props for the ParticleField component
 */
export interface ParticleFieldProps {
  /** Number of particles to render */
  count?: number
  /** Enable mouse interaction (particles react to cursor position) */
  mouseInteraction?: boolean
  /** External time value for synchronized animation (optional) */
  time?: number
  /** Additional CSS classes */
  className?: string
  /** Custom particle className */
  particleClassName?: string
}

/**
 * ParticleField Component
 *
 * Renders a field of floating, animated particles (orbs) with optional mouse interaction.
 * Combines the best features of FloatingOrb and FloatingParticles components.
 *
 * @example
 * ```tsx
 * // Self-managed animation
 * <ParticleField count={20} mouseInteraction={true} />
 *
 * // Parent-controlled animation
 * const [time, setTime] = useState(0)
 * useEffect(() => {
 *   const animate = () => {
 *     setTime(prev => prev + 0.016)
 *     requestAnimationFrame(animate)
 *   }
 *   requestAnimationFrame(animate)
 * }, [])
 * <ParticleField time={time} count={15} />
 * ```
 *
 * Features:
 * - Respects `prefers-reduced-motion` accessibility setting
 * - Uses requestAnimationFrame for smooth animations
 * - External or internal time management
 * - Optional mouse interaction
 */
export function ParticleField({
  count = 15,
  mouseInteraction = true,
  time: externalTime,
  className,
  particleClassName,
}: ParticleFieldProps) {
  const [internalTime, setInternalTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const animationFrameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)

  const time = externalTime ?? internalTime

  // Check for reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Handle internal animation timing with requestAnimationFrame
  useEffect(() => {
    if (externalTime !== undefined) return

    const frameRate = getSafeFrameRate(MOTION_FRAME_RATE.fps60)

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTimeRef.current >= frameRate) {
        setInternalTime((prev) => prev + 0.016) // ~60fps increment
        lastFrameTimeRef.current = currentTime
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [externalTime])

  // Handle mouse interaction
  useEffect(() => {
    if (!mouseInteraction || reducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseInteraction, reducedMotion])

  // Generate base positions for particles
  const particles = Array.from({ length: count }, (_, i) => ({
    index: i,
    basePosition: {
      left: `${10 + ((i * 7) % 80)}%`,
      top: `${15 + ((i * 11) % 70)}%`,
    },
  }))

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {particles.map(({ index, basePosition }) => (
        <Particle
          key={index}
          time={time}
          index={index}
          mousePosition={mousePosition}
          basePosition={basePosition}
          className={particleClassName}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  )
}

/**
 * Legacy export for backwards compatibility
 * @deprecated Use ParticleField instead
 */
export const FloatingParticles = ParticleField
