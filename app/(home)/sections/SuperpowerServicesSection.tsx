"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { useState, useEffect, useCallback } from "react"
import { BreathingBackground, ParticleField } from "@/components/creative-chaos"
import { cn } from "@/lib/utils"

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)"

const STAGES = {
  IDLE: "idle",
  SELECT_POWER: "select_power",
  THINKING: "thinking",
  PICK_IDEA: "pick_idea",
  BUILDING_PRD: "building_prd",
  BUILDING_PROTO: "building_proto",
  COMPLETE: "complete",
} as const

type Stage = (typeof STAGES)[keyof typeof STAGES]

const SUPERPOWERS = [
  { id: "data-science", label: "Data Science", icon: "📊", color: "#f59e0b", verb: "analyze", desc: "Analytics, pipelines, statistical modeling" },
  { id: "ai-engineer", label: "AI Engineer", icon: "🧠", color: "#ef4444", verb: "architect", desc: "LLMs, agents, RAG, prompt engineering" },
  { id: "ml-engineer", label: "ML Engineer", icon: "⚡", color: "#f97316", verb: "train", desc: "Model training, MLOps, inference" },
  { id: "ui-ux", label: "UI/UX Research", icon: "🎨", color: "#d97706", verb: "design", desc: "Design systems, user research, a11y" },
  { id: "full-stack", label: "Full Stack", icon: "🔧", color: "#b45309", verb: "build", desc: "Next.js, TypeScript, APIs, cloud" },
  { id: "ai-safety", label: "AI Safety", icon: "🛡️", color: "#dc2626", verb: "protect", desc: "Constitutional AI, alignment, guardrails" },
]

const THOUGHTS = {
  analyzing: [
    "decomposing user intent...",
    "mapping dream-space to solution manifold...",
    "applying verbalized sampling...",
    "cross-referencing domain expertise...",
    "evaluating feasibility × impact × novelty...",
    "identifying latent user needs...",
    "scanning analogous solutions...",
    "computing creative divergence score...",
  ],
  prd: [
    "## Problem Statement",
    "structuring success metrics...",
    "mapping user stories → acceptance criteria...",
    "## Architecture Decision Records",
    "defining API contract surface...",
    "calculating technical debt budget...",
    "## Risk Assessment",
    "building dependency graph...",
  ],
  code: [
    "'use client'",
    "import { useState, useEffect } from 'react'",
    "const [state, setState] = useState(init)",
    "export default function Component() {",
    "  return (",
    '    <div className="min-h-screen">',
    "      <BreathingBackground time={time} />",
    "    </div>",
    "  )",
    "}",
  ],
}

function generateIdeas(dream: string, powerId: string) {
  const p = SUPERPOWERS.find((s) => s.id === powerId) || SUPERPOWERS[0]
  return [
    {
      title: `${p.verb}-first: ${dream} reimagined`,
      description: `First principles deconstruction through ${p.label} lens — neurodivergent-friendly UX, exposed process.`,
    },
    {
      title: `The Rabbit Hole: immersive ${dream}`,
      description: `Zoom-scroll deep-dive. Creative Chaos motion applied — each layer reveals more depth.`,
    },
    {
      title: `${p.icon} Agent-powered ${dream} pipeline`,
      description: `Multi-agent system: intake → analysis → generation → review → delivery. Thought streams visible.`,
    },
    {
      title: `Accessible ${dream} toolkit`,
      description: `WCAG 2.1 AA, neurodivergent-first. "${dream}" made safe and legible for every kind of mind.`,
    },
    {
      title: `${dream} × Creative Chaos`,
      description: `Full-stack on Creative Chaos design system — Deep Ember, rAF animations, glassmorphism.`,
    },
  ]
}

/* ── Code Rain — unique to this section ── */
function CodeRain({ time, intensity }: { time: number; intensity: number }) {
  const chars = "⟨⟩{}[]→←∀∃∇∂λσμ∫≡≈"
  const count = Math.floor(intensity * 30)
  if (count <= 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" style={{ opacity: intensity }}>
      {Array.from({ length: count }, (_, i) => {
        const x = (i / count) * 100
        const yPos = ((time * (0.5 + ((i * 7 + 3) % 10) * 0.05) * 50) % 120) - 20
        return (
          <span
            key={i}
            className="absolute font-mono text-[11px]"
            style={{
              left: `${x}%`,
              top: `${yPos}%`,
              color: `rgba(217,119,6,${0.15 + Math.sin(time + i) * 0.1})`,
            }}
          >
            {chars[Math.floor((time * 3 + i) % chars.length)]}
          </span>
        )
      })}
    </div>
  )
}

/* ── Thought Stream — floating analysis text ── */
function ThoughtStream({ thoughts, time }: { thoughts: string[]; time: number }) {
  if (thoughts.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[6]">
      {thoughts.slice(-5).map((t, i) => (
        <div
          key={`${i}-${t.slice(0, 8)}`}
          className="absolute font-mono text-[11px] whitespace-nowrap"
          style={{
            left: `${15 + Math.sin(time * 0.5 + i) * 10}%`,
            top: `${80 - i * 12 - ((time * 8) % 20)}%`,
            color: `rgba(217,119,6,${Math.max(0, 0.6 - i * 0.1)})`,
          }}
        >
          {t}
        </div>
      ))}
    </div>
  )
}

export function SuperpowerServicesSection() {
  const { time } = useAnimation()
  const [stage, setStage] = useState<Stage>(STAGES.IDLE)
  const [dream, setDream] = useState("")
  const [selectedPower, setSelectedPower] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<{ title: string; description: string }[]>([])
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null)
  const [thoughts, setThoughts] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [inputExiting, setInputExiting] = useState(false)
  const [inputRemoved, setInputRemoved] = useState(false)

  useEffect(() => {
    if (stage === STAGES.THINKING || stage === STAGES.BUILDING_PRD || stage === STAGES.BUILDING_PROTO) {
      const bank =
        stage === STAGES.THINKING
          ? THOUGHTS.analyzing
          : stage === STAGES.BUILDING_PRD
            ? THOUGHTS.prd
            : THOUGHTS.code
      const iv = setInterval(
        () => setThoughts((prev) => [...prev.slice(-8), bank[Math.floor(Math.random() * bank.length)]]),
        800,
      )
      return () => clearInterval(iv)
    }
  }, [stage])

  const submitDream = useCallback(() => {
    if (!inputValue.trim()) return
    setInputExiting(true)
    setTimeout(() => {
      setDream(inputValue.trim())
      setStage(STAGES.SELECT_POWER)
      setInputRemoved(true)
    }, 600)
  }, [inputValue])

  const selectPower = useCallback(
    (id: string) => {
      setSelectedPower(id)
      setStage(STAGES.THINKING)
      setTimeout(() => {
        setIdeas(generateIdeas(dream || inputValue, id))
        setStage(STAGES.PICK_IDEA)
      }, 4000)
    },
    [dream, inputValue],
  )

  const pickIdea = useCallback((i: number) => {
    setSelectedIdea(i)
    setStage(STAGES.BUILDING_PRD)
    setTimeout(() => setStage(STAGES.BUILDING_PROTO), 3500)
    setTimeout(() => setStage(STAGES.COMPLETE), 7500)
  }, [])

  const reset = useCallback(() => {
    setStage(STAGES.IDLE)
    setDream("")
    setSelectedPower(null)
    setIdeas([])
    setSelectedIdea(null)
    setThoughts([])
    setInputValue("")
    setInputExiting(false)
    setInputRemoved(false)
  }, [])

  const ap = SUPERPOWERS.find((p) => p.id === selectedPower)
  const isIdle = stage === STAGES.IDLE
  const cri =
    stage === STAGES.THINKING
      ? 0.5
      : stage === STAGES.BUILDING_PRD
        ? 0.7
        : stage === STAGES.BUILDING_PROTO
          ? 1
          : stage === STAGES.COMPLETE
            ? 0.3
            : 0
  const canSelect = stage === STAGES.SELECT_POWER

  return (
    <section id="services" className="relative w-full h-screen overflow-hidden rounded-3xl mb-16">
      {/* Creative Chaos breathing background */}
      <BreathingBackground time={time} variant="hero" className="rounded-3xl" />

      {/* Floating particles */}
      <ParticleField time={time} count={12} mouseInteraction />

      {/* Code rain overlay — intensifies during build stages */}
      <CodeRain time={time} intensity={cri} />

      {/* Thought stream — visible during processing */}
      {!isIdle && <ThoughtStream thoughts={thoughts} time={time} />}

      {/* Dream echo — bottom left after submission */}
      {dream && !isIdle && (
        <div
          className="absolute bottom-5 left-5 z-[15] max-w-xs"
          style={{ opacity: 0.5 + Math.sin(time * 0.8) * 0.1 }}
        >
          <div className="font-mono text-[9px] tracking-wider text-amber-600/85 mb-1">
            ✦ DREAM
          </div>
          <div className="text-[13px] text-white/40 italic">&quot;{dream}&quot;</div>
          {ap && (
            <div
              className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-lg font-mono text-[10px]"
              style={{
                background: `${ap.color}15`,
                border: `1px solid ${ap.color}30`,
                color: ap.color,
              }}
            >
              {ap.icon} {ap.label}
            </div>
          )}
        </div>
      )}

      {/* Status bar — replaces input after submit */}
      {!isIdle && stage !== STAGES.COMPLETE && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[25] font-mono text-xs text-white/50 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 animate-[ssSlideUp_0.5s_ease_forwards]">
          <span
            className="w-1.5 h-1.5 rounded-full bg-amber-600"
            style={{
              boxShadow: "0 0 8px rgba(180,83,9,0.4)",
              opacity: 0.5 + Math.sin(time * 4) * 0.5,
            }}
          />
          {canSelect
            ? "Choose your superpower →"
            : stage === STAGES.THINKING
              ? "Generating ideas..."
              : stage === STAGES.PICK_IDEA
                ? "Pick your favorite concept"
                : stage === STAGES.BUILDING_PRD
                  ? "Crafting PRD..."
                  : "Building prototype..."}
        </div>
      )}

      {/* Idea cards */}
      {stage === STAGES.PICK_IDEA && ideas.length > 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(500px,85vw)] flex flex-col gap-2 z-[25]">
          <div className="font-mono text-[11px] text-amber-600/85 mb-1.5 tracking-wider">
            ✦ VERBALIZED SAMPLING — 5 CANDIDATES
          </div>
          {ideas.map((idea, i) => (
            <button
              key={i}
              onClick={() => pickIdea(i)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-2xl backdrop-blur-xl text-white/90 cursor-pointer",
                selectedIdea === i
                  ? "bg-amber-600/10 border border-amber-600/85"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              )}
              style={{ transition: `all 0.4s ${SPRING} ${i * 0.1}s` }}
            >
              <div className="text-[13px] font-semibold mb-1">
                <span className="text-amber-600/85 font-mono text-[11px] mr-2">#{i + 1}</span>
                {idea.title}
              </div>
              <div className="text-[11px] opacity-60 font-mono leading-snug">
                {idea.description}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Building indicator */}
      {(stage === STAGES.BUILDING_PRD || stage === STAGES.BUILDING_PROTO) && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[25]">
          <div className="font-mono text-xs text-amber-600/85 tracking-widest mb-3">
            {stage === STAGES.BUILDING_PRD ? "✦ GENERATING PRD" : "✦ BUILDING PROTOTYPE"}
          </div>
          <div className="w-[200px] h-[3px] rounded-sm bg-white/10 overflow-hidden mx-auto">
            <div
              className="h-full rounded-sm bg-gradient-to-r from-amber-600/85 to-amber-700/40"
              style={{ width: `${(time * 20) % 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Artifact display */}
      {stage === STAGES.COMPLETE && selectedIdea !== null && ideas[selectedIdea] && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,88vw)] z-[30]">
          <div
            className="bg-white/5 backdrop-blur-2xl rounded-[20px] p-7 shadow-2xl border"
            style={{
              borderColor: ap?.color || "rgba(80,80,80,0.3)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${ap?.color || "rgba(217,119,6,0.85)"}20`,
            }}
          >
            <div className="font-mono text-[10px] text-amber-600/85 tracking-widest mb-3">
              ✦ ARTIFACT COMPLETE
            </div>
            <div className="text-xl font-bold text-white mb-2 leading-tight">
              {ideas[selectedIdea].title}
            </div>
            <div className="text-[13px] text-white/60 leading-relaxed mb-4">
              {ideas[selectedIdea].description}
            </div>
            {ap && (
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] mb-4"
                style={{
                  background: `${ap.color}15`,
                  border: `1px solid ${ap.color}30`,
                  color: ap.color,
                }}
              >
                {ap.icon} {ap.label}
              </div>
            )}
            <div className="bg-black/40 rounded-xl p-4 mb-5 border border-white/10 font-mono text-[11px] text-amber-600/70 leading-relaxed max-h-[120px] overflow-hidden">
              {THOUGHTS.code.slice(0, 8).map((l, i) => (
                <div key={i} style={{ opacity: 0.4 + (i / 8) * 0.6 }}>
                  {l}
                </div>
              ))}
            </div>
            <div className="flex gap-2.5">
              <button
                onClick={reset}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/90 text-[13px] cursor-pointer hover:bg-white/10 transition-colors"
              >
                Dream Again ↻
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl text-[13px] cursor-pointer transition-colors"
                style={{
                  background: `linear-gradient(135deg, ${ap?.color || "rgba(217,119,6,0.85)"}40, ${ap?.color || "rgba(217,119,6,0.85)"}20)`,
                  border: `1px solid ${ap?.color || "rgba(217,119,6,0.85)"}50`,
                  color: ap?.color || "rgba(217,119,6,0.85)",
                }}
              >
                Export ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dream input — only in IDLE, animates out on submit */}
      {!inputRemoved && (
        <div
          className="absolute bottom-6 left-1/2 w-[min(620px,90vw)] z-[25]"
          style={{
            transform: `translateX(-50%) translateY(${inputExiting ? 80 : 0}px)`,
            opacity: inputExiting ? 0 : 1,
            transition: inputExiting ? "transform 0.6s cubic-bezier(0.4,0,1,1), opacity 0.5s ease" : "none",
            pointerEvents: inputExiting ? "none" : "auto",
          }}
        >
          <div className="font-mono text-xs text-white/50 mb-2 pl-1">
            ✦ Creative Chaos is brewing...
          </div>
          <div className="text-sm text-white/70 mb-3 pl-1">
            Pitch your wildest dream
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3.5 flex gap-2.5 items-center shadow-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitDream()}
              placeholder="What's your wildest dream?"
              className="flex-1 bg-white/5 border border-white/10 rounded-3xl px-5 py-3 text-white/90 text-sm outline-none placeholder:text-white/40 focus:border-amber-600/50 transition-colors"
            />
            <button
              onClick={submitDream}
              disabled={!inputValue.trim()}
              className={cn(
                "w-12 h-12 rounded-full border-none text-white text-[15px] font-bold",
                inputValue.trim()
                  ? "bg-amber-600 cursor-pointer shadow-[0_0_20px_rgba(180,83,9,0.4)]"
                  : "bg-white/10 cursor-default"
              )}
              style={{
                transform: `translateX(${isIdle ? Math.sin(time * 6) * 5 : 0}px) rotate(${isIdle ? Math.sin(time * 6) * 6 : 0}deg)`,
              }}
            >
              Go
            </button>
          </div>
        </div>
      )}

      {/* Section label */}
      <div className="absolute top-6 left-6 z-[15] font-mono text-[10px] tracking-widest text-white/30">
        SUPERPOWER SERVICES
      </div>
    </section>
  )
}
