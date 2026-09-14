import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Pin, Plus } from "lucide-react";
import type { Collection, FormaItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ReferenceCard } from "./cards";
import {
  ArchiveCollectionDialog,
  CollectionActions,
  RenameCollectionDialog,
} from "./dialogs";

type Filter = "all" | "image" | "note" | "color";
const filters: ReadonlyArray<[Filter, string]> = [
  ["all", "All"],
  ["image", "Images"],
  ["note", "Notes"],
  ["color", "Palette"],
];

export function CollectionView({
  id,
  collections,
  items,
  onAdd,
  onArchive,
  onRename,
}: {
  id: string;
  collections: Collection[];
  items: FormaItem[];
  onAdd: () => void;
  onArchive: (id: string) => void;
  onRename: (id: string, title: string) => void;
}) {
  const collection =
    collections.find((entry) => entry.id === id) || collections[0];
  const [filter, setFilter] = useState<Filter>("all");
  const [isArchiveDialogOpen, setIsArchiveDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const collectionItems = items.filter(
    (item) => item.collectionId === collection.id,
  );
  const filteredItems =
    filter === "all"
      ? collectionItems
      : collectionItems.filter((item) => item.type === filter);

  return (
    <main className="view-enter mx-auto max-w-[1184px] px-5 py-8 md:px-8 lg:px-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Workspace
      </Link>
      <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-editorial text-5xl tracking-[-.025em] sm:text-6xl">
              {collection.title}
            </h1>
            {collection.pinned && (
              <Pin className="size-4 fill-current text-muted-foreground" />
            )}
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {collection.description}
          </p>
        </div>
        <CollectionActions
          onRename={() => setIsRenameDialogOpen(true)}
          onArchive={() => setIsArchiveDialogOpen(true)}
          onAdd={onAdd}
        />
      </div>
      <div className="mt-10 flex items-center justify-between border-y border-border/70 py-3">
        <div className="flex gap-2" aria-label="Filter references">
          {filters.map(([value, label]) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-xs ${filter === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              {label}
              {value === "all" ? ` ${collectionItems.length}` : ""}
            </button>
          ))}
        </div>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Updated {collection.updatedAt}
        </span>
      </div>
      {filteredItems.length ? (
        <div className="mt-7 grid auto-rows-[205px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <ReferenceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <EmptyCollection onAdd={onAdd} />
      )}
      <ArchiveCollectionDialog
        collection={collection}
        open={isArchiveDialogOpen}
        onOpenChange={setIsArchiveDialogOpen}
        onArchive={onArchive}
      />
      <RenameCollectionDialog
        collection={collection}
        open={isRenameDialogOpen}
        onOpenChange={setIsRenameDialogOpen}
        onRename={onRename}
      />
    </main>
  );
}

function EmptyCollection({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mt-7 grid min-h-80 place-items-center rounded-surface border border-dashed border-border text-center">
      <div>
        <BookOpen className="mx-auto size-6 text-muted-foreground" />
        <h2 className="mt-4 font-editorial text-2xl">A clear surface</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Save the first reference that belongs here.
        </p>
        <Button className="mt-5" onClick={onAdd}>
          <Plus className="size-4" />
          Add first item
        </Button>
      </div>
    </div>
  );
}
