"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import styles from "./CopyArticleLink.module.css";

export default function CopyArticleLink() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyLink() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(
        window.location.origin + window.location.pathname,
      );
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  const label =
    status === "copied"
      ? "Link copied"
      : status === "error"
        ? "Could not copy link. Try again."
        : "Copy link for reference";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={styles.button}
            aria-label={label}
            onClick={copyLink}
            data-copied={status === "copied"}
          >
            <LinkIcon className={styles.link} aria-hidden="true" />
            <Check className={styles.check} aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
