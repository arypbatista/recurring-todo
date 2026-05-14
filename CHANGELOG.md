# Changelog

All notable changes to this project will be documented in this file.

## [0.4.0] - 2026-05-14

### Added
- **Polished storybook aesthetic** — Complete design overhaul guided by the `frontend-design` skill for a production-grade, memorable interface.
  - Gradient mesh background with floating pastel blobs for atmospheric depth.
  - Glassmorphism effects on navigation buttons and cards (`backdrop-blur-sm`).
  - Staggered entrance animations on list items with hover lift effects.
  - Pulsing glow animation on the floating action button.
  - Directional icons (↙ inbound, ↗ outbound) in monthly summary cards.
  - Refined empty state with animated party popper icon.
  - Polished dialog with frosted glass backdrop and emoji-accented titles.
- **Baloo 2 font** — Switched to Baloo 2, a distinctively bubbly display font that feels handcrafted and toy-like.
- **Expanded pastel palette** — Six rich pastel themes (violet, rose, amber, emerald, sky, fuchsia) with coordinated edit buttons, checkbox borders, and card backgrounds.

### Changed
- Outbound summary card uses friendly orange instead of red/rose.
- Summary cards redesigned with icon + label + value layout instead of centered text.
- Category badges now pill-shaped with translucent white background.
- Due date format simplified to `· Due 15` instead of `(Due: 15)`.
- Section headers use count badges instead of inline numbers.
- Completed section accordion styled as a translucent emerald pill.

---

## [0.3.0] - 2026-05-14

### Added
- **Playful pastel UI overhaul** — Completely restyled the app with a fun, pastel aesthetic inspired by a hand-crafted mockup.
  - Cycling pastel card backgrounds (indigo, pink, peach, yellow, emerald, blue) for list items.
  - Rounded pill-shaped cards (`rounded-3xl`) with matching pastel borders.
  - Playful header with star emoji and sparkle accents.
  - Month navigation and Import buttons styled as rounded pastel pills.
  - "Completed" section styled as a green pill accordion.
  - Wavy underline decoration on the "Pending" header.
  - Floating action button in indigo.
- **Nunito font** — Switched to the Nunito Google Font for a rounded, friendly, and highly readable typeface.
- **Pastel Shadcn theme tokens** — Updated all CSS custom properties to use pastel OKLCH colors with increased border-radius.

### Changed
- Increased item title size to `text-base font-bold` for better readability.
- Increased metadata text size from `text-xs` to `text-sm`.
- Compacted list items with tighter padding and margins.

---

## [0.2.0] - 2026-05-14

### Added
- **Optional amount tracking** — Recurring items can now have an optional monetary `amount` and `direction` (Inbound or Outbound).
  - Inbound amounts displayed in green with a `+` prefix.
  - Outbound amounts displayed in standard text. No negative numbers.
- **Monthly summary** — A summary card appears at the top of the list showing aggregated Inbound and Outbound totals for the current month.
  - Only visible when at least one item has an amount defined.
  - Adapts layout based on which totals are present.
- Amount and Direction fields added to the Add/Edit dialog.

---

## [0.1.0] - 2026-05-14

### Added
- **Core app** — Local-first recurring obligations tracker built with Next.js, Tailwind CSS v4, shadcn/ui, and Zustand.
- **Recurring items** — Create, edit, and manage monthly recurring tasks with optional category and due day.
- **Auto-generation engine** — Automatically generates missing occurrences from creation date through the navigated month.
- **Pending list** — Sorted by overdue status, then due date, then creation order.
- **Completed list** — Collapsible accordion showing paid items for the selected month.
- **One-click toggle** — Mark items as paid/pending with a single checkbox click.
- **Month navigation** — Browse between months with forward/back controls.
- **Bulk import** — Paste multiple items at once via the Import dialog.
- **Local persistence** — All data saved to localStorage via Zustand persist middleware.