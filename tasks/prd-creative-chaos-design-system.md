# PRD: Creative Chaos Design System

## Introduction

Establish "Creative Chaos" (Maximalist Design) as Corey's signature, state-of-the-art design system and personal brand. This PRD defines the work to refine, document, and publish a comprehensive component library that is 100% modular, standalone, and plug-and-play. The design system will showcase polymath expertise across AI Engineering, Data Science, Machine Learning, Instructional Design, UI/UX, and Full-Stack Development.

## Goals

- Create a shareable, comprehensive inventory of all Creative Chaos design components
- Standardize each component as a standalone, reusable, documented module
- Refactor sections into standalone, composable page blocks
- Build signature motion components (General Zod mirror effect, Rabbit Hole POV transition)
- Create an interactive 3D timeline engine inspired by ChronoFlo, remixed with Creative Chaos aesthetics
- Define animation/motion design tokens (Three.js/Framer Motion)
- Eliminate unused or unwanted components
- Achieve 100% modular architecture across the entire portfolio

## User Stories

### US-001: Audit and document existing Creative Chaos components
**Description:** As a developer, I need a complete inventory of existing Creative Chaos components so I can identify what exists, what needs refinement, and what to eliminate.

**Acceptance Criteria:**
- [ ] List all components in `components/creative-chaos/` with current status
- [ ] List all components in `components/animations/` with current status
- [ ] Identify duplicate or overlapping components (e.g., BreathingBackground appears twice)
- [ ] Document each component's props, behavior, and dependencies
- [ ] Mark components as: keep (refine), eliminate, or merge
- [ ] Typecheck passes

### US-002: Standardize BreathingBackground component
**Description:** As a user, I want a consistent breathing background effect across all sections so the visual identity feels cohesive.

**Acceptance Criteria:**
- [ ] Consolidate duplicate BreathingBackground implementations into one canonical version
- [ ] Export from `components/creative-chaos/index.ts`
- [ ] Props: `colors`, `intensity`, `speed`, `className`
- [ ] Uses ColorThemeContext for dynamic palette
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-003: Standardize FloatingCard component
**Description:** As a user, I want floating cards that respond to mouse movement and create depth so content feels dynamic and alive.

**Acceptance Criteria:**
- [ ] Consolidate with FloatingElement if overlapping
- [ ] Props: `children`, `mouseInteraction`, `rotationIntensity`, `floatAmplitude`, `className`
- [ ] Performance-optimized (requestAnimationFrame, not setInterval)
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-004: Standardize FloatingParticles component
**Description:** As a user, I want ambient floating particles that add visual interest without distracting from content.

**Acceptance Criteria:**
- [ ] Props: `count`, `colors`, `speed`, `size`, `className`
- [ ] Respects reduced-motion preferences
- [ ] Performance-optimized for 60fps
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-005: Standardize OrganicTitle component
**Description:** As a user, I want headings that feel organic and alive with subtle animation.

**Acceptance Criteria:**
- [ ] Props: `children`, `as` (h1-h6), `animation`, `className`
- [ ] Multiple animation variants: wave, pulse, shimmer
- [ ] Accessible (respects reduced-motion)
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-006: Create GeneralZodMirror component
**Description:** As a user, I want a Superman II-inspired mirrored/prismatic visual effect component that can wrap any content for dramatic emphasis.

**Acceptance Criteria:**
- [ ] Creates mirrored/kaleidoscopic effect around content
- [ ] Props: `children`, `intensity`, `mirrorCount`, `animationSpeed`, `className`
- [ ] Uses CSS reflections, transforms, or WebGL for effect
- [ ] Smooth entry/exit animations
- [ ] Accessible (can be disabled)
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-007: Create RabbitHolePOV component
**Description:** As a user, I want a first-person POV "falling down the rabbit hole" transition effect for dramatic section changes.

**Acceptance Criteria:**
- [ ] Full-screen transition component
- [ ] Props: `trigger`, `duration`, `direction` (down/up), `onComplete`, `className`
- [ ] Creates tunnel/vortex visual effect (CSS transforms or Three.js)
- [ ] Can be triggered programmatically or on scroll
- [ ] Smooth 60fps animation
- [ ] Accessible (reduced-motion fallback: simple fade)
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-008: Create CreativeChaosTimeline component
**Description:** As a user, I want an interactive 3D timeline component (inspired by ChronoFlo) for showcasing career history, project timelines, or educational content.

**Acceptance Criteria:**
- [ ] First-person 3D perspective timeline navigation
- [ ] Props: `events[]`, `theme`, `enableSearch`, `enableZoom`, `className`
- [ ] Event interface: `{ id, date, title, description, media?, category? }`
- [ ] Zoom in/out functionality
- [ ] Search/filter events
- [ ] Category filtering with color coding
- [ ] Click event to expand details
- [ ] Creative Chaos styling: breathing colors, floating elements
- [ ] Keyboard navigation support
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-009: Define Creative Chaos motion tokens
**Description:** As a developer, I need standardized animation/motion tokens so all components share consistent timing, easing, and motion patterns.

**Acceptance Criteria:**
- [ ] Create `lib/motion-tokens.ts` with exported constants
- [ ] Define: `durations` (fast, normal, slow, dramatic)
- [ ] Define: `easings` (organic, bounce, smooth, dramatic)
- [ ] Define: `intensities` (subtle, normal, bold, chaotic)
- [ ] Define: `scales` (breathe, pulse, float amplitudes)
- [ ] Compatible with Framer Motion and CSS animations
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes

### US-010: Refactor HeroSection as standalone component
**Description:** As a developer, I want the HeroSection to be a fully standalone, reusable component that can be dropped into any page.

**Acceptance Criteria:**
- [ ] Move to `components/sections/HeroSection.tsx`
- [ ] Props: `title`, `subtitle`, `cta?`, `background?`, `className`
- [ ] No hardcoded content; all content via props or children
- [ ] Uses Creative Chaos motion tokens
- [ ] Export from `components/sections/index.ts`
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-011: Refactor CTASection as standalone component
**Description:** As a developer, I want the CTASection to be a fully standalone, reusable component.

**Acceptance Criteria:**
- [ ] Move to `components/sections/CTASection.tsx`
- [ ] Props: `heading`, `description`, `primaryAction`, `secondaryAction?`, `className`
- [ ] No hardcoded content
- [ ] Uses Creative Chaos motion tokens
- [ ] Export from `components/sections/index.ts`
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-012: Refactor PortfolioSection as standalone component
**Description:** As a developer, I want the PortfolioSection to be a fully standalone, reusable component.

**Acceptance Criteria:**
- [ ] Move to `components/sections/PortfolioSection.tsx`
- [ ] Props: `projects[]`, `layout?`, `className`
- [ ] Project interface: `{ id, title, description, image, tags, link }`
- [ ] No hardcoded projects; all via props
- [ ] Uses Creative Chaos motion tokens
- [ ] Export from `components/sections/index.ts`
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-013: Create shareable component inventory documentation
**Description:** As a user (or external developer), I want a shareable documentation page showcasing all Creative Chaos components with live examples.

**Acceptance Criteria:**
- [ ] Create `/design-system/creative-chaos` route
- [ ] List all Creative Chaos components with:
  - Live interactive preview
  - Props table
  - Usage code example
  - Design rationale
- [ ] Exportable as static page or PDF
- [ ] Navigation between components
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-014: Create component review gallery for elimination decisions
**Description:** As a developer, I need to quickly review all components in an isolated gallery view to decide keep/eliminate.

**Acceptance Criteria:**
- [ ] Create `/design-system/review` route with gallery/carousel view
- [ ] Display each component in isolation with dark background
- [ ] Show component name, file path, and current status
- [ ] "Keep" and "Eliminate" buttons for each component
- [ ] Persist decisions to local JSON file or localStorage
- [ ] Navigate between components with arrow keys or swipe
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-015: Eliminate unwanted components
**Description:** As a developer, I need to remove components marked for elimination to reduce maintenance burden.

**Acceptance Criteria:**
- [ ] Remove component files marked "eliminate" in review
- [ ] Remove from component-inventory.json
- [ ] Update any imports that referenced removed components
- [ ] No broken imports or build errors
- [ ] Typecheck passes
- [ ] `pnpm lint` passes

### US-016: Add component download functionality
**Description:** As a visitor, I want to download the source code for any Creative Chaos component so I can use it in my own projects.

**Acceptance Criteria:**
- [ ] "Download Code" button on each component in the design system
- [ ] Downloads component file(s) as .tsx with dependencies listed
- [ ] Includes minimal README with usage instructions
- [ ] Downloads as .zip if multiple files required
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-017: Add component playground for live editing
**Description:** As a visitor, I want to open any component in a playground where I can modify props and styles, then download my customized version.

**Acceptance Criteria:**
- [ ] "Open in Playground" button on each component
- [ ] Playground shows live component preview
- [ ] Editable props panel (sliders, color pickers, text inputs)
- [ ] Editable CSS/className overrides
- [ ] "Download My Version" exports customized component code
- [ ] Changes are client-side only (no server saves)
- [ ] Reset button to restore defaults
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

### US-018: Update component-inventory.json with Creative Chaos metadata
**Description:** As a developer, I need the component inventory to reflect the Creative Chaos taxonomy and standalone status.

**Acceptance Criteria:**
- [ ] All Creative Chaos components have `standalone: true`
- [ ] Add `designSystem: "creative-chaos"` field to relevant components
- [ ] Add `motionTokens` field listing used tokens
- [ ] Update descriptions to reflect finalized purpose
- [ ] Run `pnpm component-inventory:build`
- [ ] Typecheck passes

### US-019: Add audio/haptic motion token definitions
**Description:** As a developer, I need motion tokens to include audio and haptic feedback patterns for future multi-sensory experiences.

**Acceptance Criteria:**
- [ ] Add `audio` section to `lib/motion-tokens.ts`
- [ ] Define: `sounds` (click, whoosh, ambient, success, error)
- [ ] Define: `volumes` (subtle, normal, prominent)
- [ ] Add `haptic` section with patterns (tap, pulse, rumble)
- [ ] Include duration/timing sync with visual motion tokens
- [ ] Includes JSDoc documentation
- [ ] Typecheck passes

## Functional Requirements

- FR-1: All Creative Chaos components must be exported from a central index (`components/creative-chaos/index.ts`)
- FR-2: All section components must be exported from `components/sections/index.ts`
- FR-3: Motion tokens must be centralized in `lib/motion-tokens.ts`
- FR-4: Components must respect `prefers-reduced-motion` media query
- FR-5: Components must use `cn()` from `@/lib/utils` for className merging
- FR-6: Components must use ColorThemeContext for dynamic theming
- FR-7: All animations must target 60fps performance
- FR-8: GeneralZodMirror must use CSS/WebGL for kaleidoscopic reflection effect
- FR-9: RabbitHolePOV must provide tunnel/vortex first-person perspective
- FR-10: CreativeChaosTimeline must use Three.js for 3D perspective scrolling through time
- FR-11: GeneralZodMirror must use WebGL shaders for prismatic effect
- FR-12: Component download must include dependency list and usage README
- FR-13: Playground must support real-time prop editing with live preview
- FR-14: Motion tokens must include audio (sounds, volumes) and haptic (patterns) definitions

## Non-Goals

- No Three.js/WebGL requirement for basic components (only for timeline and advanced effects)
- No server-side data fetching within components (data via props only)
- No authentication or user-specific features
- No mobile-specific redesign (responsive, but desktop-first)
- No integration with external CMS at this stage

## Design Considerations

- **Visual Identity:** Maximalist, dynamic, alive—backgrounds breathe, elements float, transitions immerse
- **Signature Effects:** General Zod mirror (prismatic/kaleidoscopic), Rabbit Hole (first-person tunnel descent)
- **Color System:** Dynamic palettes via ColorThemeContext with breathing gradients
- **Typography:** Organic titles with subtle motion
- **Motion Philosophy:** Organic, not mechanical—use sine waves, perlin noise, spring physics
- **Accessibility:** All motion respects reduced-motion; keyboard navigation for interactive components

## Technical Considerations

- **Framework:** Next.js 14 App Router, React 19, TypeScript strict
- **Animation Libraries:** Framer Motion (primary), CSS animations, potential Three.js for 3D timeline
- **Performance:** requestAnimationFrame for JS animations, will-change for GPU acceleration
- **State:** React hooks and context; no external state management needed
- **Bundling:** Tree-shakeable exports; no barrel file side effects
- **Testing:** Manual smoke testing; visual regression via screenshots

## Success Metrics

- 100% of Creative Chaos components are standalone (no page-specific dependencies)
- Component inventory fully documents all Creative Chaos components with previews
- Design system page is publicly shareable
- All components pass typecheck and lint
- Animations maintain 60fps on mid-range hardware
- Reduced-motion users get accessible fallbacks

## Design Decisions (Resolved)

- **3D Timeline:** Use Three.js for immersive first-person 3D experience
- **GeneralZodMirror:** Use WebGL shaders for prismatic/kaleidoscopic effect
- **Priority Order:** Eliminate unwanted components FIRST, then build new ones
- **Component Review Process:** Display each component in isolated browser preview (gallery/carousel) for quick keep/eliminate decisions
- **Motion Tokens:** Include audio and haptic feedback patterns for future expansion
- **Component Inventory:** Both live route AND static export; users can download component code or open in playground to manipulate and export their edited version (no server-side saves)

## Open Questions

- None at this time
