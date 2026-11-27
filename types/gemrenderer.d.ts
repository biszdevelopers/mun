declare module "gemrenderer" {
  export interface GemSpec {
    color: number;
    cut: {
      family: "brilliant" | "step" | "trilliant" | "cabochon";
      poly?: number;
      aspect?: number;
      cutAmt?: number;
      table?: number;
      hc?: number;
      pd?: number;
      pavSteps?: number;
    };
    ior: number;
    fire: number;
    restTilt?: number;
    restYaw?: number;
    bright?: number;
    bounces?: number;
    glint?: number;
  }

  export function getGemImage(
    spec: GemSpec,
    clarity?: number,
  ): Promise<string | null>;
  export function configure(options: { resolution: number }): void;
  export function renderGemFrame(
    target: HTMLCanvasElement,
    spec: GemSpec,
    rotY?: number,
    rotX?: number,
    clarity?: number,
  ): Promise<void>;
}
