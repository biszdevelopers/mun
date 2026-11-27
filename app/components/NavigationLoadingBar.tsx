"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

export default function NavigationLoadingBar() {
  const bar = useRef<LoadingBarRef>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRoute = useRef("");

  useEffect(() => {
    if (currentRoute.current) bar.current?.complete();
    currentRoute.current = window.location.pathname + window.location.search;
  }, [pathname, searchParams]);

  useEffect(() => {
    function startNavigation(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) {
        return;
      }

      const link = event.target instanceof Element
        ? event.target.closest("a[href]")
        : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        (link.target && link.target !== "_self") ||
        link.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(link.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname + destination.search === currentRoute.current
      ) {
        return;
      }

      bar.current?.continuousStart();
    }

    function startHistoryNavigation() {
      if (window.location.pathname + window.location.search !== currentRoute.current) {
        bar.current?.continuousStart();
      }
    }

    document.addEventListener("click", startNavigation);
    window.addEventListener("popstate", startHistoryNavigation);
    return () => {
      document.removeEventListener("click", startNavigation);
      window.removeEventListener("popstate", startHistoryNavigation);
    };
  }, []);

  return (
    <LoadingBar ref={bar} color="var(--color-un)" height={3} waitingTime={200} />
  );
}
