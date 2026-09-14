import Link from "next/link";
import { PanelLeft, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function Mark() {
  return (
    <span className="grid size-8 place-items-center rounded-[38%_62%_55%_45%] bg-olive text-sm font-semibold text-ink">
      f
    </span>
  );
}

function MainNavigation() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Workspace", icon: PanelLeft },
    { href: "/search", label: "Search", icon: Search },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="hidden h-[calc(100dvh-2rem)] w-[248px] shrink-0 flex-col rounded-surface bg-muted px-4 py-6 text-ink md:sticky md:top-4 md:flex"
    >
      <Link
        href="/"
        className="mb-12 flex items-center gap-3 px-2 text-lg font-semibold"
      >
        <Mark />
        forma
      </Link>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`mb-1 flex items-center gap-3 rounded-control px-3 py-2.5 text-sm ${pathname === href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-paper hover:text-foreground"}`}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
      <div className="mt-auto px-3 text-xs leading-5 text-muted-foreground">
        A quiet place for
        <br />
        unfinished ideas.
      </div>
    </nav>
  );
}

export function WorkspaceShell({
  children,
  onAddItem,
}: {
  children: React.ReactNode;
  onAddItem: () => void;
}) {
  return (
    <div className="min-h-dvh overflow-x-clip bg-background md:flex md:gap-4 md:p-4">
      <MainNavigation />
      <div className="min-w-0 flex-1 bg-paper md:min-h-[calc(100dvh-2rem)] md:rounded-surface md:shadow-board">
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
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search workspace"
              className="grid size-10 place-items-center rounded-control text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            >
              <Search className="size-4" />
            </Link>
            <Button size="sm" onClick={onAddItem}>
              <Plus className="size-4" />
              Add item
            </Button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
