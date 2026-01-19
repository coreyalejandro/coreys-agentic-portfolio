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
