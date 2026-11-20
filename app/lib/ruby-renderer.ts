import type { GemSpec } from "gemrenderer";
import { gemResolution, preloadGem } from "./gem-renderer";

// Retained ruby spec for a future placement.
export const ruby: GemSpec = {
  color: 0xa6001a,
  cut: { family: "brilliant" },
  ior: 1.77,
  fire: 0.41,
  restTilt: 0.3,
  bright: 1.35,
  bounces: 5,
  glint: 0.12,
};

export const rubyResolution = gemResolution;
export const preloadRuby = (target: HTMLCanvasElement) => preloadGem(target, ruby);
