import styles from "./LoadingOverlay.module.css";

export function LoadingGlobe() {
  return (
    <div className={styles.indicator}>
      <div className={styles.globe} aria-hidden="true" />
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
