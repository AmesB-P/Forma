"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Archive,
  ArrowLeft,
  BookOpen,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link2,
  Palette,
  PanelLeft,
  Pin,
  Plus,
  Search,
  Type,
  X,
} from "lucide-react";
import {
  collections as seedCollections,
  items as seedItems,
  type Collection,
  type FormaItem,
  type ItemType,
} from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const typeMeta: Record<ItemType, { label: string; icon: typeof ImageIcon }> = {
  image: { label: "Image", icon: ImageIcon },
  link: { label: "Link", icon: Link2 },
  note: { label: "Note", icon: FileText },
  color: { label: "Color", icon: Palette },
  type: { label: "Type", icon: Type },
};
function Mark() {
  return (
    <span className="grid size-8 place-items-center rounded-[38%_62%_55%_45%] bg-olive text-sm font-semibold text-ink">
      f
    </span>
  );
}
function Nav({ mobile = false }: { mobile?: boolean }) {
  const path = usePathname();
  const links = [
    { href: "/", label: "Workspace", icon: PanelLeft },
    { href: "/search", label: "Search", icon: Search },
  ];
  return (
    <nav
      aria-label="Main navigation"
      className={
        mobile
          ? "fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-surface border border-white/15 bg-primary p-2 text-primary-foreground shadow-board md:hidden"
          : "hidden h-dvh w-[248px] shrink-0 flex-col bg-primary px-4 py-6 text-primary-foreground md:flex"
      }
    >
      <Link
        href="/"
        className={
          mobile
            ? "hidden"
            : "mb-12 flex items-center gap-3 px-2 text-lg font-semibold"
        }
      >
        <Mark />
        forma
      </Link>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`${mobile ? "flex min-w-24 flex-col items-center gap-1 rounded-control px-3 py-2 text-[11px]" : "mb-1 flex items-center gap-3 rounded-control px-3 py-2.5 text-sm"} ${path === href ? "bg-white/14 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"}`}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
      {!mobile && (
        <div className="mt-auto px-3 text-xs leading-5 text-white/55">
          A quiet place for
          <br />
          unfinished ideas.
        </div>
      )}
    </nav>
  );
}
function Shell({
  children,
  onAdd,
}: {
  children: React.ReactNode;
  onAdd: () => void;
}) {
  return (
    <div className="min-h-dvh md:flex">
      <Nav />
      <div className="min-w-0 flex-1 pb-24 md:pb-0">
        <header className="flex h-16 items-center justify-between border-b border-border/70 px-5 md:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold md:hidden"
          >
            <Mark />
            forma
          </Link>
          <span className="hidden text-xs text-muted-foreground md:block">
            Personal workspace
          </span>
          <Button size="sm" onClick={onAdd}>
            <Plus className="size-4" />
            Add item
          </Button>
        </header>
        {children}
      </div>
      <Nav mobile />
    </div>
  );
}
function ItemCard({ item, index = 0 }: { item: FormaItem; index?: number }) {
  const Icon = typeMeta[item.type].icon;
  const tall = item.type === "image" || index % 5 === 2;
  return (
    <Link
      href={`/item/${item.id}`}
      className={`group relative flex min-h-52 cursor-pointer flex-col overflow-hidden rounded-surface border border-ink/8 bg-white/55 transition-[transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${tall ? "sm:row-span-2 sm:min-h-[430px]" : ""} hover:-translate-y-0.5 hover:shadow-board`}
      aria-label={`Open ${item.title}`}
    >
      {item.type === "image" ? (
        <Image
          src={item.content}
          alt="Sunlit neutral armchair reference"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="h-full min-h-52 w-full object-cover"
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
          {typeMeta[item.type].label}
        </div>
        <h3 className="mt-1 font-medium">{item.title}</h3>
      </div>
    </Link>
  );
}
function CollectionCard({ collection }: { collection: Collection }) {
  const sample = seedItems
    .filter((i) => i.collectionId === collection.id)
    .slice(0, 3);
  return (
    <Link
      href={`/collection/${collection.id}`}
      className="group block cursor-pointer rounded-surface border border-border/80 bg-white/35 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="grid h-40 grid-cols-2 gap-1.5 overflow-hidden rounded-[10px] bg-muted p-1.5">
        {sample.length ? (
          sample.map((i, n) => (
            <div
              key={i.id}
              className={`${n === 0 ? "row-span-2" : ""} relative overflow-hidden rounded-md`}
              style={{
                background:
                  i.type === "color"
                    ? i.content
                    : i.tone === "peach"
                      ? "#e5b49c"
                      : i.tone === "blue"
                        ? "#91a7b0"
                        : "#fffefa",
              }}
            >
              {i.type === "image" && (
                <Image
                  src={i.content}
                  alt=""
                  fill
                  sizes="180px"
                  className="h-full w-full object-cover"
                />
              )}
              {i.type === "note" && (
                <span className="block p-3 font-editorial text-sm leading-snug">
                  {i.content.slice(0, 44)}…
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

function AddItemDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  collectionId?: string;
}) {
  const [type, setType] = useState<ItemType>("image");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("title") || !fd.get("content")) {
      setError(
        "Add a title and the reference content so you can find it later.",
      );
      titleRef.current?.focus();
      return;
    }
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
          <fieldset>
            <legend className="mb-2 text-sm font-medium">Reference type</legend>
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.keys(typeMeta) as ItemType[]).map((key) => {
                const Icon = typeMeta[key].icon;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setType(key)}
                    aria-pressed={type === key}
                    className={`flex min-h-16 cursor-pointer flex-col items-center justify-center gap-1 rounded-control border text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${type === key ? "border-primary bg-primary text-white" : "border-border bg-white/35 hover:bg-white/70"}`}
                  >
                    <Icon className="size-4" />
                    {typeMeta[key].label}
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
            {type === "image" || type === "link"
              ? "Source URL"
              : type === "color"
                ? "Hex color"
                : type === "type"
                  ? "Type sample"
                  : "Note"}
            <Input
              id="item-content"
              name="content"
              className="mt-2"
              placeholder={
                type === "color"
                  ? "#A8AD8E"
                  : type === "note"
                    ? "Write the thought worth keeping…"
                    : "https://"
              }
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

function Overview() {
  const [create, setCreate] = useState(false);
  return (
    <main className="view-enter mx-auto max-w-[1260px] px-5 py-10 md:px-8 md:py-14 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Monday, September 14</p>
          <h1 className="mt-3 max-w-2xl font-editorial text-5xl leading-[1.02] tracking-[-.035em] sm:text-6xl">
            Make room for your next idea.
          </h1>
        </div>
        <Button variant="outline" onClick={() => setCreate(true)}>
          <Plus className="size-4" />
          New collection
        </Button>
      </div>
      <section className="mt-16">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-editorial text-2xl">Pinned collections</h2>
          <span className="text-xs text-muted-foreground">
            {seedCollections.filter((c) => c.pinned).length} collections
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {seedCollections
            .filter((c) => c.pinned)
            .map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="mb-5 font-editorial text-2xl">Recent</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {seedCollections
            .filter((c) => !c.pinned)
            .map((c) => (
              <CollectionCard key={c.id} collection={c} />
            ))}
        </div>
      </section>
      <Dialog open={create} onOpenChange={setCreate}>
        <DialogContent>
          <DialogTitle>Start a collection</DialogTitle>
          <DialogDescription>
            Give this body of references a clear, useful name.
          </DialogDescription>
          <form
            noValidate
            className="mt-7 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setCreate(false);
            }}
          >
            <label
              htmlFor="collection-name"
              className="block text-sm font-medium"
            >
              Collection name
              <Input
                id="collection-name"
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
                className="mt-2"
                placeholder="What belongs here?"
              />
            </label>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCreate(false)}
              >
                Cancel
              </Button>
              <Button>Create collection</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
function CollectionView({ id, onAdd }: { id: string; onAdd: () => void }) {
  const collection =
    seedCollections.find((c) => c.id === id) || seedCollections[0];
  const list = seedItems.filter((i) => i.collectionId === collection.id);
  const [archive, setArchive] = useState(false);
  return (
    <main className="view-enter mx-auto max-w-[1400px] px-5 py-8 md:px-8 lg:px-12">
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setArchive(true)}>
            <Archive className="size-4" />
            Archive
          </Button>
          <Button size="sm" onClick={onAdd}>
            <Plus className="size-4" />
            Add item
          </Button>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between border-y border-border/70 py-3">
        <div className="flex gap-2">
          <button className="cursor-pointer rounded-full bg-ink px-3 py-1.5 text-xs text-white">
            All {list.length}
          </button>
          {["Images", "Notes", "Palette"].map((x) => (
            <button
              key={x}
              className="cursor-pointer rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {x}
            </button>
          ))}
        </div>
        <span className="hidden text-xs text-muted-foreground sm:inline">
          Updated {collection.updatedAt}
        </span>
      </div>
      {list.length ? (
        <div className="mt-7 grid auto-rows-[205px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
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
      )}
      <Dialog open={archive} onOpenChange={setArchive}>
        <DialogContent className="max-w-md">
          <DialogTitle>Archive “{collection.title}”?</DialogTitle>
          <DialogDescription>
            It will leave your workspace overview, but its references remain
            available to restore later.
          </DialogDescription>
          <div className="mt-7 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setArchive(false)}>
              Keep collection
            </Button>
            <Button variant="warning" onClick={() => setArchive(false)}>
              Archive
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
function SearchView() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") || "";
  const result = useMemo(
    () =>
      q
        ? seedItems.filter((i) =>
            (i.title + " " + i.content + " " + i.note + " " + i.tags.join(" "))
              .toLowerCase()
              .includes(q.toLowerCase()),
          )
        : seedItems,
    [q],
  );
  function setQ(v: string) {
    router.replace(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
  }
  return (
    <main className="view-enter mx-auto max-w-[1120px] px-5 py-10 md:px-8 md:py-14 lg:px-12">
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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-14 rounded-surface bg-white/55 pl-12 pr-12 text-base"
          placeholder="Try “material”, “light”, or “type”…"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-control hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-medium">
          {q
            ? `${result.length} ${result.length === 1 ? "match" : "matches"}`
            : "Everything, for now"}
        </h2>
        <span className="text-xs text-muted-foreground">Items</span>
      </div>
      {result.length ? (
        <div className="mt-4 grid auto-rows-[205px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((item, i) => (
            <ItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-surface border border-dashed border-border py-20 text-center">
          <Search className="mx-auto size-6 text-muted-foreground" />
          <h2 className="mt-4 font-editorial text-2xl">No references found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a broader word or clear the search.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => setQ("")}>
            Clear search
          </Button>
        </div>
      )}
    </main>
  );
}
function ItemView({ id }: { id: string }) {
  const item = seedItems.find((i) => i.id === id) || seedItems[0];
  const collection = seedCollections.find((c) => c.id === item.collectionId)!;
  const Icon = typeMeta[item.type].icon;
  return (
    <main className="view-enter mx-auto max-w-[1200px] px-5 py-8 md:px-8 lg:px-12">
      <Link
        href={`/collection/${collection.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {collection.title}
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
        <div className="relative min-h-[440px] overflow-hidden rounded-surface bg-white/50 shadow-board">
          {item.type === "image" ? (
            <Image
              src={item.content}
              alt="Sunlit neutral armchair reference"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="h-full min-h-[440px] w-full object-cover"
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
              className={`flex min-h-[520px] items-center p-10 sm:p-16 ${item.tone === "peach" ? "bg-peach/65" : "bg-blue/55"}`}
            >
              <p className="font-editorial text-4xl leading-tight sm:text-5xl">
                {item.content}
              </p>
            </div>
          )}
        </div>
        <aside className="lg:py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="size-4" />
            {typeMeta[item.type].label}
          </div>
          <h1 className="mt-4 font-editorial text-4xl leading-tight">
            {item.title}
          </h1>
          <p className="mt-6 text-sm leading-7">{item.note}</p>
          {item.type === "link" || item.type === "image" ? (
            <a
              href={item.content}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-4"
            >
              Open source <ExternalLink className="size-4" />
            </a>
          ) : null}
          <dl className="mt-10 border-t border-border pt-6 text-sm">
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-muted-foreground">Collection</dt>
              <dd>{collection.title}</dd>
            </div>
            <div className="flex justify-between gap-4 py-2">
              <dt className="text-muted-foreground">Added</dt>
              <dd>{item.createdAt}</dd>
            </div>
          </dl>
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
export function FormaApp({
  view,
  id,
}: {
  view: "overview" | "collection" | "search" | "item";
  id?: string;
}) {
  const [add, setAdd] = useState(false);
  return (
    <Shell onAdd={() => setAdd(true)}>
      {view === "overview" ? (
        <Overview />
      ) : view === "collection" ? (
        <CollectionView id={id!} onAdd={() => setAdd(true)} />
      ) : view === "search" ? (
        <SearchView />
      ) : (
        <ItemView id={id!} />
      )}
      <AddItemDialog
        open={add}
        onOpenChange={setAdd}
        collectionId={view === "collection" ? id : undefined}
      />
    </Shell>
  );
}
