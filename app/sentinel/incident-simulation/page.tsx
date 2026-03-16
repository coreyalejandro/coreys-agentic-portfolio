"use client"

import Link from "next/link"

const steps = [
  {
    title: "1. Claim Emitted",
    body: "An AI system makes a confident claim about system functionality or safety posture.",
    evidence: "Original model or agent output.",
  },
  {
    title: "2. PROACTIVE Gov Check",
    body: "PROACTIVE Gov verifies the claim against real code, configuration, and deployment evidence.",
    evidence: "Governance rule + verification result (GOV-* artifact).",
  },
  {
    title: "3. Eval Workbench Assessment",
    body: "Eval Workbench evaluates behavior against rubric-based tests and scores regressions.",
    evidence: "Evaluation rubric and score (EVAL-* artifact).",
  },
  {
    title: "4. HUI Guard Intervention",
    body: "HUI Guard assesses human impact and intervenes when claims or outputs would mislead or destabilize users.",
    evidence: "Intervention event and human-impact rationale (HUI-* artifact).",
  },
  {
    title: "5. Trace Console Recording",
    body: "Trace Console records the full evidence trail for later human and automated inspection.",
    evidence: "Ordered trace log (TRACE-* artifact).",
  },
]

export default function SentinelIncidentSimulationPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">SentinelOS</p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Incident Lifecycle Simulation
            </h1>
            <p className="mt-2 text-sm text-white/60 max-w-xl">
              A narrative walkthrough of how SentinelOS handles a potentially unsafe or misleading AI claim, from
              emission to trace.
            </p>
          </div>
          <Link
            href="/sentinel"
            className="text-xs rounded-full border border-white/15 px-3 py-1.5 text-white/80 hover:bg-white/10 transition-colors"
          >
            ← SentinelOS overview
          </Link>
        </header>

        <ol className="space-y-6 md:space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl border border-white/10 bg-white/5 p-5 md:p-6">
              <div className="absolute left-4 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-[11px] font-semibold text-black">
                {index + 1}
              </div>
              <h2 className="pl-6 text-sm md:text-base font-semibold text-white mb-2">{step.title}</h2>
              <p className="pl-6 text-sm text-white/70 mb-3">{step.body}</p>
              <p className="pl-6 text-[11px] text-white/50">
                <span className="font-semibold text-amber-200">Evidence:</span> {step.evidence}
              </p>
            </li>
          ))}
        </ol>

        <section className="mt-10 rounded-2xl border border-white/10 bg-black/60 p-5 md:p-6 text-[11px] text-white/60 leading-relaxed">
          <p>
            For implementation details and planned evidence artifact locations, see{" "}
            <code className="font-mono text-[11px]">docs/SentinelOS_INCIDENT_LIFECYCLE.md</code> and{" "}
            <code className="font-mono text-[11px]">docs/SentinelOS_TRUTH_STATUS.md</code>. This page is a static
            simulation; wiring it to live PROACTIVE, HUI, Eval Workbench, Red Team Lab, and Trace Console services is a
            future integration step.
          </p>
        </section>
      </div>
    </main>
  )
}

