/**
 * Floating Nav Information Architecture Schema
 *
 * Aligned to Safety Systems Design identity flow:
 * Identity → Domains → Platform → Products → Doctrine → Evidence
 *
 * Design principles:
 * - Intuitive: Labels match Safety Systems Design mental model
 * - Self-explanatory: Voice phrases mirror visible labels
 * - Predictable: Fixed left-to-right order: Actions → Home → Sections → Explore → Tools
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
  | "sections"
  | "explore"
  | "tools"

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
    description: "Safety Systems Design — main landing",
  },
  {
    id: "sections",
    label: "Identity",
    voicePhrase: "identity sections",
    description: "Domains, platform, products, doctrine, evidence",
  },
  {
    id: "explore",
    label: "Explore",
    voicePhrase: "explore",
    description: "Documentation, style guide, components",
  },
  {
    id: "tools",
    label: "Tools",
    voicePhrase: "tools",
    description: "Playground and contact",
  },
]

/**
 * Navigation items in Safety Systems Design IA order.
 * Icons are injected by the component via NAV_ITEM_ICONS map.
 */
export const NAV_ITEMS: Omit<NavItem, "icon">[] = [
  // Identity sections — homepage flow anchors
  { id: "domains", name: "Domains", ariaLabel: "Scroll to safety domains", href: "/#domains", voicePhrases: ["domains", "safety domains"], group: "sections" },
  { id: "platform", name: "Platform", ariaLabel: "Scroll to SentinelOS platform", href: "/#platform", voicePhrases: ["platform", "sentinel", "sentinelos"], group: "sections" },
  { id: "products", name: "Products", ariaLabel: "Scroll to featured products", href: "/#products", voicePhrases: ["products", "featured products"], group: "sections" },
  { id: "doctrine", name: "Doctrine", ariaLabel: "Scroll to doctrine", href: "/#doctrine", voicePhrases: ["doctrine", "four point doctrine"], group: "sections" },
  { id: "evidence", name: "Evidence", ariaLabel: "Scroll to evidence", href: "/#evidence", voicePhrases: ["evidence", "verification"], group: "sections" },

  // Explore — deeper pages
  { id: "doc", name: "Docs", ariaLabel: "Open documentation", href: "/documentation", voicePhrases: ["documentation", "docs"], group: "explore" },
  { id: "style", name: "Style Guide", ariaLabel: "Open style guide", href: "/style-guide", voicePhrases: ["style guide", "style"], group: "explore" },
  { id: "components", name: "Components", ariaLabel: "Open components", href: "/components", voicePhrases: ["components"], group: "explore" },

  // Tools
  { id: "playground", name: "Playground", ariaLabel: "Open playground", href: "/playground", voicePhrases: ["playground"], group: "tools" },
  { id: "contact", name: "Contact", ariaLabel: "Open contact", href: "/contact", voicePhrases: ["contact"], group: "tools" },
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
