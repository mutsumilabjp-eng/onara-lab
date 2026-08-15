import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "../components/ArticleCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { categories, getCategory, getPlannedByCategory, getPublishedByCategory } from "../content";
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
  const planned = getPlannedByCategory(slug);

  return <main><SiteHeader />
    <section className="page-hero"><div className="shell"><div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>{category.label}</span></div><p className="eyebrow">CATEGORY</p><h1>{category.label}</h1><p>{category.description}</p></div></section>
    <section className="page-section"><div className="shell category-page-layout">
      <div className="category-page-intro"><span className={`category-dot ${category.tint}`}>{category.mark}</span><p>公開中の記事は、資料と表示を確認したものです。食品名や場面だけで断定せず、仕組みと相談目安を分けて整理します。</p></div>
      {published.length > 0 && <section><div className="list-heading"><p>LIVE ARTICLES</p><h2>公開中の記事</h2></div><div className="article-grid">{published.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section>}
      {planned.length > 0 && <section className="planned-section"><div className="list-heading"><p>IN PREPARATION</p><h2>公開準備中のテーマ</h2><span>下書きは公開せず、参考資料との対応を確認してから追加します。</span></div><div className="article-grid">{planned.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></section>}
      {published.length === 0 && planned.length === 0 && <p>現在、記事を準備しています。</p>}
    </div></section>
    <SiteFooter />
  </main>;
}
