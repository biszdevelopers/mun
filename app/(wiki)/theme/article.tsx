import WikiArticle, { type ArticleMetadata } from "../WikiArticle";
import DemoCounter from "../DemoCounter";

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
    </WikiArticle>
  );
}
