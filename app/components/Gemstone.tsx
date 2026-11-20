"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { GemSpec } from "gemrenderer";
import { preloadGem, gemResolution } from "../lib/gem-renderer";

import styles from "./CommitteeSections.module.css";

export default function Gemstone({ spec, label, id }: { spec: GemSpec; label: string; id?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const target = canvas.current;
    const button = target?.closest("button");
    const anchor = button?.closest<HTMLElement>(`.${styles.emoji}`);
    const stage = button?.closest<HTMLElement>(`.${styles.stage}`);
    if (!target || !button || !anchor || !stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let disposed = false;
    let visible = false;
    let frame = 0;
    let drawing = false;
    let failed = false;
    let renderer: typeof import("gemrenderer") | null = null;
    let previous = 0;
    let renderResolution = 0;
    let painted = false;
    let time = 0;
    let yaw = 0;
    let tilt = 0;
    let pointerYaw = 0;
    let pointerTilt = 0;
    let impulse = 0;
    let velocity = 0;

    const active = () => visible && !document.hidden && !disposed;
    const schedule = () => {
      if (active() && renderer && !frame && !drawing && !failed) frame = requestAnimationFrame(draw);
    };
    const draw = async (now: number) => {
      frame = 0;
      if (!active()) return;
      // Follow the display refresh rate; never queue a second unfinished render.
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 1 / 60;
      previous = now;
      drawing = true;
      try {
        if (!active() || !renderer) return;
        // The shared renderer otherwise traces a fixed 640 × 640 frame even
        // for a small emoji. Match its work to the displayed canvas, including
        // high-DPI detail. CSS transforms do not change clientWidth.
        const resolution = gemResolution(target);
        if (resolution !== renderResolution) {
          renderer.configure({ resolution });
          renderResolution = resolution;
          // Refit only on an actual size change, never during cursor repulsion.
          const image = await renderer.getGemImage(spec, 8);
          if (!image) throw new Error("Gem renderer unavailable");
          if (!active()) return;
        }
        if (!reducedMotion.matches) {
          time += dt;
          velocity += (-30 * impulse - 5 * velocity) * dt;
          impulse += velocity * dt;
          const ease = 1 - Math.exp(-5 * dt);
          yaw += (pointerYaw - yaw) * ease;
          tilt += (pointerTilt - tilt) * ease;
        }
        const spin = reducedMotion.matches ? 0 : time * 0.22 + yaw + impulse;
        const lean = reducedMotion.matches ? 0 : Math.sin(time * 0.85) * 0.16 + tilt + impulse * 0.35;
        await renderer.renderGemFrame(target, spec, spin, lean, 8);
        if (!disposed && !painted) {
          painted = true;
          setReady(true);
        }
      } catch (error) {
        failed = true;
        console.warn(`Could not render ${label}.`, error);
      } finally {
        drawing = false;
        if (!reducedMotion.matches) schedule();
      }
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !finePointer.matches || reducedMotion.matches) return;
      // Use the same unaffected anchor as the emoji springs to avoid feedback.
      const rect = anchor.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const influence = Math.max(0, 1 - Math.hypot(dx, dy) / (rect.width / 2 + 180));
      pointerYaw = Math.max(-1, Math.min(1, dx / 100)) * influence * 0.85;
      pointerTilt = Math.max(-1, Math.min(1, dy / 100)) * influence * 0.6;
    };
    const reset = () => { pointerYaw = 0; pointerTilt = 0; };
    const click = () => {
      if (!reducedMotion.matches) velocity = Math.max(-8, velocity - 4);
    };
    const refresh = () => {
      previous = 0;
      if (reducedMotion.matches) { yaw = 0; tilt = 0; impulse = 0; velocity = 0; }
      schedule();
    };
    // Eagerly prepare even when the committee is off screen. The home loading overlay
    // awaits this same promise, including the first draw into this canvas.
    void preloadGem(target, spec).then((prepared) => {
      if (disposed) return;
      renderer = prepared.renderer;
      renderResolution = prepared.resolution;
      painted = true;
      setReady(true);
      previous = 0;
      schedule();
    }).catch((error) => {
      if (disposed) return;
      failed = true;
      console.warn(`Could not prepare ${label}.`, error);
    });

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    observer.observe(stage);
    const resize = new ResizeObserver(refresh);
    resize.observe(target);
    stage.addEventListener("pointermove", move, { passive: true });
    stage.addEventListener("pointerleave", reset);
    stage.addEventListener("pointercancel", reset);
    button.addEventListener("click", click);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", refresh);
    reducedMotion.addEventListener("change", refresh);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", reset);
      stage.removeEventListener("pointercancel", reset);
      button.removeEventListener("click", click);
      window.removeEventListener("scroll", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", refresh);
      reducedMotion.removeEventListener("change", refresh);
    };
  }, [spec, label]);

  return (
    <span className={styles.rubyGem} aria-hidden="true" data-ready={ready}
      style={{ "--gem-color": `#${spec.color.toString(16).padStart(6, "0")}` } as CSSProperties}>
      <span className={styles.rubyFallback} />
      <canvas ref={canvas} className={styles.rubyCanvas} data-home-gem={id} />
    </span>
  );
}
