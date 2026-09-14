/* eslint-disable @next/next/no-img-element -- static reference images retain their reserved geometry without the optimizer. */
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Collection, FormaItem } from "@/lib/data";
import { itemTypeMeta } from "@/lib/forma-types";

export function ItemView({
  id,
  collections,
  items,
}: {
  id: string;
  collections: Collection[];
  items: FormaItem[];
}) {
  const item = items.find((entry) => entry.id === id) || items[0];
  const collection = collections.find(
    (entry) => entry.id === item.collectionId,
  )!;
  const Icon = itemTypeMeta[item.type].icon;
  return (
    <main className="view-enter mx-auto max-w-[1184px] px-5 py-8 md:px-8 lg:px-14">
      <Link
        href={`/collection/${collection.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {collection.title}
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
        <ReferencePreview item={item} />
        <aside className="lg:py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="size-4" />
            {itemTypeMeta[item.type].label}
          </div>
          <h1 className="mt-4 font-editorial text-4xl leading-tight">
            {item.title}
          </h1>
          <p className="mt-6 text-sm leading-7">{item.note}</p>
          {(item.type === "link" || item.type === "image") && (
            <a
              href={item.content}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-4"
            >
              Open source <ExternalLink className="size-4" />
            </a>
          )}
          <ItemMetadata item={item} collection={collection} />
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

function ReferencePreview({ item }: { item: FormaItem }) {
  const textTone = item.tone === "peach" ? "bg-peach/65" : "bg-blue/55";
  return (
    <div className="relative min-h-[440px] overflow-hidden rounded-surface bg-white/50 shadow-board">
      {item.type === "image" ? (
        <img
          src={item.content}
          alt="Sunlit neutral armchair reference"
          className="absolute inset-0 block size-full object-cover"
        />
      ) : item.type === "color" ? (
        <div
          className="grid min-h-[520px] place-items-center"
          style={{ background: item.content }}
        >
          <span className="rounded-full bg-white/85 px-4 py-2 font-medium">
            {item.content}
          </span>
        </div>
      ) : item.type === "type" ? (
        <div className="grid min-h-[520px] place-items-center font-editorial text-[10rem]">
          {item.content}
        </div>
      ) : (
        <div
          className={`flex min-h-[520px] items-center p-10 sm:p-16 ${textTone}`}
        >
          <p className="font-editorial text-4xl leading-tight sm:text-5xl">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
}

function ItemMetadata({
  item,
  collection,
}: {
  item: FormaItem;
  collection: Collection;
}) {
  return (
    <dl className="mt-10 border-t border-border pt-6 text-sm">
      <MetadataRow label="Collection" value={collection.title} />
      <MetadataRow label="Added" value={item.createdAt} />
      <MetadataRow label="Updated" value={item.updatedAt} />
    </dl>
  );
}

function MetadataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
