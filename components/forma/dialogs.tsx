import { useRef, useState } from "react";
import { Archive, Pencil, Plus } from "lucide-react";
import type { Collection, ItemType } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { itemTypeMeta, type SaveItemInput } from "@/lib/forma-types";

export function AddItemDialog({
  open,
  onOpenChange,
  collections,
  onSave,
  collectionId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collections: Collection[];
  onSave: (item: SaveItemInput) => void;
  collectionId?: string;
}) {
  const [type, setType] = useState<ItemType>("image");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const inputLabel =
    type === "image" || type === "link"
      ? "Source URL"
      : type === "color"
        ? "Hex color"
        : type === "type"
          ? "Type sample"
          : "Note";
  const inputPlaceholder =
    type === "color"
      ? "#A8AD8E"
      : type === "note"
        ? "Write the thought worth keeping…"
        : "https://";

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get("title") || !form.get("content")) {
      setError(
        "Add a title and the reference content so you can find it later.",
      );
      titleRef.current?.focus();
      return;
    }
    onSave({
      collectionId: collectionId || String(form.get("collectionId")),
      type,
      title: String(form.get("title")).trim(),
      content: String(form.get("content")).trim(),
      note: String(form.get("note")).trim(),
      tags: String(form.get("tags"))
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      tone: type === "color" ? "olive" : "paper",
    });
    event.currentTarget.reset();
    setError("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Save a reference</DialogTitle>
        <DialogDescription>
          Capture the useful part now. You can add more context later.
        </DialogDescription>
        <form noValidate onSubmit={submit} className="mt-7 space-y-5">
          {!collectionId && (
            <label
              className="block text-sm font-medium"
              htmlFor="item-collection"
            >
              Collection
              <select
                id="item-collection"
                name="collectionId"
                defaultValue={collections[0]?.id}
                className="mt-2 h-11 w-full rounded-control border border-input bg-white/60 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Reference type</legend>
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.keys(itemTypeMeta) as ItemType[]).map((key) => {
                const Icon = itemTypeMeta[key].icon;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setType(key)}
                    aria-pressed={type === key}
                    className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-control border text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${type === key ? "border-primary bg-primary text-white" : "border-border bg-white/35 hover:bg-white/70"}`}
                  >
                    <Icon className="size-4" />
                    {itemTypeMeta[key].label}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <label className="block text-sm font-medium" htmlFor="item-title">
            Title
            <Input
              ref={titleRef}
              id="item-title"
              name="title"
              className="mt-2"
              placeholder="What will you remember this as?"
              aria-invalid={!!error}
            />
          </label>
          <label className="block text-sm font-medium" htmlFor="item-content">
            {inputLabel}
            <Input
              id="item-content"
              name="content"
              className="mt-2"
              placeholder={inputPlaceholder}
              aria-invalid={!!error}
            />
          </label>
          <label className="block text-sm font-medium" htmlFor="item-note">
            Why it matters{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
            <Textarea
              id="item-note"
              name="note"
              className="mt-2"
              placeholder="A short note for your future self"
            />
          </label>
          <label className="block text-sm font-medium" htmlFor="item-tags">
            Tags{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
            <Input
              id="item-tags"
              name="tags"
              className="mt-2"
              placeholder="material, light, layout"
            />
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-control bg-peach/35 px-3 py-2 text-sm"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save reference</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function CreateCollectionDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (title: string, description: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Start a collection</DialogTitle>
        <DialogDescription>
          Give this body of references a clear, useful name.
        </DialogDescription>
        <form
          noValidate
          className="mt-7 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const title = String(form.get("collection-name") || "").trim();
            if (!title) return;
            onCreate(
              title,
              String(form.get("collection-description") || "").trim(),
            );
            event.currentTarget.reset();
            onOpenChange(false);
          }}
        >
          <label
            htmlFor="collection-name"
            className="block text-sm font-medium"
          >
            Collection name
            <Input
              id="collection-name"
              name="collection-name"
              className="mt-2"
              placeholder="e.g. Packaging with restraint"
            />
          </label>
          <label
            htmlFor="collection-description"
            className="block text-sm font-medium"
          >
            Description{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
            <Textarea
              id="collection-description"
              name="collection-description"
              className="mt-2"
              placeholder="What belongs here?"
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button>Create collection</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function CollectionActions({
  onRename,
  onArchive,
  onAdd,
}: {
  onRename: () => void;
  onArchive: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onRename}>
        <Pencil className="size-4" />
        Rename
      </Button>
      <Button variant="outline" size="sm" onClick={onArchive}>
        <Archive className="size-4" />
        Archive
      </Button>
      <Button size="sm" onClick={onAdd}>
        <Plus className="size-4" />
        Add item
      </Button>
    </div>
  );
}

export function ArchiveCollectionDialog({
  collection,
  open,
  onOpenChange,
  onArchive,
}: {
  collection: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchive: (id: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Archive “{collection.title}”?</DialogTitle>
        <DialogDescription>
          It will leave your workspace overview, but its references remain
          available to restore later.
        </DialogDescription>
        <div className="mt-7 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Keep collection
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              onArchive(collection.id);
              onOpenChange(false);
            }}
          >
            Archive
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RenameCollectionDialog({
  collection,
  open,
  onOpenChange,
  onRename,
}: {
  collection: Collection;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: (id: string, title: string) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle>Rename collection</DialogTitle>
        <form
          noValidate
          className="mt-7 space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            const title = String(
              new FormData(event.currentTarget).get("title") || "",
            ).trim();
            if (!title) return;
            onRename(collection.id, title);
            onOpenChange(false);
          }}
        >
          <label className="block text-sm font-medium" htmlFor="rename-title">
            Collection name
            <Input
              id="rename-title"
              name="title"
              className="mt-2"
              defaultValue={collection.title}
            />
          </label>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save name</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
