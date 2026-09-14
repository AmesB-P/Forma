import { Suspense } from "react";
import { FormaApp } from "@/components/forma-app";

export const metadata = { title: "Search — Forma" };
export default function Page() {
  return (
    <Suspense>
      <FormaApp view="search" />
    </Suspense>
  );
}
