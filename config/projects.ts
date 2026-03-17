/**
 * Portfolio project configuration
 *
 * Projects map to safety domains per:
 * safety-identity-refactor/03-domains/project-domain-map.md
 *
 * Implementation status per:
 * safety-identity-refactor/09-status/implementation-status-matrix.md
 */

export type ProjectStatus = "implemented" | "partial" | "prototype" | "planned"

export interface Project {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly longDescription: string
  readonly domain: string
  readonly status: ProjectStatus
  readonly technologies: readonly string[]
  readonly githubUrl: string
  readonly liveUrl?: string
  readonly images: readonly string[]
  readonly challenge: string
  readonly solution: string
  readonly evidence?: string
  readonly featured: boolean
}

export const projects: readonly Project[] = [
  {
    id: "proactive",
    title: "PROACTIVE",
    description:
      "Constitutional AI safety agent that catches epistemic failures in GitLab merge requests before they reach production.",
    longDescription:
      "PROACTIVE is a constitutional AI safety layer for GitLab CI/CD. It extracts claims from merge request code, validates each claim against six safety invariants (I1–I6), and produces structured review comments. Integrates as a GitLab Duo custom agent, an external Claude Code agent, and a CI/CD pipeline safety review stage.",
    domain: "Epistemic Safety",
    status: "implemented",
    technologies: [
      "Python",
      "GitLab Duo",
      "Claude Code",
      "Constitutional AI",
      "CI/CD",
    ],
    githubUrl: "https://github.com/coreyalejandro/28441830",
    images: [],
    challenge:
      "AI-assisted code generation introduces phantom completions, confident false claims, and silent error suppression into codebases. These failures pass code review because they look correct.",
    solution:
      "Enforce six constitutional safety invariants (I1–I6) at CI/CD time. Extract claims from MR diffs, validate each against invariants, produce structured review comments with evidence markers.",
    evidence:
      "Validated at n=200 (TruthfulQA): 100% detection rate, 0% false positive rate. 58 tests, 83% coverage.",
    featured: true,
  },
  {
    id: "uicare-system",
    title: "UICare-System",
    description:
      "Loop detection and rescue system that prevents neurodivergent developers from being trapped in repetitive patterns.",
    longDescription:
      "UICare-System deploys two AI agents (MonitorAgent + RescueAgent) that work in tandem. MonitorAgent continuously analyzes user interaction patterns to detect repetitive loops. RescueAgent activates when loops are detected, providing clear, actionable steps for resolution. Dockerized with Kubernetes deployment configuration.",
    domain: "Human Safety",
    status: "partial",
    technologies: [
      "Node.js",
      "GPT-4-mini",
      "Docker",
      "Kubernetes",
      "Next.js",
    ],
    githubUrl: "https://github.com/coreyalejandro/uicare-system",
    images: [],
    challenge:
      "Neurodivergent developers can get stuck in repetitive patterns — editing and reverting the same code, cycling through the same debug steps — without any system detecting or intervening.",
    solution:
      "Two AI agents in tandem: MonitorAgent detects repetitive interaction loops, RescueAgent provides targeted, clear steps to break the pattern and move forward.",
    featured: true,
  },
  {
    id: "instructional-integrity-ui",
    title: "Instructional Integrity UI",
    description:
      "Cognitive safety system ensuring learning environments do not produce false understanding or unsafe mental models.",
    longDescription:
      "A Next.js application that evaluates instructional artifacts for cognitive safety. Provides a journey-map flow from framework understanding through evaluation to production packaging. Features evaluator interface with visible evidence states, rubric system, and Prisma-backed data model.",
    domain: "Cognitive Safety",
    status: "prototype",
    technologies: [
      "Next.js 14",
      "React 18",
      "Prisma",
      "TypeScript",
      "Vitest",
    ],
    githubUrl:
      "https://github.com/coreyalejandro/instructional-integrity-ui",
    images: [],
    challenge:
      "Learning environments can produce false understanding even when the content is technically correct, because cognitive scaffolding is wrong or absent.",
    solution:
      "Evaluator interface with rubric system that assesses instructional artifacts against cognitive safety criteria. Journey-map flow guides users from framework understanding to production evaluation.",
    featured: true,
  },
  {
    id: "consentchain",
    title: "ConsentChain",
    description:
      "Agent consent governance with cryptographic ledger, policy engine, and revocation — verifiable evidence chains.",
    longDescription:
      "A Turborepo monorepo providing consent governance for AI agents. Eight packages handle the full lifecycle: agent-sdk, ledger (cryptographic signing), policy-engine, idempotency, step-up auth, vault-client, google-executor, and shared types. Every agent action is consented, logged, and revocable.",
    domain: "Empirical Safety",
    status: "partial",
    technologies: [
      "Next.js 14",
      "Turborepo",
      "Prisma v7",
      "NextAuth",
      "TypeScript",
    ],
    githubUrl: "https://github.com/coreyalejandro/consentchain",
    images: [],
    challenge:
      "AI agents act on behalf of users without verifiable consent records. When something goes wrong, there is no audit trail showing what was authorized, by whom, and whether consent was revoked.",
    solution:
      "Cryptographic consent ledger with policy engine. Full gateway pipeline: validation → idempotency → revocation check → policy evaluation → step-up auth → execution → ledger entry. Every action auditable.",
    featured: true,
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}

export function getFeaturedProjects(): readonly Project[] {
  return projects.filter((project) => project.featured)
}

export function getProjectsByDomain(domain: string): readonly Project[] {
  return projects.filter((project) => project.domain === domain)
}
