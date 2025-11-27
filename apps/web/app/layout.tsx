import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LyricLingua Admin",
  description: "LyricLingua Administration Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--ll-bg)] text-[var(--ll-text)] antialiased">
        {children}
      </body>
    </html>
  );
}
