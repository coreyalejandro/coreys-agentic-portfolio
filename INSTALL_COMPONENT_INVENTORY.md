# Component Inventory (Lite Install)

This repo already has a `components.json` for UI tooling, so the inventory uses a separate file name.

## Install (2 minutes)

1. Open `component-inventory.json` in the repo root.
2. Update `repo.name` and `lastUpdated`.
3. Add or edit entries in `components` as you go.

## Update Rules

- Add a component when it becomes real.
- Keep `dependencies` accurate (use component IDs).
- Update `lastUpdated` whenever you change the file.
- Set `standalone: true` only when the component is portable and has a co-located `README.md`.

## Optional Validation

Use any JSON Schema validator with `COMPONENTS.schema.json` if you want strict checks.

## Automation (Recommended)

- `pnpm component-inventory:check` validates schema, locations, and generated output.
- `pnpm component-inventory:build` regenerates `component-inventory/COMPONENTS.md`.
- `pnpm component-inventory:aggregate -- .` writes `component-inventory.index.json` and `component-inventory.graph.json`.
- `pnpm component-inventory:summary` prints a diff-style summary for CI comments.
