import WikiArticle, { type ArticleMetadata } from "../WikiArticle";
import styles from "./theme.module.css";

export const articleMetadata = {
  title: "2027 Theme Details",
  category: {
    title: "Conference",
  },
} satisfies ArticleMetadata;

export default function Article() {
  return (
    <WikiArticle metadata={articleMetadata}>
      <p>
        Thank you for choosing to participate in the 2027 conference! On this
        page, you will find the theme details for the conference and each
        specific committee.
      </p>
      <div className={styles.theme}>
        <span className={styles.quote}>Redefining Responsibilities</span>
        <p className={styles.description}>
          In a world where decisions cross borders and affect multiple
          communities, who bears the consequences and who should respond?
        </p>
      </div>
      <p>
        When decisions cross borders and affect communities unequally, who bears
        the consequences? Who should respond? Our interconnected world demands
        that we reconsider how responsibility is assigned, shared, and
        ultimately fulfilled.{" "}
      </p>
    </WikiArticle>
  );
}
