import { sitePath } from "../lib/site-path";
import { Button } from "./ui/button";
import styles from "./RegistrationSection.module.css";

export default function RegistrationSection() {
  return (
    <section id="registration" className={styles.section} aria-labelledby="registration-title">
      <div className={styles.copy}>
        <h2 id="registration-title" className={styles.title}>Join BISZMUN 2027</h2>
        <p className={styles.description}>
          Bring your perspective to the conversation. Explore how to take part in
          BISZMUN 2027 and find the information you need to register.
        </p>
        <Button asChild className="mt-6">
          <a href={sitePath("/registration")}>Registration details</a>
        </Button>
      </div>
    </section>
  );
}
