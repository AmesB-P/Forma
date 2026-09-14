import { FileText, Image as ImageIcon, Link2, Palette, Type } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ItemType } from "@/lib/data";

export const itemTypeMeta: Record<
  ItemType,
  { label: string; icon: LucideIcon }
> = {
  image: { label: "Image", icon: ImageIcon },
  link: { label: "Link", icon: Link2 },
  note: { label: "Note", icon: FileText },
  color: { label: "Color", icon: Palette },
  type: { label: "Type", icon: Type },
};

export type SaveItemInput = Omit<
  import("@/lib/data").FormaItem,
  "id" | "createdAt" | "updatedAt"
>;
