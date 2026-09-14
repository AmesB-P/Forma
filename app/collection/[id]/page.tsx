import { FormaApp } from "@/components/forma-app";
import { collections } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection = collections.find((entry) => entry.id === id);
  return { title: `${collection?.title ?? "Collection"} — Forma` };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FormaApp view="collection" id={id} />;
}
