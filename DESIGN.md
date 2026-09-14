---
version: alpha
colors:
  paper: "#F3EFE6"
  ink: "#263238"
  navigation: "#53656E"
  olive: "#A8AD8E"
  peach: "#E5B49C"
  white: "#FFFEFA"
typography:
  sans:
    fontFamily: '"Avenir Next", Avenir, "Segoe UI", sans-serif'
  editorial:
    fontFamily: 'Charter, "Bitstream Charter", Georgia, serif'
rounded:
  control: "0.5rem"
  surface: "0.875rem"
spacing:
  unit: "0.25rem"
  section: "2rem"
components:
  button:
    borderRadius: "0.5rem"
  card:
    borderRadius: "0.875rem"
---

# Forma design direction

## Overview

Forma should feel like opening a well-kept studio drawer: warm paper, small handwritten decisions, and enough quiet around each reference to see it properly. This is a product surface, not a marketing site. The memorable signature is the collection board: mixed-scale references align to a disciplined grid but keep a faint tactile offset. Avoid SaaS KPI dashboards, glassmorphism, gradients, and decorative productivity language.

Runtime ownership uses Model B: `app/globals.css` is canonical, and this file mirrors its durable semantic tokens. Shared components consume those variables.

## Colors

Paper is the application ground; white is reserved for lifted working surfaces. Blue-gray carries navigation and focus. Olive and peach identify reference families, never status by color alone. Ink remains softened charcoal rather than pure black.

## Typography

Interface copy uses Avenir Next with Segoe UI fallback. Collection titles use Charter/Georgia as an editorial counterpoint. Sentence case only; compact labels are not letter-spaced.

## Layout

Desktop uses a 248px rail and a fluid work area. Tablet narrows the rail; mobile converts it to a quiet bottom dock. Content is left aligned with a readable maximum width. Collection items use a responsive masonry-like grid with deliberate span variants.

## Elevation & Depth

Static surfaces are separated by tone and a 1px translucent rule. Only active overlays and the working board use restrained shadow. No stacked card shadows.

## Shapes

Controls use an 8px radius; larger working surfaces use 14px. Reference imagery may use 10px. Pills are reserved for tags and filters.

## Components

Buttons keep a compact studio-tool scale and visible blue-gray focus ring. Item tiles expose type in text or icon as well as color. Dialogs become near-full-height sheets on narrow screens.

## Do's and Don'ts

Do preserve empty space, uneven content rhythm, direct verbs, visible focus, and restrained motion. Do not add charts, streaks, collaboration, fake metrics, loud toasts, or unbounded animation.
