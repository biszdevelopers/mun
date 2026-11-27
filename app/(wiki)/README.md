# Wiki pages

Each article uses a folder with `article.tsx` and a thin Next.js `page.tsx` entry. The `(wiki)` group adds no URL prefix: `app/(wiki)/theme/security-council/page.tsx` serves `/theme/security-council`.

In `article.tsx`, export the title and category tree and pass them to the shared article component:

```tsx
import WikiArticle, { type ArticleMetadata } from "../../WikiArticle";

export const articleMetadata = {
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
}
```

`category.children` is an optional nested category with the same `title`, optional `link`, and optional `children` shape. Categories without a link render as plain breadcrumb text. The breadcrumb follows this chain from outermost to innermost, then shows the current article title. Category links must point to your intended destinations. WikiArticle renders the h1 from the metadata, so do not duplicate it in the content.

The route entry `page.tsx`:

```tsx
import Article, { articleMetadata } from "./article";

export const metadata = { title: articleMetadata.title };
export default Article;
```

Next.js restricts custom page exports and reserves `metadata.category` for a string. Keep the custom tree in `article.tsx` and the native SEO metadata in `page.tsx`.

Write normal JSX and import Client Components for interactions. The shared shell styles prose and builds the left outline from rendered h2/h3 headings. Explicit heading IDs are preserved; otherwise anchors are assigned in the browser. See the paper-lantern article and DemoCounter for an interactive example. Avoid paths that conflict with existing app routes.

The shared wiki layout automatically appends ` | BISZ MUN` to the browser title. Keep articleMetadata.title literal; headings and breadcrumbs use it unchanged.
