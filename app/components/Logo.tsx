import type { ComponentProps } from "react";

import styles from "./Logo.module.css";

// The SVG mask lets the monochrome logo inherit any CSS text color.
export default function Logo({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      role="img"
      aria-label="BISZMUN logo"
      className={`${styles.monochromeLogo}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
