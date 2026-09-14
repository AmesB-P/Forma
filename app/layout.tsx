import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Forma — Make room for your next idea",
  description: "A calm workspace for creative references.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="paper-noise font-sans antialiased">{children}</body>
    </html>
  );
}
