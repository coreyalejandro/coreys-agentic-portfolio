# SentinelOS Alignment Checklist (For Future Changes)

> Use this checklist when adding features, refactoring, or updating content in this repository. It keeps the portfolio aligned with `ai-safety-identity-strategy.md`.

## 1. Mapping to SentinelOS

- [ ] Does this change clearly map to at least one SentinelOS module (PROACTIVE Gov, HUI Guard, Eval Workbench, Red Team Lab, Trace Console, or Platform/Console)?
- [ ] Is that mapping mentioned in code comments (only where intent is non-obvious), docs, or UI copy where helpful?

## 2. Failure Mode & Mitigation

- [ ] Which safety failure mode(s) does this work touch (phantom claims, harmful interaction, regressions, adversarial exploitation, lack of auditability)?
- [ ] Is the mitigation behavior or control clearly described (in docs or UX), not just implied?

## 3. Truth-Status

- [ ] Is the status of this feature (`implemented`, `prototype`, `partial`, `planned`) explicit?
- [ ] Has `docs/SentinelOS_TRUTH_STATUS.md` been updated if needed?
- [ ] Has `config/sentinel/truthStatus.ts` been updated if the change affects core modules or artifacts?

## 4. Evidence & Inspectability

- [ ] Are there evidence artifacts (or placeholders) that show how this feature behaves (logs, rubrics, governance rules, traces, screenshots)?
- [ ] If artifacts exist, are they referenced from the relevant SentinelOS docs and/or UI surfaces?
- [ ] Can a reviewer reach them in ≤ 2 clicks from the SentinelOS overview or incident simulation?

## 5. UX & Messaging

- [ ] Does UI copy stay consistent with SentinelOS terminology (module names, incident lifecycle language)?
- [ ] Does the change preserve the portfolio’s role as an **inspection console**, not a generic gallery?

## 6. Handoff & Docs

- [ ] Has `HANDOFF.md` been updated to mention relevant SentinelOS work (if substantial)?
- [ ] Are any relevant docs (`docs/SentinelOS_*.md`) updated or at least checked for consistency?

---

V&T Statement\
Exists: A concrete checklist for future changes to maintain alignment with `ai-safety-identity-strategy.md`, covering module mapping, failure modes, truth-status, evidence, UX, and handoff/docs.\
Non-existent: Automation enforcing this checklist; it is a manual guide.\
Unverified: Adherence to this checklist on future contributions.\
Functional status: Ready to be used immediately as part of the HANDOFF protocol.

