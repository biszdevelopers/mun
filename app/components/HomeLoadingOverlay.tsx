"use client";

import { sitePath } from "../lib/site-path";

import { useEffect, useState } from "react";

import { loadSectionImages } from "../lib/section-images";
import { amethyst, preloadGem } from "../lib/gem-renderer";
import styles from "../page.module.css";
import LoadingOverlay from "./LoadingOverlay";

export default function HomeLoadingOverlay() {
  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const bill = new Image();
    bill.src = sitePath("/images/hundred-dollar-bill-2025.webp");
    const gem = document.querySelector<HTMLCanvasElement>('[data-home-gem="amethyst"]');
    // Include shader compilation and the actual gem's first frame in the loader.
    void Promise.allSettled([
      loadSectionImages(),
      bill.decode(),
      gem ? preloadGem(gem, amethyst) : Promise.resolve(),
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
