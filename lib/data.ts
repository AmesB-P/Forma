export type ItemType = "image" | "link" | "note" | "color" | "type";
export type FormaItem = {
  id: string;
  collectionId: string;
  type: ItemType;
  title: string;
  content: string;
  note: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  tone?: "olive" | "peach" | "blue" | "paper";
};
export type Collection = {
  id: string;
  title: string;
  description: string;
  pinned: boolean;
  archived?: boolean;
  updatedAt: string;
};
export const collections: Collection[] = [
  {
    id: "quiet-homes",
    title: "Quiet homes",
    description: "Materials, rooms, and small rituals for a slower interior.",
    pinned: true,
    updatedAt: "Today",
  },
  {
    id: "field-notes",
    title: "Field notes",
    description: "Type, print, and wayfinding found while walking.",
    pinned: true,
    updatedAt: "Yesterday",
  },
  {
    id: "soft-interfaces",
    title: "Soft interfaces",
    description: "Digital details that feel calm without disappearing.",
    pinned: false,
    updatedAt: "Sep 10",
  },
  {
    id: "garden-study",
    title: "Garden study",
    description: "Color and form for an early landscape idea.",
    pinned: false,
    updatedAt: "Sep 4",
  },
];
export const items: FormaItem[] = [
  {
    id: "linen-chair",
    collectionId: "quiet-homes",
    type: "image",
    title: "Linen chair in morning light",
    content: "/images/linen-chair.png",
    note: "The room feels settled because every edge is soft, but nothing is precious.",
    tags: ["material", "light"],
    createdAt: "Sep 14, 2026",
    updatedAt: "Sep 14, 2026",
    tone: "paper",
  },
  {
    id: "olive-study",
    collectionId: "quiet-homes",
    type: "color",
    title: "Dried olive",
    content: "#A8AD8E",
    note: "A muted green that can carry a whole quiet surface.",
    tags: ["palette"],
    createdAt: "Sep 13, 2026",
    updatedAt: "Sep 13, 2026",
    tone: "olive",
  },
  {
    id: "thresholds",
    collectionId: "quiet-homes",
    type: "note",
    title: "Thresholds, not rooms",
    content:
      "What if the transition between spaces gets as much attention as the spaces themselves?",
    note: "A prompt for the layout study.",
    tags: ["idea", "layout"],
    createdAt: "Sep 12, 2026",
    updatedAt: "Sep 12, 2026",
    tone: "peach",
  },
  {
    id: "atelier-link",
    collectionId: "quiet-homes",
    type: "link",
    title: "Atelier Vime — interiors",
    content: "https://www.ateliervime.com",
    note: "Natural texture without the usual rustic shorthand.",
    tags: ["studio", "reference"],
    createdAt: "Sep 9, 2026",
    updatedAt: "Sep 9, 2026",
    tone: "blue",
  },
  {
    id: "castoro",
    collectionId: "field-notes",
    type: "type",
    title: "Castoro Titling",
    content: "Aa",
    note: "Strong enough for a cover, soft enough for notes.",
    tags: ["serif", "display"],
    createdAt: "Sep 8, 2026",
    updatedAt: "Sep 8, 2026",
    tone: "paper",
  },
  {
    id: "blue-sign",
    collectionId: "field-notes",
    type: "color",
    title: "Faded street blue",
    content: "#758E99",
    note: "Weathered rather than muted.",
    tags: ["palette", "signage"],
    createdAt: "Sep 6, 2026",
    updatedAt: "Sep 6, 2026",
    tone: "blue",
  },
  {
    id: "corners",
    collectionId: "soft-interfaces",
    type: "note",
    title: "Corners should explain touch",
    content:
      "Use shape to separate things you can hold from things you only read.",
    note: "Keep the radius functional.",
    tags: ["interaction"],
    createdAt: "Sep 5, 2026",
    updatedAt: "Sep 5, 2026",
    tone: "peach",
  },
];
