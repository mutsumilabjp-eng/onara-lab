import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms } from "../../affiliate-content";
import { JsonLd } from "../../components/JsonLd";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { articleUrl, articles, categoryName, getArticle, getRelatedPublishedArticles, type Article } from "../../content";
import { siteConfig } from "../../site-config";

/* eslint-disable @next/next/no-html-link-for-pages -- article links are static and valid in the generated site. */

type ArticlePageProps = { params: Promise<{ category: string; slug: string }> };

const affiliatePlacements: Record<string, string[]> = {
  "basic/what-is-fart": ["a8-mykinso", "a8-inulin"],
  "science/components": ["a8-mykinso", "a8-premedica"],
  "smell/why-smells": ["a8-ladies-rose", "a8-inulin"],
  "amount/how-many-per-day": ["a8-mykinso", "moshimo-lyft"],
};

function getArticleAffiliatePrograms(article: Article) {
  const placementKey = `${article.category}/${article.slug}`;
  const ids = affiliatePlacements[placementKey] ?? [];
  return ids.map((id) => affiliatePrograms.find((program) => program.id === id)).filter(Boolean);
}

export function generateStaticParams() {
  return articles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return { title: "記事が見つかりません", robots: { index: false, follow: false } };
  const indexable = siteConfig.isPublicRelease && article.status === "published";
  return {
    title: article.title,
    description: article.description,
    robots: { index: indexable, follow: indexable },
    alternates: siteConfig.isPublicRelease ? { canonical: articleUrl(article) } : undefined,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${siteConfig.url}${articleUrl(article)}`,
      locale: "ja_JP",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const canonical = `${siteConfig.url}${articleUrl(article)}`;
  const related = getRelatedPublishedArticles(article);
  const articleAffiliatePrograms = getArticleAffiliatePrograms(article);
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      datePublished: article.updatedAt,
      dateModified: article.updatedAt,
      mainEntityOfPage: canonical,
      inLanguage: "ja",
      author: { "@type": "Organization", name: siteConfig.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: categoryName(article.category), item: `${siteConfig.url}/${article.category}` },
        { "@type": "ListItem", position: 3, name: article.title, item: canonical },
      ],
    },
  ];

  return (
    <main>
      <JsonLd data={schema} />
      <SiteHeader />
      <section className="article-hero">
        <div className="shell">
          <div className="breadcrumbs">
            <a href="/">ホーム</a><span>/</span><a href={`/${article.category}`}>{categoryName(article.category)}</a><span>/</span><span>{article.title}</span>
          </div>
          <p className="article-category">{categoryName(article.category)}</p>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta">{article.status === "published" ? `資料確認：${article.updatedAt}` : "公開準備中"} 編集：おなら研究所 編集部</div>
        </div>
      </section>
      <section className="article-page-section">
        <div className="shell article-layout">
          <article className="article-content">
            {article.status === "planned" && (
              <section className="article-conclusion planned-note">
                <p>公開準備中</p>
                <h2>{article.description}</h2>
                <span>正式記事化前の概要ページです。トップやカテゴリから迷わず着地できるよう、要点だけ先に表示しています。</span>
              </section>
            )}
            {article.conclusion && (
              <section className="article-conclusion">
                <p>この記事の結論</p>
                <h2>{article.conclusion}</h2>
              </section>
            )}
            {article.sections?.map((section) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </section>
            ))}
            {articleAffiliatePrograms.length > 0 && (
              <section className="article-pr">
                <p className="article-pr-label">PR</p>
                <h2>関連する確認先</h2>
                <p>以下は提携中の広告リンクです。記事内容と同じく、治療や改善を保証するものではありません。成分、価格、条件を公式ページで確認してください。</p>
                <div className="article-pr-grid">
                  {articleAffiliatePrograms.map((program) => (
                    <a key={program.id} href={program.link} target="_blank" rel="nofollow sponsored noreferrer">
                      <span>{program.provider}</span>
                      <strong>{program.name}</strong>
                      <small>{program.safeCopy}</small>
                    </a>
                  ))}
                </div>
              </section>
            )}
            {article.sources && article.sources.length > 0 && (
              <section className="article-sources">
                <h2>参考資料</h2>
                <ul>{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span></li>)}</ul>
              </section>
            )}
            {related.length > 0 && (
              <section className="related-articles">
                <h2>関連する疑問</h2>
                <div>{related.map((relatedArticle) => <a key={relatedArticle.slug} href={articleUrl(relatedArticle)}>{relatedArticle.title}<span>→</span></a>)}</div>
              </section>
            )}
          </article>
          <aside className="article-aside">
            <strong>体調についての注意</strong>
            <p>この記事は一般的な情報を整理したものです。症状が急に変わった場合や、腹痛、便通の変化、体重減少などを伴う場合は、自己判断せず医療機関に相談してください。</p>
            <a href="/medical-policy/">医療情報の扱いを見る →</a>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
