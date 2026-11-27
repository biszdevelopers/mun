"use client";

import { useEffect, useState } from "react";

import { loadSectionImages } from "../lib/section-images";
import { amethyst, preloadGem } from "../lib/gem-renderer";
import styles from "../page.module.css";
import { emojiImageSources } from "./CommitteeSections";
import { sectionThreeImages } from "./HeroScroll";
import LoadingOverlay from "./LoadingOverlay";

function decodeImages(sources: string[]) {
  return Promise.allSettled(
    sources.map((source) => {
      const image = new Image();
      image.src = source;
      return image.decode();
    }),
  );
}

export default function HomeLoadingOverlay() {
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const bill = new Image();
    bill.src = "/images/hundred-dollar-bill-2025.webp";
    const gem = document.querySelector<HTMLCanvasElement>(
      '[data-home-gem="amethyst"]',
    );
    // Include shader compilation and the actual gem's first frame in the loader.
    void Promise.allSettled([
      loadSectionImages(sectionThreeImages),
      bill.decode(),
      gem ? preloadGem(gem, amethyst) : Promise.resolve(),
      decodeImages(emojiImageSources),
    ]).then(() => {
      if (active) setAssetsReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <LoadingOverlay
      className={`${styles.loading}${assetsReady ? ` ${styles.imagesReady}` : ""}`}
    />
  );
}
