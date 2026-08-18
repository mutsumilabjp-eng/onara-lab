import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { affiliatePrograms } from "../../affiliate-content";
import { getArticleComic } from "../../comic-content";
import { ArticleComic } from "../../components/ArticleComic";
import { JsonLd } from "../../components/JsonLd";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";
import { articleUrl, articles, categoryName, getArticle, getRelatedPublishedArticles, type Article } from "../../content";
import { siteConfig } from "../../site-config";

/* eslint-disable @next/next/no-html-link-for-pages -- article links are static and valid in the generated site. */

type ArticlePageProps = { params: Promise<{ category: string; slug: string }> };
type ProductGuide = {
  title: string;
  description: string;
  choices: Array<{ programId: string; prompt: string; description: string }>;
};

const affiliatePlacements: Record<string, string[]> = {
  "science/gut-bacteria": ["a8-mykinso", "a8-premedica"],
  "smell/why-smells": ["a8-ladies-rose", "a8-inulin", "a8-mykinso"],
  "food/fiber": ["a8-inulin"],
  "food/milk": ["a8-rakuten-acadi"],
  "food/protein": ["moshimo-lyft", "a8-rakuten-nichiga-soy"],
};

const articleProductGuides: Record<string, ProductGuide> = {
  "smell/why-smells": {
    title: "臭いが気になる時は、目的によって確認先が変わります",
    description: "おならの臭いが気になるからといって、全員が同じ商品を見る必要はありません。いま最も気になることを分けて、商品メモで確認項目を読んでください。",
    choices: [
      { programId: "a8-ladies-rose", prompt: "人と会う前や外出時のエチケットが気になる", description: "成分・飲み方・期待しすぎないための注意点を確認する" },
      { programId: "a8-inulin", prompt: "食事全体や食物繊維の取り方を見直したい", description: "原材料・1回量・増やすペースを確認する" },
      { programId: "a8-mykinso", prompt: "自分の腸内環境を一度詳しく知りたい", description: "検査で分かる範囲・料金・生活メモの使い方を確認する" },
    ],
  },
  "science/gut-bacteria": {
    title: "腸内環境を確認したい時は、検査の目的を先に分けます",
    description: "検査は原因を断定するものではありません。食生活を見直す材料を増やしたいのか、自宅で結果を確認したいのかを分けて、各商品メモで確認してください。",
    choices: [
      { programId: "a8-mykinso", prompt: "食生活を考える材料として、腸内環境を確認したい", description: "検査で分かる項目・料金・結果の見方を確認する" },
      { programId: "a8-premedica", prompt: "自宅でできる検査の流れを確認したい", description: "検査キット・結果の確認方法・利用条件を確認する" },
    ],
  },
  "food/fiber": {
    title: "食物繊維を増やしたい時は、量とペースを先に確認します",
    description: "おならが気になる人ほど、急に食物繊維を増やすと体感が分かりにくくなります。商品を見る前に、原材料と1回量を確認してください。",
    choices: [
      { programId: "a8-inulin", prompt: "水溶性食物繊維を候補として比較したい", description: "原材料・1回量・価格・少量から試す前提を確認する" },
    ],
  },
  "food/milk": {
    title: "牛乳の後に気になる時は、乳糖と量を分けて見ます",
    description: "牛乳で毎回つらいからといって、商品だけで原因を決めることはできません。乳糖の量や内容量を比較する前提で、商品メモを確認してください。",
    choices: [
      { programId: "a8-rakuten-acadi", prompt: "乳糖を調整した飲料の選択肢を比較したい", description: "乳糖の量・内容量・原材料・少量から試す条件を確認する" },
    ],
  },
  "food/protein": {
    title: "プロテインの後に気になる時は、原材料から分けて確認します",
    description: "プロテインでお腹が張る時は、乳成分、甘味料、飲む量、飲むタイミングを一度に変えないことが大切です。気になる条件に近い商品メモを選んでください。",
    choices: [
      { programId: "moshimo-lyft", prompt: "ホエイ系プロテインの原材料やフレーバーを確認したい", description: "乳成分・甘味料・1回量・価格を確認する" },
      { programId: "a8-rakuten-nichiga-soy", prompt: "乳由来以外のプロテインを原材料から比較したい", description: "大豆・甘味料・アレルゲン・1回量を確認する" },
    ],
  },
};

function getArticleAffiliatePrograms(article: Article) {
  const placementKey = `${article.category}/${article.slug}`;
  const ids = affiliatePlacements[placementKey] ?? [];
  return ids
    .map((id) => affiliatePrograms.find((program) => program.id === id))
    .filter((program): program is (typeof affiliatePrograms)[number] => Boolean(program));
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
  const productGuide = articleProductGuides[`${article.category}/${article.slug}`];
  const guideChoices = productGuide?.choices
    .map((choice) => ({ ...choice, program: affiliatePrograms.find((program) => program.id === choice.programId) }))
    .filter((choice): choice is ProductGuide["choices"][number] & { program: (typeof affiliatePrograms)[number] } => Boolean(choice.program));
  const fallbackChoices = articleAffiliatePrograms.map((program) => ({
    program,
    prompt: "商品を選ぶ前に、確認できること・確認できないことを整理したい",
    description: "商品メモで、対象・注意点・公式ページで確認する項目を読む",
  }));
  const productChoices = guideChoices?.length ? guideChoices : fallbackChoices;
  const articleComic = getArticleComic(article.category, article.slug);
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
          <div className="article-meta">資料確認：{article.updatedAt ?? "2026-08-15"}　編集：おなら研究所 編集部</div>
        </div>
      </section>
      <section className="article-page-section">
        <div className="shell article-layout">
          <article className="article-content">
            {article.conclusion && (
              <section className="article-conclusion">
                <p>この記事の結論</p>
                <h2>{article.conclusion}</h2>
              </section>
            )}
            {articleComic && <ArticleComic comic={articleComic} />}
            {article.sections?.map((section) => (
              <section className="article-section" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </section>
            ))}
            {productChoices.length > 0 && (
              <section id="next-steps" className="article-pr article-decision-guide">
                <p className="article-pr-label">次に確認したいこと</p>
                <h2>{productGuide?.title ?? "商品を見る前に、確認先を選びます"}</h2>
                <p>{productGuide?.description ?? "以下の商品メモでは、何を確認できるか・何を期待しすぎないかを整理しています。広告リンクは商品メモの中にだけ掲載しています。"}</p>
                <div className="article-pr-grid">
                  {productChoices.map(({ program, prompt, description }) => (
                    <TrackedLink
                      key={program.id}
                      href={`/affiliate/${program.slug}`}
                      eventName="article_to_product_click"
                      program={program.slug}
                      placement={`${article.category}/${article.slug}`}
                    >
                      <span>{prompt}</span>
                      <strong>{program.name}</strong>
                      <small>{description}</small>
                      <em>商品メモで確認する →</em>
                    </TrackedLink>
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
