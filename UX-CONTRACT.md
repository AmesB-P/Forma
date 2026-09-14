# Forma interaction contract

Visual rules live in `DESIGN.md`.

- Overview is the stable home. Creating a collection returns the user to the overview; renaming stays in context; archiving removes a collection from default views while retaining it in browser-local data for a later restore workflow.
- Collection and search state use URL parameters where applicable. Search has an immediate clear action and distinguishes an empty workspace from no matching results.
- Add item is an authored dialog. Required title and content errors are inline; values remain until save or explicit cancel. Web URLs, notes, colors, and type samples are accepted as local MVP reference content; image URLs are rendered directly by the browser.
- Item detail is a route and returns to its owning collection. Metadata stays readable without relying on tile color.
- Shared dialogs own focus, Escape, backdrop, and focus restoration. No browser alert, confirm, or prompt.
- Local mock data is the SSR baseline. Browser additions, renames, and archives persist in local storage; unavailable storage falls back to the SSR seed data.
- The UI targets WCAG 2.2 AA, honors reduced motion, and keeps all primary actions keyboard reachable at mobile, tablet, and desktop widths.
