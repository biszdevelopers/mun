import type { ReactNode } from "react";
import type { Metadata } from "next";
import WikiShell from "./WikiShell";
import BottomBar from "../components/BottomBar";

export const metadata: Metadata = {
  title: { default: "BISZ MUN", template: "%s | BISZ MUN" },
};

export default async function WikiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <WikiShell>{children}</WikiShell>
      <BottomBar />
    </>
  );
}
