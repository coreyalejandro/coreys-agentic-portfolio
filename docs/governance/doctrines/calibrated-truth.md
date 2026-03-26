# THE CALIBRATED TRUTH DOCTRINE
## Full Text | TLC Constitutional Doctrine

> **Calibrated truth**: The assurance level of a claim matches the method used to verify it.

This Commonwealth aspires to **Lean 4-level formal proof** — but it gets there through a ladder, not a leap.

## The Assurance Ladder

### Tier 3: Formal Proof (Aspiration)
Constitutional invariants expressed in Lean 4. Machine-checked proofs that contracts satisfy Articles I–V. "This is safe" is a theorem, not a claim.
- Tools: Lean 4, Coq, Isabelle/HOL
- Who: Proof engineers + tool support

### Tier 2: Machine-Checkable (Next)
V&T claims verified by code automatically. "Build passes" → run build, check exit code. "File exists" → stat the file.
- Tools: JSON Schema, OPA/Rego, Z3, CI/CD hooks
- Who: Automated — runs on every commit/turn

### Tier 1: Convention (Current)
Truth enforced by discipline. V&T Statements written by the agent. Truth-status maintained by humans. Review is manual.
- Tools: V&T Statement, truth-status config, code review
- Who: Claude + Corey (human-in-the-loop)

## The Invariant

**Each tier is idempotent with the tier below it.** Tier 3 does not replace Tier 1 — it proves that Tier 1 was already correct. Same truth. Higher assurance. `f(f(x)) = f(x)`.

## Current Tier Status

| Component | Current Tier | Next Tier Target |
|-----------|-------------|-----------------|
| V&T Statements | Tier 1 (convention) | Tier 2 (auto-verify claims) |
| Truth-Status Config | Tier 1 (manual) | Tier 2 (CI validates status matches code) |
| Build Contracts (BuildLattice) | Tier 1 (schema only) | Tier 2 (OPA + Z3 validation) |
| Constitutional Invariants | Tier 1 (human review) | Tier 3 (Lean 4 proof — long-term) |
| Agent Separation of Powers | Tier 1 (CLAUDE.md rules) | Tier 2 (hook enforcement) |

## Rules

1. **Always declare the current tier.** Never claim Tier 3 assurance when operating at Tier 1.
2. **Tier upgrades require evidence.** No shortcuts.
3. **Lower tiers are not inferior.** Tier 1 is honest, not lesser.
4. **The goal is calibration, not perfection.** Match assurance to risk.

## Operational Extension

The Calibrated Truth Doctrine defines WHAT truth assurance means. **Article VIII (Truth Maintenance Law)** extends this by defining how truth is maintained over time. The Doctrine is the standard. Article VIII is the enforcement.
