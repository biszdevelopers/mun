import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { createRemoteAsset } from "./remote-asset";

const assetUrl = process.env.YAML_SOURCE_EVENTS?.trim();
const eventDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Shanghai",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const applicationLinks = new Map([
  [
    "show_committee_application_button",
    { label: "Committee Applications", href: "https://bisz.dev/Committees2027" },
  ],
  [
    "show_chair_application_button",
    { label: "Chair Applications", href: "https://bisz.me/Chairs2027" },
  ],
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseEvent(source: string) {
  const config: unknown = parse(source, { maxAliasCount: 0 });
  if (!isRecord(config) || !isRecord(config.hero)) {
    throw new Error("Missing hero event");
  }

  const { time, title, subtitle, hard_code, theme, theme_description } = config.hero;
  if (
    typeof time !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(time) ||
    !Number.isFinite(Date.parse(time)) ||
    typeof title !== "string" ||
    !title.trim() ||
    typeof subtitle !== "string" ||
    !subtitle.trim() ||
    (hard_code !== undefined && typeof hard_code !== "string") ||
    (theme !== undefined && typeof theme !== "string") ||
    (theme_description !== undefined && typeof theme_description !== "string")
  ) {
    throw new Error("Invalid hero event");
  }

  const dateParts = eventDate.formatToParts(new Date(time));
  const day = Number(dateParts.find((part) => part.type === "day")?.value);
  const suffix = day >= 11 && day <= 13 ? "th" : (["st", "nd", "rd"][day % 10 - 1] ?? "th");
  const date = dateParts.map((part) => part.type === "day" ? `${day}${suffix}` : part.value).join("");

  return {
    date,
    dateTime: time,
    title: title.trim(),
    body: subtitle.trim(),
    applicationLink: applicationLinks.get(hard_code ?? ""),
    theme,
    theme_description
  };
}

const readRemoteEvent = assetUrl ? createRemoteAsset(assetUrl, parseEvent) : undefined;
let localEvent: Promise<ReturnType<typeof parseEvent> | undefined> | undefined;

export async function getHeroTheme() {
  return (await getLatestEvent())?.theme ?? "";
}

export async function getHeroThemeDescription() {
  return (await getLatestEvent())?.theme_description ?? "";
}

export async function getLatestEvent() {
  const event = await readRemoteEvent?.();
  if (event) return event;

  localEvent ??= readFile(join(process.cwd(), "EVENTS.yml"), "utf8")
    .then(parseEvent)
    .catch(() => undefined);
  return localEvent;
}
