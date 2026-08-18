import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "../components/ArticleCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { categories, getCategory, getPublishedByCategory } from "../content";
import { siteConfig } from "../site-config";

/* eslint-disable @next/next/no-html-link-for-pages -- category pages use static internal links. */

type CategoryPageProps = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "ページが見つかりません", robots: { index: false, follow: false } };
  const published = getPublishedByCategory(slug);
  const indexable = siteConfig.isPublicRelease && published.length > 0;
  return {
    title: category.label,
    description: category.description,
    robots: { index: indexable, follow: indexable },
    alternates: siteConfig.isPublicRelease ? { canonical: `/${slug}/` } : undefined,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const published = getPublishedByCategory(slug);

  return <main><SiteHeader />
    <section className="page-hero"><div className="shell"><div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>{category.label}</span></div><p className="eyebrow">CATEGORY</p><h1>{category.label}</h1><p>{category.description}</p></div></section>
    <section className="page-section"><div className="shell category-page-layout">
      <div className="category-page-intro"><span className={`category-dot ${category.tint}`}>{category.mark}</span><p>食品名や場面だけで結論を急がず、仕組み、個人差、相談の目安を分けて整理します。</p></div>
      {published.length > 0 ? <section><div className="list-heading"><p>ARTICLES</p><h2>{category.label}の記事</h2><span>気になる疑問から、ひとつずつ確認できます。</span></div><div className="article-grid">{published.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section> : <section className="category-empty"><h2>ほかの疑問から探す</h2><p>いま読める記事は、トップの悩み別ナビゲーションから確認できます。</p><a href="/">トップから記事を探す →</a></section>}
    </div></section>
    <SiteFooter />
  </main>;
}
