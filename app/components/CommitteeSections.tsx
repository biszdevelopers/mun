"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import styles from "./CommitteeSections.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const committees = [
  {
    id: "ga",
    title: "GA",
    name: "General Assembly",
    description: "Bring nations together to debate global challenges and build shared solutions.",
    emojis: ["globe-showing-europe-africa", "handshake", "speech-balloon", "classical-building"],
  },
  {
    id: "hrc",
    title: "HRC",
    name: "Human Rights Council",
    description: "Explore how international cooperation can protect human rights and dignity for all.",
    emojis: ["balance-scale", "raised-fist", "scroll", "handshake"],
  },
  {
    id: "ecosoc",
    title: "ECOSOC",
    name: "Economic and Social Council",
    description: "Shape ideas for sustainable development, economic cooperation, and social progress.",
    emojis: ["seedling", "chart-increasing", "money-bag", "globe-showing-europe-africa"],
  },
  {
    id: "disec",
    title: "DISEC",
    name: "Disarmament and International Security Committee",
    description: "Address disarmament and international security through dialogue and collective action.",
    emojis: ["dove", "shield", "peace-symbol", "handshake"],
  },
  {
    id: "security-council",
    title: "Security Council",
    name: "United Nations Security Council",
    description: "Confront threats to international peace and work toward lasting conflict resolution.",
    emojis: ["classical-building", "globe-showing-europe-africa", "shield", "dove"],
  },
];

// Larger foreground emoji travel further than the smaller background emoji.
const depths = [0.22, 0.17, 0.075, 0.045];
const tilts = [-14, 12, 10, -9];

function CommitteeSection({ committee }: { committee: (typeof committees)[number] }) {
  const scene = useRef<HTMLElement>(null);
  const { id, name, description, emojis } = committee;

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = scene.current?.querySelectorAll<HTMLElement>(`.${styles.emoji}`);
      elements?.forEach((element, index) => {
        const travel = () => window.innerHeight * depths[index]
          * (window.matchMedia("(width < 48rem)").matches ? 0.4 : 1);

        gsap.fromTo(element, {
          xPercent: -50,
          yPercent: -50,
          y: () => travel() / 2,
          rotation: tilts[index],
        }, {
          y: () => -travel() / 2,
          rotation: -tilts[index] / 2,
          ease: "none",
          scrollTrigger: {
            trigger: scene.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });
    return () => media.revert();
  }, { scope: scene });

  return (
    <section ref={scene} id={id} className={styles.scene} aria-labelledby={`${id}-title`}>
      <div className={styles.stage}>
        <div className={styles.emojiField} aria-hidden="true">
          {emojis.map((emoji) => (
            <div key={emoji} className={styles.emoji}>
              <Image
                src={`/emoji/apple/${emoji}.png`}
                alt=""
                width={160}
                height={160}
                unoptimized
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className={styles.copy}>
          <h2 id={`${id}-title`} className={styles.title}>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </section>
  );
}

export default function CommitteeSections() {
  return committees.map((committee) => <CommitteeSection key={committee.id} committee={committee} />);
}
