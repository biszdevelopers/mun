import "server-only";

import { fetch } from "undici";

const checkInterval = 30_000;
const requestTimeout = 3_000;

export function createRemoteAsset<T>(url: string, parse: (source: string) => T) {
  let cached: { data: T; etag: string | null; lastModified: string | null } | undefined;
  let pending: Promise<T | undefined> | undefined;
  let nextCheck = 0;

  async function refresh() {
    try {
      const headers: Record<string, string> = {};
      if (cached?.etag) headers["If-None-Match"] = cached.etag;
      if (cached?.lastModified) headers["If-Modified-Since"] = cached.lastModified;

      const response = await fetch(url, {
        headers,
        redirect: "error",
        signal: AbortSignal.timeout(requestTimeout),
      });

      if (response.ok) {
        const data = parse(await response.text());
        cached = {
          data,
          etag: response.headers.get("etag"),
          lastModified: response.headers.get("last-modified"),
        };
      } else {
        await response.body?.cancel();
      }
    } catch {
      // Keep the last validated value if the request or parser fails.
    }

    return cached?.data;
  }

  return async function read() {
    if (Date.now() < nextCheck) return cached?.data;

    pending ??= refresh().finally(() => {
      nextCheck = Date.now() + checkInterval;
      pending = undefined;
    });
    return pending;
  };
}
