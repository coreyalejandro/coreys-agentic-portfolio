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
    id: "the-living-constitution",
    title: "The Living Constitution",
    description:
      "Constitutional governance-as-code for AI safety. Five articles, four safety domains, six-agent republic. The supreme governing layer.",
    longDescription:
      "The Living Constitution is the governance-as-code framework that governs the entire Safety Systems Design Commonwealth. Five articles modeled on the U.S. Constitution encode safety rules as executable constraints: Bill of Rights (Article I), Execution Law (Article II), Purpose Law (Article III), Separation of Powers (Article IV), and Amendment Process (Article V). Four doctrines — Idempotency, Calibrated Truth, Census, and Default User — ensure governance is rigorous, honest, and neurodivergent-accessible.",
    domain: "All Four Domains",
    status: "implemented",
    technologies: [
      "TypeScript",
      "Claude Code",
      "Constitutional AI",
      "Governance-as-Code",
    ],
    githubUrl: "https://github.com/coreyalejandro/the-living-constitution",
    images: [],
    challenge:
      "AI safety rules exist as documentation — not enforced, not measurable, not amendable. When rules are not code, they are suggestions.",
    solution:
      "Encode constitutional governance as executable constraints. Five articles, six agent roles with defined power boundaries, formal amendment process that converts failures into rule improvements.",
    evidence:
      "53 tracked claims in evidence ledger. 34 proven, 6 partial, 13 pending. Every status label backed by specific evidence.",
    featured: true,
  },
  {
    id: "proactive",
    title: "PROACTIVE",
    description:
      "Constitutional AI safety agent — 100% detection rate across test cases, 212/212 tests passing. GitLab AI Hackathon submission.",
    longDescription:
      "PROACTIVE is a constitutional AI safety layer for GitLab CI/CD. It extracts claims from merge request code, validates each claim against six safety invariants (I1–I6), and produces structured review comments. Integrates as a GitLab Duo custom agent, an external Claude Code agent, and a CI/CD pipeline safety review stage. Submitted to GitLab AI Hackathon 2026-03-25.",
    domain: "Epistemic Safety",
    status: "implemented",
    technologies: [
      "Python",
      "GitLab Duo",
      "Claude Code",
      "Constitutional AI",
      "CI/CD",
    ],
    githubUrl: "https://github.com/coreyalejandro/proactive-gitlab-agent",
    images: [],
    challenge:
      "AI-assisted code generation introduces phantom completions, confident false claims, and silent error suppression into codebases. These failures pass code review because they look correct.",
    solution:
      "Enforce six constitutional safety invariants (I1-I6) at CI/CD time. Extract claims from MR diffs, validate each against invariants, produce structured review comments with evidence markers.",
    evidence:
      "100% detection rate across 8 test cases (n=19 violations), 0 false positives. 212/212 tests passing. Validation report VR-V-15C6.",
    featured: true,
  },
  {
    id: "mad-mall-production",
    title: "MADMall",
    description:
      "Virtual luxury mall & teaching clinic for Black women with Graves' disease. Primary use case for The Living Constitution governance.",
    longDescription:
      "MADMall reclaims malls as third-place infrastructure for Black women — a space that has been disappearing from the physical world. It combines a dignified user experience modeled after real luxury malls (Stanford Shopping Center, La Cantera) with serious healthcare AI/ML infrastructure. The primary use case for The Living Constitution: ConsentChain gates every data touch, PROACTIVE validates every ML claim, UICare monitors cognitive load for chronically ill users.",
    domain: "Human Safety",
    status: "partial",
    technologies: [
      "Next.js 16",
      "Turborepo",
      "React 19",
      "Prisma",
      "PostgreSQL",
      "Python ML",
      "Clerk",
      "Stripe",
    ],
    githubUrl: "https://github.com/coreyalejandro/mad-mall-production",
    images: [],
    challenge:
      "Black women with Graves' disease have no dedicated digital space that treats them with dignity while providing serious healthcare support. Existing platforms are clinical and impersonal.",
    solution:
      "A virtual luxury mall that combines cultural significance with healthcare AI. Constitutional governance ensures every data collection is consented, every ML claim is validated, and every interface respects cognitive load limits.",
    evidence:
      "6 apps, 22 packages, ~152K LOC. Clerk auth, Stripe payments, Prisma/PostgreSQL. ML Python package with CRISP-DM methodology. Phase 1 of 4 complete.",
    featured: true,
  },
  {
    id: "sentinelos",
    title: "SentinelOS",
    description:
      "Invariant enforcement platform. TypeScript Turborepo monorepo with hexagonal architecture. 6 safety invariants as executable constraints.",
    longDescription:
      "SentinelOS translates The Living Constitution's articles into executable TypeScript code. Hexagonal architecture with ports (what the constitution requires) and adapters (how each platform implements those requirements). Nine packages: core + article-i through article-v + incident + safety-case. 180+ Object.freeze calls enforce strict immutability. Zero cross-adapter dependencies.",
    domain: "All Four Domains",
    status: "partial",
    technologies: [
      "TypeScript",
      "Turborepo",
      "Vitest",
      "Hexagonal Architecture",
    ],
    githubUrl: "https://github.com/coreyalejandro/sentinelos",
    images: [],
    challenge:
      "Safety invariants exist as documentation. When they are not code, they cannot be enforced, measured, or tested.",
    solution:
      "Encode six invariants (I1-I6) as TypeScript ports with adapters for each constitutional article. Every check is immutable, testable, and fail-closed.",
    evidence:
      "1,037 LOC source + 994 LOC tests. 7 of 8 adapters implemented. All tests passing. Strict immutability enforced throughout.",
    featured: true,
  },
  {
    id: "uicare-system",
    title: "UICare-System",
    description:
      "Developer safety monitor. Absence-over-presence signal detection for neurodivergent developers. Human Safety domain.",
    longDescription:
      "UICare-System monitors developer workflows for signs of cognitive overwhelm. Uses absence-over-presence signal detection — what the developer is NOT doing is the signal, not what they are doing. GPT-4o-mini for cognitive load assessment, Kubernetes deployment, memory-bank architecture for context persistence across sessions.",
    domain: "Human Safety",
    status: "partial",
    technologies: [
      "Node.js",
      "GPT-4o-mini",
      "Docker",
      "Kubernetes",
      "Next.js",
    ],
    githubUrl: "https://github.com/coreyalejandro/uicare-system",
    images: [],
    challenge:
      "Neurodivergent developers can enter cognitive overwhelm without any system detecting or intervening. The signal is absence — when they stop interacting — not presence.",
    solution:
      "Absence-over-presence detection with AI-powered cognitive load assessment. Memory-bank architecture preserves context across sessions so recovery is seamless.",
    featured: true,
  },
  {
    id: "junior-gpt-crisp-dm",
    title: "JuniorGPT",
    description:
      "Visible thinking AI platform. 4-agent system with CRISP-DM methodology, real-time SSE streaming, and automated evaluation framework.",
    longDescription:
      "JuniorGPT is a four-agent reasoning system (Analyst, Strategist, Creative, Logic) built in Python/FastAPI. Every reasoning step is streamed visibly to the user via Server-Sent Events — transparent thinking is not a logging feature but the interface itself. Includes automated evaluation framework tracking task success rate, factual accuracy, tool reliability, latency, and safety violations.",
    domain: "Cognitive Safety",
    status: "implemented",
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "SSE",
      "JSON Schema",
    ],
    githubUrl: "https://github.com/coreyalejandro/junior-gpt-crisp-dm",
    images: [],
    challenge:
      "AI reasoning is a black box. Users cannot learn structured thinking from a system that hides its thought process.",
    solution:
      "Stream every reasoning step visibly. Four specialized agents with distinct roles. Schema-validated events create complete audit trails. Users learn structured reasoning by watching it happen.",
    featured: false,
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
  {
    id: "docen-live",
    title: "Docen Live",
    description:
      "Neurodivergent-first voice docent that transforms Gemini API documentation into adaptive, multimodal learning experiences using voice, text, and image interaction.",
    longDescription:
      "Docen Live is a voice-first learning platform built for the Google Gemini API hackathon. Users select a learning mode (Journey, Meditation, or Rabbit Hole), speak naturally, and receive spoken explanations from an AI docent — with a real-time transcript and auto-generated visual companion panel. Seven accessibility features modify both UI and AI behavior: One-Action Mode, Low-Stimulation Mode, Slow Pacing, Repeat, Recap, Explain Simply, and Progress Visibility. Deployed live on Google Cloud Run.",
    domain: "Cognitive Safety",
    status: "implemented",
    technologies: [
      "Next.js 16",
      "Gemini 2.5 Flash",
      "Google Cloud Run",
      "TypeScript",
      "ShadCN/ui",
    ],
    githubUrl: "https://github.com/coreyalejandro/docen",
    liveUrl: "https://docen-live-677222981446.us-central1.run.app",
    images: [],
    challenge:
      "Dense documentation walls are not accessible to neurodivergent learners. People with ADHD, autism, anxiety, dyslexia, or cognitive fatigue need guided, paced, voice-first interaction — not another 40-page reading exercise.",
    solution:
      "Voice-first AI docent with three learning modes and seven composable accessibility features that modify AI behavior, not just UI appearance. Low-stimulation mode changes how the docent communicates, not just how the page looks.",
    evidence:
      "Live on Google Cloud Run. Submitted to Gemini Live Agent Challenge. Seven accessibility features verified in production.",
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
