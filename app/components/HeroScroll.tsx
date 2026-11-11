"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

import styles from "../page.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function CTATheme({ theme }: { theme: string }) {
  return (
    <div className={styles.ctaTheme}>
      <h2 className={styles.ctaThemeTitle}>
        {theme}
      </h2>
      <p className={styles.ctaThemeDescription}>
        Jayden lee is gay
      </p>
    </div>
  );
}

export default function HeroScroll({ children, theme }: { children: ReactNode; theme: string }) {
  const scene = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(panel.current, { y: 0, yPercent: 100 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scene.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    return () => media.revert();
  }, { scope: scene });

  return (
    <main ref={scene} className={styles.scrollScene} data-page-theme="light">
      <div className={styles.scrollStage}>
        {children}
        <div ref={panel} className={styles.primaryPanel}>
          
          <CTATheme theme={theme} />

        </div>
      </div>
    </main>
  );
}
