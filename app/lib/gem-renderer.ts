import type { GemSpec } from "gemrenderer";

export const amethyst: GemSpec = {
  color: 0x9966cc,
  // Asscher proportions from gemrenderer's square step-cut preset.
  cut: {
    family: "step",
    aspect: 1,
    cutAmt: 0.4,
    table: 0.42,
    hc: 0.46,
    pd: 0.5,
  },
  ior: 1.55,
  fire: 0.12,
  restTilt: 0.55,
  restYaw: 0,
  bright: 1.35,
  bounces: 5,
  glint: 0.12,
};

export function gemResolution(target: HTMLCanvasElement) {
  return Math.max(
    192,
    Math.min(
      512,
      Math.ceil(
        (target.clientWidth * Math.min(window.devicePixelRatio || 1, 2)) / 64,
      ) * 64,
    ),
  );
}

const preparations = new WeakMap<
  HTMLCanvasElement,
  Promise<{
    renderer: typeof import("gemrenderer");
    resolution: number;
  }>
>();

export function preloadGem(target: HTMLCanvasElement, spec: GemSpec) {
  let pending = preparations.get(target);
  if (!pending) {
    pending = (async () => {
      const renderer = await import("gemrenderer");
      const resolution = gemResolution(target);
      renderer.configure({ resolution });
      // Warm the environment, geometry fit, tracer and bloom behind the loader.
      const image = await renderer.getGemImage(spec, 8);
      if (!image) throw new Error("Gem renderer unavailable");
      await renderer.renderGemFrame(target, spec, 0, 0, 8);
      return { renderer, resolution };
    })();
    preparations.set(target, pending);
  }
  return pending;
}
