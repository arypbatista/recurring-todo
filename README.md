# Recurring TO-DOs App

Local-first recurring obligations tracker built with Next.js App Router, Zustand, TailwindCSS v4, and shadcn/ui.

## Stack

- Next.js (App Router)
- React + TypeScript
- Zustand
- TailwindCSS v4
- shadcn/ui
- date-fns
- Lucide React

## Features

- Recurring monthly task generation
- Pending / completed tracking
- Overdue carry-over
- LocalStorage persistence
- Monthly navigation
- Optional inbound/outbound amounts
- Monthly financial summary
- Responsive + dark mode UI

## Architecture

```txt
/app
/components
/lib
/types
```

## Core Modules

- `types/index.ts` → shared domain models
- `lib/store.ts` → Zustand store + persistence
- `lib/generator.ts` → recurrence generation logic
- `components/*` → reusable UI components

## Domain Model

### RecurringTodo

Defines a recurring template.

```ts
interface RecurringTodo {
  id: string;
  title: string;
  dueDay: number;
  active: boolean;

  amount?: number;
  direction?: "inbound" | "outbound";
}
```

### Occurrence

Represents a generated monthly instance.

```ts
interface Occurrence {
  id: string;
  recurringTodoId: string;

  period: string;
  dueDate: string;

  paid: boolean;
}
```

## Generation Logic

Occurrences are automatically generated:

- on app initialization
- on month navigation
- when creating recurring items

Missing months are backfilled automatically.

## Development

```bash
pnpm install
pnpm dev
```

## Design Principles

- Local-first
- Offline-friendly
- Minimal architecture
- Predictable state
- No backend required

## Future Improvements

- Notifications
- Cloud sync
- Categories/tags
- PWA support
- Analytics
