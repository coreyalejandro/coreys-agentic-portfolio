# Hero Experience (The Corey Alejandro Experience) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace TheCoreyAlejandroExperience with an exact duplicate of the hero template, changing only the title words and swapping the description card for an accomplishment card.

**Architecture:** Straight copy of `app/templates/hero/page.tsx` into the `TheCoreyAlejandroExperience` export. Same background gradients, same particles, same sections, same positioning. No new components, no new abstractions. The only differences: (1) title words change (Neural→Corey, Depth→Alejandro, Magic→Experience), (2) the floating description card becomes a cycling accomplishment card using the same card shell styling.

**Tech Stack:** Next.js 14, React, Tailwind CSS, lucide-react (Sparkles icon)

**UNBREAKABLE RULE — DESIGN SYSTEM INTEGRITY:**
- The hero template (`app/templates/hero/page.tsx`) IS the design system for this component.
- Every className, every inline style, every gradient value, every text size, every spacing value, every border radius, every opacity — copied exactly.
- If a value doesn't exist in the hero template, it doesn't get introduced.
- If a value exists in the hero template, it doesn't get changed.
- The ONLY permitted differences are the three word swaps (Neural→Corey, Depth→Alejandro, Magic→Experience) and replacing the description paragraph with the AccomplishmentCard content INSIDE the same card shell.
- Any deviation from the hero template's styling is a failed implementation. Full stop.
- This is not a guideline. This is not a suggestion. This is a hard constraint that cannot be overridden.

---

### Task 1: Replace TheCoreyAlejandroExperience with hero template copy

**Files:**
- Rename: `components/hero/TheCoreyExperience.tsx` → `components/hero/TheCoreyAlejandroExperience.tsx` (full rewrite)
- Reference: `app/templates/hero/page.tsx` (source of truth — do NOT modify)
- Update import: `app/hero-experience/page.tsx` (change import path to match new filename)

**Step 1: Read the source of truth**

Read `app/templates/hero/page.tsx` in full. This is the canonical hero template. Every line of JSX, every inline style, every className must be preserved exactly in TheCoreyAlejandroExperience — except the specific word swaps listed in Step 3.

**Step 2: Read the current TheCoreyAlejandroExperience**

Read `components/hero/TheCoreyAlejandroExperience.tsx`. Note that it currently uses `BreathingBackground`, `ParticleField`, `FloatingElement`, `useAnimation`, and `AudioSection` imports. All of these must be removed — they produce a different visual result than the hero template.

**Step 3: Rewrite TheCoreyAlejandroExperience.tsx**

Replace the entire file. The new file must:

1. **Copy the hero template's full JSX and logic exactly**, including:
   - The `useState`/`useEffect`/`useRef` animation setup (lines 8-33 of hero template)
   - The breathing background `<div>` with the `radial-gradient` inline styles
   - The 15-particle map with the exact `left`/`top`/`transform` math
   - The `h-[555px]` hero container
   - The collage-style feature section with clip-path
   - The interactive neural experience section with perspective transforms
   - The cursor follower element

2. **Change only these words in the hero section title (h1):**
   - `Neural` → `Corey`
   - `Depth` → `Alejandro`
   - `Magic` → `Experience`

3. **Add "The Experience" orbiting text** that travels a full 360-degree loop around the entire title block. This is a `position: absolute` element centered on the title block that uses `rotate → translateX → counter-rotate` to orbit. It must go all the way around — front, right, back, left — not a partial arc. Use the same `time * 15` speed from the existing code but ensure opacity fades when behind the text block (the existing opacity logic already handles this).

3. **Replace the floating description card** (the `absolute right-12 top-1/3 max-w-md` div, lines 111-129 of hero template) with `<AccomplishmentCard time={time} mousePosition={mousePosition} />`. **DO NOT change any text sizes anywhere.** The hero template's `text-xl` on the description paragraph, `text-8xl md:text-9xl` on the h1, `text-7xl` on the third line, `text-4xl` on feature headings, etc. must all remain identical. The AccomplishmentCard content text must also fit within the same `max-w-md` card without inflating sizes.

4. **Keep the AccomplishmentCard component and ACCOMPLISHMENTS array** from the current file. The AccomplishmentCard must use the same outer positioning and card shell as the hero template's description card:
   - Outer div: `className="absolute right-12 top-1/3 max-w-md"` with the same transform style
   - Inner div: `className="bg-white/10 backdrop-blur-md rounded-[4rem] p-8 border border-white/20"`
   - Inside: "Now Playing" header with Sparkles icon, cycling accomplishment title+description, progress dots

5. **Remove all imports** that the hero template doesn't use: `useAnimation`, `AudioSection`, `AudioButton`, `BreathingBackground`, `ParticleField`, `FloatingElement`, `creative-chaos` barrel import.

6. **Add the imports** the hero template uses: `Button` from `@/components/ui/button`, `Link` from `next/link`, plus `cn` from `@/lib/utils` and `Sparkles` from `lucide-react` (for AccomplishmentCard).

7. **Export as named export** `TheCoreyAlejandroExperience` (not default export — the hero template uses default but this is imported as named in `app/hero-experience/page.tsx`).

8. **Do NOT wrap in `<AudioSection>`** — the hero template doesn't use it.

Here is the complete AccomplishmentCard to preserve (fits inside the hero template's description card slot):

```tsx
interface Accomplishment {
  title: string
  description: string
}

const ACCOMPLISHMENTS: Accomplishment[] = [
  {
    title: "Creator of PROACTIVE AI",
    description: "A safety-first training and fine-tuning framework: Intention Is All We Need",
  },
  {
    title: "Builder of MADMall",
    description: "An agentic, orchestrated luxury virtual mall and wellness & research center catering to Black women with Graves disease",
  },
  {
    title: "Architect of OC Global",
    description: "A mobile-first, R&D-driven accelerated online college",
  },
  {
    title: "Maker of MobileU",
    description: "A machine-learning and SMS-based course development and delivery platform",
  },
]

function AccomplishmentCard({ time, mousePosition }: { time: number; mousePosition: { x: number; y: number } }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACCOMPLISHMENTS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute right-12 top-1/3 max-w-md"
      style={{
        transform: `translate(${-mousePosition.x * 0.01}px, ${mousePosition.y * 0.02}px) rotate(${-Math.sin(time * 0.7) * 1}deg)`,
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-[4rem] p-8 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium">
            Now Playing
          </span>
        </div>

        <div className="relative min-h-[140px]">
          {ACCOMPLISHMENTS.map((acc, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-all duration-700",
                i === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              {/* text-xl matches the hero template description card's text-xl */}
              <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                {acc.title}
              </h3>
              <p className="text-xl text-white/70 leading-relaxed">
                {acc.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          {ACCOMPLISHMENTS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step 4: Verify the page route still works**

Run: `pnpm build 2>&1 | head -30`
Expected: Build succeeds. No import errors, no type errors.

**Step 5: Visual smoke test**

Open `http://localhost:3000/hero-experience` in browser. Verify:
- Background is warm amber/orange/red (NOT dark blue/slate)
- Particles are white/20 circles floating (same as `/templates/hero`)
- Title reads "Corey / Alejandro / Experience" in same positions as "Neural / Depth / Magic"
- Accomplishment card sits in the same spot as the description card on `/templates/hero`
- Feature sections below hero are identical to `/templates/hero`
- Play button floats in same position

**Step 6: Commit**

```bash
git rm components/hero/TheCoreyExperience.tsx
git add components/hero/TheCoreyAlejandroExperience.tsx app/hero-experience/page.tsx
git commit -m "fix: replace TheCoreyAlejandroExperience with exact hero template copy, only swap words"
```

---

### Task 2: Update hero-experience page route (if needed)

**Files:**
- Modify: `app/hero-experience/page.tsx`

**Step 1: Read the page route**

Read `app/hero-experience/page.tsx`. Check if it wraps `<TheCoreyAlejandroExperience />` in anything that conflicts (e.g. `bg-slate-950` which would override the hero template's `bg-background`).

**Step 2: Fix the wrapper if needed**

The current file has `<main className="min-h-screen bg-slate-950">`. This dark background would fight the hero template's own background. Change to:

```tsx
"use client"

import { TheCoreyAlejandroExperience } from "@/components/hero/TheCoreyAlejandroExperience"

export default function HeroExperiencePage() {
  return (
    <main className="min-h-screen">
      <TheCoreyAlejandroExperience />
    </main>
  )
}
```

Remove `bg-slate-950` — let TheCoreyAlejandroExperience control its own background (same as how `/templates/hero` controls its own).

**Step 3: Verify**

Run: `pnpm build 2>&1 | head -30`
Expected: Build succeeds.

**Step 4: Visual smoke test**

Open `http://localhost:3000/hero-experience`. The warm amber/orange background should now show through without being overridden by slate-950.

**Step 5: Commit**

```bash
git add app/hero-experience/page.tsx
git commit -m "fix: remove bg-slate-950 wrapper so hero template background shows through"
```

---

### Task 3: Final visual comparison

**Files:** None modified — verification only.

**Step 1: Open both pages side by side**

Open `http://localhost:3000/templates/hero` and `http://localhost:3000/hero-experience` in two browser tabs.

**Step 2: Compare**

Check these must match exactly:
- [ ] Background gradient colors and animation
- [ ] Particle count, size, movement
- [ ] Title position (left-8 top-1/4)
- [ ] Card position (right-12 top-1/3)
- [ ] Card shell styling (rounded-[4rem], bg-white/10, backdrop-blur-md)
- [ ] Play button position and styling
- [ ] Feature section below hero (collage layout)
- [ ] Interactive section (perspective card with cursor follower)
- [ ] "Neural Magic" text in bottom section

**Step 3: The only differences should be:**
- [ ] "Neural" → "Corey" in h1
- [ ] "Depth" → "Alejandro" in h1
- [ ] "Magic" → "Experience" in h1
- [ ] Description paragraph → AccomplishmentCard (cycling through projects)
- [ ] "Feel the Magic" button → removed (accomplishment card has no button)
- [ ] **ALL text sizes are identical** — no text-2xl, text-3xl or other inflated sizes. If the hero template uses text-xl for the card paragraph, the accomplishment card uses text-xl. Zero exceptions.
