# Forma interaction contract

Visual rules live in `DESIGN.md`.

- Overview is the stable home. Creating a collection opens it; renaming stays in context; archiving is reversible and removes it from default views.
- Collection and search state use URL parameters where applicable. Search has an immediate clear action and distinguishes an empty workspace from no matching results.
- Add item is an authored dialog. Required title and content errors are inline; values remain until save or explicit cancel. URL, note, image, color, and type are the supported local item kinds.
- Item detail is a route and returns to its owning collection. Metadata stays readable without relying on tile color.
- Shared dialogs own focus, Escape, backdrop, and focus restoration. No browser alert, confirm, or prompt.
- Local mock data is the SSR baseline. Browser additions persist locally; failures expose an inline recovery message.
- The UI targets WCAG 2.2 AA, honors reduced motion, and keeps all primary actions keyboard reachable at mobile, tablet, and desktop widths.
