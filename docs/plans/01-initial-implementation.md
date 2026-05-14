# Recurring TO-DOs App Implementation Plan

We will build a local-first recurring obligations tracker using NextJS (App Router), Zustand (localStorage persistence), TailwindCSS v4, and shadcn/ui. The app will manage recurring monthly tasks, automatically generate occurrences, and persist data exclusively in the browser's localStorage.

## User Review Required

- **Tailwind v4 & shadcn/ui Compatibility**: The project is using Tailwind CSS v4. `shadcn/ui` init process might require some tweaks or fallback to manual component setup if the CLI fails with v4. I plan to use the `shadcn` CLI, but we will adapt the generated components to v4 if needed.
- **Generation Logic**: The plan is to auto-generate missing occurrences for all active `RecurringTodo` items from their `createdAt` month up to the current navigated month. Is this correct? (e.g., if created in Jan, and app is opened in March, Feb and March occurrences will be generated if missing).
- **Date Handling**: We will use `date-fns` for easy month/period manipulations.

## Open Questions

- Should there be a way to delete a `RecurringTodo` completely, or just mark it as `active: false` to stop future generation? (The spec says "Never auto-delete occurrences. RecurringTodo is only a generation template.", so toggling `active` seems like the way to go).
- For the "Month Navigation", does it mean the UI filters the Pending/Completed items by the selected month? Or does the "Pending list" *always* show older unpaid occurrences regardless of the selected month? (Assuming Pending always shows overdue items + the selected month's items).

## Proposed Changes

We will organize the code into `/app`, `/components`, `/lib`, and `/types`.

### Types & Store Setup

#### [NEW] `types/index.ts`
Define the core interfaces: `RecurringTodo`, `Occurrence`, and `Period`.

#### [NEW] `lib/store.ts`
Implement the Zustand store with `persist` middleware.
Keys: `rt.state` (which will contain recurringTodos, occurrences, settings).
Derived selectors for filtering pending/completed based on the current period.

#### [NEW] `lib/generator.ts`
Pure functions to calculate missing occurrences based on `RecurringTodo` items and the current period, to be called when the app initializes or when the month changes.

### Core Components

#### [NEW] `components/month-navigation.tsx`
UI to switch between months, updating the current period in the store.

#### [NEW] `components/recurring-list.tsx`
Displays the pending items. Sorts them by overdue first, then due date, then creation order. Includes the collapsible "Completed" section.

#### [NEW] `components/recurring-item.tsx`
The individual row/card for an occurrence. Includes the one-click pay toggle, overdue badge, and an edit button.

#### [NEW] `components/add-edit-dialog.tsx`
A shadcn/ui `Dialog` form to create or edit a `RecurringTodo`.

### App Route

#### [MODIFY] `app/page.tsx`
Assemble the single-screen app using the created components. Ensure it's responsive and dark-mode friendly.
Add initialization logic (e.g., a `useEffect` that calls the generator function).

#### [MODIFY] `app/layout.tsx`
Wrap the app and adjust the overall layout to center the content appropriately.

#### [MODIFY] `app/globals.css`
Any necessary global styles (most will be handled by Tailwind).

## Verification Plan

### Automated/Manual Verification
1. Install dependencies (`zustand`, `date-fns`, `uuid`, `lucide-react`, `shadcn`).
2. Implement types and the Zustand store with persistence.
3. Build the generation logic and test it manually (e.g., verify that changing the date/month generates expected items).
4. Build the UI components with shadcn.
5. Create a new RecurringTodo, ensure an occurrence is created.
6. Toggle "paid" status and ensure it moves to the Completed section.
7. Change the month and ensure "unpaid" items carry over as Overdue.
8. Validate that data persists across browser reloads using `localStorage`.
