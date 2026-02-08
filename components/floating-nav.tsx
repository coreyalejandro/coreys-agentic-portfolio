"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAudioEngine } from "@/components/audio-experience/audio-engine"
import { NAV_ITEMS, NAV_GROUPS } from "@/lib/floating-nav-schema"
import { useVoiceNav } from "@/hooks/useVoiceNav"
import { cn } from "@/lib/utils"

/** Group order for predictable layout */
const GROUP_ORDER: (typeof NAV_GROUPS)[number]["id"][] = [
  "explore",
  "templates",
  "tools",
  "demos",
  "sections",
]

function groupNavItems() {
  const byGroup = new Map<string, (typeof NAV_ITEMS)[number][]>()
  for (const item of NAV_ITEMS) {
    const g = item.group ?? "explore"
    if (!byGroup.has(g)) byGroup.set(g, [])
    byGroup.get(g)!.push(item)
  }
  return GROUP_ORDER.flatMap((g) => byGroup.get(g) ?? [])
}

export default function FloatingNav() {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [opacity, setOpacity] = useState(0.95)
  const [showOpacityControl, setShowOpacityControl] = useState(false)
  const hideTimerRef = useRef<NodeJS.Timeout>()
  const [isVisible, setIsVisible] = useState(true)
  const [isDraggable, setIsDraggable] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { isActive: audioEnabled, toggleAudio } = useAudioEngine()

  const handleVoiceCommand = useCallback(
    (cmd: import("@/hooks/useVoiceNav").VoiceNavCommand) => {
      if (!cmd) return
      if (cmd.type === "navigate") {
        router.push(cmd.href)
        return
      }
      if (cmd.type === "detach") {
        setIsDraggable(true)
        setIsCollapsed(false)
        return
      }
      if (cmd.type === "dock") {
        setIsDraggable(false)
        setIsCollapsed(false)
        setPosition({ x: 0, y: 0 })
        return
      }
      if (cmd.type === "opacity-toggle") {
        setShowOpacityControl((v) => !v)
        return
      }
      if (cmd.type === "audio-toggle") {
        toggleAudio()
      }
    },
    [router, toggleAudio]
  )

  const { isSupported: voiceSupported, isListening, toggleListening } =
    useVoiceNav({
      onCommand: handleVoiceCommand,
      enabled: true,
    })

  useEffect(() => {
    if (isDraggable) return

    const handleScroll = () => {
      setIsVisible(window.scrollY < 30)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50) {
        setIsVisible(true)
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
      } else if (!isHovered) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
        hideTimerRef.current = setTimeout(() => {
          if (!isHovered && window.scrollY > 30) setIsVisible(false)
        }, 600)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    hideTimerRef.current = setTimeout(() => {
      if (!isHovered && window.scrollY > 30) setIsVisible(false)
    }, 600)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [isDraggable, isHovered])

  const runDrag = useCallback((offsetX: number, offsetY: number) => {
    const onMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      })
    }
    const onUp = () => {
      setIsDragging(false)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      document.body.style.removeProperty("user-select")
      document.body.style.removeProperty("cursor")
    }
    document.body.style.userSelect = "none"
    document.body.style.cursor = "grabbing"
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseup", onUp, { once: true })
  }, [])

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDraggable || isCollapsed) return
    const el = navRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setIsDragging(true)
    runDrag(e.clientX - rect.left, e.clientY - rect.top)
  }

  const handleCollapsedDragStart = (e: React.MouseEvent) => {
    if (!isDraggable) return
    const el = navRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setIsDragging(true)
    runDrag(e.clientX - rect.left, e.clientY - rect.top)
  }

  const groupedItems = groupNavItems()

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed z-50 top-0 left-0 right-0 w-full h-10 max-h-10 transition-[transform,opacity] duration-150 ease-out",
        isDraggable && "touch-none cursor-grab active:cursor-grabbing",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
      style={
        isDraggable
          ? { left: position.x, top: position.y, right: "auto", width: "fit-content", minWidth: 320, transform: "none" }
          : undefined
      }
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).closest("a, button[type='button']") && !isDraggable) return
        if (isDraggable) handleDragStart(e)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && (isDraggable || showOpacityControl)) {
          if (showOpacityControl) setShowOpacityControl(false)
          else if (isDraggable) {
            setIsDraggable(false)
            setPosition({ x: 0, y: 0 })
          }
          e.preventDefault()
        }
      }}
    >
      <div
        className="backdrop-blur-md relative w-full h-10 flex items-center justify-center px-3 py-1 rounded-b-md border-b border-x shrink-0"
        style={{
          background: `rgba(30, 30, 30, ${opacity})`,
          borderColor: "var(--theme-card-border)",
          boxShadow: isDraggable ? "0 2px 12px rgba(0,0,0,0.4)" : "0 1px 8px rgba(0,0,0,0.2)",
        }}
      >
        {isCollapsed ? (
          <div
            className="flex items-center justify-center gap-2 cursor-grab active:cursor-grabbing h-full"
            onMouseDown={handleCollapsedDragStart}
            role="button"
            tabIndex={0}
            aria-label="Collapsed bar. Drag to move. Activate to expand."
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setIsDraggable(false)
                setIsCollapsed(false)
                setPosition({ x: 0, y: 0 })
              }
            }}
          >
            <span className="text-sm font-semibold text-white/90">CA</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsDraggable(false)
                setIsCollapsed(false)
                setPosition({ x: 0, y: 0 })
              }}
              className="px-2 py-0.5 rounded text-[13px] font-medium text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0"
              aria-label="Expand and dock"
            >
              Expand
            </button>
          </div>
        ) : (
          <div
            className="flex items-center justify-center gap-x-3 w-full overflow-x-auto overflow-y-hidden scrollbar-hide flex-nowrap"
            role="menubar"
            aria-label="Navigation menu"
          >
            {/* Actions */}
            <div className="flex items-center gap-x-2 shrink-0" role="group" aria-label="Bar controls">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  if (isDraggable) setIsCollapsed(true)
                  else setIsDraggable(true)
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[13px] font-medium text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0",
                  isDraggable && "bg-white/15"
                )}
                aria-label={isDraggable ? "Collapse bar" : "Detach bar to move"}
              >
                {isDraggable ? "Collapse" : "Detach"}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowOpacityControl(!showOpacityControl)
                }}
                className={cn(
                  "px-2 py-0.5 rounded text-[13px] font-medium text-white/90 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0",
                  showOpacityControl && "bg-white/15"
                )}
                aria-label={showOpacityControl ? "Hide opacity" : "Show opacity"}
                aria-expanded={showOpacityControl}
              >
                Opacity
              </button>

              {voiceSupported && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleListening()
                  }}
                  className={cn(
                    "px-2 py-0.5 rounded text-[13px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0",
                    isListening ? "text-green-400 bg-green-400/20" : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                  aria-label={isListening ? "Stop voice" : "Start voice"}
                  aria-pressed={isListening}
                >
                  {isListening ? "Listening" : "Voice"}
                </button>
              )}
            </div>

            <span className="w-px h-4 bg-white/20 shrink-0" aria-hidden />

            {/* Home */}
            <Link
              href="/"
              className="shrink-0 px-2 py-0.5 rounded text-[13px] font-semibold transition-colors focus:outline-none focus:ring-1 focus:ring-white/50"
              style={{
                background: "linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))",
                color: "white",
              }}
              onClick={(e) => isDragging && e.preventDefault()}
              aria-label="Home"
              role="menuitem"
            >
              Home
            </Link>

            {/* Grouped nav items */}
            {GROUP_ORDER.map((groupId) => {
              const items = groupedItems.filter((i) => i.group === groupId)
              if (items.length === 0) return null

              const meta = NAV_GROUPS.find((g) => g.id === groupId)
              return (
                <div
                  key={groupId}
                  role="group"
                  aria-label={meta?.label}
                  className="flex items-center gap-x-1 shrink-0"
                >
                  <span className="w-px h-4 bg-white/20 shrink-0" aria-hidden />
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="px-2 py-0.5 rounded text-[13px] font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 whitespace-nowrap shrink-0"
                      onClick={(e) => isDragging && e.preventDefault()}
                      aria-label={item.ariaLabel}
                      role="menuitem"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )
            })}

            <span className="w-px h-4 bg-white/20 shrink-0" aria-hidden />

            {/* Audio */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleAudio()
              }}
              className={cn(
                "px-2 py-0.5 rounded text-[13px] font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-white/50 shrink-0",
                audioEnabled ? "text-green-400" : "text-white/90 hover:text-white hover:bg-white/10"
              )}
              aria-label={audioEnabled ? "Audio on" : "Audio off"}
              aria-pressed={audioEnabled}
            >
              {audioEnabled ? "Audio on" : "Audio off"}
            </button>
          </div>
        )}

        {showOpacityControl && !isCollapsed && (
          <div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl backdrop-blur-xl shadow-2xl"
            style={{
              background: `rgba(30, 30, 30, ${opacity})`,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "var(--theme-card-border)",
            }}
            onClick={(e) => e.stopPropagation()}
            role="group"
            aria-label="Opacity slider"
          >
            <div className="flex items-center space-x-3">
              <label htmlFor="nav-opacity" className="text-xs text-white/60 whitespace-nowrap">
                Opacity
              </label>
              <input
                id="nav-opacity"
                type="range"
                min="0.3"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number.parseFloat(e.target.value))}
                className="nav-opacity-slider w-32 h-1 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--theme-accent) 0%, var(--theme-accent) ${opacity * 100}%, rgba(255,255,255,0.2) ${opacity * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
                aria-valuemin={30}
                aria-valuemax={100}
                aria-valuenow={Math.round(opacity * 100)}
                aria-valuetext={`${Math.round(opacity * 100)} percent`}
              />
              <span className="text-xs text-white/80 font-mono w-10" aria-hidden>
                {Math.round(opacity * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
