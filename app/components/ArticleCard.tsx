import { articleUrl, categoryName, type Article } from "../content";

export function ArticleCard({ article, emphasis = false }: { article: Article; emphasis?: boolean }) {
  const className = `article-card ${emphasis ? "article-emphasis" : ""}`;
  const content = <><span>{categoryName(article.category)}</span><strong>{article.title}</strong><small>記事を読む <i>→</i></small></>;

  return <a className={className} href={articleUrl(article)}>{content}</a>;
}
