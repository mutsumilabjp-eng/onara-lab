import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms, getAffiliateProgram, type AffiliateProgram } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

type ProductPageProps = { params: Promise<{ slug: string }> };
type CtaStage = "intro" | "checklist" | "final";

type CtaCopy = { heading?: string; description?: string; label: string };
type CtaCopyByStage = { intro: CtaCopy; checklist: CtaCopy; final: CtaCopy };

const genericCtaCopy: CtaCopyByStage = {
  intro: {
    heading: "こんな人なら、まず確認する価値があります",
    description: "自分の状況に近いと感じた場合は、購入を急がず、商品ページで判断材料を確認してください。",
    label: "公式ページで確認する",
  },
  checklist: {
    heading: "公式ページで確認する項目が整理できたら",
    description: "価格だけで決めず、上で整理した確認項目が自分の条件に合うか、公式情報で見てください。",
    label: "確認項目を公式で見る",
  },
  final: {
    heading: "条件に合いそうなら、最後に公式情報を確認します",
    description: "向いている条件と向かない条件を読んだうえで、公式ページの最新情報を確認してください。",
    label: "商品情報を公式で確認する",
  },
};

const ctaCopies: Partial<Record<string, CtaCopyByStage>> = {
  "a8-mykinso": {
    intro: {
      heading: "なんとなく腸活する前に、確認材料を増やしたい人へ",
      description: "食事を変えても何が自分に合うか整理しにくい時は、腸内環境について確認できる材料を一つ増やす選択肢があります。",
      label: "検査で分かる項目・料金を確認する",
    },
    checklist: { ...genericCtaCopy.checklist, label: "検査範囲・結果レポート・料金を確認する" },
    final: {
      heading: "ここまでの条件に合いそうなら、最後に公式情報を確認します",
      description: "Mykinsoだけでおならの原因が分かるわけではありません。それでも食生活や腸内環境を考える材料を一つ増やしたい人には、検討候補になります。",
      label: "Mykinsoの検査内容・料金を確認する",
    },
  },
  "a8-premedica": {
    intro: {
      heading: "自宅で検査の流れまで確認してから決めたい人へ",
      description: "自宅で検査を進める手順や、結果を受け取った後に何を確認するかを先に知りたい人向けの選択肢です。",
      label: "検査キットの流れ・料金を確認する",
    },
    checklist: { ...genericCtaCopy.checklist, label: "結果の確認方法・利用条件を確認する" },
    final: { ...genericCtaCopy.final, label: "Flora Scanの検査内容・料金を確認する" },
  },
  "a8-inulin": {
    intro: {
      heading: "食物繊維を、量から見直したい人へ",
      description: "普段の食事だけでは食物繊維を意識しにくく、飲み物や食事に加えやすい形を探しているなら、商品内容を確認する選択肢があります。",
      label: "原材料・内容量・価格を確認する",
    },
    checklist: { ...genericCtaCopy.checklist, label: "1回量・摂り方・価格を確認する" },
    final: { ...genericCtaCopy.final, label: "条件に合いそうなら、イヌリンの商品情報を見る" },
  },
  "a8-ladies-rose": {
    intro: {
      heading: "人と会う前に、準備を一つ増やしたい人へ",
      description: "「もし気づかれたら」と考え始めると、せっかくの予定でも会話に集中しにくくなります。食事やトイレの準備に加えて、エチケット用品も確認したい人向けの選択肢です。",
      label: "成分・飲み方・価格を確認する",
    },
    checklist: { ...genericCtaCopy.checklist, label: "成分・香り・摂り方を確認する" },
    final: { ...genericCtaCopy.final, label: "外出前の準備として合いそうか確認する" },
  },
  "moshimo-lyft": {
    intro: {
      heading: "LYFTを見る前に、この3点だけ確認します",
      description: "乳成分、甘味料、1回量を確認したうえで候補に残るなら、フレーバーや価格を見て比較します。",
      label: "原材料・フレーバー・価格を見る",
    },
    checklist: { ...genericCtaCopy.checklist, label: "乳成分・甘味料・1回量を確認する" },
    final: { ...genericCtaCopy.final, label: "条件に合うフレーバーがあるか公式で確認する" },
  },
  "a8-rakuten-acadi": {
    intro: { ...genericCtaCopy.intro, label: "乳糖の量・原材料・内容量を確認する" },
    checklist: { ...genericCtaCopy.checklist, label: "原材料・アレルゲン・在庫を確認する" },
    final: { ...genericCtaCopy.final, label: "少量から比較する条件を確認する" },
  },
  "a8-rakuten-nichiga-soy": {
    intro: { ...genericCtaCopy.intro, label: "原材料・アレルゲン・価格を確認する" },
    checklist: { ...genericCtaCopy.checklist, label: "乳成分・甘味料・1回量を確認する" },
    final: { ...genericCtaCopy.final, label: "原材料を比較して販売ページを確認する" },
  },
  "moshimo-happy-tempe": {
    intro: { ...genericCtaCopy.intro, label: "原材料・アレルゲン・内容量を確認する" },
    checklist: { ...genericCtaCopy.checklist, label: "栄養成分・価格・在庫を確認する" },
    final: { ...genericCtaCopy.final, label: "間食として合うか販売ページを確認する" },
  },
};

function getCtaCopy(program: AffiliateProgram, stage: CtaStage) {
  return ctaCopies[program.id]?.[stage] ?? { ...genericCtaCopy[stage], label: program.ctaLabel };
}

function ProductCta({ program, stage }: { program: AffiliateProgram; stage: CtaStage }) {
  const copy = getCtaCopy(program, stage);
  const ctaPosition = stage === "intro" ? "top" : stage === "checklist" ? "middle" : "bottom";

  return (
    <section className={`product-cta product-cta-${stage}`}>
      <p className="article-pr-label">PR</p>
      <h2>{copy.heading}</h2>
      <p>{copy.description}</p>
      <TrackedLink
        href={program.link}
        target="_blank"
        rel="nofollow sponsored noreferrer"
        eventName="affiliate_click"
        productName={program.name}
        ctaPosition={ctaPosition}
      >
        {copy.label}
      </TrackedLink>
      <small className="affiliate-disclosure">PR｜リンク先は公式販売ページです</small>
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
