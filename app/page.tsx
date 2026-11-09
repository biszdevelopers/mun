import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";

import LatestAlert from "./components/LatestAlert";
import { Globe } from "./components/LoadingOverlay";
import { Button } from "./components/ui/button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BISZ MUN",
  description: "BISZ Model United Nations.",
};

export default function Home() {
  return (
    <main className={styles.hero} data-page-theme="light">
      <Globe className={styles.globe} />
      <div className={styles.bookmark} />
      <LatestAlert
        className={`${styles.alert}`}
        date="November 9th, 2026"
        dateTime="2026-11-09"
        title="Committee Applications Open"
        body="MUN committee applications are now open! Apply to be a part of BISZ MUN 2027."
      >
        <Button asChild className="mt-2">
          <a href="https://bisz.dev/Committees2027" target="_blank" rel="noopener noreferrer">
            Committee Applications
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      </LatestAlert>
      <div className={styles.heading}>
        <h1 className={styles.title}>BISZ<span className={styles.mun}>MUN</span></h1>
        <time className={`text-serif ${styles.date}`} dateTime="2026-02-27">
          February 27th, 2026
        </time>
      </div>
    </main>
  );
}
