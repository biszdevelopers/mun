"use client";

import { sitePath } from "../lib/site-path";

import { useId } from "react";
import { ExternalLink } from "lucide-react";

import styles from "./FooterMenu.module.css";

type FooterMenuProps = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export default function FooterMenu({ title, links }: FooterMenuProps) {
  const titleId = useId();

  return (
    <nav className={styles.menu} aria-labelledby={titleId}>
      <h3 id={titleId} className={styles.title}>{title}</h3>
      <ul className={styles.links}>
        {links.map(({ label, href, external }) => (
          <li key={label}>
            <a
              href={sitePath(href)}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={(event) => { if (!href) event.preventDefault(); }}
            >
              {label}
              {external && <ExternalLink className={styles.externalIcon} aria-hidden="true" />}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
