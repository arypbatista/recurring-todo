# Add Amount and Monthly Summary

This plan outlines the steps to add an optional `amount` and `direction` to recurring items, and display a monthly summary based on these values.

## Proposed Changes

### Data Model Updates
- Update the `RecurringTodo` interface in `types/index.ts` to include:
  - `amount?: number;`
  - `direction?: "inbound" | "outbound";`

### UI Updates: Add/Edit Form
- Modify `components/add-edit-dialog.tsx` to include fields for `amount` and `direction`.
- The `amount` will be an optional number input.
- The `direction` will be a dropdown or radio button defaulting to "outbound" when adding an amount.

### UI Updates: List Item
- Modify `components/recurring-item.tsx` to display the amount if defined.
- "Inbound" amounts will be shown distinctly (e.g., green text, plus sign) from "outbound" amounts, but we will strictly avoid displaying negative numbers as requested.

### UI Updates: Monthly Summary
- Modify `components/recurring-list.tsx` to calculate and display a monthly summary at the top of the list.
- The summary will aggregate amounts for all items (both pending and completed) belonging to the current month (`currentPeriod`).
- The summary will only be rendered if at least one item in the current month has an amount defined.
- Individual totals (Inbound and Outbound) will only be displayed if their respective sums are > 0.

## Open Questions

> [!IMPORTANT]
> **Summary Calculation**: Should the summary include *only* the current month's items, or should it also include overdue items from previous months that are still pending? My plan is to include all items displayed in the "Pending" list plus the "Completed" list for the current view. Let me know if you prefer to strictly limit it to only the current month's items regardless of pending status.

> [!NOTE]
> **Design**: I will place the Monthly Summary in a styled card at the top of the `RecurringList` component. Let me know if you prefer a different location.

## Verification Plan

1. Create a new task with an Outbound amount. Verify it displays correctly in the list without a negative sign.
2. Create a new task with an Inbound amount. Verify it displays correctly in the list.
3. Check the Monthly Summary to ensure it aggregates the amounts correctly and only shows the sections that are > 0.
4. Edit an existing task to add an amount and verify it works.
