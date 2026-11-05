import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio — Vamsi Poluru",
  description: "A personal portfolio and interactive collection of Vamsi Poluru's GitHub projects.",
  openGraph: {
    title: "Portfolio — Vamsi Poluru",
    description: "Explore projects, technologies, and open-source work.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
