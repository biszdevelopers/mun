"use client";

import { useEffect, useState } from "react";

import { loadSectionImages } from "../lib/section-images";
import styles from "../page.module.css";
import LoadingOverlay from "./LoadingOverlay";

export default function HomeLoadingOverlay() {
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let active = true;

    // Wait for each image's first working source, including hidden mobile tiles.
    void loadSectionImages().then(() => {
      if (active) setImagesReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <LoadingOverlay
      className={`${styles.loading}${imagesReady ? ` ${styles.imagesReady}` : ""}`}
    />
  );
}
