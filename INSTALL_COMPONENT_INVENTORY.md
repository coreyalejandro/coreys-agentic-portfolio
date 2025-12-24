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

## Optional Validation

Use any JSON Schema validator with `COMPONENTS.schema.json` if you want strict checks.
