/**
 * Safety Systems Design — Domain Configuration
 *
 * Four safety domains, each with 1 primary repo representative.
 * Canonical source: safety-identity-refactor/03-domains/project-domain-map.md
 */

export interface SafetyDomain {
  readonly id: string
  readonly name: string
  readonly focus: string
  readonly description: string
  readonly failureClass: string
  readonly primaryProduct: {
    readonly name: string
    readonly repo: string
    readonly status: "implemented" | "partial" | "prototype" | "planned"
    readonly headline: string
    readonly evidence?: string
  }
  readonly color: string
  readonly icon: string
}

export const safetyDomains: readonly SafetyDomain[] = [
  {
    id: "epistemic",
    name: "Epistemic Safety",
    focus: "truth, claims, verification",
    description:
      "Preventing false claims and unsupported reality in AI and automated systems.",
    failureClass:
      "A system asserts something is true when it is not, and a user acts on that assertion.",
    primaryProduct: {
      name: "PROACTIVE",
      repo: "https://github.com/coreyalejandro/28441830",
      status: "implemented",
      headline:
        "Constitutional AI safety agent — validated epistemic safety for GitLab",
      evidence: "100% detection rate at n=200 TruthfulQA, 0% false positives",
    },
    color: "#f59e0b",
    icon: "🔍",
  },
  {
    id: "human",
    name: "Human Safety",
    focus: "behavior, decisions, intervention",
    description:
      "Preventing systems from dis-enabling people through cognitive overload, inaccessible design, and harmful decision trajectories.",
    failureClass:
      "A system is designed around the median user and everyone outside that median is left behind or harmed.",
    primaryProduct: {
      name: "UICare-System",
      repo: "https://github.com/coreyalejandro/uicare-system",
      status: "partial",
      headline:
        "Loop detection and rescue — neurodivergent-friendly human safety",
    },
    color: "#ef4444",
    icon: "🛡️",
  },
  {
    id: "cognitive",
    name: "Cognitive Safety",
    focus: "understanding, learning, mental models",
    description:
      "Preventing misunderstanding, mislearning, and flawed mental models in learning environments and decision contexts.",
    failureClass:
      "A learning environment produces false understanding, misleading structure, or unsafe mental models.",
    primaryProduct: {
      name: "Instructional Integrity UI",
      repo: "https://github.com/coreyalejandro/instructional-integrity-ui",
      status: "prototype",
      headline: "Cognitive safety for learning environments",
    },
    color: "#8b5cf6",
    icon: "🧠",
  },
  {
    id: "empirical",
    name: "Empirical Safety",
    focus: "measurement, evaluation, evidence",
    description:
      "The measurement, evaluation, and continuous validation of system behavior through verifiable evidence chains.",
    failureClass:
      "A system's described behavior does not match its actual behavior. Consent is assumed but not recorded.",
    primaryProduct: {
      name: "ConsentChain",
      repo: "https://github.com/coreyalejandro/consentchain",
      status: "partial",
      headline:
        "Agent consent governance — verifiable evidence chains",
    },
    color: "#06b6d4",
    icon: "📊",
  },
] as const

export function getDomainById(id: string): SafetyDomain | undefined {
  return safetyDomains.find((d) => d.id === id)
}
