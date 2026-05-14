# Add i18n Support (English, Spanish, Portuguese)

Add automatic language detection and translation support for all user-facing strings. No external i18n library — a lightweight custom solution is sufficient for this small app.

## Approach

A simple dictionary-based system using a React context. The browser's `navigator.language` determines the locale at mount time, falling back to English if the detected language isn't supported.

**Why no library?** The app has ~40 translatable strings across 5 components. A full i18n framework (next-intl, react-i18next) would be overkill and add unnecessary bundle size.

## Proposed Changes

### Translation System

#### [NEW] [i18n.ts](file:///Users/arypbatista/Workspaces/myself/recurring-todo/lib/i18n.ts)

Central translation module containing:
- `Locale` type: `"en" | "es" | "pt"`
- `translations` dictionary object keyed by locale, then by string key
- `detectLocale()` function — reads `navigator.language`, maps `es-*` → `es`, `pt-*` → `pt`, else → `en`
- `t(key, locale)` helper function
- Translation keys for all UI strings (see inventory below)

#### [NEW] [i18n-provider.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/i18n-provider.tsx)

React context provider:
- `I18nContext` with `{ locale, t, setLocale }`
- `useI18n()` hook for consuming components
- Auto-detects locale on mount via `detectLocale()`

---

### Component Updates

#### [MODIFY] [layout.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/app/layout.tsx)
- Set `lang` attribute dynamically (or keep `en` as default since detection is client-side)

#### [MODIFY] [page.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/app/page.tsx)
- Wrap content with `I18nProvider`
- Replace hardcoded strings: "Recurring TO-DOs", "Keep track of what matters...", "Import", "Add Recurring Task"

#### [MODIFY] [recurring-list.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/recurring-list.tsx)
- Replace: "Loading...", "Inbound", "Outbound", "Pending", "All caught up!", "Nothing pending right now", "Completed"

#### [MODIFY] [recurring-item.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/recurring-item.tsx)
- Replace: "Overdue", "Due" prefix

#### [MODIFY] [month-navigation.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/month-navigation.tsx)
- Replace: "Back to current month"
- Localize month names via `date-fns` locale support (already using date-fns)

#### [MODIFY] [add-edit-dialog.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/add-edit-dialog.tsx)
- Replace: "Edit Task", "New Task", "Title", "Category (Optional)", "Due Day...", "Amount (Optional)", "Direction", "Outbound (Expense)", "Inbound (Income)", "Active...", "Cancel", "Save Changes", "Add Task"

#### [MODIFY] [bulk-add-dialog.tsx](file:///Users/arypbatista/Workspaces/myself/recurring-todo/components/bulk-add-dialog.tsx)
- Replace: "Bulk Import", format description, "Preview (N items to add)", "No matching items found", "Cancel", "Import N Items", "Day N"

## String Inventory (~40 keys)

| Key | EN | ES | PT |
|-----|----|----|-----|
| `appTitle` | Recurring TO-DOs | Tareas Recurrentes | Tarefas Recorrentes |
| `appSubtitle` | Keep track of what matters, month by month | Lleva el control de lo importante, mes a mes | Acompanhe o que importa, mês a mês |
| `import` | Import | Importar | Importar |
| `pending` | Pending | Pendientes | Pendentes |
| `completed` | Completed | Completados | Concluídos |
| `allCaughtUp` | All caught up! | ¡Todo al día! | Tudo em dia! |
| `nothingPending` | Nothing pending right now | Nada pendiente por ahora | Nada pendente no momento |
| `overdue` | Overdue | Vencido | Atrasado |
| `due` | Due | Vence | Vence |
| `inbound` | Inbound | Ingreso | Entrada |
| `outbound` | Outbound | Egreso | Saída |
| `backToCurrentMonth` | Back to current month | Volver al mes actual | Voltar ao mês atual |
| ... | *(~28 more for dialogs, labels, buttons)* | | |

## Open Questions

> [!NOTE]
> **Month names**: `date-fns` supports locale-specific month formatting out of the box via its locale modules (`es`, `pt`). I'll import those and pass them to `format()` calls. This means "May 2026" will correctly display as "Mayo 2026" or "Maio 2026".

> [!IMPORTANT]
> **`<html lang>` attribute**: Since detection is client-side, the initial SSR render will use `lang="en"`. The attribute will update on hydration. This is standard for client-side i18n in Next.js without middleware. Let me know if you'd prefer server-side detection instead (adds complexity with middleware + cookies).

## Verification Plan

1. Test with browser language set to `es` → all strings should be in Spanish, months in Spanish
2. Test with browser language set to `pt-BR` → all strings in Portuguese, months in Portuguese
3. Test with browser language set to `en-US` → English (default)
4. Test with an unsupported language (e.g., `fr`) → falls back to English
