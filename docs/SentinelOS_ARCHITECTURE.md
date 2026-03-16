# SentinelOS Architecture

> Canonical identity, architecture, and messaging are defined in `ai-safety-identity-strategy.md`. This document mirrors that strategy for this repository and links it to the existing Creative Chaos architecture.

## 1. Platform Overview

SentinelOS is an **AI Safety Operating Layer**: a modular infrastructure layer for governing AI systems, verifying claims, protecting humans in the loop, and producing evidence-backed decision traces.

### AI Safety Suite Modules

| Module            | Function                                          | Status (portfolio context)      |
| ----------------- | ------------------------------------------------- | --------------------------------|
| **PROACTIVE Gov** | Constitutional governance and claim verification  | Implemented (GitLab repo 28441830, external) |
| **HUI Guard**     | Human-centered AI intervention and harm reduction | Real build in progress (GitLab, external) |
| **Eval Workbench**| AI behavior testing and scoring                   | Prototype (concept + docs)      |
| **Red Team Lab**  | Adversarial testing and failure classification    | Prototype (concept + docs)      |
| **Trace Console** | Evidence chain and decision traceability          | Basic implementation (logging + portfolio surfacing) |

This repository (`coreys-agentic-portfolio`) acts as the **SentinelOS inspection console and narrative surface** for these modules.

## 2. System Map

### Module Flow (from strategy)

```text
User Interaction
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
   Trace Console
```

### Module Roles

- **HUI Guard**: Detects destabilizing or harmful outputs affecting the human user and intervenes when necessary.
- **PROACTIVE Gov**: Verifies system claims, checks constitutional rules, and blocks unsupported assertions.
- **Eval Workbench**: Scores AI behavior against evaluation rubrics.
- **Red Team Lab**: Simulates adversarial scenarios and identifies failure patterns.
- **Trace Console**: Records evidence trails for every decision and intervention.

## 3. Relationship to This Repository

This repository provides:

- **Portfolio UX** that frames SentinelOS as the primary AI safety platform.
- **Inspection surfaces** for:
  - The SentinelOS architecture diagram.
  - The end-to-end incident lifecycle.
  - Truth-status matrices for modules and artifacts.
- **Links** into external implementation repos:
  - PROACTIVE Gov (GitLab repo id `28441830`).
  - HUI Guard (second GitLab hackathon entry).
  - Future repos for Eval Workbench, Red Team Lab, Trace Console.

### Mapping Existing Systems to SentinelOS

- **Creative Chaos visual + audio system**
  - Becomes the **SentinelOS Inspection Console UI**.
  - Audio experience can be used to narrate SentinelOS architecture, incidents, and evidence states.
- **Security & middleware stack**
  - Supports the **Trace Console** by enforcing headers, rate limits, and logging instrumentation (future).
- **Project data / demos**
  - Provide example artifacts connected to SentinelOS modules (e.g., governance examples for PROACTIVE, UX flows for HUI).

## 4. High-Level Architecture Diagram

```text
                      ┌───────────────────────────────┐
                      │  SentinelOS Inspection Console│
                      │  (this repo / portfolio)      │
                      └──────────────┬────────────────┘
                                     │
      ┌───────────────────────────────┴───────────────────────────────┐
      │                                                               │
┌─────▼─────┐   ┌────────────────┐   ┌───────────────┐   ┌───────────▼──────────┐
│User       │   │HUI Guard       │   │PROACTIVE Gov  │   │Eval Workbench        │
│Interaction│──▶│(external repo) │──▶│(GitLab 28441830)│ │(future repo/prototype)│
└───────────┘   └────────────────┘   └───────────────┘   └───────────▲──────────┘
                                                                   │
                                                        ┌──────────▼─────────┐
                                                        │Red Team Lab        │
                                                        │(future repo)       │
                                                        └──────────▲─────────┘
                                                                   │
                                                        ┌──────────▼─────────┐
                                                        │Trace Console       │
                                                        │(logs + evidence)   │
                                                        └────────────────────┘
```

## 5. Failure Modes & Mitigations (Summary)

See `ai-safety-identity-strategy.md` for the full table; in brief:

| Module         | Failure Mode                               | Mitigation                        |
| -------------- | ------------------------------------------ | --------------------------------- |
| PROACTIVE      | Phantom implementation claims              | Claim verification and governance |
| HUI            | Harmful or destabilizing human interaction | Intervention logic                |
| Eval Workbench | Undetected behavioral regressions          | Scoring and evaluation            |
| Red Team Lab   | Adversarial exploitation                   | Simulated attacks                 |
| Trace Console  | Lack of auditability                       | Evidence trace logging            |

## 6. Repository Responsibilities

Within SentinelOS, this repo is responsible for:

- **Explaining** the architecture (this file).
- **Demonstrating** the end-to-end incident lifecycle (see `SentinelOS_INCIDENT_LIFECYCLE.md`).
- **Labeling truth-status** of modules and artifacts (see `SentinelOS_TRUTH_STATUS.md`).
- **Presenting the safety case** for the platform (see `SentinelOS_SAFETY_CASE.md`).

External repos remain the source of truth for **implementation details** of PROACTIVE, HUI, and future modules.

---

V&T Statement\
Exists: SentinelOS architecture description, module list and roles, system map, repository-to-platform mapping, and failure mode summary aligned with `ai-safety-identity-strategy.md` for this portfolio.\
Non-existent: Direct inspection of external GitLab/GitHub repos or runtime verification of module implementations.\
Unverified: Exact deployment topology and logging/trace integrations until further implementation work.\
Functional status: Document is ready to serve as the local architecture explainer for SentinelOS within this repository.

