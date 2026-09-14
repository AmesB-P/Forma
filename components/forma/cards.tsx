/* eslint-disable @next/next/no-img-element -- static reference images retain their reserved geometry without the optimizer. */
import Link from "next/link";
import { Pin } from "lucide-react";
import type { Collection, FormaItem } from "@/lib/data";
import { itemTypeMeta } from "@/lib/forma-types";

export function ReferenceCard({
  item,
  index = 0,
}: {
  item: FormaItem;
  index?: number;
}) {
  const Icon = itemTypeMeta[item.type].icon;
  const tall = item.type === "image" || index % 5 === 2;

  return (
    <Link
      href={`/item/${item.id}`}
      className={`group relative flex min-h-52 cursor-pointer flex-col overflow-hidden rounded-surface border border-ink/8 bg-white/55 transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tall ? "sm:row-span-2 sm:min-h-[430px]" : ""} hover:-translate-y-0.5 hover:shadow-board`}
      aria-label={`Open ${item.title}`}
    >
      {item.type === "image" ? (
        <img
          src={item.content}
          alt="Sunlit neutral armchair reference"
          className="absolute inset-0 block size-full object-cover"
        />
      ) : item.type === "color" ? (
        <div
          className="flex flex-1 items-end p-5"
          style={{ background: item.content }}
        >
          <span className="rounded-full bg-white/80 px-2 py-1 text-xs font-medium">
            {item.content}
          </span>
        </div>
      ) : item.type === "type" ? (
        <div className="grid flex-1 place-items-center bg-white p-6 font-editorial text-8xl">
          {item.content}
        </div>
      ) : (
        <div
          className={`flex flex-1 flex-col p-6 ${item.tone === "peach" ? "bg-peach/70" : item.tone === "blue" ? "bg-blue/60" : "bg-white/50"}`}
        >
          <Icon className="mb-auto size-5 opacity-60" />
          <p
            className={`mt-10 ${item.type === "note" ? "font-editorial text-2xl leading-snug" : "text-sm leading-6"}`}
          >
            {item.content}
          </p>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 p-4 text-white transition-transform group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <div className="flex items-center gap-2 text-xs text-white/65">
          <Icon className="size-3.5" />
          {itemTypeMeta[item.type].label}
        </div>
        <h3 className="mt-1 font-medium">{item.title}</h3>
      </div>
    </Link>
  );
}

export function CollectionCard({
  collection,
  items,
}: {
  collection: Collection;
  items: FormaItem[];
}) {
  const sample = items
    .filter((item) => item.collectionId === collection.id)
    .slice(0, 3);
  return (
    <Link
      href={`/collection/${collection.id}`}
      className="group block cursor-pointer rounded-surface border border-border/80 bg-white/35 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="grid h-40 grid-cols-2 gap-1.5 overflow-hidden rounded-[10px] bg-muted p-1.5">
        {sample.length ? (
          sample.map((item, index) => (
            <div
              key={item.id}
              className={`${index === 0 ? "row-span-2" : ""} relative overflow-hidden rounded-md`}
              style={{
                background:
                  item.type === "color"
                    ? item.content
                    : item.tone === "peach"
                      ? "#e5b49c"
                      : item.tone === "blue"
                        ? "#91a7b0"
                        : "#fffefa",
              }}
            >
              {item.type === "image" && (
                <img
                  src={item.content}
                  alt=""
                  className="absolute inset-0 block size-full object-cover"
                />
              )}
              {item.type === "note" && (
                <span className="block p-3 font-editorial text-sm leading-snug">
                  {item.content.slice(0, 44)}…
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-2 grid place-items-center text-xs text-muted-foreground">
            Ready for your first reference
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 px-1 pb-1 pt-4">
        <div>
          <h3 className="font-editorial text-xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {collection.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {collection.description}
          </p>
        </div>
        {collection.pinned && (
          <Pin className="mt-1 size-3.5 shrink-0 fill-current text-muted-foreground" />
        )}
      </div>
    </Link>
  );
}
