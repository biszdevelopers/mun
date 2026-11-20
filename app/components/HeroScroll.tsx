"use client";

import { sitePath } from "../lib/site-path";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, type ReactNode } from "react";

import sectionThree from "../content/section-3.json";
import styles from "../page.module.css";
import HomeNavigation from "./HomeNavigation";
import BottomBar from "./BottomBar";
import RegistrationSection from "./RegistrationSection";
import CommitteeSections from "./CommitteeSections";
import { Button } from "./ui/button";
import { loadSectionImages } from "../lib/section-images";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const collageRevealOrder = [4, 0, 8, 2, 6, 3, 1, 7, 5];
// Images 1–6 fill the two mobile columns; 7–9 add the desktop right column.
const collageTiles = [
  { position: styles.topLeft, image: "image1" },
  { position: styles.topMiddle, image: "image2" },
  { position: styles.topRight, image: "image7" },
  { position: styles.middleLeft, image: "image3" },
  { position: styles.middleCenter, image: "image4" },
  { position: styles.middleRight, image: "image8" },
  { position: styles.bottomLeft, image: "image5" },
  { position: styles.bottomCenter, image: "image6" },
  { position: styles.bottomRight, image: "image9" },
];

function CTATheme({ theme, theme_description }: { theme: ReactNode; theme_description: ReactNode }) {
  return (
    <div className={styles.ctaTheme}>
      <h2 className={styles.ctaThemeTitle}>
        "{theme}"
      </h2>
      <p className={styles.ctaThemeDescription}>
        {theme_description}
      </p>
      <Button asChild className="mt-6 bg-white text-primary hover:bg-white/90 focus-visible:outline-white">
        <a href={sitePath("/theme")}>See theme details</a>
      </Button>
    </div>
  );
}

export default function HeroScroll({ children, theme, theme_description }: { children: ReactNode; theme: ReactNode; theme_description: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const registrationScene = useRef<HTMLDivElement>(null);
  const committeesPanel = useRef<HTMLElement>(null);
  const collage = useRef<HTMLDivElement>(null);
  const topNavigation = useRef<HTMLElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const [showTopNavigation, setShowTopNavigation] = useState(false);
  const [footerReached, setFooterReached] = useState(false);
  const [imageSources, setImageSources] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    let active = true;
    void loadSectionImages().then((sources) => {
      if (active) setImageSources(sources);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const footer = aboutSection.current?.parentElement?.querySelector("footer");
    if (!footer) return;

    const updateFooterVisibility = () => {
      const bounds = footer.getBoundingClientRect();
      const scrollingElement = document.scrollingElement ?? document.documentElement;
      const atPageBottom = scrollingElement.scrollTop + scrollingElement.clientHeight
        >= scrollingElement.scrollHeight - 2;
      setFooterReached(bounds.top <= 2 || (atPageBottom && bounds.top < window.innerHeight));
    };

    // Keep checking at the final scroll position, independently of GSAP's
    // cached trigger range, including restored scroll positions and resizes.
    window.addEventListener("scroll", updateFooterVisibility, { passive: true });
    window.addEventListener("resize", updateFooterVisibility);
    window.addEventListener("pageshow", updateFooterVisibility);
    const observer = new ResizeObserver(updateFooterVisibility);
    observer.observe(document.documentElement);
    observer.observe(footer);
    updateFooterVisibility();

    return () => {
      window.removeEventListener("scroll", updateFooterVisibility);
      window.removeEventListener("resize", updateFooterVisibility);
      window.removeEventListener("pageshow", updateFooterVisibility);
      observer.disconnect();
    };
  }, []);

  useGSAP(() => {
    const ctaPanel = panel.current;
    const collageElement = collage.current;
    const sceneElement = scene.current;
    const navigation = topNavigation.current;
    if (!ctaPanel || !collageElement || !sceneElement || !navigation) return;

    const media = gsap.matchMedia();
    const smallScreen = window.matchMedia("(width < 64rem)");
    const root = document.documentElement;
    const previousEdgeBackground = root.style.getPropertyValue("--page-edge-background");
    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousThemeColor = themeMeta?.content;
    let edgeBackground = "";

    const syncNavigation = () => {
      // Follow the canvas entrance, then stay at the viewport's top edge.
      const canvasTop = Math.max(0, ctaPanel.getBoundingClientRect().top);
      const offset = smallScreen.matches ? 0 : canvasTop;
      gsap.set(navigation, { y: offset });
      if (aboutSection.current) {
        const navigationBounds = navigation.getBoundingClientRect();
        const boundary = aboutSection.current.getBoundingClientRect().top;
        const whiteHeight = Math.max(0, Math.min(navigationBounds.height, boundary - navigationBounds.top));
        const whiteTop = Math.max(0, Math.min(whiteHeight, canvasTop - navigationBounds.top));
        navigation.style.setProperty("--theme-clip", `${whiteHeight}px`);
        navigation.style.setProperty("--theme-clip-top", `${whiteTop}px`);
        if (committeesPanel.current) {
          const bounds = committeesPanel.current.getBoundingClientRect();
          const firstCommittee = aboutSection.current.parentElement?.querySelector("[data-committee-section]");
          const blueBottom = Math.min(bounds.bottom, firstCommittee?.getBoundingClientRect().top ?? bounds.bottom);
          const clipTop = Math.max(0, Math.min(navigationBounds.height, bounds.top - navigationBounds.top));
          const clipBottom = Math.max(0, Math.min(navigationBounds.height, blueBottom - navigationBounds.top));
          navigation.style.setProperty("--committees-clip-top", `${clipTop}px`);
          navigation.style.setProperty("--committees-clip-bottom", `${navigationBounds.height - clipBottom}px`);
        }

        // Safari paints its safe areas from the root background.
        const sampleLine = window.innerHeight / 2;
        let visibleSection: Element | null = boundary <= sampleLine
          ? aboutSection.current
          : canvasTop <= sampleLine ? ctaPanel : sceneElement.querySelector("section");
        while (visibleSection?.nextElementSibling && visibleSection.getBoundingClientRect().bottom <= sampleLine) {
          visibleSection = visibleSection.nextElementSibling;
        }
        if (visibleSection === registrationScene.current) {
          const bounds = committeesPanel.current?.getBoundingClientRect();
          visibleSection = bounds && bounds.top <= sampleLine && bounds.bottom > sampleLine
            ? committeesPanel.current
            : registrationScene.current?.querySelector("#registration") ?? null;
        }
        const background = visibleSection ? getComputedStyle(visibleSection).backgroundColor : "";
        if (background && background !== edgeBackground) {
          edgeBackground = background;
          root.style.setProperty("--page-edge-background", background);
          if (themeMeta) themeMeta.content = background;
        }
      }
      setShowTopNavigation(smallScreen.matches || offset === 0);
    };

    ScrollTrigger.create({
      trigger: sceneElement,
      start: "top bottom",
      end: "max",
      onUpdate: syncNavigation,
      onRefresh: syncNavigation,
    });
    syncNavigation();
    window.addEventListener("scroll", syncNavigation, { passive: true });
    smallScreen.addEventListener("change", syncNavigation);

    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (committeesPanel.current && registrationScene.current) {
        const overlay = committeesPanel.current;
        gsap.fromTo(overlay, { y: 0, yPercent: 100 }, {
          yPercent: 0,
          ease: "none",
          onUpdate: syncNavigation,
          scrollTrigger: {
            trigger: registrationScene.current,
            start: "top top",
            end: () => `+=${overlay.offsetHeight}`,
            scrub: true,
          },
        });
      }

      gsap.fromTo(ctaPanel, { y: 0, yPercent: 100 }, {
        yPercent: 0,
        ease: "none",
        onUpdate: syncNavigation,
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
          // Mobile fills the section and can be taller than the viewport.
          // Reveal on entry rather than waiting for its bottom to be visible.
          start: () => window.matchMedia("(width < 48rem)").matches
            ? "clamp(top 80%)"
            : "bottom bottom",
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

    return () => {
      window.removeEventListener("scroll", syncNavigation);
      smallScreen.removeEventListener("change", syncNavigation);
      if (previousEdgeBackground) root.style.setProperty("--page-edge-background", previousEdgeBackground);
      else root.style.removeProperty("--page-edge-background");
      if (themeMeta && previousThemeColor !== undefined) themeMeta.content = previousThemeColor;
      media.revert();
    };
  }, { scope: scene });

  return (
    <main data-page-theme="light">
      <nav
        ref={topNavigation}
        className={`${styles.topNavigation}${showTopNavigation ? ` ${styles.topNavigationVisible}` : ""}`}
        data-footer-reached={footerReached}
        aria-label="Main navigation"
        aria-hidden={!showTopNavigation || footerReached}
        inert={!showTopNavigation || footerReached}
      >
        <HomeNavigation />
        <div className={styles.topNavigationLight} aria-hidden="true" inert>
          <HomeNavigation />
        </div>
        <div className={styles.topNavigationCommitteesLight} aria-hidden="true" inert>
          <HomeNavigation />
        </div>
      </nav>
      <div id="home" ref={scene} className={styles.scrollScene}>
        {/* The blue panel finishes its entrance one viewport into the scene. */}
        <div id="theme" className={styles.themeAnchor} aria-hidden="true" />
        <div className={styles.scrollStage}>
          {children}
          <div ref={panel} className={styles.primaryPanel}>
            <CTATheme theme={theme} theme_description={theme_description} />
          </div>
        </div>
      </div>

      <section ref={aboutSection} id="about-us" className={styles.sectionThree} aria-labelledby="about-us-title">
        <div className={styles.sectionThreeCopy}>
          <h2 id="about-us-title">{sectionThree.title}</h2>
          <p>{sectionThree.description}</p>
          <Button asChild className="mt-6 bg-black text-white hover:bg-black/90 focus-visible:outline-black">
            <a href={sitePath("/about")}>More About Us</a>
          </Button>
        </div>
        <div ref={collage} className={styles.collage} aria-hidden="true">
          <div className={styles.collageArtwork}>
            {collageTiles.map(({ position, image }) => (
              <div
                key={position}
                className={`${styles.collageTile} ${position}`}
                style={imageSources[image] ? { backgroundImage: `url(${JSON.stringify(imageSources[image])})` } : undefined}
              />
            ))}
          </div>
        </div>
      </section>
      <div ref={registrationScene} className={styles.scrollScene}>
        <div className={styles.scrollStage}>
          <RegistrationSection />
          <section
            ref={committeesPanel}
            id="committees"
            className={styles.primaryPanel}
            aria-labelledby="committees-title"
          >
            <div className={styles.ctaTheme}>
              <h2 id="committees-title" className={styles.ctaThemeTitle}>Committees</h2>
              <p className={styles.ctaThemeDescription}>
                Explore each committee and discover the topics they offer.
              </p>
            </div>
          </section>
        </div>
      </div>
      <CommitteeSections />
      <BottomBar />
    </main>
  );
}
