import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms, getAffiliateProgram, type AffiliateProgram } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

type ProductPageProps = { params: Promise<{ slug: string }> };
type CtaStage = "intro" | "checklist" | "final";

const ctaDetails: Partial<Record<string, { intro: string; checklist: string; final: string }>> = {
  "a8-mykinso": {
    intro: "検査で分かる項目・料金を公式で確認する",
    checklist: "検査範囲・結果の見方・料金を確認する",
    final: "生活メモと合わせて検査内容を確認する",
  },
  "a8-premedica": {
    intro: "検査キットの流れ・料金を公式で確認する",
    checklist: "結果の確認方法・利用条件を確認する",
    final: "自宅検査の内容を確認する",
  },
  "a8-inulin": {
    intro: "原材料・1回量・価格を確認する",
    checklist: "摂り方・注意事項・価格を確認する",
    final: "少量から試す前提で商品情報を確認する",
  },
  "a8-ladies-rose": {
    intro: "成分・飲み方を公式で確認する",
    checklist: "成分・注意事項・価格を確認する",
    final: "外出前の準備に合うか公式で確認する",
  },
  "moshimo-lyft": {
    intro: "原材料・フレーバー・価格を確認する",
    checklist: "乳成分・甘味料・1回量を確認する",
    final: "自分の条件に合う商品を公式で確認する",
  },
  "a8-rakuten-acadi": {
    intro: "乳糖の量・内容量・価格を確認する",
    checklist: "原材料・アレルゲン・在庫を確認する",
    final: "少量から比較する条件を確認する",
  },
  "a8-rakuten-nichiga-soy": {
    intro: "原材料・アレルゲン・価格を確認する",
    checklist: "乳成分・甘味料・1回量を確認する",
    final: "原材料を比較して販売ページを確認する",
  },
  "moshimo-happy-tempe": {
    intro: "原材料・アレルゲン・内容量を確認する",
    checklist: "栄養成分・価格・在庫を確認する",
    final: "間食として合うか販売ページを確認する",
  },
};

function getCtaLabel(program: AffiliateProgram, stage: CtaStage) {
  return ctaDetails[program.id]?.[stage] ?? program.ctaLabel;
}

function ProductCta({ program, stage }: { program: AffiliateProgram; stage: CtaStage }) {
  const headings: Record<CtaStage, string> = {
    intro: "こんな人なら、まず確認する価値があります",
    checklist: "公式ページで確認する項目が整理できたら",
    final: "条件に合いそうなら、最後に公式情報を確認します",
  };
  const descriptions: Record<CtaStage, string> = {
    intro: "ここまで読んで自分の状況に近いと感じた場合は、商品ページの基本情報を先に確認してください。購入を急ぐ必要はありません。",
    checklist: "価格だけで決めず、上で整理した確認項目が自分の条件に合うか、公式情報で見てください。",
    final: program.ctaLead,
  };

  return (
    <section className={`product-cta product-cta-${stage}`}>
      <p className="article-pr-label">PR</p>
      <h2>{headings[stage]}</h2>
      <p>{descriptions[stage]}</p>
      <TrackedLink
        href={program.link}
        target="_blank"
        rel="nofollow sponsored noreferrer"
        eventName="affiliate_cta_click"
        program={program.slug}
        placement={`affiliate/${program.slug}/${stage}`}
      >
        {getCtaLabel(program, stage)}
      </TrackedLink>
    </section>
  );
}

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
          <div className="article-meta">広告を含みます。内容確認日：2026-08-18</div>
        </div>
      </section>
      <section className="article-page-section">
        <div className="shell article-layout">
          <article className="article-content product-article">
            <p className="product-lead">{program.lead}</p>
            <section className="product-audience-box">
              <p>こんな人が、まず確認しやすい商品です</p>
              <ul>{program.suitedFor.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <ProductCta program={program} stage="intro" />
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
            <section className="article-section product-checks-section">
              <h2>公式ページで確認すること</h2>
              <ul className="product-checks">
                {program.checkItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <ProductCta program={program} stage="checklist" />
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
            <ProductCta program={program} stage="final" />
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
