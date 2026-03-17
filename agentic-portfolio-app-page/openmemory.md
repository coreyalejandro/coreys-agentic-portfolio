# OpenMemory Guide: agentic-portfolio-app-page (Workspace Pointer)

This workspace directory is a lightweight scratch area. The runnable Next.js app that was launched in this session lives at:

- `/Users/coreyalejandro/dev/anthropic-ai-safety-fellows-application-prompt/app-ui`

## Launch (local dev)

```bash
cd "/Users/coreyalejandro/dev/anthropic-ai-safety-fellows-application-prompt/app-ui"
npm run dev
```

- Local URL: `http://localhost:3000`

## Notes

- Next.js may warn about an inferred Turbopack workspace root because a repo-level `pnpm-lock.yaml` exists at `/Users/coreyalejandro/pnpm-lock.yaml` while this app uses `package-lock.json`. If it becomes noisy, set `turbopack.root` in `app-ui/next.config.ts` to the `app-ui` directory (or remove unused lockfiles).