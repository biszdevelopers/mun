"use client";

// Adapted from shadcn/ui's MIT-licensed Radix Select with site theme tokens.
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/select.tsx
import type { ComponentProps } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { twMerge } from "tailwind-merge";
import styles from "./select.module.css";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={twMerge(styles.trigger, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown size={16} aria-hidden="true" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={twMerge(styles.content, className)}
        position={position}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={styles.scroll}>
          <ChevronUp size={16} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className={styles.viewport}>
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={styles.scroll}>
          <ChevronDown size={16} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={twMerge(styles.item, className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={styles.indicator}>
        <Check size={16} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };
