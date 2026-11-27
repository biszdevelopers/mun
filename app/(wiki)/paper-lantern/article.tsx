import WikiArticle, { type ArticleMetadata } from "../WikiArticle";
import DemoCounter from "../DemoCounter";

export const articleMetadata = {
  title: "A page starts with TSX",
  category: {
    title: "Resources",
    link: "/",
    children: { title: "Authoring" },
  },
} satisfies ArticleMetadata;

export default function Article() {
  return (
    <WikiArticle metadata={articleMetadata}>
      <p>
        Write familiar HTML tags in a React component. The shared layout takes
        care of the reading experience.
      </p>
      <h2>Create a new page</h2>
      <p>
        Add <code>app/(wiki)/theme/security-council/page.tsx</code> to create{" "}
        <code>/theme/security-council</code>. Keep the content and exported
        articleMetadata in a sibling article.tsx file, and import them from the
        route entry.
      </p>
      <pre>
        <code>{`export const articleMetadata = {
  title: "Security Council",
  category: {
    title: "Conference",
    link: "/",
    children: { title: "Theme", link: "/theme" },
  },
} satisfies ArticleMetadata;

export default function Article() {
  return (
    <WikiArticle metadata={articleMetadata}>
      <p>An introduction to the committee.</p>
      <h2>Our theme</h2>
      <p>The discussion starts here.</p>
    </WikiArticle>
  );
}`}</code>
      </pre>
      <h2>Let the layout do the work</h2>
      <p>
        Headings, paragraphs, lists, tables, and quotes receive shared styling.
        The outline follows your h2 and h3 headings automatically. Add an
        explicit id when you want a stable section link.
      </p>
      <h2>Add React interactions</h2>
      <p>
        Pages are Server Components by default. Import Client Components for
        state and events, or add the use client directive to make the whole page
        interactive.
      </p>
      <DemoCounter />
      <h2>Keep your own URLs</h2>
      <p>
        The (wiki) folder shares the layout without adding a URL prefix. Create
        nested folders for any page path you need. The category tree in your
        article metadata controls the breadcrumbs independently of the URL.
      </p>
    </WikiArticle>
  );
}
