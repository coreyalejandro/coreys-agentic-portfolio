# AGENTS.md

## Commands
- `pnpm dev` - Start dev server
- `pnpm build` - Production build (also typechecks)
- `pnpm lint` - Run ESLint + docs check
- No test framework configured

## Architecture
- **Next.js 14** App Router with React 19, TypeScript strict mode
- **app/**: Pages and routes (route groups like `(home)/`, API routes in `api/`)
- **components/ui/**: shadcn/ui components (Radix primitives + Tailwind)
- **components/**: Feature components (animations, audio-experience, card-path)
- **lib/**: Utilities (`cn()` for class merging, rate-limiter, sanitize)
- **hooks/**, **contexts/**: Custom React hooks and context providers

## Code Style
- Use `@/*` path aliases for imports
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Prefer functional components with TypeScript interfaces
- UI components use class-variance-authority (cva) for variants
- Follow existing Radix/shadcn patterns in components/ui/

## Cursor Rules
See `.cursor/rules/` for UPOS-7-VS prompt engineering framework (always applied).

## Cursor Cloud specific instructions

- **Runtime**: Node.js v22+ with pnpm 10.32.1 (via corepack). The update script runs `pnpm install` automatically.
- **ESLint**: The repo ships without a committed `.eslintrc.json`. The dev-environment setup creates `.eslintrc.json` with `{ "extends": "next/core-web-vitals" }` and installs `eslint`/`eslint-config-next` as devDependencies. If `pnpm lint` prompts interactively, ensure `.eslintrc.json` exists.
- **Lint pre-existing issues**: `pnpm lint` reports `react/no-unescaped-entities` errors in several files (e.g., `CTASection.tsx`, `contact/page.tsx`, `documentation/` pages). These are pre-existing and not caused by agent changes.
- **Dev server**: `pnpm dev` starts on port 3000. No external services (databases, Redis, Docker) are required — the app is fully self-contained for local development.
- **No test framework**: There are no automated tests configured. Verification is done via `pnpm build` (typechecks) and `pnpm lint`.
- **Playground AI chat**: The `/playground` chat feature requires an `OPENAI_API_KEY` (or equivalent LLM provider key) to function. All other pages work without it.
