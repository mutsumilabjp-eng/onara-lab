import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms, getAffiliateProgram, type AffiliateProgram } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

type ProductPageProps = { params: Promise<{ slug: string }> };
type CtaStage = "intro" | "checklist" | "final";
type CtaCopy = { heading: string; description: string; label: string };
type CtaCopyByStage = Record<CtaStage, CtaCopy>;
type StateCopy = { heading: string; items: string[] };

const genericCtaCopy: CtaCopyByStage = {
  intro: {
    heading: "条件に近いなら、先に商品内容を確認します",
    description: "購入を急がず、原材料・利用条件・注意事項を確認したうえで候補に残るかを考えてください。",
    label: "商品内容・利用条件を確認する",
  },
  checklist: {
    heading: "確認したい条件が整理できたら",
    description: "価格だけで決めず、上で整理した項目が自分の条件に合うか、公式情報で見てください。",
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
      heading: "検査内容と料金を、先に確認します",
      description: "上の状況に近い場合は、検査範囲と現在料金を確認してから候補に残るかを考えてください。",
      label: "検査で分かる範囲・現在料金を確認する",
    },
    checklist: {
      heading: "検査結果をどう使うかイメージできたら",
      description: "生活メモとあわせて見る前提が持てたら、検査範囲・結果レポート・料金を確認してください。",
      label: "検査範囲・結果レポート・料金を確認する",
    },
    final: {
      heading: "生活を見直す材料として合いそうなら",
      description: "Mykinsoだけでおならの原因が分かるわけではありません。検査の限界も理解したうえで、最新の条件を確認してください。",
      label: "Mykinsoの検査内容・現在料金を確認する",
    },
  },
  "a8-premedica": {
    intro: {
      heading: "検査の流れと料金を、先に確認します",
      description: "上の状況に近い場合は、自宅採便から結果確認までの流れと現在料金を見てください。",
      label: "検査キットの流れ・料金を確認する",
    },
    checklist: {
      heading: "検査の流れと確認したい項目が合っているなら",
      description: "採便・返送・結果報告書・利用条件が自分の確認したいことに合うか、公式ページで見てください。",
      label: "検査キットの流れ・料金を確認する",
    },
    final: {
      heading: "結果を生活の見直しに使えそうなら",
      description: "検査だけで症状の原因を決めず、結果の見方と利用条件に納得できるかを確認してください。",
      label: "Flora Scanの検査内容・現在料金を確認する",
    },
  },
  "a8-inulin": {
    intro: {
      heading: "少量から使う条件を、先に確認します",
      description: "上の状況に近い場合は、原材料・内容量・価格を確認してから候補に残るかを考えてください。",
      label: "原材料・内容量・価格を確認する",
    },
    checklist: {
      heading: "少量から調整する前提なら",
      description: "急に量を増やさず、1回量・摂り方・注意事項が自分の生活に合うかを確認してください。",
      label: "1回量・摂り方・価格を確認する",
    },
    final: {
      heading: "続け方まで納得できそうなら",
      description: "お腹の張りなどの体感も確認しながら使う前提で、内容量と最新価格を見てください。",
      label: "内容量・価格を確認する",
    },
  },
  "a8-ladies-rose": {
    intro: {
      heading: "外出前の準備として、条件を確認します",
      description: "上の状況に近い場合は、成分・飲み方・価格を確認して、予定前の選択肢として合うかを考えてください。",
      label: "成分・飲み方・価格を確認する",
    },
    checklist: {
      heading: "外出前の準備として取り入れたいなら",
      description: "改善を保証するものではないことを前提に、成分・香り・摂り方・注意事項を確認してください。",
      label: "成分・香り・摂り方を確認する",
    },
    final: {
      heading: "予定前の準備として合いそうなら",
      description: "自分の予定や香りの好みと合うかを考えたうえで、公式ページの最新情報を確認してください。",
      label: "外出前の準備として合いそうか確認する",
    },
  },
  "moshimo-lyft": {
    intro: {
      heading: "原材料の条件を、先に確認します",
      description: "上の状況に近い場合は、乳成分・甘味料・フレーバーを確認してから候補に残るかを考えてください。",
      label: "乳成分・甘味料・フレーバーを確認する",
    },
    checklist: {
      heading: "乳成分・甘味料の条件が合いそうなら",
      description: "原材料、1回量、飲むタイミングを確認したうえで、公式ページの内容量とフレーバーを見てください。",
      label: "原材料・1回量・フレーバーを確認する",
    },
    final: {
      heading: "続ける条件が整理できたら",
      description: "お腹の状態を商品だけで決めず、量やタイミングも分けて確認する前提で選びます。",
      label: "条件に合うフレーバー・価格を確認する",
    },
  },
  "a8-rakuten-acadi": {
    intro: {
      heading: "乳糖と内容量の条件を、先に確認します",
      description: "上の状況に近い場合は、乳糖・内容量・価格を確認してから比較候補に残るかを考えてください。",
      label: "乳糖・内容量・価格を確認する",
    },
    checklist: {
      heading: "牛乳の代わりとして条件が合うか確認したいなら",
      description: "乳糖の量、原材料、アレルゲン、内容量、在庫を公式ページで確認してください。",
      label: "乳糖・内容量・価格を確認する",
    },
    final: {
      heading: "少量から比べる条件が整ったら",
      description: "症状の原因を商品だけで判断せず、食事全体と体感も分けて見る前提で確認します。",
      label: "原材料・内容量・価格を確認する",
    },
  },
  "a8-rakuten-nichiga-soy": {
    intro: {
      heading: "乳成分を避ける条件を、先に確認します",
      description: "上の状況に近い場合は、原材料・内容量・1回量を確認してから候補に残るかを考えてください。",
      label: "原材料・内容量・1回量を確認する",
    },
    checklist: {
      heading: "乳成分を避けた候補として比較するなら",
      description: "大豆アレルゲン、原材料、甘味料の有無、1回量を確認したうえで候補に残すかを考えます。",
      label: "原材料・内容量・1回量を確認する",
    },
    final: {
      heading: "原材料の条件に納得できたら",
      description: "少量から体感を確認する前提で、販売ページの内容量・価格・在庫を確認してください。",
      label: "原材料・内容量・価格を確認する",
    },
  },
  "moshimo-happy-tempe": {
    intro: {
      heading: "間食としての条件を、先に確認します",
      description: "上の状況に近い場合は、原材料・アレルゲン・内容量を確認してから候補に残るかを考えてください。",
      label: "原材料・アレルゲン・内容量を確認する",
    },
    checklist: {
      heading: "間食として取り入れる条件が合いそうなら",
      description: "発酵食品という言葉だけで判断せず、栄養成分、アレルゲン、量、価格・在庫を確認してください。",
      label: "栄養成分・価格・在庫を確認する",
    },
    final: {
      heading: "食べ方まで考えられたら",
      description: "大豆アレルギーや食べる量を確認し、他の食事との組み合わせも含めて判断してください。",
      label: "間食として合うか販売ページを確認する",
    },
  },
};

const stateCopies: Partial<Record<string, StateCopy>> = {
  "a8-mykinso": {
    heading: "こんな状態なら、まず検査内容を確認してもいいでしょう",
    items: ["なんとなく腸活を続けている", "食事を変えても何を基準にすればいいか分からない", "自分の腸内環境について確認材料を増やしたい"],
  },
  "a8-premedica": {
    heading: "こんな状態なら、まず検査内容を確認してもいいでしょう",
    items: ["自宅で検査の流れまで確認してから決めたい", "結果報告書とその後の相談の選択肢も見たい", "食生活を見直す材料を増やしたい"],
  },
  "a8-inulin": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["普段の食事だけでは食物繊維を増やしにくい", "飲み物や料理に加えられるものを探している", "少量から調整したい"],
  },
  "a8-ladies-rose": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["人と会う前ににおいが気になる", "「もし気づかれたら」と考えてしまう", "食事やトイレ以外にも準備を一つ持っておきたい"],
  },
  "moshimo-lyft": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["プロテインを飲むとお腹が張る", "原材料を見直したい", "今の商品を変える前に比較材料が欲しい"],
  },
  "a8-rakuten-acadi": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["牛乳を飲んだ後の体感が気になる", "乳糖と飲む量を分けて考えたい", "乳飲料の原材料と内容量を比較したい"],
  },
  "a8-rakuten-nichiga-soy": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["乳成分を避けた候補まで見たい", "甘味料や原材料を比較したい", "1回量を自分で調整したい"],
  },
  "moshimo-happy-tempe": {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: ["発酵食品を間食に取り入れてみたい", "原材料とアレルゲンを確認して選びたい", "食べる量を意識して比較したい"],
  },
};

function getCtaCopy(program: AffiliateProgram, stage: CtaStage) {
  return ctaCopies[program.id]?.[stage] ?? { ...genericCtaCopy[stage], label: program.ctaLabel };
}

function getStateCopy(program: AffiliateProgram): StateCopy {
  return stateCopies[program.id] ?? {
    heading: "こんな状態なら、まず商品内容を確認してもいいでしょう",
    items: program.suitedFor.slice(0, 3),
  };
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
        pageName={program.title}
        sourceArticle={`product-memo:${program.slug}`}
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
  return { title: program.title, description: program.description };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const program = getAffiliateProgram(slug);
  if (!program) notFound();
  const stateCopy = getStateCopy(program);

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
            <section className="product-free-box product-before-box">
              <h2>この商品を見る前に</h2>
              <p>{program.safeCopy}</p>
              <p>{program.caution}</p>
            </section>
            <section className="product-audience-box product-state-box">
              <p>{stateCopy.heading}</p>
              <ul>{stateCopy.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <ProductCta program={program} stage="intro" />
            <section className="product-free-box">
              <h2>先に確認しておきたいこと</h2>
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
              <h2>商品ページで確認すること</h2>
              <ul className="product-checks">{program.checkItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <ProductCta program={program} stage="checklist" />
            <section className="product-fit-grid">
              <div>
                <h2>{program.name}が向いている人</h2>
                <ul>{program.suitedFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h2>向かない人</h2>
                <ul>{program.notSuitedFor.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </section>
            <section className="product-summary">
              <h2>まとめ</h2>
              <p>商品だけで悩みの原因を決めず、上の確認項目と自分の条件を照らして、必要なら公式情報を確認してください。</p>
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
              <ul>{program.relatedArticlePaths.map((article) => <li key={article.href}><a href={article.href}>{article.label}</a></li>)}</ul>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
