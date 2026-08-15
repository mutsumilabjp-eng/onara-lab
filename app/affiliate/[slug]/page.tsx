import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms, getAffiliateProgram } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return affiliatePrograms.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getAffiliateProgram(slug);
  if (!program) return { title: "商品メモが見つかりません", robots: { index: false, follow: false } };
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const program = getAffiliateProgram(slug);
  if (!program) notFound();

  return (
    <main>
      <SiteHeader />
      <section className="article-hero product-detail-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><a href="/affiliate">商品メモ</a><span>/</span><span>{program.name}</span></div>
          <p className="product-category">{program.category}</p>
          <h1>{program.title}</h1>
          <p className="article-description">{program.description}</p>
          <div className="article-meta">広告を含みます。内容確認日：2026-08-15</div>
        </div>
      </section>
      <section className="article-page-section">
        <div className="shell article-layout">
          <article className="article-content product-article">
            <p className="product-lead">{program.lead}</p>
            <section className="product-free-box">
              <h2>先に持ち帰ること</h2>
              <p>{program.freeTakeaway}</p>
            </section>
            {program.sections.map((section) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </section>
            ))}
            <section className="article-section">
              <h2>公式ページで確認すること</h2>
              <ul className="product-checks">
                {program.checkItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section className="product-fit-grid">
              <div>
                <h2>向いている人</h2>
                <ul>{program.suitedFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h2>向かない人</h2>
                <ul>{program.notSuitedFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
            <section className="product-cta">
              <p className="article-pr-label">PR</p>
              <h2>{program.name}を確認する</h2>
              <p>{program.ctaLead}</p>
              <a href={program.link} target="_blank" rel="nofollow sponsored noreferrer">{program.ctaLabel}</a>
            </section>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-card">
              <h2>このページの読み方</h2>
              <p>{program.safeCopy}</p>
              <p>{program.caution}</p>
            </div>
            <div className="sidebar-card">
              <h2>関連する記事</h2>
              <ul>
                {program.relatedArticlePaths.map((article) => (
                  <li key={article.href}><a href={article.href}>{article.label}</a></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
