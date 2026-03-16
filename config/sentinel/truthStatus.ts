export type SentinelStatus = "implemented" | "prototype" | "partial" | "planned"

export interface SentinelModuleStatus {
  id: string
  name: string
  description: string
  status: SentinelStatus
}

export interface SentinelArtifactStatus {
  id: string
  name: string
  moduleIds: string[]
  status: SentinelStatus
  notes?: string
}

export const sentinelModules: SentinelModuleStatus[] = [
  {
    id: "proactive",
    name: "PROACTIVE Gov",
    description: "Constitutional governance and claim verification.",
    status: "implemented",
  },
  {
    id: "hui",
    name: "HUI Guard",
    description: "Human-centered AI intervention and harm reduction.",
    status: "prototype",
  },
  {
    id: "eval",
    name: "Eval Workbench",
    description: "AI behavior testing and scoring.",
    status: "partial",
  },
  {
    id: "redteam",
    name: "Red Team Lab",
    description: "Adversarial testing and failure classification.",
    status: "planned",
  },
  {
    id: "trace",
    name: "Trace Console",
    description: "Evidence chain and decision traceability.",
    status: "partial",
  },
]

export const sentinelArtifacts: SentinelArtifactStatus[] = [
  {
    id: "architecture-doc",
    name: "SentinelOS Architecture Doc",
    moduleIds: ["proactive", "hui", "eval", "redteam", "trace"],
    status: "implemented",
    notes: "docs/SentinelOS_ARCHITECTURE.md",
  },
  {
    id: "incident-lifecycle-doc",
    name: "Incident Lifecycle Doc",
    moduleIds: ["proactive", "hui", "eval", "redteam", "trace"],
    status: "implemented",
    notes: "docs/SentinelOS_INCIDENT_LIFECYCLE.md",
  },
  {
    id: "truth-status-doc",
    name: "Truth-Status Matrix Doc",
    moduleIds: ["trace"],
    status: "implemented",
    notes: "docs/SentinelOS_TRUTH_STATUS.md",
  },
  {
    id: "safety-case-doc",
    name: "Safety Case Skeleton",
    moduleIds: ["proactive", "hui", "eval", "redteam", "trace"],
    status: "partial",
    notes: "docs/SentinelOS_SAFETY_CASE.md",
  },
  {
    id: "incident-simulation-ui",
    name: "Incident Simulation UI",
    moduleIds: ["proactive", "hui", "eval", "redteam", "trace"],
    status: "planned",
    notes: "Planned page under app/sentinel/incident-simulation.",
  },
]

