import sectionThree from "../content/section-3.json";

async function loadFirstAvailable(sources: string[]): Promise<string | undefined> {
  for (const source of sources.filter((src) => src.trim())) {
    const image = new Image();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      image.src = source;
      await Promise.race([
        image.decode(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(() => reject(new Error("Image timed out")), 6000);
        }),
      ]);
      return source;
    } catch {
      image.src = "";
      // Try the next source after a network error, decode error, or timeout.
    } finally {
      clearTimeout(timeout);
    }
  }
}

let pending: Promise<Record<string, string | undefined>> | undefined;

export function loadSectionImages() {
  // Share the selected sources between the loading screen and the collage.
  return pending ??= Promise.all(
    Object.entries(sectionThree.images).map(async ([key, sources]) =>
      [key, await loadFirstAvailable(sources)] as const),
  ).then((entries) => Object.fromEntries(entries));
}
