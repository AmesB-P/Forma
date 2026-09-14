import { useEffect, useState } from "react";
import {
  collections as seedCollections,
  items as seedItems,
  type Collection,
  type FormaItem,
} from "@/lib/data";
import type { SaveItemInput } from "./forma-types";

const STORAGE_KEY = "forma-workspace-v1";
type StoredWorkspace = { collections?: Collection[]; items?: FormaItem[] };

export function useWorkspace() {
  const [collections, setCollections] = useState<Collection[]>(seedCollections);
  const [items, setItems] = useState<FormaItem[]>(seedItems);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const savedWorkspace = window.localStorage.getItem(STORAGE_KEY);
        if (savedWorkspace) {
          const parsedWorkspace = JSON.parse(savedWorkspace) as StoredWorkspace;
          if (parsedWorkspace.collections?.length)
            setCollections(parsedWorkspace.collections);
          if (parsedWorkspace.items?.length) setItems(parsedWorkspace.items);
        }
      } catch {
        // Seed data is the safe fallback when browser storage is unavailable.
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ collections, items }),
      );
    }
  }, [collections, isHydrated, items]);

  return {
    collections,
    items,
    visibleCollections: collections.filter(
      (collection) => !collection.archived,
    ),
    createCollection(title: string, description: string) {
      setCollections((current) => [
        {
          id: `collection-${Date.now()}`,
          title,
          description:
            description || "A new place for the references worth keeping.",
          pinned: false,
          updatedAt: "Just now",
        },
        ...current,
      ]);
    },
    saveItem(item: SaveItemInput) {
      const date = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setItems((current) => [
        { ...item, id: `item-${Date.now()}`, createdAt: date, updatedAt: date },
        ...current,
      ]);
      setCollections((current) =>
        current.map((collection) =>
          collection.id === item.collectionId
            ? { ...collection, updatedAt: "Just now" }
            : collection,
        ),
      );
    },
    archiveCollection(collectionId: string) {
      setCollections((current) =>
        current.map((collection) =>
          collection.id === collectionId
            ? { ...collection, archived: true, updatedAt: "Just now" }
            : collection,
        ),
      );
    },
    renameCollection(collectionId: string, title: string) {
      setCollections((current) =>
        current.map((collection) =>
          collection.id === collectionId
            ? { ...collection, title, updatedAt: "Just now" }
            : collection,
        ),
      );
    },
  };
}
