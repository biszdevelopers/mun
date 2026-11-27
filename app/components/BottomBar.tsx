import styles from "./BottomBar.module.css";
import FooterMenu from "./FooterMenu";
import ThemeSelect from "./ThemeSelect";
import { footerNavigation } from "../lib/navigation";

export default function BottomBar() {
  return (
    <footer className={styles.bottomBar}>
      <div className={styles.brand}>
        <span
          className={styles.logo}
          role="img"
          aria-label="United Nations emblem"
        />
        <h2 className={styles.title}>
          BISZ<span className={styles.mun}>MUN</span>
        </h2>
        <span className={styles.year}>2027</span>
      </div>
      <div className={styles.columns}>
        {footerNavigation.map(({ title, links }) => (
          <div key={title} className={styles.column}>
            <FooterMenu title={title} links={links} />
          </div>
        ))}
        <div className={styles.appearance}><ThemeSelect /></div>
        <div className={styles.copyright}>
          <p>© 2027 BISZMUN. All rights reserved.</p>
          <p>
            This event is affiliated and sponsored by{" "}
            <a
              className="text-white"
              href="https://bisz.basischina.com/"
              target="_blank"
            >
              Basis International School Shenzhen
            </a>
            .
          </p>
          <p>
            Website content and conference materials are provided for BISZMUN
            participants. Third-party names, logos, and materials belong to
            their respective owners.
          </p>
          <p className="text-gray-300">
            Made with ❤️ by the{" "}
            <a className="text-white" href="/about" target="_blank">
              BISZMUN Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
