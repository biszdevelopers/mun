import type { ComponentProps } from "react";

import styles from "./Logo.module.css";

type ColoredLogoProps = Omit<ComponentProps<"img">, "src">;

export default function ColoredLogo({ className, alt = "BISZMUN logo", ...props }: ColoredLogoProps) {
  return (
    <img
      src="/logo_colored.svg"
      alt={alt}
      width={1402}
      height={1122}
      className={`${styles.coloredLogo}${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
