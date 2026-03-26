# GOVERNANCE RELEASE GATES (SOP-014)
## TLC Governance Document
## Authority: Equal to Articles I–V in CLAUDE.md
## Load Trigger: Read before any release decision

> Every feature, workflow, and subsystem must pass all four gates before shipping. If any gate fails, release status is **BLOCK**.

---

## Gate 1: Audience Gate (Article VI)

- [ ] Audience class declared
- [ ] Permissions declared
- [ ] Goals declared
- [ ] Surface binding declared
- [ ] Copy mode declared
- [ ] Accessibility compliance reviewed

---

## Gate 2: Failure Gate (Article VII)

- [ ] Failure classes declared
- [ ] Severity mapping declared
- [ ] Rollback path declared
- [ ] Recovery path declared
- [ ] Escalation owner declared
- [ ] Error copy exists

---

## Gate 3: Truth Gate (Article VIII)

- [ ] Truth state model declared
- [ ] Owner assigned
- [ ] Triggers defined
- [ ] Revalidation policy defined
- [ ] Audit cadence defined
- [ ] Drift alarms defined

---

## Gate 4: Constitutional Gate (Articles I–V)

- [ ] Amendment impact assessed (Article V)
- [ ] Evidence traceability preserved (Article I, §5)
- [ ] No silent state mutation (Article VII)
- [ ] No false certainty introduced (Calibrated Truth Doctrine)

---

## Enforcement

If any gate fails, release status = **BLOCK**.

The blocking gate must be named in the V&T Statement.

No override without Constitutional Operator approval and documented rationale.

---

## Gate Completion Record

When all gates pass, record:

```
Release Gate Record
Date:
Feature/Subsystem:
Gate 1 (Audience): PASS / BLOCK
Gate 2 (Failure): PASS / BLOCK
Gate 3 (Truth): PASS / BLOCK
Gate 4 (Constitutional): PASS / BLOCK
Overall: RELEASE / BLOCK
Reviewer:
Notes:
```
