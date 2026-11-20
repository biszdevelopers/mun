import { sitePath } from "../lib/site-path";
import type { ComponentProps } from "react";

import styles from "./Logo.module.css";

type ColoredLogoProps = Omit<ComponentProps<"img">, "src">;

export default function ColoredLogo({ className, alt = "BISZMUN logo", ...props }: ColoredLogoProps) {
  return (
    <img
      src={sitePath("/logo_colored.svg")}
      alt={alt}
      width={1402}
      height={1122}
      className={`${styles.coloredLogo}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
