"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  MOTION_FRAME_RATE,
  MOTION_ROTATION,
  prefersReducedMotion,
  getSafeFrameRate,
} from "@/lib/motion-tokens"

/**
 * Props for the FloatingCard component
 */
export interface FloatingCardProps {
  /** Content to render inside the card */
  children: React.ReactNode
  /** Additional CSS classes for the card */
  className?: string
  /** Enable mouse interaction (card reacts to cursor position) */
  mouseInteraction?: boolean
  /** Intensity of rotation animation (multiplier, default: 1) */
  rotationIntensity?: number
  /** External time value for synchronized animation (optional) */
  time?: number
}

/**
 * FloatingCard Component
 *
 * A glassmorphic card wrapper with subtle floating animation and optional mouse interaction.
 * The card gently rotates and moves, creating an organic, dynamic feel.
 *
 * @example
 * ```tsx
 * // Basic usage with self-managed animation
 * <FloatingCard>
 *   <h2>Hello World</h2>
 *   <p>This card floats!</p>
 * </FloatingCard>
 *
 * // With custom rotation intensity
 * <FloatingCard rotationIntensity={2}>
 *   <h2>More intense rotation</h2>
 * </FloatingCard>
 *
 * // With parent-controlled animation time
 * const [time, setTime] = useState(0)
 * useEffect(() => {
 *   const animate = () => {
 *     setTime(prev => prev + 0.016)
 *     requestAnimationFrame(animate)
 *   }
 *   requestAnimationFrame(animate)
 * }, [])
 * <FloatingCard time={time} mouseInteraction={false}>
 *   <h2>Synchronized animation</h2>
 * </FloatingCard>
 * ```
 *
 * Features:
 * - Glassmorphic styling with backdrop blur
 * - Respects `prefers-reduced-motion` accessibility setting
 * - Uses requestAnimationFrame for smooth animations
 * - External or internal time management
 * - Optional mouse interaction for parallax effect
 */
export function FloatingCard({
  children,
  className,
  mouseInteraction = true,
  rotationIntensity = 1,
  time: externalTime,
}: FloatingCardProps) {
  const [internalTime, setInternalTime] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const animationFrameRef = useRef<number>()
  const lastFrameTimeRef = useRef<number>(0)

  const time = externalTime ?? internalTime

  // Check for reduced motion preference
  useEffect(() => {
    setReducedMotion(prefersReducedMotion())

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
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

  // Calculate transform based on motion preferences
  const getTransform = () => {
    if (reducedMotion) {
      return "none"
    }

    const rotation = -Math.sin(time * 0.7) * rotationIntensity * MOTION_ROTATION.subtle
    const translateX = mouseInteraction ? -mousePosition.x * 0.01 : 0
    const translateY = mouseInteraction ? mousePosition.y * 0.02 : 0

    return `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`
  }

  return (
    <div
      className={cn(
        "bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20",
        className
      )}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  )
}
