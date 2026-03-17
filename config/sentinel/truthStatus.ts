/**
 * SentinelOS Truth Status Configuration
 *
 * Reflects the 4-domain Safety Systems Design model.
 * Canonical source: safety-identity-refactor/09-status/implementation-status-matrix.md
 */

export type SentinelStatus = "implemented" | "prototype" | "partial" | "planned"

export interface SentinelModuleStatus {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly domain: string
  readonly status: SentinelStatus
  readonly repo?: string
}

export interface SentinelArtifactStatus {
  readonly id: string
  readonly name: string
  readonly moduleIds: readonly string[]
  readonly status: SentinelStatus
  readonly notes?: string
}

export const sentinelModules: readonly SentinelModuleStatus[] = [
  {
    id: "proactive",
    name: "PROACTIVE",
    description:
      "Constitutional AI safety agent. Validates MR claims against I1–I6 invariants.",
    domain: "Epistemic Safety",
    status: "implemented",
    repo: "https://github.com/coreyalejandro/28441830",
  },
  {
    id: "uicare",
    name: "UICare-System",
    description:
      "Loop detection and rescue for neurodivergent-friendly development.",
    domain: "Human Safety",
    status: "partial",
    repo: "https://github.com/coreyalejandro/uicare-system",
  },
  {
    id: "iiui",
    name: "Instructional Integrity UI",
    description:
      "Cognitive safety evaluator for learning environments.",
    domain: "Cognitive Safety",
    status: "prototype",
    repo: "https://github.com/coreyalejandro/instructional-integrity-ui",
  },
  {
    id: "consentchain",
    name: "ConsentChain",
    description:
      "Agent consent governance with cryptographic ledger and policy engine.",
    domain: "Empirical Safety",
    status: "partial",
    repo: "https://github.com/coreyalejandro/consentchain",
  },
  {
    id: "hui-gov",
    name: "HUI Gov",
    description:
      "Human-UI governance layer for epistemic labeling in decision support.",
    domain: "Human Safety",
    status: "planned",
  },
  {
    id: "eval-workbench",
    name: "Eval Workbench / ESE",
    description:
      "Empirical Safety Engine — failure classification, safety scoring, trend analysis.",
    domain: "Empirical Safety",
    status: "planned",
  },
]

export const sentinelArtifacts: readonly SentinelArtifactStatus[] = [
  {
    id: "proactive-validation",
    name: "PROACTIVE Validation (n=200)",
    moduleIds: ["proactive"],
    status: "implemented",
    notes:
      "100% detection rate, 0% FPR on TruthfulQA. Evidence in docs/evidence/validation_results.json",
  },
  {
    id: "architecture-doc",
    name: "SentinelOS Architecture Doc",
    moduleIds: ["proactive", "uicare", "iiui", "consentchain"],
    status: "implemented",
    notes: "docs/SentinelOS_ARCHITECTURE.md",
  },
  {
    id: "incident-lifecycle-doc",
    name: "Incident Lifecycle Doc",
    moduleIds: ["proactive", "uicare", "iiui", "consentchain"],
    status: "implemented",
    notes: "docs/SentinelOS_INCIDENT_LIFECYCLE.md",
  },
  {
    id: "truth-status-doc",
    name: "Truth-Status Matrix Doc",
    moduleIds: ["proactive", "consentchain"],
    status: "implemented",
    notes: "docs/SentinelOS_TRUTH_STATUS.md",
  },
  {
    id: "safety-case-doc",
    name: "Safety Case Skeleton",
    moduleIds: ["proactive", "uicare", "iiui", "consentchain"],
    status: "partial",
    notes: "docs/SentinelOS_SAFETY_CASE.md",
  },
  {
    id: "identity-refactor",
    name: "Identity Refactor Contract",
    moduleIds: ["proactive", "uicare", "iiui", "consentchain"],
    status: "implemented",
    notes:
      "safety-identity-refactor/ — 36 files, Steps 0-19 of 25-step contract",
  },
]
