"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";

import styles from "./CommitteeSections.module.css";
import Gemstone from "./Gemstone";
import { Button } from "./ui/button";
import { amethyst } from "../lib/gem-renderer";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const committees = [
  {
    id: "ga",
    title: "GA",
    name: "General Assembly",
    description:
      "Bring nations together to debate global challenges and build shared solutions.",
    emojis: [
      "globe-showing-europe-africa",
      "handshake",
      "speech-balloon",
      "classical-building",
      "dove",
      "scroll",
      "peace-symbol",
    ],
  },
  {
    id: "hrc",
    title: "HRC",
    name: "Human Rights Council",
    description:
      "Explore how international cooperation can protect human rights and dignity for all.",
    emojis: [
      "balance-scale",
      "raised-fist",
      "scroll",
      "handshake",
      "dove",
      "speech-balloon",
      "peace-symbol",
    ],
  },
  {
    id: "ecosoc",
    title: "ECOSOC",
    name: "Economic and Social Council",
    description:
      "Shape ideas for sustainable development, economic cooperation, and social progress.",
    emojis: [
      "seedling",
      "chart-increasing",
      "money-bag",
      "globe-showing-europe-africa",
      "handshake",
      "classical-building",
      "speech-balloon",
      "hundred-dollar-bill",
    ],
  },
  {
    id: "disec",
    title: "DISEC",
    name: "Disarmament and International Security Committee",
    description:
      "Address disarmament and international security through dialogue and collective action.",
    emojis: [
      "dove",
      "shield",
      "peace-symbol",
      "handshake",
      "amethyst",
      "scroll",
      "speech-balloon",
    ],
  },
  {
    id: "security-council",
    title: "Security Council",
    name: "United Nations Security Council",
    description:
      "Confront threats to international peace and work toward lasting conflict resolution.",
    emojis: [
      "classical-building",
      "globe-showing-europe-africa",
      "shield",
      "dove",
      "handshake",
      "balance-scale",
      "scroll",
    ],
  },
];

// The amethyst is a canvas gem preloaded separately, and the bill has its own
// preload in the loading overlay.
export const emojiImageSources = [
  ...new Set(
    committees
      .flatMap((committee) => committee.emojis)
      .filter(
        (emoji) => emoji !== "amethyst" && emoji !== "hundred-dollar-bill",
      )
      .map((emoji) => `/emoji/apple/${emoji}.png`),
  ),
];

// Seeded variation keeps the scattered layouts stable across server rendering
// and hydration. Reserve the middle of every scene for the council's copy.
const slots = [
  [14, 15],
  [38, 10],
  [63, 17],
  [86, 12],
  [18, 84],
  [49, 88],
  [82, 83],
];
const scales = [1, 0.88, 0.62, 0.5, 0.4, 0.56, 0.46];

function createLayout(seed: number) {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const positions = slots.map((slot) => [...slot]);
  for (let index = positions.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [positions[index], positions[swap]] = [positions[swap], positions[index]];
  }
  return positions.map(([x, y], index) => ({
    x: x + (random() - 0.5) * 8,
    y: y + (random() - 0.5) * 6,
    scale: scales[index],
    tilt: (random() - 0.5) * 30,
    duration: 4.5 + random() * 3.5,
    delay: -random() * 8,
    drift: 6 + random() * 8,
    sway: 3 + random() * 5,
  }));
}

const layouts = committees.map((committee, index) => {
  const layout = createLayout((index + 1) * 7919);
  if (committee.id === "ecosoc") {
    // Balance the lower row now that the ruby is reserved for another section.
    const positions = [
      { x: 84, y: 79, scale: 0.95 },
      { x: 25, y: 82, scale: 0.85 },
      { x: 51, y: 10, scale: 0.62 },
      { x: 55, y: 84, scale: 0.65 },
      { x: 87, y: 43, scale: 1.05 },
      { x: 18, y: 15, scale: 0.56 },
      { x: 86, y: 12, scale: 0.46 },
    ];
    layout.forEach((item, index) => Object.assign(item, positions[index]));
    layout.push({
      x: 6,
      y: 43,
      scale: 1.2,
      tilt: -14,
      duration: 6.5,
      delay: -2,
      drift: 10,
      sway: 4,
    });
  }
  if (committee.id === "disec") {
    // Keep the Asscher in the globe's lower-right slot, large enough to read its steps.
    layout[4].scale = 0.95;
  }
  return layout;
});

function CommitteeSection({
  committee,
}: {
  committee: (typeof committees)[number];
}) {
  const scene = useRef<HTMLElement>(null);
  const { id, name, description, emojis } = committee;
  const layout = layouts[committees.indexOf(committee)];

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = scene.current?.querySelectorAll<HTMLElement>(
          `.${styles.emoji}`,
        );
        const idleElements = scene.current?.querySelectorAll<HTMLElement>(
          `.${styles.emojiIdle}`,
        );
        // Only run the perpetual motion while this council is on screen.
        const setIdleMotion = ({ isActive }: { isActive: boolean }) => {
          idleElements?.forEach((element) => {
            element.style.animationPlayState = isActive ? "running" : "paused";
          });
        };
        const visibility = ScrollTrigger.create({
          trigger: scene.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: setIdleMotion,
          onRefresh: setIdleMotion,
        });
        setIdleMotion(visibility);
        elements?.forEach((element, index) => {
          const travel = () =>
            window.innerHeight *
            (0.04 + layout[index].scale * 0.14) *
            (window.matchMedia("(width < 48rem)").matches ? 0.4 : 1);

          gsap.fromTo(
            element,
            {
              xPercent: -50,
              yPercent: -50,
              y: () => travel() / 2,
              rotation: layout[index].tilt,
            },
            {
              y: () => -travel() / 2,
              rotation: -layout[index].tilt / 2,
              ease: "none",
              scrollTrigger: {
                trigger: scene.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
        return () =>
          idleElements?.forEach((element) => {
            element.style.removeProperty("animation-play-state");
          });
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const buttons = scene.current?.querySelectorAll<HTMLButtonElement>(
          `.${styles.emojiWobble}`,
        );
        const bodies = Array.from(buttons ?? []).map((button) => ({
          button,
          angle: 0,
          angularVelocity: 0,
          setRotation: gsap.quickSetter(button, "rotation", "deg"),
        }));
        let ticking = false;

        const simulate = (_time: number, deltaMs: number) => {
          const elapsed = Math.min(deltaMs / 1000, 0.05);
          const steps = Math.max(1, Math.ceil(elapsed / (1 / 120)));
          const dt = elapsed / steps;
          let settled = true;
          bodies.forEach((body) => {
            for (let step = 0; step < steps; step++) {
              // Restoring torque and drag create a damped angular spring.
              const acceleration = -160 * body.angle - 5 * body.angularVelocity;
              body.angularVelocity += acceleration * dt;
              body.angle += body.angularVelocity * dt;
            }
            if (
              Math.abs(body.angle) < 0.01 &&
              Math.abs(body.angularVelocity) < 0.01
            ) {
              body.angle = 0;
              body.angularVelocity = 0;
            } else {
              settled = false;
            }
            body.setRotation(body.angle);
          });
          if (settled) {
            gsap.ticker.remove(simulate);
            ticking = false;
          }
        };

        const cleanups = bodies.map((body) => {
          const { button } = body;
          const play = () => {
            // Clicks inject momentum in the current direction, preserving angle
            // and velocity. Limit speed so rapid clicks remain a gentle wobble.
            const direction =
              Math.sign(body.angularVelocity) || -Math.sign(body.angle) || -1;
            body.angularVelocity = gsap.utils.clamp(
              -540,
              540,
              body.angularVelocity + direction * 180,
            );
            if (!ticking) {
              ticking = true;
              gsap.ticker.add(simulate);
            }
          };
          button.addEventListener("click", play);
          return () => button.removeEventListener("click", play);
        });
        return () => {
          gsap.ticker.remove(simulate);
          cleanups.forEach((cleanup) => cleanup());
          bodies.forEach((body) => body.setRotation(0));
        };
      });

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = scene.current?.querySelector<HTMLElement>(
            `.${styles.stage}`,
          );
          if (!stage) return;

          // A separate layer keeps cursor reactions independent of idle and scroll motion.
          const reactions = Array.from(
            stage.querySelectorAll<HTMLElement>(`.${styles.emoji}`),
          ).map((anchor, index) => {
            const target = anchor.querySelector<HTMLElement>(
              `.${styles.emojiReaction}`,
            )!;
            return {
              anchor,
              index,
              axes: ["x", "y", "rotation", "scale"].map((property) => ({
                value: property === "scale" ? 1 : 0,
                target: property === "scale" ? 1 : 0,
                velocity: 0,
                set: gsap.quickSetter(
                  target,
                  property,
                  property === "scale"
                    ? undefined
                    : property === "rotation"
                      ? "deg"
                      : "px",
                ),
              })),
            };
          });
          let frame = 0;
          let ticking = false;
          let pointer: { x: number; y: number } | null = null;

          // A soft, damped spring changes acceleration rather than travel distance.
          // Retargeting preserves velocity, even while the cursor moves continuously.
          const animate = (_time: number, deltaMs: number) => {
            const elapsed = Math.min(deltaMs / 1000, 0.05);
            const steps = Math.max(1, Math.ceil(elapsed / (1 / 120)));
            const dt = elapsed / steps;
            let settled = true;
            reactions.forEach(({ axes }) =>
              axes.forEach((axis, index) => {
                for (let step = 0; step < steps; step++) {
                  const acceleration =
                    (axis.target - axis.value) * 12 - axis.velocity * 7;
                  axis.velocity += acceleration * dt;
                  axis.value += axis.velocity * dt;
                }
                const tolerance = index === 3 ? 0.0001 : 0.01;
                if (
                  Math.abs(axis.target - axis.value) < tolerance &&
                  Math.abs(axis.velocity) < tolerance
                ) {
                  axis.value = axis.target;
                  axis.velocity = 0;
                } else {
                  settled = false;
                }
                axis.set(axis.value);
              }),
            );
            if (settled) {
              gsap.ticker.remove(animate);
              ticking = false;
            }
          };

          const update = () => {
            frame = 0;
            // Read the unaffected anchors first so repulsion cannot feed back on itself.
            const bounds = pointer
              ? reactions.map(({ anchor }) => anchor.getBoundingClientRect())
              : [];
            reactions.forEach((reaction, index) => {
              let x = 0;
              let y = 0;
              let influence = 0;
              if (pointer) {
                const rect = bounds[index];
                const dx = rect.left + rect.width / 2 - pointer.x;
                const dy = rect.top + rect.height / 2 - pointer.y;
                const distance = Math.hypot(dx, dy);
                const radius = Math.max(rect.width, rect.height) / 2 + 120;
                influence = Math.max(0, 1 - distance / radius) ** 2;
                const force = influence * (32 + layout[index].scale * 32);
                // Give an exactly centered cursor a stable direction to push toward.
                const angle =
                  distance > 0.5
                    ? Math.atan2(dy, dx)
                    : (layout[index].tilt * Math.PI) / 180;
                const parentRotation =
                  (Number(gsap.getProperty(reaction.anchor, "rotation")) *
                    Math.PI) /
                  180;
                x = Math.cos(angle - parentRotation) * force;
                y = Math.sin(angle - parentRotation) * force;
              }
              const targets = [
                x,
                y,
                influence * (reaction.index % 2 === 0 ? 9 : -9),
                1 + influence * 0.06,
              ];
              reaction.axes.forEach((axis, axisIndex) => {
                axis.target = targets[axisIndex];
              });
            });
            if (!ticking) {
              ticking = true;
              gsap.ticker.add(animate);
            }
          };
          const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
          };
          const move = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            pointer = { x: event.clientX, y: event.clientY };
            schedule();
          };
          const reset = () => {
            if (!pointer) return;
            pointer = null;
            schedule();
          };

          stage.addEventListener("pointermove", move, { passive: true });
          stage.addEventListener("pointerleave", reset);
          stage.addEventListener("pointercancel", reset);
          window.addEventListener("blur", reset);
          window.addEventListener("scroll", reset, { passive: true });
          return () => {
            cancelAnimationFrame(frame);
            gsap.ticker.remove(animate);
            reactions.forEach(({ axes }) =>
              axes.forEach((axis, index) => axis.set(index === 3 ? 1 : 0)),
            );
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", reset);
            stage.removeEventListener("pointercancel", reset);
            window.removeEventListener("blur", reset);
            window.removeEventListener("scroll", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope: scene },
  );

  return (
    <section
      ref={scene}
      id={id}
      data-committee-section
      className={styles.scene}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.stage}>
        <div className={styles.emojiField}>
          {emojis.map((emoji, index) => (
            <div
              key={emoji}
              className={`${styles.emoji}${emoji === "hundred-dollar-bill" ? ` ${styles.bill}` : ""}${id === "ecosoc" && emoji === "handshake" ? ` ${styles.sideEmoji}` : ""}`}
              style={
                {
                  left: `${layout[index].x}%`,
                  top: `var(--emoji-top, ${layout[index].y}%)`,
                  "--emoji-scale": layout[index].scale,
                  "--emoji-tilt": `${layout[index].tilt}deg`,
                  "--float-duration": `${layout[index].duration}s`,
                  "--rock-duration": `${layout[index].duration * 1.3}s`,
                  "--idle-delay": `${layout[index].delay}s`,
                  "--float-distance": `${layout[index].drift}px`,
                  "--rock-angle": `${layout[index].sway}deg`,
                } as CSSProperties
              }
            >
              <div className={styles.emojiReaction}>
                <div className={styles.emojiIdle}>
                  <button
                    type="button"
                    className={styles.emojiWobble}
                    aria-label={
                      emoji === "amethyst"
                        ? "Animate Asscher-cut amethyst"
                        : emoji === "hundred-dollar-bill"
                          ? "Wiggle 100 dollar bill with Benjamin Franklin"
                          : `Animate ${emoji.replaceAll("-", " ")} emoji`
                    }
                  >
                    {emoji === "amethyst" ? (
                      <Gemstone
                        spec={amethyst}
                        label="Asscher-cut amethyst"
                        id="amethyst"
                      />
                    ) : (
                      <Image
                        src={
                          emoji === "hundred-dollar-bill"
                            ? "/images/hundred-dollar-bill-2025.webp"
                            : `/emoji/apple/${emoji}.png`
                        }
                        alt=""
                        width={emoji === "hundred-dollar-bill" ? 600 : 160}
                        height={emoji === "hundred-dollar-bill" ? 248 : 160}
                        unoptimized
                        draggable={false}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.copy}>
          <h2 id={`${id}-title`} className={styles.title}>
            {name}
          </h2>
          <p className={styles.description}>{description}</p>
          <Button asChild className="mt-6">
            <a href={`/theme/${id}`}>See topic details</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function CommitteeSections() {
  return committees.map((committee) => (
    <CommitteeSection key={committee.id} committee={committee} />
  ));
}
