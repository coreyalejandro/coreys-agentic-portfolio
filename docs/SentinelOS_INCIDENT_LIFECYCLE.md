# SentinelOS Incident Lifecycle

> This document operationalizes the incident lifecycle defined in `ai-safety-identity-strategy.md` and maps it onto surfaces in this portfolio.

## 1. Scenario Overview

SentinelOS presents a **single demonstrable incident lifecycle**:

1. An AI system generates a confident claim about system functionality.
2. PROACTIVE Gov checks the claim against available evidence.
3. Eval Workbench evaluates behavioral correctness.
4. HUI Guard assesses human impact and intervenes if needed.
5. Trace Console records all steps and evidence.

This repository provides **visual and narrative walkthroughs** of that pipeline, plus links to real or prototype artifacts.

## 2. Example Incident

### Step 1 — Claim Emitted

- **Actor:** Model / Agent
- **Event:** `"This deployment includes full server-side rate limiting, already integrated with Redis."`
- **Risk:** Phantom implementation claim (safety failure for governance and reliability).

### Step 2 — PROACTIVE Gov Check

- **Module:** PROACTIVE Gov (external GitLab repo `28441830`).
- **Function:** Verify whether:
  - Redis is configured.
  - Server-side rate limiting is present in middleware or API layers.
  - Tests or logs exist that support the claim.
- **Outcome (example):**
  - Evidence check fails — no Redis deployment or server-side rate limiting found.
  - Governance rule triggers a **block** on the claim.

### Step 3 — Eval Workbench Assessment

- **Module:** Eval Workbench (prototype).
- **Function:** Evaluate behavioral correctness against a rubric:
  - Are dangerous requests throttled?
  - Are repeated abusive calls slowed or blocked?
  - Are relevant alerts produced?
- **Outcome (example):**
  - Evaluation score: **0.3 / 1.0** for “rate limiting robustness”.
  - Flags: “Client-only rate limiting” and “No server-side enforcement”.

### Step 4 — HUI Guard Intervention

- **Module:** HUI Guard (external, in progress).
- **Function:** Assess human impact and intervene:
  - User is a non-expert relying on the claim for security posture.
  - Misleading claim could cause **overconfidence in deployment safety**.
- **Outcome (example):**
  - HUI intervenes:
    - Overrides UI copy.
    - Surfaces a warning banner: “Server-side rate limiting is not currently implemented; Redis integration is planned, not active.”
    - May prompt user to review deployment checklist.

### Step 5 — Trace Console Recording

- **Module:** Trace Console (basic implementation).
- **Function:** Record:
  - The original claim.
  - PROACTIVE governance rule and result.
  - Eval Workbench rubric and score.
  - HUI intervention event.
- **Outcome (example):**
  - A trace entry containing:
    - Timestamped steps.
    - Module decisions.
    - Evidence references (e.g., config state, code locations, test outputs).

## 3. Evidence Artifacts

For each incident, SentinelOS surfaces:

- **Governance rule triggered**
  - PROACTIVE policy or rule spec.
- **Evaluation score**
  - Rubric + numeric/label outcome.
- **Intervention event**
  - HUI Guard action taken on behalf of the human.
- **Trace log**
  - Ordered record of all steps and evidence.

### Repository Placement (this repo)

Planned evidence artifact locations:

- `docs/evidence/` — Markdown or JSON snapshots of:
  - Governance rules (PROACTIVE).
  - Evaluation rubrics.
  - Intervention descriptions.
  - Example traces.
- `app/sentinel/incident-simulation/page.tsx` (or similar) — Interactive or narrated walkthrough that links to the artifacts above.

Status labels for these artifacts are maintained in `SentinelOS_TRUTH_STATUS.md` and in the centralized truth-status config used by the UI.

## 4. Portfolio Experience Mapping

Within this repository:

- **Incident Simulation Page**
  - Shows the five-step pipeline (Claim → PROACTIVE → Eval → HUI → Trace).
  - Links to or previews the four evidence artifact types.
  - Uses clear labels for each SentinelOS module.
- **Home / Overview**
  - Presents a condensed incident lifecycle summary as part of the primary SentinelOS overview.
- **Trace Visualizations (future)**
  - May use timelines or node-link diagrams to visualize trace flows.

## 5. Truth-Status Integration

Every incident-related element in this repo should expose:

- **Status**: implemented / prototype / partial / planned.
- **Module mapping**: which SentinelOS module(s) it belongs to.
- **Evidence role**: governance rule, evaluation, intervention, or trace.

These values are:

- Tracked in `SentinelOS_TRUTH_STATUS.md`.
- Exposed via a shared config file used by UI components.

---

V&T Statement\
Exists: Incident lifecycle narrative aligned to `ai-safety-identity-strategy.md`, example claim and end-to-end walkthrough, evidence artifact types, and portfolio mapping for incident simulation within this repo.\
Non-existent: Concrete evidence files, live scoring pipelines, and production HUI interventions within this repository at this time.\
Unverified: Exact integration state with external PROACTIVE/HUI/Eval/Red Team/Trace implementations until wired to real services.\
Functional status: Document is ready to guide creation of incident simulation UX and evidence artifacts in this repository.

