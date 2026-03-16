# SentinelOS Truth-Status Matrix (Portfolio Context)

> This document tracks what **exists today** in this repository and how it maps to SentinelOS modules. It mirrors the truth-status concept in `ai-safety-identity-strategy.md` and is backed by a shared config used in the UI.

## 1. Component-Level Truth-Status

| Component / Artifact                         | Module(s)            | Status          | Notes |
| ------------------------------------------- | -------------------- | --------------- | ----- |
| SentinelOS architecture explainer (`docs/SentinelOS_ARCHITECTURE.md`) | Platform / All | implemented     | Local architecture mirror of strategy doc. |
| Incident lifecycle explainer (`docs/SentinelOS_INCIDENT_LIFECYCLE.md`) | Platform / All | implemented     | Narrative incident walkthrough, no live backend yet. |
| Incident simulation page (planned route)    | Platform / All       | planned         | To visualize the 5-step pipeline with evidence links. |
| Truth-status config file (planned)          | Platform / Trace     | planned         | Centralized config feeding docs + UI. |
| Evidence artifacts under `docs/evidence/`   | PROACTIVE / Eval / HUI / Trace | planned | Governance rules, rubrics, interventions, traces. |
| Creative Chaos inspection console UI (home + sections) | Platform / Trace | implemented (legacy framing) | Will be reframed explicitly as SentinelOS console. |

## 2. Module Truth-Status (High Level)

| Module                        | Status (overall)       | In this repo                          |
| ----------------------------- | ---------------------- | -------------------------------------- |
| PROACTIVE core governance checks | implemented (external) | Linked and described; no core logic here. |
| HUI intervention logic        | prototype / in progress| Described; future demo hooks planned.  |
| Evaluation rubric / workbench | partial / prototype    | Described; evaluation concepts surfaced. |
| Adversarial testing (Red Team Lab) | planned            | Only conceptual references for now.    |
| Trace infrastructure          | basic implementation   | Logging + trace concepts; UI surfacing planned. |

## 3. Portfolio Surfaces and Status

| Surface                                       | SentinelOS Role                         | Status          |
| --------------------------------------------- | ----------------------------------------| --------------- |
| Home hero / overview                          | SentinelOS introduction                 | partial (creative-focus) |
| Architecture diagram component                | SentinelOS system map                   | planned         |
| Incident simulation page                      | End-to-end incident walkthrough         | planned         |
| Truth-status badge/table UI                   | Status surfacing for modules/artifacts  | planned         |
| Public profile content snippets               | Ecosystem + identity alignment          | planned         |

## 4. Governance Rules

For this repository:

- **Any new SentinelOS-related feature** must declare:
  - Which module(s) it belongs to.
  - Its status (`implemented`, `prototype`, `partial`, `planned`).
  - Where evidence artifacts (if any) live.
- The same status must be:
  - Reflected here in `SentinelOS_TRUTH_STATUS.md`.
  - Reflected in the shared truth-status config used by UI components.

## 5. Synchronization with UI Config

- A centralized config (e.g., `config/sentinel/truthStatus.ts`) will store:
  - Module status.
  - Key artifact status.
  - Human-readable labels and descriptions.
- This document and the config must stay aligned:
  - When updating one, update the other in the same change set.

---

V&T Statement\
Exists: Truth-status matrix for SentinelOS-related artifacts in this repo, module-level status summary, and governance rules for future features plus a requirement for config–doc synchronization.\
Non-existent: Actual config file and UI components at this moment; they are specified but not yet implemented.\
Unverified: Exact statuses of external PROACTIVE/HUI/Eval/Red Team/Trace implementations; only portfolio-facing view is captured here.\
Functional status: Document is ready to anchor a centralized truth-status config and UI surfacing work.

