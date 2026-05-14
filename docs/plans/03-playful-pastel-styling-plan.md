# Playful Pastel Styling Plan

Based on the provided mockup, I will apply a comprehensive styling update to make the app feel extremely playful, using pastel colors, rounded shapes, and a fun typography.

## Proposed Changes

### 1. Typography & Global Styles
- **Font**: I will import a playful Google Font like `Fredoka` or `Nunito` in `app/layout.tsx` to replace the default sans-serif font.
- **Background**: Ensure the app background is a soft, off-white/cream color.

### 2. Item Cards (The core visual change)
- **Cycling Colors**: I will define an array of pastel background colors (Lavender, Pink, Peach, Yellow, Mint, Blue) and apply them to the `RecurringItem` components based on their `index` in the list.
- **Shape**: Change the item cards to be heavily rounded (`rounded-2xl` or `rounded-3xl`) rather than standard rectangles.
- **Checkbox**: Ensure the checkbox is a large, circular, hollow ring when unchecked, matching the pastel outline of the card.
- **Edit Button**: The edit button will be a circular pill with a matching pastel background.

### 3. Layout & Header Enhancements
- **Main Title**: Add a playful star icon next to the "Recurring TO-DOs" title.
- **Month Navigation**: Style the `<` and `>` buttons as rounded pastel pills.
- **Headers**: Add a decorative underline effect to the "PENDING" section header.
- **Import Button**: Style the bulk add "Import" button as a light purple rounded pill.

### 4. Component Updates
- `components/recurring-list.tsx`: Pass the `index` to `RecurringItem` and update the layout spacing and headers.
- `components/recurring-item.tsx`: Accept `index`, apply the dynamic cycling colors, and update the internal layout to match the pill shape.
- `app/page.tsx`: Update the main header, import button, and title.
- `components/month-navigation.tsx`: Update the month navigation buttons to rounded pills.

## Open Questions

> [!IMPORTANT]
> **Animations**: Would you like me to add any subtle bounce or hover animations to the items to make it feel even more alive and playful?

## Verification Plan
1. Check the app in the browser to ensure the new font is loaded.
2. Verify that items cycle through the pastel colors correctly.
3. Check that the checkbox and edit buttons match the mockup's pill/circular aesthetic.
4. Confirm that the header and month navigation look playful and rounded.
