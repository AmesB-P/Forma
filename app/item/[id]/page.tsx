import { FormaApp } from "@/components/forma-app";
import { items } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = items.find((entry) => entry.id === id);
  return { title: `${item?.title ?? "Reference"} — Forma` };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FormaApp view="item" id={id} />;
}
