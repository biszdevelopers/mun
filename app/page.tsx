import { ArrowDown, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import LatestAlert from "./components/LatestAlert";
import HeroScroll from "./components/HeroScroll";
import HomeNavigation from "./components/HomeNavigation";
import { Globe } from "./components/LoadingOverlay";
import HomeLoadingOverlay from "./components/HomeLoadingOverlay";
import { Button } from "./components/ui/button";
import { getHeroTheme, getHeroThemeDescription, getLatestEvent } from "./lib/events";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "BISZ MUN",
  description: "BISZ Model United Nations.",
};

export default function Home() {
  return (
    <>
      <HomeLoadingOverlay />
      <HeroScroll theme={<Suspense fallback={null}><HomeTheme /></Suspense>} theme_description={<Suspense fallback={null}><HomeThemeDescription /></Suspense>}>
        <section className={styles.hero}>
          <Suspense fallback={null}>
            <HomeContent />
          </Suspense>
          <div className={styles.scrollCue}>
            <span>Scroll for more</span>
            <ArrowDown aria-hidden="true" size={20} strokeWidth={1.5} />
          </div>
        </section>
      </HeroScroll>
    </>
  );
}

async function HomeTheme() {
  await connection();
  return getHeroTheme();
}

async function HomeThemeDescription() {
  await connection();
  return getHeroThemeDescription();
}

async function HomeContent() {

  // sec 1
  await connection();
  const event = await getLatestEvent();

  return (
    <>
      <Globe className={styles.globe} />
      <nav className={styles.bookmark} aria-label="Main navigation">
        <HomeNavigation />
      </nav>
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
