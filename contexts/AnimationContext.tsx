'use client'

import { createContext, ReactNode, useState, useEffect, useRef } from 'react'

export interface AnimationContextValue {
  time: number
  scrollY: number
  mousePosition: { x: number; y: number }
}

export const AnimationContext = createContext<AnimationContextValue | null>(null)

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [time, setTime] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (lastTimeRef.current !== undefined) {
        // Update time at ~60fps increment (0.016 units per frame = ~1 unit per second)
        setTime((prev) => prev + 0.016)
      }
      lastTimeRef.current = timestamp
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(requestRef.current)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const value: AnimationContextValue = { time, scrollY, mousePosition }
  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}
