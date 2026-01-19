"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ComponentInfo {
  id: string
  name: string
  path: string
  status: "keep" | "eliminate" | "merge" | "pending"
  category: "creative-chaos" | "animations"
}

const COMPONENTS: ComponentInfo[] = [
  {
    id: "cc-breathing-bg",
    name: "BreathingBackground",
    path: "components/creative-chaos/breathing-background.tsx",
    status: "pending",
    category: "creative-chaos",
  },
  {
    id: "cc-floating-card",
    name: "FloatingCard",
    path: "components/creative-chaos/floating-card.tsx",
    status: "pending",
    category: "creative-chaos",
  },
  {
    id: "cc-floating-particles",
    name: "FloatingParticles",
    path: "components/creative-chaos/floating-particles.tsx",
    status: "pending",
    category: "creative-chaos",
  },
  {
    id: "cc-organic-title",
    name: "OrganicTitle",
    path: "components/creative-chaos/organic-title.tsx",
    status: "pending",
    category: "creative-chaos",
  },
  {
    id: "anim-breathing-bg",
    name: "BreathingBackground (animations)",
    path: "components/animations/BreathingBackground.tsx",
    status: "pending",
    category: "animations",
  },
  {
    id: "anim-floating-element",
    name: "FloatingElement",
    path: "components/animations/FloatingElement.tsx",
    status: "pending",
    category: "animations",
  },
  {
    id: "anim-floating-orb",
    name: "FloatingOrb",
    path: "components/animations/FloatingOrb.tsx",
    status: "pending",
    category: "animations",
  },
]

const STORAGE_KEY = "creative-chaos-review-decisions"

export function ComponentReviewGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState<Record<string, "keep" | "eliminate" | "merge">>({})

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setDecisions(JSON.parse(stored))
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions))
  }, [decisions])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.min(COMPONENTS.length - 1, prev + 1))
      } else if (e.key === "k" || e.key === "K") {
        handleDecision("keep")
      } else if (e.key === "e" || e.key === "E") {
        handleDecision("eliminate")
      } else if (e.key === "m" || e.key === "M") {
        handleDecision("merge")
      }
    },
    [currentIndex]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleDecision = (decision: "keep" | "eliminate" | "merge") => {
    const component = COMPONENTS[currentIndex]
    setDecisions((prev) => ({ ...prev, [component.id]: decision }))
    if (currentIndex < COMPONENTS.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const currentComponent = COMPONENTS[currentIndex]
  const currentDecision = decisions[currentComponent.id]

  const stats = {
    keep: Object.values(decisions).filter((d) => d === "keep").length,
    eliminate: Object.values(decisions).filter((d) => d === "eliminate").length,
    merge: Object.values(decisions).filter((d) => d === "merge").length,
    pending: COMPONENTS.length - Object.keys(decisions).length,
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-light tracking-wide mb-2">Component Review Gallery</h1>
        <p className="text-zinc-400">
          Use arrow keys to navigate. Press K (keep), E (eliminate), or M (merge).
        </p>
        <div className="flex gap-4 mt-4 text-sm">
          <span className="text-emerald-400">✓ Keep: {stats.keep}</span>
          <span className="text-red-400">✗ Eliminate: {stats.eliminate}</span>
          <span className="text-amber-400">↔ Merge: {stats.merge}</span>
          <span className="text-zinc-500">○ Pending: {stats.pending}</span>
        </div>
      </header>

      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 border border-zinc-700 rounded disabled:opacity-30 hover:bg-zinc-800"
        >
          ← Previous
        </button>
        <span className="text-zinc-400">
          {currentIndex + 1} / {COMPONENTS.length}
        </span>
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(COMPONENTS.length - 1, prev + 1))}
          disabled={currentIndex === COMPONENTS.length - 1}
          className="px-4 py-2 border border-zinc-700 rounded disabled:opacity-30 hover:bg-zinc-800"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-8">
        <aside className="space-y-2">
          {COMPONENTS.map((comp, idx) => (
            <button
              key={comp.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-full text-left px-4 py-3 rounded border transition-colors",
                idx === currentIndex
                  ? "border-zinc-500 bg-zinc-800"
                  : "border-zinc-800 hover:border-zinc-700",
                decisions[comp.id] === "keep" && "border-l-4 border-l-emerald-500",
                decisions[comp.id] === "eliminate" && "border-l-4 border-l-red-500",
                decisions[comp.id] === "merge" && "border-l-4 border-l-amber-500"
              )}
            >
              <p className="font-medium">{comp.name}</p>
              <p className="text-xs text-zinc-500 truncate">{comp.path}</p>
            </button>
          ))}
        </aside>

        <main className="border border-zinc-800 rounded-lg overflow-hidden">
          <div className="bg-zinc-900 px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-medium">{currentComponent.name}</h2>
                <p className="text-sm text-zinc-500">{currentComponent.path}</p>
                <span
                  className={cn(
                    "inline-block mt-2 px-2 py-1 text-xs rounded",
                    currentComponent.category === "creative-chaos"
                      ? "bg-purple-900/50 text-purple-300"
                      : "bg-blue-900/50 text-blue-300"
                  )}
                >
                  {currentComponent.category}
                </span>
              </div>
              {currentDecision && (
                <span
                  className={cn(
                    "px-3 py-1 rounded text-sm font-medium",
                    currentDecision === "keep" && "bg-emerald-900/50 text-emerald-300",
                    currentDecision === "eliminate" && "bg-red-900/50 text-red-300",
                    currentDecision === "merge" && "bg-amber-900/50 text-amber-300"
                  )}
                >
                  {currentDecision.toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <div className="p-8 min-h-[400px] bg-zinc-950 flex items-center justify-center">
            <ComponentPreview componentId={currentComponent.id} />
          </div>

          <div className="bg-zinc-900 px-6 py-4 border-t border-zinc-800 flex gap-4">
            <button
              onClick={() => handleDecision("keep")}
              className={cn(
                "flex-1 py-3 rounded font-medium transition-colors",
                currentDecision === "keep"
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-800 hover:bg-emerald-900/50 text-emerald-400"
              )}
            >
              ✓ Keep (K)
            </button>
            <button
              onClick={() => handleDecision("eliminate")}
              className={cn(
                "flex-1 py-3 rounded font-medium transition-colors",
                currentDecision === "eliminate"
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 hover:bg-red-900/50 text-red-400"
              )}
            >
              ✗ Eliminate (E)
            </button>
            <button
              onClick={() => handleDecision("merge")}
              className={cn(
                "flex-1 py-3 rounded font-medium transition-colors",
                currentDecision === "merge"
                  ? "bg-amber-600 text-white"
                  : "bg-zinc-800 hover:bg-amber-900/50 text-amber-400"
              )}
            >
              ↔ Merge (M)
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

function ComponentPreview({ componentId }: { componentId: string }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t + 0.1), 100)
    return () => clearInterval(timer)
  }, [])

  switch (componentId) {
    case "cc-breathing-bg":
    case "anim-breathing-bg":
      return (
        <div className="relative w-full h-64 rounded overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at ${20 + Math.sin(time) * 10}% ${30 + Math.cos(time * 0.7) * 15}%, 
                  rgba(147, 51, 234, 0.3) 0%, 
                  rgba(79, 70, 229, 0.2) 30%, 
                  rgba(30, 58, 138, 0.1) 70%, 
                  transparent 100%)
              `,
              transform: `scale(${1 + Math.sin(time * 0.5) * 0.05})`,
            }}
          />
          <p className="absolute bottom-4 left-4 text-xs text-zinc-400">
            Breathing gradient animation
          </p>
        </div>
      )

    case "cc-floating-card":
      return (
        <div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          style={{
            transform: `rotate(${Math.sin(time * 0.7) * 3}deg) translateY(${Math.sin(time) * 5}px)`,
          }}
        >
          <h3 className="text-lg font-medium mb-2">Floating Card</h3>
          <p className="text-sm text-zinc-400">Responds to mouse and time</p>
        </div>
      )

    case "cc-floating-particles":
    case "anim-floating-orb":
      return (
        <div className="relative w-full h-64">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full bg-white/20"
              style={{
                left: `${10 + ((i * 12) % 80)}%`,
                top: `${15 + ((i * 15) % 70)}%`,
                transform: `translate(${Math.sin(time + i) * 20}px, ${Math.cos(time * 0.8 + i) * 15}px)`,
              }}
            />
          ))}
          <p className="absolute bottom-4 left-4 text-xs text-zinc-400">
            Floating particles/orbs
          </p>
        </div>
      )

    case "cc-organic-title":
      return (
        <div style={{ transform: `rotate(${Math.sin(time) * 2}deg)` }}>
          <span className="block text-4xl font-light" style={{ transform: "rotate(-3deg)" }}>
            ORGANIC
          </span>
          <span
            className="block text-4xl font-light ml-8 bg-linear-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent"
            style={{ transform: "rotate(2deg)" }}
          >
            TITLE
          </span>
        </div>
      )

    case "anim-floating-element":
      return (
        <div
          className="px-6 py-4 bg-zinc-800 rounded-lg"
          style={{
            transform: `translate(${Math.sin(time * 1.2) * 20}px, ${Math.cos(time) * 15}px)`,
          }}
        >
          <p>Floating Element</p>
          <p className="text-xs text-zinc-400">Controlled by parent time prop</p>
        </div>
      )

    default:
      return <p className="text-zinc-500">Preview not available</p>
  }
}
