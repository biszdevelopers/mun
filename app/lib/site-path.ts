// Public assets and plain anchors need the deployment prefix explicitly.
export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
