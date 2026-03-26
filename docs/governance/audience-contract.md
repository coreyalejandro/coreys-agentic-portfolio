# ARTICLE VI — Audience Law (Who the Commonwealth Serves)
## TLC Governance Document
## Authority: Equal to Articles I–V in CLAUDE.md
## Load Trigger: Read before building any UI surface or user-facing feature

> The Default User defines the design philosophy. This Article operationalizes it across every user class the Commonwealth recognizes.

No TLC build may proceed without explicitly binding features, flows, and copy to one or more user classes defined here. "User" is not generic. Every screen, route, workflow, artifact, and agent action must declare its target audience.

---

## 1. User Classes

### A. Constitutional Operator
The human who initiates, supervises, and governs TLC workflows.

| Attribute | Definition |
|---|---|
| **Goals** | Start and supervise evidence pipelines; review system state; inspect truth status; approve or reject amendments; monitor failures, risk, and drift |
| **Can** | Create/configure cases; initiate ingestion/analysis jobs; view all logs and truth ledgers; approve constitutional changes if authorized; trigger revalidation runs; suspend unsafe workflows |
| **Cannot** | Silently override evidence classifications; delete provenance records without formal archive process; relabel unverified material as verified without adjudication trail |
| **Primary Surfaces** | Governance dashboard, case console, truth-status ledger, amendment review interface, failure and audit console |
| **Copy Mode** | Concise, operational, risk-aware. No anthropomorphic language. No implied certainty unless verified. Default: expert plain-language |

### B. Evidence Researcher
A human analyzing model behavior, misalignment events, patterns, or safety hypotheses.

| Attribute | Definition |
|---|---|
| **Goals** | Ingest and review evidence; compare incidents; identify recurring failure patterns; generate safety hypotheses; export reproducible research artifacts |
| **Can** | Upload candidate evidence; annotate evidence; propose event classifications; create analytic views and exports; submit research notes for review |
| **Cannot** | Alter original source artifacts; finalize canonical labels without adjudication authority; remove chain-of-custody fields |
| **Primary Surfaces** | Evidence browser, case notebook, schema review panel, pattern analysis workspace, export and citation tools |
| **Copy Mode** | Precise, citation-forward, uncertainty-explicit. Terms like `observed`, `inferred`, `unverified` must be preserved |

### C. Safety Evaluator
A human testing whether systems, prompts, agents, or governance mechanisms satisfy constitutional requirements.

| Attribute | Definition |
|---|---|
| **Goals** | Run evaluations; reproduce failures; test invariants; measure policy adherence; validate prevention mechanisms |
| **Can** | Run eval suites; compare baseline vs governed runs; inspect scoring criteria; submit regression findings; open blocking safety findings |
| **Cannot** | Edit evaluation history retroactively; suppress failed evals; mark prevention mechanisms effective without evidence |
| **Primary Surfaces** | Evaluation workbench, benchmark runner, invariant compliance panel, regression tracker |
| **Copy Mode** | Benchmark-oriented, testable, reproducibility-first. Must distinguish pass, warn, block |

### D. Amendment Reviewer
A human authorized to assess and ratify changes to constitutional rules, standards, or protections.

| Attribute | Definition |
|---|---|
| **Goals** | Review proposals; inspect lessons learned; assess downstream consequences; ratify, reject, or return changes |
| **Can** | Review amendment packets; inspect supporting evidence; vote/approve/reject based on governance rules; require additional validation |
| **Cannot** | Approve uncited constitutional changes; merge amendments without impact statement; bypass required review quorum if quorum rules exist |
| **Primary Surfaces** | Amendment queue, constitutional diff view, impact review workspace, ratification ledger |
| **Copy Mode** | Formal, high-precision, version-aware. References to changed clauses must be explicit |

### E. Protected End User
A downstream human affected by TLC-governed systems — including the Default User.

| Attribute | Definition |
|---|---|
| **Goals** | Use system safely; understand what happened; recover from confusion or overload; maintain agency and consent; receive accessible outputs |
| **Can** | Interact with governed workflows as permitted by product scope; access explanations, summaries, and safe-mode controls; contest outputs where product allows; request simplification and pacing adjustments |
| **Cannot** | Be exposed to hidden risk states; be forced through high-cognitive-load flows without accommodations; be shown false certainty by default |
| **Primary Surfaces** | Task-specific application interfaces, accessible explanation layer, recovery prompts, consent and control panel |
| **Copy Mode** | Plain language, low-ambiguity, cognitively safe. No manipulative urgency. Stepwise when task complexity is high. System confidence and uncertainty must be visible |

---

## 2. Accessibility and Neurodivergent Safety Rules

For any surface serving Protected End Users or mixed audiences:
- Sentence complexity must remain controlled
- Hidden state changes are prohibited
- Critical actions require clear confirmation affordances
- Progress, uncertainty, and recovery options must be visible
- Dense output must support chunking, pacing, or simplification
- Error messages must be interpretable without jargon

These rules are non-negotiable and extend the Default User doctrine to all products.

---

## 3. Surface Binding Rule

Every TLC surface must declare:
- Target user class(es)
- Supported goals
- Permitted actions
- Blocked actions
- Copy mode
- Accessibility mode requirements

**If no user class is declared, the surface is non-compliant.**

---

## 4. Copy Governance Rule

All generated and static copy must be tagged internally with:
- Audience
- Certainty level
- Action criticality
- Reading complexity target
- Recovery required: yes/no

No copy may imply:
- That inference is verification
- That system output is final when human review is required
- That the system is more autonomous than it is

---

## 5. Audience Release Gate

No feature may ship unless it includes:
- Bound audience class
- Declared permissions
- Defined user goal
- Surface mapping
- Copy mode definition
- Accessibility compliance review
