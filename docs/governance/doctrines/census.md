# THE CENSUS DOCTRINE (Inventory as Constitutional Law)
## Full Text | TLC Constitutional Doctrine

> **You cannot govern what you have not counted.**

Inventory is not a chore. It is a **check and balance** — the mechanism by which the Commonwealth knows what it has, what it doesn't, and where resources are being wasted.

## Why This Matters

Companies die from not knowing what they have. They rebuild what already exists. They pay for what they don't use. They lose track of dependencies, components, modules, and services — and then one day something breaks and nobody knows what depends on what. **This is a safety failure.**

## The Census Requirements

1. **Every repo has a component inventory.** Schema-validated (`COMPONENTS.schema.json`), machine-readable (`component-inventory.json`), human-readable (generated `COMPONENTS.md`). If a component exists and is not in the inventory, it does not officially exist.
2. **Every module has a truth-status declaration.** `config/sentinel/truthStatus.ts` and `docs/SentinelOS_TRUTH_STATUS.md` must stay in sync. Status must be one of: `implemented`, `partial`, `prototype`, `planned`. No ambiguity.
3. **Every project has a domain mapping.** `config/projects.ts` and `config/domains.ts` declare which safety domain each project serves. Unmapped projects are ungoverned projects.
4. **Counts are precise.** "About 20 components" is not a count. "23 components: 14 ui, 5 util, 4 context" is a count. Precision is the discipline.
5. **Inventory is continuous, not annual.** Updates on every significant change. `pnpm component-inventory:check` runs in CI. Drift is caught immediately.
6. **Dead inventory is removed, not hidden.** Dead inventory is false inventory. False inventory violates the Right to Truth (Article I).

## The Census Check (Enforcement)

| What | How | When |
|------|-----|------|
| Component inventory | `pnpm component-inventory:check --strict` | Every CI run, every significant PR |
| Truth-status sync | Config matches docs, docs match code | Every module status change |
| Domain mapping | Every project in `projects.ts` has a domain | Every new project added |
| Dead code audit | Unused exports, orphan files, stale deps | Quarterly (or after major refactor) |

## The Inventory-Innovation Cycle

COUNT what you have → KNOW what's redundant, missing, or broken → BUILD only what doesn't already exist → COUNT again → The Commonwealth is richer AND leaner.
