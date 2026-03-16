# 🚀 Agent Handoff: coreys-agentic-portfolio

> **🚨 CRITICAL PROTOCOL: HANDOFF UPDATE IS NON-NEGOTIABLE**
>
> **Every agent working in this repository MUST update HANDOFF.md after every turn/session, regardless of:**
>
> - How they access the codebase (CLI, terminal, IDE, API, etc.)
> - What type of work they're doing (code changes, documentation, configuration, etc.)
> - Whether the changes are "major" or "minor"
>
> **This is a mandatory requirement, not a suggestion.** The HANDOFF.md file is the single source of truth for project continuity across all agents and sessions.
>
> **📖 See `HANDOFF_PROTOCOL.md` for complete protocol details.**

**Date:** March 16, 2026
**Status:** Active Development - SentinelOS Identity Strategy Integration In Progress

## 📋 What Was Just Completed

- **Portfolio README Rewrite:**
  - Replaced the generic v0/v0.app README with a portfolio-focused `README.md` describing Corey’s Agentic Portfolio, prompt architecture, AI safety, instructional design, and neurodivergent-first focus.
  - Added a **Featured Projects** section highlighting Zero-Shot Prompt Composer, Constitutional GitLab Agent, Zero-Shot OS (UPOS7VS Core), MADMall, HUI, and Clarity AI.
  - Ensured README now clearly positions the repo as the primary portfolio/product lab rather than an AWS Agentic AI scaffold.
- **Handoff Continuity:**
  - Updated `HANDOFF.md` date and status to reflect the README change and keep continuity protocol in effect.

## 🎯 Current Project State

### What's Working

- **Navigation:** Floating nav fully functional with:
  - Left side: Documentation, Resume, Superpowers, Projects
  - Right side: Templates, Components, Playground, Design System
  - Hover feedback remains visible and consistent
  - All Tailwind classes use canonical format (no warnings)
- **Theme system:** Theme variables are defined in `app/globals.css` and updated by `contexts/ColorThemeContext.tsx` with compat aliases for reliability.
- **Homepage sections:** Superpowers heading renders (no longer transparent).
- **Resume section:** Background matches other sections; printable resume remains readable.
- **Repository:** New remote `coreys-agentic-portfolio` is set up and synced.

### Project Structure

- `app/playground/`: Main logic.

## 🎯 Recommended Next Steps

1. Finish SentinelOS UX integration:
   - Refine homepage and SentinelOS pages to keep navigation and semantics accessible.
   - Add any missing module/incident visual polish once core flows feel stable.
2. Expand evidence artifacts:
   - Populate `docs/evidence/` with example governance rules, evaluation rubrics, intervention logs, and traces.
   - Link them from SentinelOS docs and UI.
3. Perform a content and UX audit to ensure terminology and messaging match the SentinelOS strategy across README, docs, and the visible site.
4. Keep HANDOFF protocol in effect for all subsequent changes.

## 📊 Remaining Enhancements to Implement

- [x] Add Card Path components
- [x] Fix Framer Motion bug
- [x] Enhance 3D effect
- [x] Test "Table Card" perspective
- [x] Test "Scroll Trigger" perspective
- [x] Build Central Playground
- [x] Add Playground to Main Navigation
- [x] Auto-hide Playground Header
- [ ] Integrate Card Path into main portfolio flow
- [ ] Integrate Card Path into main portfolio flow
- [ ] Complete SentinelOS identity source-of-truth integration (final UX polish, evidence artifacts)

## 📝 Important Context

### 🚨 HANDOFF Protocol (MANDATORY)

**Every agent MUST update HANDOFF.md after every turn/session. This includes:**

- Code changes (any file, any size)
- Configuration changes
- Documentation updates
- Repository setup changes
- Bug fixes
- Feature additions
- Any work that modifies the project state

**Update Requirements:**

1. Update "What Was Just Completed" section with all work done
2. Update "Current Project State" if anything changed
3. Update "Quick Reference" (date, last commit, status)
4. Update any other relevant sections (Known Issues, Next Steps, etc.)
5. Commit the HANDOFF.md update along with your changes

**This protocol applies regardless of:**

- Agent type (CLI, terminal, IDE, API-based)
- Work method (direct edits, scripts, automation)
- Change scope (major or minor)

**No exceptions. This is non-negotiable.**

### SentinelOS Identity Strategy

- Canonical identity, architecture, and messaging are defined in `ai-safety-identity-strategy.md`.
- SentinelOS is positioned as an **AI Safety Operating Layer** composed of:
  - **PROACTIVE Gov** — constitutional governance and claim verification
  - **HUI Guard** — human-centered AI intervention and harm reduction
  - **Eval Workbench** — AI behavior testing and scoring
  - **Red Team Lab** — adversarial testing and failure classification
  - **Trace Console** — evidence chain and decision traceability
- Any material changes to platform identity, module list, or incident lifecycle should be made in `ai-safety-identity-strategy.md` first, then propagated into README, docs, and UI.
- Alignment guardrails and review criteria are captured in `docs/SentinelOS_ALIGNMENT_CHECKLIST.md` and should be used for future changes that touch SentinelOS.

### User Profile

- Neurotype: Autistic, bipolar, OCD
- Preferences: Single short questions, complete code blocks, step-by-step instructions, no clutter.

### Design Principles

- Prioritize clarity and reduced cognitive load (avoid clutter, keep screens simple).
- Prefer polished, modern UI with accessible interactions (keyboard + focus states).

### Testing Standards

- Manual smoke test key routes after changes (`/`, `/playground`, `/contact`).
- Run `pnpm lint` before shipping (when possible).

### Git Workflow

- Branch: main
- Remote: `git@github.com:coreyalejandro/coreys-agentic-portfolio.git` (remote name: `coreys-agentic-portfolio`)
- Repository: `coreyalejandro/coreys-agentic-portfolio`

## 🔧 Available Commands

- `pnpm dev`
- `pnpm build`
- `pnpm start`
- `pnpm lint`
- `pnpm handoff:check`

## 📚 Key Files to Review

- `HANDOFF.md` - **Current project state and handoff information**
- `HANDOFF_PROTOCOL.md` - **🚨 MANDATORY protocol for all agents**
- `openmemory.md` - Project memory and context
- `docs/ARCHITECTURE.md`
- `docs/HANDBOOK.md`
- `app/layout.tsx`
- `middleware.ts`

## ⚠️ Known Issues / Considerations

- None currently known.

## 📞 Quick Reference

- **Project:** coreys-agentic-portfolio
- **Repository:** coreyalejandro/coreys-agentic-portfolio
- **Remote:** `git@github.com:coreyalejandro/coreys-agentic-portfolio.git`
- **Branch:** main
- **Last Commit:** 7bbf4989cd4a3e7ad9c35593900266387bbbf48b - "chore: update package manager version and adjust layout styles in HeroSection and LandingTemplate for improved responsiveness"

---

**Status:** Active Development
**Recommendation:** Perform a smoke test of all animated sections to verify smoothness.
**Confidence:** High - requestAnimationFrame pattern applied globally to all active animation controllers.
