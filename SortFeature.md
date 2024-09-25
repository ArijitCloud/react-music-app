### The sorting feature for albums

The sorting feature allows users to sort albums based on different criteria such as release date or album ranking. This is implemented using `useSearchContext` context for setting the current sort option and rendering albums based on the selected option.

- **Sorting Options**: Users can select between "Top album" (default sorting), "Recent release", and "Oldest release". The sort options are handled in the `QuickNav` component and dynamically updated based on user interaction.
- **Sorting State**: The `sortOption` state from the `useSearchContext` hook is used to track and set the selected sort criteria. A visual check mark (`Check` icon) is displayed next to the currently active sorting option in the menu.

### Key Implementation Points

- **`QuickNav.tsx`**: Contains the sorting button using the `MenuButton` component and allows toggling between favorite albums.
- **`useSearchContext`**: Handles the sort state (`sortOption`) and allows the user to select sorting logic.
- **`Content.tsx`**: Processes the sort option and renders albums based on the chosen sorting criteria.

### Potential Improvement

1. **User Preferences**: Persist the user’s selected sorting preference across sessions using localStorage or backend sync.
2. **More sort options**: Persist the user’s selected sorting preference across sessions using localStorage or backend sync.
