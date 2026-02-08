# Floating Nav Information Architecture

## Principles

- **Intuitive** – Labels match mental models (Explore, Templates, Tools, Demos)
- **Self-explanatory** – Visible labels match voice phrases
- **Predictable** – Fixed left-to-right order
- **Accessible** – ARIA landmarks, keyboard (Tab, Enter, Escape), 44px touch targets
- **Responsive** – 200ms transitions, `requestAnimationFrame` for drag

## Layout Order

1. **Bar controls** – Detach, Opacity, Voice (when supported)
2. **Home** – Primary anchor
3. **Explore** – Documentation, Style Guide, Components
4. **Templates** – Templates hub, Resume, Portfolio, Hero, Landing
5. **Tools** – Playground, Contact
6. **Demos** – Card Path, Scroll Card, Table Card, Test Refactor
7. **Sections** – Superpowers, Projects (on-page anchors)
8. **Audio** – Toggle audio mode

## Voice Commands

Activate the microphone button, then say:

| Action | Example phrases |
| ------ | ---------------- |
| Navigate | "Go to Home", "Open Documentation", "Resume", "Contact" |
| Detach bar | "Detach", "Move bar", "Float bar" |
| Dock bar | "Dock", "Fix bar", "Anchor bar" |
| Opacity | "Opacity", "Show opacity", "Adjust transparency" |
| Audio | "Audio on", "Audio off", "Toggle audio" |

## Keyboard

- **Tab** – Move focus between items
- **Enter / Space** – Activate focused item
- **Escape** – Dock bar or hide opacity control
