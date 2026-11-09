import styles from "./LoadingOverlay.module.css";

export function Globe({ className }: { className?: string }) {
  return (
    <div
      className={className ? `${styles.globe} ${className}` : styles.globe}
      aria-hidden="true"
    />
  );
}

export function LoadingGlobe() {
  return (
    <div className={styles.indicator}>
      <Globe />
      <span className={styles.label}>Loading…</span>
    </div>
  );
}

export default function LoadingOverlay() {
  return (
    <div className={styles.overlay} role="status">
      <LoadingGlobe />
    </div>
  );
}
