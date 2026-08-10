import { articleUrl, categoryName, type Article } from "../content";

export function ArticleCard({ article, emphasis = false }: { article: Article; emphasis?: boolean }) {
  const className = `article-card ${emphasis ? "article-emphasis" : ""} ${article.status === "planned" ? "article-planned" : ""}`;
  const content = <><span>{categoryName(article.category)}</span><strong>{article.title}</strong><small>{article.status === "published" ? <>記事を読む <i>→</i></> : "公開準備中"}</small></>;

  if (article.status === "published") return <a className={className} href={articleUrl(article)}>{content}</a>;
  return <article className={className} aria-label={`${article.title}は公開準備中です`}>{content}</article>;
}
