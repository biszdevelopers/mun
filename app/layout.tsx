import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import "./globals.css";

const geologica = localFont({
  src: [
    { path: "./fonts/Geologica-Regular.woff2", weight: "400" },
    { path: "./fonts/Geologica-SemiBold.woff2", weight: "600" },
    { path: "./fonts/Geologica-Bold.woff2", weight: "700" },
  ],
  display: "swap",
});

const notoSerif = localFont({
  src: [
    { path: "./fonts/NotoSerif-Medium.woff2", weight: "500" },
    { path: "./fonts/NotoSerif-Black.woff2", weight: "900" },
  ],
  display: "swap",
  variable: "--font-noto-serif",
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "MISZMUN",
  description: "MUN website",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${geologica.className} ${notoSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
