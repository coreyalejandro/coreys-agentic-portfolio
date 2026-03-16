"use client"

import Link from "next/link"
import { SentinelTruthStatusTable } from "@/components/sentinel/TruthStatusTable"

export default function SentinelOverviewPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-black via-zinc-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">SentinelOS</p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              AI Safety Operating Layer
            </h1>
          </div>
          <Link
            href="/"
            className="text-xs rounded-full border border-white/15 px-3 py-1.5 text-white/80 hover:bg-white/10 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </header>

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">SentinelOS governs AI systems.</h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            SentinelOS is a modular AI Safety Operating Layer composed of PROACTIVE Gov, HUI Guard, Eval Workbench, Red
            Team Lab, and Trace Console. This portfolio acts as the inspection console where reviewers can understand
            what exists today, how incidents are handled, and where each safety control lives.
          </p>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start">
          <div className="rounded-3xl border border-white/10 bg-black/60 p-5 md:p-6">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Architecture Snapshot</h3>
            <pre className="text-[11px] md:text-xs text-white/70 bg-black/60 rounded-2xl p-4 overflow-x-auto leading-relaxed">
{`User Interaction
    │
    ▼
HUI Guard
    │
    ▼
PROACTIVE Gov
    │
    ▼
Eval Workbench
    │
    ▼
Red Team Lab
    │
    ▼
Trace Console`}
            </pre>
            <p className="mt-3 text-[11px] text-white/60">
              For a full description of each module, see{" "}
              <code className="font-mono text-[11px]">docs/SentinelOS_ARCHITECTURE.md</code>.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/60 p-5 md:p-6">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Incident Lifecycle (High Level)</h3>
            <ol className="space-y-2 text-[13px] text-white/70 list-decimal list-inside">
              <li>AI system emits a confident claim about functionality or safety posture.</li>
              <li>PROACTIVE Gov verifies the claim against code, config, and evidence.</li>
              <li>Eval Workbench scores behavior against evaluation rubrics.</li>
              <li>HUI Guard assesses human impact and intervenes if necessary.</li>
              <li>Trace Console records the full evidence trail for later inspection.</li>
            </ol>
            <p className="mt-3 text-[11px] text-white/60">
              See <code className="font-mono text-[11px]">docs/SentinelOS_INCIDENT_LIFECYCLE.md</code> for the detailed
              walkthrough.
            </p>
            <Link
              href="/sentinel/incident-simulation"
              className="mt-4 inline-flex items-center text-[12px] rounded-full border border-amber-400/60 px-3 py-1.5 text-amber-200 hover:bg-amber-400/10 transition-colors"
            >
              Open incident simulation →
            </Link>
          </div>
        </section>

        <SentinelTruthStatusTable />
      </div>
    </main>
  )
}

