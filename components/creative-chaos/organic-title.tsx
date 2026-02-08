"use client"

import { useState, useEffect, useRef, ElementType, ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  MOTION_FRAME_RATE,
  MOTION_ROTATION,
  prefersReducedMotion,
  getSafeFrameRate,
} from "@/lib/motion-tokens"

/**
 * Props for the OrganicTitle component
 */
export interface OrganicTitleProps {
  /** Content to render - can be string, array of strings, or React nodes */
  children?: ReactNode
  /** @deprecated Use children instead. Array of text lines to display */
  lines?: string[]
  /** HTML element to render as (h1, h2, h3, etc.) */
  as?: ElementType
  /** Additional CSS classes */
  className?: string
  /** Enable mouse interaction (title reacts to cursor position) */
  mouseInteraction?: boolean
  /** External time value for synchronized animation (optional) */
  time?: number
  /** Custom rotation values for each line (in degrees) */
  rotations?: number[]
  /** Custom gradient classes for each line */
  gradients?: string[]
}

/**
 * OrganicTitle Component
 *
 * A dynamic, animated title component that renders text with organic movement and rotation.
 * Each line of text can have its own rotation and styling, creating a playful, creative effect.
 *
 * @example
 * ```tsx
 * // Basic usage with multiple lines
 * <OrganicTitle as="h1">
 *   Creative
 *   Portfolio
 *   2024
 * </OrganicTitle>
 *
 * // With custom rotations and gradients
 * <OrganicTitle
 *   as="h2"
 *   rotations={[-5, 3, -2]}
 *   gradients={["text-blue-500", "text-purple-500", "text-pink-500"]}
 * >
 *   {["Design", "Build", "Ship"]}
 * </OrganicTitle>
 *
 * // With parent-controlled animation
 * const [time, setTime] = useState(0)
 * useEffect(() => {
 *   const animate = () => {
 *     setTime(prev => prev + 0.016)
 *     requestAnimationFrame(animate)
 *   }
 *   requestAnimationFrame(animate)
 * }, [])
 * <OrganicTitle time={time} mouseInteraction={false}>
 *   Hello World
 * </OrganicTitle>
 * ```
 *
 * Features:
 * - Semantic HTML with customizable heading level
 * - Respects `prefers-reduced-motion` accessibility setting
 * - Uses requestAnimationFrame for smooth animations
 * - External or internal time management
 * - Optional mouse interaction for parallax effect
 * - Customizable rotation and styling per line
 */
export function OrganicTitle({
  children,
  lines,
  as: Component = "h1",
  className,
  mouseInteraction = true,
  time: externalTime,
  rotations = [-1, 2, -1],
  gradients = [
    "",
    "bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent",
    "",
  ],
}: OrganicTitleProps) {
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

  // Convert children or lines prop to array of lines
  const content = lines || children
  const linesArray = Array.isArray(content)
    ? content
    : typeof content === "string"
      ? content.split("\n").filter(Boolean)
      : [content]

  // Calculate container transform based on motion preferences
  const getContainerTransform = () => {
    if (reducedMotion) {
      return "none"
    }

    const rotation = Math.sin(time) * MOTION_ROTATION.subtle
    const translateX = mouseInteraction ? mousePosition.x * 0.02 : 0
    const translateY = mouseInteraction ? mousePosition.y * 0.015 : 0

    return `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`
  }

  return (
    <Component
      className={cn(className)}
      style={{
        transform: getContainerTransform(),
      }}
    >
      {linesArray.map((line, index) => {
        const lineRotation = rotations[index % rotations.length]

        return (
          <span
            key={index}
            className={cn(
              "block",
              index === 1 ? "ml-12" : index === 2 ? "ml-6 text-7xl" : "",
              gradients[index % gradients.length]
            )}
            style={{
              transform: reducedMotion
                ? "none"
                : `rotate(${lineRotation}deg)`,
            }}
          >
            {line}
          </span>
        )
      })}
    </Component>
  )
}
