"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./article.module.css";
import WikiTopbar from "./WikiTopbar";

type Heading = { id: string; title: string; level: number };

export default function WikiShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState("Wiki");
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    function updateOutline() {
      if (!content) return;
      setTitle(
        (
          content.querySelector("[data-article-title]") ??
          content.querySelector("h1")
        )?.textContent ?? "Wiki",
      );
      const used = new Set<string>();
      const outline = Array.from(content.querySelectorAll("h2, h3")).map(
        (heading) => {
          const title = heading.textContent ?? "";
          const base =
            heading.id ||
            title
              .toLowerCase()
              .replace(/[^\p{L}\p{N}]+/gu, "-")
              .replace(/^-|-$/g, "") ||
            "section";
          let id = base;
          let suffix = 2;
          while (used.has(id)) id = `${base}-${suffix++}`;
          used.add(id);
          heading.id = id;
          return { id, title, level: Number(heading.tagName.slice(1)) };
        },
      );
      setHeadings(outline);
    }
    updateOutline();
    const observer = new MutationObserver(updateOutline);
    observer.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={styles.wiki} data-page-layout="wiki">
      <a className={styles.skip} href="#article-content">
        Skip to content
      </a>
      <WikiTopbar />
      <div className={styles.grid}>
        <aside className={styles.outline}>
          <div className={styles.sectionLabel}>Contents</div>
          <nav aria-label="Table of contents">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={heading.level === 3 ? styles.subheading : undefined}
              >
                {heading.title}
              </a>
            ))}
          </nav>
        </aside>
        <main id="article-content" className={styles.main}>
          <div ref={contentRef}>{children}</div>
        </main>
      </div>
    </div>
  );
}
