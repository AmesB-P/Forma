---
version: alpha
colors:
  canvas: "#A6ACA4"
  surface: "#F4F4EF"
  navigation: "#EAECE5"
  ink: "#343A31"
  mutedInk: "#70796B"
  deepTile: "#343E2F"
  deepTileText: "#EDF0DF"
  softOlive: "#CACDC1"
  paper: "#E4DBCA"
typography:
  sans:
    fontFamily: '"Manrope Variable", Manrope, "Segoe UI", sans-serif'
  editorial:
    fontFamily: 'Georgia, serif'
rounded:
  control: "0.5rem"
  surface: "0.75rem"
spacing:
  unit: "0.25rem"
  section: "2rem"
components:
  button:
    borderRadius: "0.5rem"
  card:
    borderRadius: "0.75rem"
---

# Forma design direction

## Overview

Forma is a calm, personal creative-reference workspace for collecting images, links, notes, color, and type. It should feel editorial and tactile: a gray-green field around a quiet off-white working surface, with enough empty space to browse references without turning the product into a dashboard. The collection board is the signature; it uses a disciplined responsive grid with varied reference kinds, not ornamental decoration.

Runtime ownership uses Model B: `app/globals.css` is canonical. This document mirrors its durable semantic tokens, and shared components consume those variables.

## Colors

Canvas frames the desktop workspace. Surface is the off-white working area and lifted cards. Navigation is a pale secondary panel, while deep tile is reserved for the primary action and active navigation. Olive, paper, and muted blue-gray describe reference material rather than status.

## Typography

Manrope Variable is the UI voice for controls, labels, and body copy. Georgia is a quiet editorial counterpoint for collection titles and long reference notes. Use sentence case and compact labels without tracking.

## Layout

Desktop uses a 248px navigation panel inside a gray-green frame and a flexible off-white workspace. Content is capped at 1184px with 56px desktop, 32px tablet, and 20px mobile gutters. Collections use a responsive three-to-four-column grid with 16px gaps. Mobile keeps a compact top bar with direct access to search and adding a reference; it never squeezes the desktop navigation into the viewport.

## Elevation & Depth

The workspace panel receives one restrained shadow against the canvas. Cards are primarily separated by tone and a one-pixel rule. Avoid stacked shadows, gradients, glass effects, and decorative status treatments.

## Shapes

Reference tiles use 8px corners. Workspace panels use 12px corners. Pills are limited to filters and tags.

## Components

Buttons use compact, direct labels and a visible deep-ink focus ring. Every item exposes its type through text or an icon as well as color. Dialogs are authored, focus-managed, and constrained to the visual viewport.

## Do's and Don'ts

Do preserve quiet space, tactile material cues, real navigation, and useful empty/error states. Do not add charts, collaboration claims, gamification, loud notifications, or fabricated integrations.
