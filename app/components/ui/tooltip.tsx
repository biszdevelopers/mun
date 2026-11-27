"use client";

// Adapted from shadcn/ui's MIT-licensed Radix tooltip, using the site's theme.
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/tooltip.tsx
import type { ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import styles from "./tooltip.module.css";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

function Tooltip(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipTrigger(
  props: ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={twMerge(styles.content, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={styles.arrow} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
