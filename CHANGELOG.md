# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

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