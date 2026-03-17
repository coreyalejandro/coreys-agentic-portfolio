"use client"

import { useAnimation } from "@/hooks/useAnimation"
import { useState, useEffect, useCallback, useRef } from "react"

/* ── Design Tokens (Deep Ember) ── */
const DE = {
  b: { primary: "rgba(180,83,9,0.4)", secondary: "rgba(153,27,27,0.3)", tertiary: "rgba(124,45,18,0.2)", deep: "#1a0a00", accent: "rgba(217,119,6,0.85)" },
  nav: { bg: "rgba(30,30,30,0.95)", glow: "rgba(180,83,9,0.4)" },
  card: { bg: "rgba(30,30,30,0.85)", border: "rgba(80,80,80,0.3)" },
}
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)"
const STAGES = { IDLE: "idle", SELECT_POWER: "select_power", THINKING: "thinking", PICK_IDEA: "pick_idea", BUILDING_PRD: "building_prd", BUILDING_PROTO: "building_proto", COMPLETE: "complete" } as const
type Stage = typeof STAGES[keyof typeof STAGES]

const SUPERPOWERS = [
  { id: "data-science", label: "Data Science", icon: "📊", color: "#f59e0b", verb: "analyze", desc: "Analytics, pipelines, statistical modeling" },
  { id: "ai-engineer", label: "AI Engineer", icon: "🧠", color: "#ef4444", verb: "architect", desc: "LLMs, agents, RAG, prompt engineering" },
  { id: "ml-engineer", label: "ML Engineer", icon: "⚡", color: "#f97316", verb: "train", desc: "Model training, MLOps, inference" },
  { id: "ui-ux", label: "UI/UX Research", icon: "🎨", color: "#d97706", verb: "design", desc: "Design systems, user research, a11y" },
  { id: "full-stack", label: "Full Stack", icon: "🔧", color: "#b45309", verb: "build", desc: "Next.js, TypeScript, APIs, cloud" },
  { id: "ai-safety", label: "AI Safety", icon: "🛡️", color: "#dc2626", verb: "protect", desc: "Constitutional AI, alignment, guardrails" },
]

const THOUGHTS = {
  analyzing: ["decomposing user intent...", "mapping dream-space to solution manifold...", "applying verbalized sampling...", "cross-referencing domain expertise...", "evaluating feasibility × impact × novelty...", "identifying latent user needs...", "scanning analogous solutions...", "computing creative divergence score..."],
  prd: ["## Problem Statement", "structuring success metrics...", "mapping user stories → acceptance criteria...", "## Architecture Decision Records", "defining API contract surface...", "calculating technical debt budget...", "## Risk Assessment", "building dependency graph..."],
  code: ["'use client'", "import { useState, useEffect } from 'react'", "const [state, setState] = useState(init)", "export default function Component() {", "  return (", "    <div className=\"min-h-screen\">", "      <BreathingBackground time={time} />", "    </div>", "  )", "}"],
}

function generateIdeas(dream: string, powerId: string) {
  const p = SUPERPOWERS.find(s => s.id === powerId) || SUPERPOWERS[0]
  return [
    { title: `${p.verb}-first: ${dream} reimagined`, description: `First principles deconstruction through ${p.label} lens — neurodivergent-friendly UX, exposed process.` },
    { title: `The Rabbit Hole: immersive ${dream}`, description: `Zoom-scroll deep-dive. Creative Chaos motion applied — each layer reveals more depth.` },
    { title: `${p.icon} Agent-powered ${dream} pipeline`, description: `Multi-agent system: intake → analysis → generation → review → delivery. Thought streams visible.` },
    { title: `Accessible ${dream} toolkit`, description: `WCAG 2.1 AA, neurodivergent-first. "${dream}" made safe and legible for every kind of mind.` },
    { title: `${dream} × Creative Chaos`, description: `Full-stack on Creative Chaos design system — Deep Ember, rAF animations, glassmorphism.` },
  ]
}

export function SuperpowerServicesSection() {
  const { time, mousePosition } = useAnimation()
  const [stage, setStage] = useState<Stage>(STAGES.IDLE)
  const [dream, setDream] = useState("")
  const [selectedPower, setSelectedPower] = useState<string | null>(null)
  const [ideas, setIdeas] = useState<{title:string;description:string}[]>([])
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null)
  const [thoughts, setThoughts] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")
  const [inputExiting, setInputExiting] = useState(false)
  const [inputRemoved, setInputRemoved] = useState(false)

  useEffect(() => {
    if (!document.getElementById("ss-kf")) {
      const s = document.createElement("style"); s.id = "ss-kf"
      s.textContent = `@keyframes ssSlideUp{from{transform:translateX(-50%) translateY(30px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}`
      document.head.appendChild(s)
    }
  }, [])

  useEffect(() => {
    if (stage === STAGES.THINKING || stage === STAGES.BUILDING_PRD || stage === STAGES.BUILDING_PROTO) {
      const bank = stage === STAGES.THINKING ? THOUGHTS.analyzing : stage === STAGES.BUILDING_PRD ? THOUGHTS.prd : THOUGHTS.code
      const iv = setInterval(() => setThoughts(prev => [...prev.slice(-8), bank[Math.floor(Math.random() * bank.length)]]), 800)
      return () => clearInterval(iv)
    }
  }, [stage])

  const submitDream = useCallback(() => {
    if (!inputValue.trim()) return
    setInputExiting(true)
    setTimeout(() => { setDream(inputValue.trim()); setStage(STAGES.SELECT_POWER); setInputRemoved(true) }, 600)
  }, [inputValue])

  const selectPower = useCallback((id: string) => {
    setSelectedPower(id); setStage(STAGES.THINKING)
    setTimeout(() => { setIdeas(generateIdeas(dream || inputValue, id)); setStage(STAGES.PICK_IDEA) }, 4000)
  }, [dream, inputValue])

  const pickIdea = useCallback((i: number) => {
    setSelectedIdea(i); setStage(STAGES.BUILDING_PRD)
    setTimeout(() => setStage(STAGES.BUILDING_PROTO), 3500)
    setTimeout(() => setStage(STAGES.COMPLETE), 7500)
  }, [])

  const reset = useCallback(() => {
    setStage(STAGES.IDLE); setDream(""); setSelectedPower(null); setIdeas([])
    setSelectedIdea(null); setThoughts([]); setInputValue(""); setInputExiting(false); setInputRemoved(false)
  }, [])

  const ap = SUPERPOWERS.find(p => p.id === selectedPower)
  const isIdle = stage === STAGES.IDLE
  const cri = stage === STAGES.THINKING ? 0.5 : stage === STAGES.BUILDING_PRD ? 0.7 : stage === STAGES.BUILDING_PROTO ? 1 : stage === STAGES.COMPLETE ? 0.3 : 0
  const canSelect = stage === STAGES.SELECT_POWER
  const chars = "⟨⟩{}[]→←∀∃∇∂λσμ∫≡≈"

  return (
    <section id="services" style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: DE.b.deep, fontFamily: "'Geist Sans', system-ui, sans-serif" }}>

      {/* Breathing background */}
      {(() => { const x1 = 30+Math.sin(time*0.3)*20, y1 = 40+Math.cos(time*0.36)*15, x2 = 70+Math.cos(time*0.28)*25, y2 = 60+Math.sin(time*0.4)*20; return (
        <div style={{ position: "absolute", inset: 0, opacity: cri > 0 ? 0.8*(1+Math.sin(time*2)*0.15) : 0.8, background: `radial-gradient(ellipse at ${x1}% ${y1}%, ${DE.b.primary} 0%, ${DE.b.secondary} 30%, ${DE.b.tertiary} 70%, ${DE.b.deep} 100%), radial-gradient(ellipse at ${x2}% ${y2}%, ${DE.b.accent} 0%, transparent 50%)` }} />
      )})()}

      {/* Code rain */}
      {cri > 0 && <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5, opacity: cri }}>
        {Array.from({length: Math.floor(cri*30)}, (_,i) => {
          const x = (i/Math.floor(cri*30))*100, yPos = ((time*(0.5+Math.random()*0.5)*50)%120)-20
          return <span key={i} style={{ position: "absolute", left: `${x}%`, top: `${yPos}%`, fontFamily: "'Geist Mono', monospace", fontSize: 11, color: `rgba(217,119,6,${0.15+Math.sin(time+i)*0.1})` }}>{chars[Math.floor((time*3+i)%chars.length)]}</span>
        })}
      </div>}

      {/* Thought stream */}
      {thoughts.length > 0 && !isIdle && <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 6 }}>
        {thoughts.slice(-5).map((t,i) => <div key={`${i}-${t.slice(0,8)}`} style={{ position: "absolute", left: `${15+Math.sin(time*0.5+i)*10}%`, top: `${80-i*12-(time*8%20)}%`, fontFamily: "'Geist Mono', monospace", fontSize: 11, color: `rgba(217,119,6,${Math.max(0,0.6-i*0.1)})`, whiteSpace: "nowrap" }}>{t}</div>)}
      </div>}

      {/* Services strip — always visible right edge */}
      <div style={{ position: "absolute", left: 59, right: 16, top: 272, transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 6, zIndex: 20 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: 1.5, color: canSelect ? DE.b.accent : "rgba(255,255,255,0.25)", textAlign: "right", marginBottom: 4 }}>
          {canSelect ? "← CHOOSE YOUR SUPERPOWER" : "SUPERPOWERS"}
        </div>
        {SUPERPOWERS.map((pw,i) => {
          const chosen = selectedPower === pw.id, dimmed = selectedPower && !chosen && !isIdle
          return (
            <button key={pw.id} onClick={() => canSelect && selectPower(pw.id)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 12,
              border: `1px solid ${chosen ? pw.color : canSelect ? "rgba(217,119,6,0.4)" : "rgba(80,80,80,0.3)"}`,
              background: chosen ? `linear-gradient(135deg, ${pw.color}18, ${pw.color}30)` : "rgba(30,30,30,0.6)",
              backdropFilter: "blur(12px)", color: chosen ? pw.color : "rgba(230,230,230,0.8)",
              cursor: canSelect ? "pointer" : "default", fontSize: 12, opacity: dimmed ? 0.25 : isIdle ? 0.5+Math.sin(time*1.2+i*0.9)*0.15 : 1,
              transform: `scale(${chosen ? 1.05 : 1})`, transition: `all 0.4s ${SPRING}`, whiteSpace: "nowrap", textAlign: "left", minWidth: 180,
              boxShadow: chosen ? `0 0 24px ${pw.color}35` : "none", fontFamily: "'Geist Sans', system-ui, sans-serif",
            }}>
              <span style={{ fontSize: 16 }}>{pw.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 12 }}>{pw.label}</div>
                <div style={{ fontSize: 9, opacity: 0.5, fontFamily: "'Geist Mono', monospace" }}>{pw.desc}</div>
              </div>
              {chosen && <span style={{ width: 6, height: 6, borderRadius: "50%", background: pw.color, marginLeft: "auto", boxShadow: `0 0 10px ${pw.color}`, opacity: 0.6+Math.sin(time*4)*0.4 }} />}
            </button>
          )
        })}
      </div>

      {/* Dream echo — bottom left after submission */}
      {dream && !isIdle && <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 15, maxWidth: 320, opacity: 0.5+Math.sin(time*0.8)*0.1 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: DE.b.accent, letterSpacing: 1, marginBottom: 4 }}>✦ DREAM</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>"{dream}"</div>
        {ap && <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, padding: "3px 8px", borderRadius: 8, background: `${ap.color}15`, border: `1px solid ${ap.color}30`, fontSize: 10, color: ap.color, fontFamily: "'Geist Mono', monospace" }}>{ap.icon} {ap.label}</div>}
      </div>}

      {/* Status bar — replaces input after submit */}
      {!isIdle && stage !== STAGES.COMPLETE && <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 25, fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "rgba(30,30,30,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(80,80,80,0.2)", animation: "ssSlideUp 0.5s ease forwards" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: DE.b.accent, boxShadow: `0 0 8px ${DE.nav.glow}`, opacity: 0.5+Math.sin(time*4)*0.5 }} />
        {canSelect ? "Choose your superpower →" : stage === STAGES.THINKING ? "Generating ideas..." : stage === STAGES.PICK_IDEA ? "Pick your favorite concept" : stage === STAGES.BUILDING_PRD ? "Crafting PRD..." : "Building prototype..."}
      </div>}

      {/* Idea cards */}
      {stage === STAGES.PICK_IDEA && ideas.length > 0 && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(500px,85vw)", display: "flex", flexDirection: "column", gap: 8, zIndex: 25 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: DE.b.accent, marginBottom: 6, letterSpacing: 1 }}>✦ VERBALIZED SAMPLING — 5 CANDIDATES</div>
        {ideas.map((idea,i) => <button key={i} onClick={() => pickIdea(i)} style={{
          width: "100%", textAlign: "left", padding: "12px 16px", borderRadius: 14,
          border: `1px solid ${selectedIdea === i ? DE.b.accent : DE.card.border}`,
          background: selectedIdea === i ? "rgba(217,119,6,0.1)" : DE.card.bg,
          backdropFilter: "blur(16px)", color: "#e5e5e5", cursor: "pointer",
          transition: `all 0.4s ${SPRING} ${i*0.1}s`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}><span style={{ color: DE.b.accent, fontFamily: "'Geist Mono', monospace", fontSize: 11, marginRight: 8 }}>#{i+1}</span>{idea.title}</div>
          <div style={{ fontSize: 11, opacity: 0.6, fontFamily: "'Geist Mono', monospace", lineHeight: 1.4 }}>{idea.description}</div>
        </button>)}
      </div>}

      {/* Building indicator */}
      {(stage === STAGES.BUILDING_PRD || stage === STAGES.BUILDING_PROTO) && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", zIndex: 25 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: DE.b.accent, letterSpacing: 2, marginBottom: 12 }}>
          {stage === STAGES.BUILDING_PRD ? "✦ GENERATING PRD" : "✦ BUILDING PROTOTYPE"}
        </div>
        <div style={{ width: 200, height: 3, borderRadius: 2, background: "rgba(60,60,60,0.5)", overflow: "hidden", margin: "0 auto" }}>
          <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${DE.b.accent}, ${DE.b.primary})`, width: `${(time*20)%100}%` }} />
        </div>
      </div>}

      {/* Artifact display */}
      {stage === STAGES.COMPLETE && selectedIdea !== null && ideas[selectedIdea] && <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(520px,88vw)", zIndex: 30 }}>
        <div style={{ background: DE.card.bg, backdropFilter: "blur(24px)", border: `1px solid ${ap?.color || DE.card.border}`, borderRadius: 20, padding: 28, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${ap?.color || DE.b.accent}20` }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: DE.b.accent, letterSpacing: 1.5, marginBottom: 12 }}>✦ ARTIFACT COMPLETE</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.3 }}>{ideas[selectedIdea].title}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5, marginBottom: 16 }}>{ideas[selectedIdea].description}</div>
          {ap && <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 8, background: `${ap.color}15`, border: `1px solid ${ap.color}30`, fontSize: 11, color: ap.color, fontFamily: "'Geist Mono', monospace", marginBottom: 16 }}>{ap.icon} {ap.label}</div>}
          <div style={{ background: "rgba(10,5,0,0.6)", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid rgba(80,80,80,0.2)", fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "rgba(217,119,6,0.7)", lineHeight: 1.6, maxHeight: 120, overflow: "hidden" }}>
            {THOUGHTS.code.slice(0,8).map((l,i) => <div key={i} style={{ opacity: 0.4+(i/8)*0.6 }}>{l}</div>)}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={reset} style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: "rgba(60,60,60,0.4)", border: `1px solid ${DE.card.border}`, color: "#e5e5e5", fontSize: 13, cursor: "pointer", fontFamily: "'Geist Sans', system-ui, sans-serif" }}>Dream Again ↻</button>
            <button style={{ flex: 1, padding: "10px 0", borderRadius: 12, background: `linear-gradient(135deg, ${ap?.color || DE.b.accent}40, ${ap?.color || DE.b.accent}20)`, border: `1px solid ${ap?.color || DE.b.accent}50`, color: ap?.color || DE.b.accent, fontSize: 13, cursor: "pointer", fontFamily: "'Geist Sans', system-ui, sans-serif" }}>Export ↗</button>
          </div>
        </div>
      </div>}

      {/* Dream input — only in IDLE, animates out on submit */}
      {!inputRemoved && <div style={{
        position: "absolute", bottom: 24, left: "50%", width: "min(620px,90vw)", zIndex: 25,
        transform: `translateX(-50%) translateY(${inputExiting ? 80 : 0}px)`, opacity: inputExiting ? 0 : 1,
        transition: inputExiting ? "transform 0.6s cubic-bezier(0.4,0,1,1), opacity 0.5s ease" : "none",
        pointerEvents: inputExiting ? "none" : "auto",
      }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, paddingLeft: 4 }}>✦ Creative Chaos is brewing...</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 12, paddingLeft: 4 }}>Pitch your wildest dream</div>
        <div style={{ background: DE.card.bg, backdropFilter: "blur(20px)", border: `1px solid ${DE.card.border}`, borderRadius: 16, padding: "14px 16px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === "Enter" && submitDream()} placeholder="What's your wildest dream?" style={{ flex: 1, background: "rgba(60,60,60,0.4)", border: "1px solid rgba(100,100,100,0.3)", borderRadius: 24, padding: "12px 18px", color: "#e5e5e5", fontSize: 14, fontFamily: "'Geist Sans', system-ui, sans-serif", outline: "none" }} />
          <button onClick={submitDream} disabled={!inputValue.trim()} style={{
            width: 48, height: 48, borderRadius: "50%", background: inputValue.trim() ? DE.b.accent : "rgba(100,100,100,0.4)",
            border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: inputValue.trim() ? "pointer" : "default",
            transform: `translateX(${isIdle ? Math.sin(time*6)*5 : 0}px) rotate(${isIdle ? Math.sin(time*6)*6 : 0}deg)`,
            boxShadow: inputValue.trim() ? `0 0 20px ${DE.nav.glow}` : "none",
          }}>Go</button>
        </div>
      </div>}

      {/* Section label */}
      <div style={{ position: "absolute", top: 24, left: 24, zIndex: 15, fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.3)" }}>SUPERPOWER SERVICES</div>
    </section>
  )
}
