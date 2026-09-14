"use client";

import { useState } from "react";
import { CollectionView } from "@/components/forma/collection-view";
import { AddItemDialog } from "@/components/forma/dialogs";
import { ItemView } from "@/components/forma/item-view";
import { OverviewView } from "@/components/forma/overview-view";
import { SearchView } from "@/components/forma/search-view";
import { WorkspaceShell } from "@/components/forma/shell";
import { useWorkspace } from "@/lib/use-workspace";

type View = "overview" | "collection" | "search" | "item";

export function FormaApp({ view, id }: { view: View; id?: string }) {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const workspace = useWorkspace();

  return (
    <WorkspaceShell onAddItem={() => setIsAddItemDialogOpen(true)}>
      {view === "overview" ? (
        <OverviewView
          collections={workspace.visibleCollections}
          items={workspace.items}
          onCreate={workspace.createCollection}
        />
      ) : view === "collection" ? (
        <CollectionView
          id={id!}
          collections={workspace.collections}
          items={workspace.items}
          onAdd={() => setIsAddItemDialogOpen(true)}
          onArchive={workspace.archiveCollection}
          onRename={workspace.renameCollection}
        />
      ) : view === "search" ? (
        <SearchView
          collections={workspace.visibleCollections}
          items={workspace.items}
        />
      ) : (
        <ItemView
          id={id!}
          collections={workspace.collections}
          items={workspace.items}
        />
      )}
      <AddItemDialog
        open={isAddItemDialogOpen}
        onOpenChange={setIsAddItemDialogOpen}
        collections={workspace.visibleCollections}
        onSave={workspace.saveItem}
        collectionId={view === "collection" ? id : undefined}
      />
    </WorkspaceShell>
  );
}
