import { useState } from "react";
import { Plus } from "lucide-react";
import type { Collection, FormaItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { CollectionCard } from "./cards";
import { CreateCollectionDialog } from "./dialogs";

export function OverviewView({
  collections,
  items,
  onCreate,
}: {
  collections: Collection[];
  items: FormaItem[];
  onCreate: (title: string, description: string) => void;
}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const pinnedCollections = collections.filter(
    (collection) => collection.pinned,
  );
  const recentCollections = collections.filter(
    (collection) => !collection.pinned,
  );

  return (
    <main className="view-enter mx-auto max-w-[1184px] px-5 py-10 md:px-8 md:py-14 lg:px-14">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Monday, September 14</p>
          <h1 className="mt-3 max-w-2xl font-editorial text-5xl leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Make room for your next idea.
          </h1>
        </div>
        <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="size-4" />
          New collection
        </Button>
      </div>
      <CollectionSection
        title="Pinned collections"
        count={pinnedCollections.length}
        collections={pinnedCollections}
        items={items}
        className="mt-16"
      />
      <CollectionSection
        title="Recent"
        collections={recentCollections}
        items={items}
        className="mt-14"
      />
      <CreateCollectionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={onCreate}
      />
    </main>
  );
}

function CollectionSection({
  title,
  count,
  collections,
  items,
  className,
}: {
  title: string;
  count?: number;
  collections: Collection[];
  items: FormaItem[];
  className: string;
}) {
  return (
    <section className={className}>
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-editorial text-2xl">{title}</h2>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground">
            {count} collections
          </span>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            items={items}
          />
        ))}
      </div>
    </section>
  );
}
