"use client"

import { sentinelModules, sentinelArtifacts, type SentinelStatus } from "@/config/sentinel/truthStatus"
import { cn } from "@/lib/utils"

function statusLabel(status: SentinelStatus) {
  switch (status) {
    case "implemented":
      return "Implemented"
    case "prototype":
      return "Prototype"
    case "partial":
      return "Partial"
    case "planned":
      return "Planned"
  }
}

function statusColor(status: SentinelStatus) {
  switch (status) {
    case "implemented":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
    case "prototype":
      return "bg-sky-500/20 text-sky-300 border-sky-500/40"
    case "partial":
      return "bg-amber-500/20 text-amber-300 border-amber-500/40"
    case "planned":
      return "bg-zinc-500/20 text-zinc-300 border-zinc-500/40"
  }
}

export function SentinelTruthStatusTable() {
  return (
    <section aria-labelledby="sentinel-truth-status-heading" className="mt-12 rounded-3xl bg-black/40 border border-white/10 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-6">
        <div>
          <h2 id="sentinel-truth-status-heading" className="text-xl md:text-2xl font-semibold text-white">
            SentinelOS Truth-Status
          </h2>
          <p className="text-sm text-white/60 max-w-xl">
            Every SentinelOS module and artifact is explicitly labeled so reviewers can see what exists today and what is
            planned.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2">Modules</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {sentinelModules.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm font-medium text-white">{m.name}</div>
                  <p className="text-xs text-white/60 mt-1">{m.description}</p>
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-semibold border shrink-0 self-center",
                    statusColor(m.status),
                  )}
                >
                  {statusLabel(m.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/70 mb-2">Artifacts</h3>
          <div className="space-y-2">
            {sentinelArtifacts.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{a.name}</div>
                  {a.notes && (
                    <p className="text-[11px] text-white/50 mt-0.5 truncate" title={a.notes}>
                      {a.notes}
                    </p>
                  )}
                </div>
                <div
                  className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-semibold border shrink-0 self-center",
                    statusColor(a.status),
                  )}
                >
                  {statusLabel(a.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

