import { sitePath } from "../lib/site-path";
import styles from "./BottomBar.module.css";
import FooterMenu from "./FooterMenu";

export default function BottomBar() {
  return (
    <footer className={styles.bottomBar}>
      <div className={styles.brand}>
        <span className={styles.logo} role="img" aria-label="United Nations emblem" />
        <h2 className={styles.title}>BISZ<span className={styles.mun}>MUN</span></h2>
        <span className={styles.year}>2027</span>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <FooterMenu
            title="Conference"
            links={[
              { label: "Theme Details", href: "/theme"},
              { label: "Committee Topics", href: "/topics"},
              { label: "Transportation", href: "/transportation"},
              { label: "Schedule", href: "/schedule"},
              { label: "About BISZMUN", href: "/about"},
              { label: "Contact Us", href: "/contact"},
              
              
            ]}
          />
        </div>
        <div className={styles.column}>
          <FooterMenu
            title="Participate"
            links={[
              { label: "Eligibility", href: "/eligibility"},
              { label: "Fees", href: "/fees" },
              { label: "Registration", href: "/registration" },
              { label: "My BISZMUN", href: "https://my.biszmun.org", external: true }
            ]}/>
        </div>
        <div className={styles.column}>
          <FooterMenu
            title="Resources"
            links={[
              { label: "Participant Handbook", href: ""},
              { label: "Guide", href: "" },
              { label: "Rules", href: "" },
              { label: "FAQs", href: "" },
            ]}/>
        </div>
        <div className={styles.copyright}>
          <p>© 2027 BISZMUN. All rights reserved.</p>
          <p>This event is affiliated and sponsored by <a className="text-white" href="https://bisz.basischina.com/" target="_blank">Basis International School Shenzhen</a>.</p>
          <p>Website content and conference materials are provided for BISZMUN participants. Third-party names, logos, and materials belong to their respective owners.</p>
          <p className="text-gray-300">Made with ❤️ by the <a className="text-white" href={sitePath("/about")} target="_blank">BISZMUN Team</a></p>
        </div>
      </div>
    </footer>
  );
}
