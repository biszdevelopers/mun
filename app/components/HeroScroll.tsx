"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

import sectionThree from "../content/section-3.json";
import styles from "../page.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const collageRevealOrder = [4, 0, 8, 2, 6, 3, 1, 7, 5];

function CTATheme({ theme, theme_description }: { theme: ReactNode; theme_description: ReactNode }) {
  return (
    <div className={styles.ctaTheme}>
      <h2 className={styles.ctaThemeTitle}>
        {theme}
      </h2>
      <p className={styles.ctaThemeDescription}>
        {theme_description}
      </p>
    </div>
  );
}

export default function HeroScroll({ children, theme, theme_description }: { children: ReactNode; theme: ReactNode; theme_description: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const collage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctaPanel = panel.current;
    const collageElement = collage.current;
    if (!ctaPanel || !collageElement) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(ctaPanel, { y: 0, yPercent: 100 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: () => `+=${ctaPanel.offsetHeight}`,
          scrub: true,
        },
      });

      const tiles = collageElement.querySelectorAll(`.${styles.collageTile}`);
      const orderedTiles = collageRevealOrder.map((index) => tiles[index]);

      gsap.timeline({
        defaults: { stagger: 0.11 },
        scrollTrigger: {
          trigger: collageElement,
          start: "bottom bottom",
          once: true,
        },
      })
        .fromTo(orderedTiles, { z: -220 }, {
          z: 0,
          clearProps: "transform",
          duration: 2,
          ease: "power2.out",
        }, 0)
        .to(orderedTiles, {
          opacity: 1,
          duration: 1.3,
          ease: "power2.out",
        }, 0);
    });

    return () => media.revert();
  }, { scope: scene });

  return (
    <main data-page-theme="light">
      <div ref={scene} className={styles.scrollScene}>
        <div className={styles.scrollStage}>
          {children}
          <div ref={panel} className={styles.primaryPanel}>
            <CTATheme theme={theme} theme_description={theme_description} />
          </div>
        </div>
      </div>

      <section id="section-3" className={styles.sectionThree} aria-labelledby="section-3-title">
        <div className={styles.sectionThreeCopy}>
          <h2 id="section-3-title">{sectionThree.title}</h2>
          <p>{sectionThree.description}</p>
        </div>
        <div ref={collage} className={styles.collage} aria-hidden="true">
          <div className={styles.collageArtwork}>
            <div className={`${styles.collageTile} ${styles.topLeft}`} />
            <div className={`${styles.collageTile} ${styles.topMiddle}`} />
            <div className={`${styles.collageTile} ${styles.topRight}`} />
            <div className={`${styles.collageTile} ${styles.middleLeft}`} />
            <div className={`${styles.collageTile} ${styles.middleCenter}`} />
            <div className={`${styles.collageTile} ${styles.middleRight}`} />
            <div className={`${styles.collageTile} ${styles.bottomLeft}`} />
            <div className={`${styles.collageTile} ${styles.bottomCenter}`} />
            <div className={`${styles.collageTile} ${styles.bottomRight}`} />
          </div>
        </div>
      </section>
    </main>
  );
}
