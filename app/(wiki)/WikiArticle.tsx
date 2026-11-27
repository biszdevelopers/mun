import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./article.module.css";
import CopyArticleLink from "./CopyArticleLink";

export type ArticleCategory = {
  title: string;
  link?: string;
  children?: ArticleCategory;
};

export type ArticleMetadata = {
  title: string;
  category: ArticleCategory;
};

export default function WikiArticle({
  metadata,
  children,
}: {
  metadata: ArticleMetadata;
  children: ReactNode;
}) {
  const categories: ArticleCategory[] = [];
  let category: ArticleCategory | undefined = metadata.category;
  while (category) {
    categories.push(category);
    category = category.children;
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <ol>
          {categories.map((item, index) => (
            <li key={`${index}-${item.link}`}>
              {item.link ? (
                <Link href={item.link}>{item.title}</Link>
              ) : (
                item.title
              )}
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li aria-current="page">{metadata.title}</li>
        </ol>
        <CopyArticleLink key={metadata.title} />
      </nav>
      <article className={styles.prose}>
        <h1 data-article-title>{metadata.title}</h1>
        {children}
      </article>
    </>
  );
}
