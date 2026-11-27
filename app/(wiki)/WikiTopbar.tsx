"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import Logo from "../components/Logo";
import { footerNavigation } from "../lib/navigation";
import styles from "./WikiTopbar.module.css";
import layoutStyles from "./article.module.css";

export default function WikiTopbar() {
  const [open, setOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function closeOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(null);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`${layoutStyles.grid} ${styles.headerContent}`}>
      <Link href="/" className={styles.logoLink} aria-label="BISZMUN home">
        <Logo className={styles.logo} />
      </Link>
      <nav aria-label="Main navigation" className={styles.navigation}>
        <ul className={styles.items}>
          {footerNavigation.map(({ title, links }) => (
            <li
              key={title}
              className={styles.group}
              onMouseEnter={() => setOpen(title)}
              onMouseLeave={() => setOpen(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setOpen(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(null);
                  event.currentTarget.querySelector("button")?.focus();
                }
              }}
            >
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={open === title}
                aria-controls={`wiki-nav-${title.toLowerCase()}`}
                onClick={() => setOpen(open === title ? null : title)}
              >
                {title}
                <ChevronDown size={12} aria-hidden="true" />
              </button>
              <ul
                id={`wiki-nav-${title.toLowerCase()}`}
                className={styles.dropdown}
                data-open={open === title}
                aria-hidden={open !== title}
                inert={open !== title}
              >
                {links.map(({ label, href, external }) => (
                  <li key={label}>
                    {href ? (
                      <Link
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        onClick={() => setOpen(null)}
                      >
                        {label}
                        {external && (
                          <ExternalLink size={12} aria-hidden="true" />
                        )}
                      </Link>
                    ) : (
                      <span aria-disabled="true">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li>
            <a
              className={styles.external}
              href="https://my.biszmun.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              My BISZMUN
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
}
