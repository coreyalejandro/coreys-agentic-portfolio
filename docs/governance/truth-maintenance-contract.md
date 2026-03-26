# ARTICLE VIII — Truth Maintenance Law (How Truth Survives Over Time)
## TLC Governance Document
## Authority: Equal to Articles I–V in CLAUDE.md
## Load Trigger: Read before managing truth claims, status files, documentation, or publishing

> The Calibrated Truth Doctrine defines WHAT truth assurance means. Article I, §5 declares the Right to Truth. This Article governs HOW truth is maintained, revalidated, and prevented from decaying after launch.

Truth is not self-maintaining. Truth must be actively governed. Any claim without status, evidence, ownership, and a revalidation rule is non-canonical.

---

## 1. Canonical Truth States

| State | Definition |
|---|---|
| **Verified** | Directly supported by admissible evidence and passed required checks |
| **Observed** | Directly present in evidence but not fully adjudicated for broader claim use |
| **Inferred** | Reasonable interpretation derived from evidence, not directly observed |
| **Unverified** | Claim exists but lacks sufficient support |
| **Disputed** | Meaningfully challenged by conflicting evidence or review |
| **Stale** | Previously acceptable claim that has exceeded freshness window or has unresolved dependency change |
| **Superseded** | Replaced by a more recent validated claim or version |
| **Retracted** | Determined false, invalid, or no longer admissible |

---

## 2. Required Fields for Every Canonical Claim

Every truth-bearing claim in the Commonwealth must carry:

- `claim_id`
- `claim_text`
- `truth_state`
- `evidence_refs`
- `owner`
- `created_at`
- `updated_at`
- `source_version`
- `dependency_refs`
- `freshness_window`
- `next_review_at`
- `revalidation_trigger_set`
- `audit_history_ref`

If any required field is missing, the claim is non-compliant.

---

## 3. Ownership Rules

Every truth-bearing artifact must have a named owner.

**Ownership classes:** evidence owner, schema owner, evaluation owner, constitutional owner, documentation owner, public-claim owner.

**Owner responsibilities:**
- Review triggered changes
- Approve or reject state transitions
- Maintain freshness
- Resolve disputes or escalate
- Ensure revalidation occurred when required

**Unowned truth decays by default and must be treated as at risk.**

---

## 4. Update Triggers

Truth maintenance must be triggered by at least the following events:

| Trigger | Fires When |
|---|---|
| **T1. New Evidence** | New artifact arrives that supports, weakens, or contradicts an existing claim |
| **T2. Dependency Change** | A referenced parser, schema, ontology, evaluator, policy, or constitutional clause changes |
| **T3. Source Mutation** | Original source artifact is corrected, replaced, removed, or newly authenticated |
| **T4. Failed Evaluation** | A regression, benchmark failure, or invariant violation undermines an existing claim |
| **T5. Amendment** | A constitutional or governance rule changes, affecting admissibility or interpretation |
| **T6. Freshness** | The review deadline for a claim or artifact is reached |
| **T7. Dispute** | A reviewer challenges classification, interpretation, or sufficiency |
| **T8. Publication** | A claim is about to be surfaced externally and must be rechecked for current validity |

---

## 5. Revalidation Policies

Revalidation must occur when a trigger fires.

**Revalidation types:** evidence-only recheck, schema revalidation, provenance revalidation, eval rerun, constitutional compliance review, full claim adjudication.

**Mandatory rule:** If a dependency changed and downstream claims were derived from it, those claims must be marked at least `stale` until revalidated. No unchanged label may imply unchanged truth.

---

## 6. Audit Cadence

| Claim Type | Minimum Cadence |
|---|---|
| **Operational claims** | Weekly or on trigger, whichever comes first |
| **Research claims** | Before publication/export and monthly while active |
| **Constitutional claims** | At every amendment cycle and quarterly minimum |
| **Public-facing claims** | Before each publication event and on any dependency change |
| **Archived claims** | No routine review unless reactivated or cited again |

Cadence may be tighter by subsystem but never looser than these minima.

---

## 7. Drift Alarms

A drift alarm must fire when any of the following occurs:
- Claim exceeds freshness window
- Dependency version changed without revalidation
- Evidence reference becomes unavailable
- Truth state conflicts with linked artifact state
- Public-facing copy omits or contradicts truth status
- Disputed claim remains unresolved beyond allowed review window
- Stale claim is used in generated output

All drift alarms must be visible to owners, logged, and remain open until disposition.

---

## 8. State Transition Rules

**Allowed transitions:**
- `unverified` → `observed`
- `observed` → `verified`
- `observed` → `inferred`
- `inferred` → `verified`
- `verified` → `disputed`
- `verified` → `stale`
- `stale` → `verified`
- `stale` → `superseded`
- any → `retracted`

**Forbidden transitions:**
- `unverified` → `verified` without adjudication record
- `disputed` → `verified` without dispute resolution
- `stale` → `verified` without revalidation evidence
- `retracted` → `verified` without explicit restoration process

---

## 9. Correction Procedures

When a truth error is discovered:
1. Freeze affected claim set if needed
2. Identify all downstream artifacts
3. Relabel affected claims
4. Notify relevant owners
5. Rerun required validations
6. Issue correction record
7. Update public-facing outputs if impacted
8. Close only with final disposition

**No correction may erase the existence of prior error state.**

---

## 10. Publication Rule

No externally surfaced TLC claim may be published unless:
- `truth_state` is visible internally
- Freshness window is valid
- Owner is assigned
- Dependencies are current
- Unresolved drift alarms are absent or explicitly disclosed

External copy must preserve uncertainty language where appropriate.

---

## 11. Truth Ledger

TLC must maintain a truth ledger containing: current canonical state, prior states, transition reasons, actor/process causing change, evidence basis, and linked audit entries.

**The ledger is append-only for state history.**

---

## 12. Truth Maintenance Release Gate

No truth-bearing subsystem may ship unless it defines:
- Truth states
- Owners
- Update triggers
- Freshness windows
- Audit cadence
- Revalidation logic
- Drift alarm conditions
- Correction procedure
