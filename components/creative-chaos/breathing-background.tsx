"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useColorTheme } from "@/contexts/ColorThemeContext"

interface BreathingBackgroundProps {
  time?: number
  className?: string
  variant?: "hero" | "cta" | "portfolio"
  colors?: string[]
  intensity?: number
}

export function BreathingBackground({ 
  time: externalTime, 
  className, 
  variant = "hero",
  colors,
  intensity = 1 
}: BreathingBackgroundProps) {
  const { currentPalette } = useColorTheme()
  const [internalTime, setInternalTime] = useState(0)
  const requestRef = useRef<number>(0)
  
  const time = externalTime ?? internalTime
  
  useEffect(() => {
    if (externalTime !== undefined) return
    
    const animate = () => {
      setInternalTime((prev) => prev + 0.016)
      requestRef.current = requestAnimationFrame(animate)
    }
    
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [externalTime])

  const style = useMemo(() => {
    const x1 = 20 + Math.sin(time) * 10 * intensity
    const y1 = 30 + Math.cos(time * 0.7) * 15 * intensity
    const x2 = 80 + Math.cos(time * 1.2) * 8 * intensity
    const y2 = 70 + Math.sin(time * 0.9) * 12 * intensity

    const paletteColors = currentPalette.breathing
    const activeColors = colors || [
      paletteColors.primary,
      paletteColors.secondary,
      paletteColors.tertiary,
      paletteColors.deep,
    ]
    const accentColor = colors?.[4] || paletteColors.accent

    let background: string

    if (colors) {
      background = `
        radial-gradient(ellipse at ${x1}% ${y1}%, 
          ${activeColors[0]} 0%, 
          ${activeColors[1] || activeColors[0]} 30%, 
          ${activeColors[2] || activeColors[1] || activeColors[0]} 70%, 
          ${activeColors[3] || activeColors[2] || activeColors[0]} 100%),
        radial-gradient(ellipse at ${x2}% ${y2}%, 
          ${accentColor} 0%, 
          transparent 50%)
      `
    } else {
      switch (variant) {
        case "hero":
          background = `
            radial-gradient(ellipse at ${x1}% ${y1}%, 
              ${paletteColors.primary} 0%, 
              ${paletteColors.secondary} 30%, 
              ${paletteColors.tertiary} 70%, 
              ${paletteColors.deep} 100%),
            radial-gradient(ellipse at ${x2}% ${y2}%, 
              ${paletteColors.accent} 0%, 
              transparent 50%)
          `
          break
        case "cta":
          background = `
            conic-gradient(from ${time * 20}deg at ${x1}% ${y1}%, 
              ${paletteColors.primary} 0deg,
              ${paletteColors.secondary} 90deg,
              ${paletteColors.tertiary} 180deg,
              ${paletteColors.accent} 270deg,
              ${paletteColors.primary} 360deg)
          `
          break
        case "portfolio":
          background = `
            radial-gradient(circle at ${x1}% ${y1}%, ${paletteColors.primary} 0%, transparent 40%),
            radial-gradient(circle at ${x2}% ${y2}%, ${paletteColors.secondary} 0%, transparent 45%)
          `
          break
      }
    }

    return {
      background,
      transform: `scale(${1 + Math.sin(time * 0.5) * 0.05 * intensity}) rotate(${Math.sin(time * 0.3) * 2 * intensity}deg)`,
      transition: "background 3s ease-in-out",
    }
  }, [time, variant, currentPalette, colors, intensity])

  return <div className={cn("absolute inset-0", className)} style={style} />
}
