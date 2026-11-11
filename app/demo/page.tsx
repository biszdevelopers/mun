import type { Metadata } from "next";
import localFont from "next/font/local";
import { LoadingGlobe } from "../components/LoadingOverlay";

const geologicaCursiveSample = localFont({
  src: "../fonts/Geologica-Cursive-SemiBold.woff2",
  weight: "600",
  preload: false,
});

const headingSizes = [
  { level: 1, size: "3rem", className: "text-heading-1" },
  { level: 2, size: "2.25rem", className: "text-heading-2" },
  { level: 3, size: "1.875rem", className: "text-heading-3" },
  { level: 4, size: "1.5rem", className: "text-heading-4" },
  { level: 5, size: "1.25rem", className: "text-heading-5" },
  { level: 6, size: "1.125rem", className: "text-heading-6" },
];

export const metadata: Metadata = {
  title: "Brand Palette",
  description: "The primary, UN, and secondary colors in the brand palette.",
};

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const palettes = [
  {
    name: "Primary",
    token: "primary",
    description: "bg blue",
    defaultHex: "#3255a4",
    darkDefaultHex: "#3255a4",
    defaultClass: "bg-primary",
    colors: [
      ["bg-primary-50", "#f4f8ff", "#101f3f"],
      ["bg-primary-100", "#e5edff", "#15264c"],
      ["bg-primary-200", "#cbddff", "#192e5a"],
      ["bg-primary-300", "#a7c3fa", "#1e3568"],
      ["bg-primary-400", "#7da2f1", "#233d77"],
      ["bg-primary-500", "#5883e2", "#284586"],
      ["bg-primary-600", "#406acb", "#2d4d95"],
      ["bg-primary-700", "#3255a4", "#3255a4"],
      ["bg-primary-800", "#274483", "#5883e2"],
      ["bg-primary-900", "#1f3463", "#a7c3fa"],
      ["bg-primary-950", "#101f3f", "#f4f8ff"],
    ],
  },
  {
    name: "UN",
    token: "un",
    description: "official UN blue",
    defaultHex: "#009edb",
    darkDefaultHex: "#009edb",
    defaultClass: "bg-un",
    colors: [
      ["bg-un-50", "#eef9ff"],
      ["bg-un-100", "#dcf2ff"],
      ["bg-un-200", "#bce5fe"],
      ["bg-un-300", "#8cd1fa"],
      ["bg-un-400", "#55b8ed"],
      ["bg-un-500", "#009edb"],
      ["bg-un-600", "#0086be"],
      ["bg-un-700", "#006d9c"],
      ["bg-un-800", "#00557b"],
      ["bg-un-900", "#003e5a"],
      ["bg-un-950", "#002639"],
    ],
  },
  {
    name: "Secondary",
    token: "secondary",
    description: "white",
    defaultHex: "#ffffff",
    darkDefaultHex: "#000000",
    defaultClass: "bg-secondary",
    colors: [
      ["bg-secondary-50", "#fafafa"],
      ["bg-secondary-100", "#f5f5f5"],
      ["bg-secondary-200", "#e5e5e5"],
      ["bg-secondary-300", "#d4d4d4"],
      ["bg-secondary-400", "#a1a1a1"],
      ["bg-secondary-500", "#737373"],
      ["bg-secondary-600", "#525252"],
      ["bg-secondary-700", "#404040"],
      ["bg-secondary-800", "#262626"],
      ["bg-secondary-900", "#171717"],
      ["bg-secondary-950", "#0a0a0a"],
    ],
  },
];

function ThemeHex({ light, dark }: { light: string; dark: string }) {
  return (
    <>
      <span className="dark:hidden">{light}</span>
      <span className="hidden dark:inline">{dark}</span>
    </>
  );
}

export default function Demo() {
  return (
    <main className="min-h-screen bg-secondary-50 px-4 py-8 text-secondary-950 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        biszmun

        {palettes.map((palette) => (
          <section
            key={palette.token}
            aria-labelledby={`${palette.token}-heading`}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 id={`${palette.token}-heading`} className="m-0">
                  {palette.name}
                </h2>
              </div>
              <div>
                <code className="text-muted-foreground">
                  <ThemeHex light={palette.defaultHex} dark={palette.darkDefaultHex} />
                </code>
              </div>
            </div>

            <ul>
              {palette.colors.map(([colorClass, hex, darkHex], index) => (
                <li key={colorClass}>
                  <div
                    aria-hidden="true"
                    className={`h-14 rounded-lg border border-solid border-secondary-200 sm:h-16 ${colorClass}`}
                  />
                  <div className="mt-2 text-sm font-bold">{shades[index]}</div>
                  <code className="text-xs text-muted-foreground">
                    <ThemeHex light={hex} dark={darkHex ?? palette.colors[palette.colors.length - index - 1][1]} />
                  </code>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section
          aria-labelledby="loader-demo-heading"
          className="mt-5 rounded-2xl border border-solid border-secondary-200 bg-secondary p-4 sm:p-6"
        >
          <h2 id="loader-demo-heading" className="m-0">Loading animation</h2>
          <div className="mt-4 grid place-items-center rounded-xl border border-solid border-secondary-200 py-8">
            <LoadingGlobe />
          </div>
        </section>

        <section
          aria-labelledby="text-sizes-heading"
          className="mt-5 rounded-2xl border border-solid border-secondary-200 bg-secondary p-4 sm:p-6"
        >
          <h2 id="text-sizes-heading" className="m-0">Text sizes</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary-50 p-4">
              <small className="block text-secondary-600">Geologica Semibold · Current</small>
              <div className="mt-2 text-heading-3 font-semibold leading-tight">
                Agenda and opening debate
              </div>
            </div>
            <div className="rounded-xl bg-secondary-50 p-4">
              <small className="block text-secondary-600">Geologica Cursive Semibold · Previous</small>
              <div className={`${geologicaCursiveSample.className} mt-2 text-heading-3 font-semibold leading-tight`}>
                Agenda and opening debate
              </div>
            </div>
          </div>
          <ul className="mt-4 mb-0 list-none p-0">
            {headingSizes.map(({ level, size, className }) => (
              <li key={level} className="border-0 border-t border-solid border-secondary-200 py-4">
                <div className="text-caption text-secondary-600">H{level} · {size}</div>
                <div className={`${className} mt-1 font-semibold leading-tight`}>Heading {level}</div>
              </li>
            ))}
            <li className="border-0 border-t border-solid border-secondary-200 py-4">
              <div className="text-caption text-secondary-600">Paragraph · Noto Serif · 1.125rem · 500</div>
              <p className="mt-1 mb-0 max-w-prose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </li>
            <li className="border-0 border-t border-solid border-secondary-200 py-4">
              <div className="text-caption text-secondary-600">UI text · 1rem</div>
              <div className="mt-1 text-ui">View conference schedule</div>
            </li>
            <li className="border-0 border-t border-solid border-secondary-200 pt-4">
              <div className="text-caption text-secondary-600">Small text · 0.875rem</div>
              <small className="mt-1 block">For captions, credits, and supporting notes.</small>
            </li>
          </ul>

          <article aria-labelledby="specimen-heading" className="mt-6 rounded-xl bg-secondary-50 p-4 sm:p-6">
            <header>
              <small className="block text-secondary-600">Article specimen</small>
              <h3 id="specimen-heading" className="mt-2 mb-0">Getting ready for committee</h3>
            </header>
            <p className="mt-3 mb-0 max-w-prose">
              Before the first session, read the background guide and identify the questions your
              delegation needs to answer. Write down <strong>one priority</strong> you can explain
              clearly in an opening statement.
            </p>
            <h4 className="mt-5 mb-0">Bring a short reference sheet</h4>
            <p className="mt-2 mb-0 max-w-prose">
              Keep key facts and source notes on one page so you can find them quickly during debate.
              Use the <a href="#primary-heading" className="text-primary underline dark:text-primary-800">primary palette</a>{" "}
              to highlight the items you need to scan at a glance.
            </p>
            <footer className="mt-4">
              <small className="text-secondary-600">Delegate preparation notes</small>
            </footer>
          </article>
        </section>
      </div>
    </main>
  );
}
