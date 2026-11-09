import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const geologicaCursive = localFont({
  src: [
    { path: "./fonts/Geologica-Cursive-Regular.woff2", weight: "400" },
    { path: "./fonts/Geologica-Cursive-SemiBold.woff2", weight: "600" },
    { path: "./fonts/Geologica-Cursive-Bold.woff2", weight: "700" },
  ],
  display: "swap",
});

const notoSerif = localFont({
  src: [
    { path: "./fonts/NotoSerif-Regular.woff2", weight: "400" },
    { path: "./fonts/NotoSerif-SemiBold.woff2", weight: "600" },
  ],
  display: "swap",
  variable: "--font-noto-serif",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Next.js Starter",
  description: "A minimal Next.js application.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geologicaCursive.className} ${notoSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
