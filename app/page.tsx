import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import LatestAlert from "./components/LatestAlert";
import LoadingOverlay, { Globe } from "./components/LoadingOverlay";
import { Button } from "./components/ui/button";
import { getLatestEvent } from "./lib/events";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BISZ MUN",
  description: "BISZ Model United Nations.",
};

export default function Home() {
  return (
    <main className={styles.hero} data-page-theme="light">
      <LoadingOverlay className={styles.loading} />
      <Suspense fallback={null}>
        <HomeContent />
      </Suspense>
    </main>
  );
}

async function HomeContent() {
  await connection();
  const event = await getLatestEvent();

  return (
    <>
      <Globe className={styles.globe} />
      <div className={styles.bookmark} />
      {event && (
        <LatestAlert
          className={styles.alert}
          date={event.date}
          dateTime={event.dateTime}
          title={event.title}
          body={event.body}
        >
          {event.applicationLink && (
            <Button asChild className="mt-2">
              <a href={event.applicationLink.href} target="_blank" rel="noopener noreferrer">
                {event.applicationLink.label}
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          )}
        </LatestAlert>
      )}
      <div className={styles.heading}>
        <h1 className={styles.title}>BISZ<span className={styles.mun}>MUN</span></h1>
        <time className={`text-serif ${styles.date}`} dateTime="2026-02-27">
          February 27th, 2026
        </time>
      </div>
    </>
  );
}
