/**
 * Floating Nav Information Architecture Schema
 *
 * Design principles:
 * - Intuitive: Labels match user mental models (Explore, Templates, Tools)
 * - Self-explanatory: Voice phrases mirror visible labels
 * - Predictable: Fixed left-to-right order: Actions → Home → Explore → Templates → Tools → Demos → Sections
 * - Accessible: ARIA labels, roles, and keyboard support align with schema
 * - Easy to manipulate: Grouped for scanability, touch targets ≥ 44px
 */

import type { LucideIcon } from "lucide-react"

export interface NavItem {
  id: string
  name: string
  /** For ARIA and tooltips; keeps label consistent with voice command */
  ariaLabel: string
  href: string
  icon: LucideIcon
  /** Voice activation phrases (lowercase, without punctuation) */
  voicePhrases: string[]
  /** Optional group for visual grouping and screen-reader announcements */
  group?: NavGroup
}

export type NavGroup =
  | "actions"
  | "primary"
  | "explore"
  | "templates"
  | "tools"
  | "demos"
  | "sections"

export interface NavGroupMeta {
  id: NavGroup
  label: string
  /** Voice phrase to focus or announce group */
  voicePhrase: string
  description: string
}

export const NAV_GROUPS: NavGroupMeta[] = [
  {
    id: "actions",
    label: "Bar controls",
    voicePhrase: "bar controls",
    description: "Detach, dock, opacity, and audio toggle",
  },
  {
    id: "primary",
    label: "Home",
    voicePhrase: "home",
    description: "Main landing page",
  },
  {
    id: "explore",
    label: "Explore",
    voicePhrase: "explore",
    description: "Documentation, style guide, components",
  },
  {
    id: "templates",
    label: "Templates",
    voicePhrase: "templates",
    description: "Resume, portfolio, hero, landing templates",
  },
  {
    id: "tools",
    label: "Tools",
    voicePhrase: "tools",
    description: "Playground and contact",
  },
  {
    id: "demos",
    label: "Demos",
    voicePhrase: "demos",
    description: "Test refactor and experimental demos",
  },
  {
    id: "sections",
    label: "Page sections",
    voicePhrase: "sections",
    description: "Superpowers and projects anchors",
  },
]

/**
 * Navigation items in predictable IA order.
 * Icons are injected by the component via NAV_ITEM_ICONS map.
 */
export const NAV_ITEMS: Omit<NavItem, "icon">[] = [
  { id: "doc", name: "Documentation", ariaLabel: "Open documentation", href: "/documentation", voicePhrases: ["documentation", "docs"], group: "explore" },
  { id: "style", name: "Style Guide", ariaLabel: "Open style guide", href: "/style-guide", voicePhrases: ["style guide", "style"], group: "explore" },
  { id: "components", name: "Components", ariaLabel: "Open components", href: "/components", voicePhrases: ["components"], group: "explore" },
  { id: "templates", name: "Templates", ariaLabel: "Open templates", href: "/components", voicePhrases: ["templates"], group: "templates" },
  { id: "resume", name: "Resume", ariaLabel: "Open resume template", href: "/templates/resume", voicePhrases: ["resume"], group: "templates" },
  { id: "portfolio", name: "Portfolio", ariaLabel: "Open portfolio template", href: "/templates/portfolio", voicePhrases: ["portfolio"], group: "templates" },
  { id: "hero", name: "Hero", ariaLabel: "Open hero template", href: "/templates/hero", voicePhrases: ["hero"], group: "templates" },
  { id: "landing", name: "Landing", ariaLabel: "Open landing template", href: "/templates/landing", voicePhrases: ["landing"], group: "templates" },
  { id: "playground", name: "Playground", ariaLabel: "Open playground", href: "/playground", voicePhrases: ["playground"], group: "tools" },
  { id: "contact", name: "Contact", ariaLabel: "Open contact", href: "/contact", voicePhrases: ["contact"], group: "tools" },
  { id: "test-refactor", name: "Test Refactor", ariaLabel: "Open test refactor", href: "/test-refactor", voicePhrases: ["test refactor", "test"], group: "demos" },
  { id: "superpowers", name: "Superpowers", ariaLabel: "Scroll to superpowers section", href: "/#superpowers", voicePhrases: ["superpowers"], group: "sections" },
  { id: "projects", name: "Projects", ariaLabel: "Scroll to projects section", href: "/#projects", voicePhrases: ["projects"], group: "sections" },
]

/** Voice commands for bar controls (no href) */
export interface NavAction {
  id: string
  name: string
  ariaLabel: string
  voicePhrases: string[]
  action: "detach" | "dock" | "opacity" | "audio-on" | "audio-off" | "audio-toggle"
}

export const NAV_ACTIONS: NavAction[] = [
  {
    id: "detach",
    name: "Detach bar",
    ariaLabel: "Detach navigation bar to move it",
    voicePhrases: ["detach", "detach bar", "move bar", "float bar"],
    action: "detach",
  },
  {
    id: "dock",
    name: "Dock bar",
    ariaLabel: "Dock navigation bar to top center",
    voicePhrases: ["dock", "dock bar", "fix bar", "anchor bar"],
    action: "dock",
  },
  {
    id: "opacity",
    name: "Opacity",
    ariaLabel: "Adjust bar opacity",
    voicePhrases: ["opacity", "show opacity", "hide opacity", "adjust opacity", "transparency"],
    action: "opacity",
  },
  {
    id: "audio-toggle",
    name: "Audio",
    ariaLabel: "Toggle audio mode",
    voicePhrases: ["audio", "audio on", "audio off", "toggle audio", "sound", "enable audio", "disable audio"],
    action: "audio-toggle",
  },
]
