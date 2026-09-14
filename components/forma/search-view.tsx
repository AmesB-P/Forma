import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import type { Collection, FormaItem } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CollectionCard, ReferenceCard } from "./cards";

export function SearchView({
  collections,
  items,
}: {
  collections: Collection[];
  items: FormaItem[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const normalizedQuery = query.toLowerCase();
  const matchingItems = useMemo(
    () =>
      !query
        ? items
        : items.filter((item) =>
            `${item.title} ${item.content} ${item.note} ${item.tags.join(" ")}`
              .toLowerCase()
              .includes(normalizedQuery),
          ),
    [items, normalizedQuery, query],
  );
  const matchingCollections = useMemo(
    () =>
      !query
        ? []
        : collections.filter((collection) =>
            `${collection.title} ${collection.description}`
              .toLowerCase()
              .includes(normalizedQuery),
          ),
    [collections, normalizedQuery, query],
  );
  const totalMatches = matchingItems.length + matchingCollections.length;
  const updateQuery = (value: string) =>
    router.replace(
      value ? `/search?q=${encodeURIComponent(value)}` : "/search",
    );

  return (
    <main className="view-enter mx-auto max-w-[1184px] px-5 py-10 md:px-8 md:py-14 lg:px-14">
      <h1 className="font-editorial text-5xl tracking-[-.03em]">
        Find an idea
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Search titles, notes, and tags across your workspace.
      </p>
      <div className="relative mt-10">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label="Search workspace"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          className="h-14 rounded-surface bg-white/55 pl-12 pr-12 text-base"
          placeholder="Try “material”, “light”, or “type”…"
        />
        {query && (
          <button
            onClick={() => updateQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-control hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium">
          {query
            ? `${totalMatches} ${totalMatches === 1 ? "match" : "matches"}`
            : "Everything, for now"}
        </h2>
        <span className="text-xs text-muted-foreground">Items</span>
      </div>
      {matchingCollections.length > 0 && (
        <section className="mt-4" aria-label="Matching collections">
          <p className="mb-3 text-xs text-muted-foreground">Collections</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {matchingCollections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                items={items}
              />
            ))}
          </div>
        </section>
      )}
      {matchingItems.length ? (
        <div className="mt-4 grid auto-rows-[205px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matchingItems.map((item, index) => (
            <ReferenceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <EmptySearch onClear={() => updateQuery("")} />
      )}
    </main>
  );
}

function EmptySearch({ onClear }: { onClear: () => void }) {
  return (
    <div className="mt-4 rounded-surface border border-dashed border-border py-20 text-center">
      <Search className="mx-auto size-6 text-muted-foreground" />
      <h2 className="mt-4 font-editorial text-2xl">No references found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try a broader word or clear the search.
      </p>
      <Button variant="outline" className="mt-5" onClick={onClear}>
        Clear search
      </Button>
    </div>
  );
}
