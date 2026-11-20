import { ExternalLink } from "lucide-react";

import styles from "../page.module.css";

export default function HomeNavigation() {
  return (
    <ul className={styles.bookmarkItems}>
      <li><a href="#home">Home</a></li>
      <li><a href="#theme">Theme</a></li>
      <li><a href="#about-us">About Us</a></li>
      <li>
        <a href="https://my.biszmun.org" target="_blank" rel="noopener noreferrer">
          <span>My BISZMUN</span>
          <ExternalLink className={styles.bookmarkExternalIcon} aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
}
