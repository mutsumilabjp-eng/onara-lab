"use client";

/* eslint-disable @next/next/no-img-element -- externally licensed editorial images are rendered directly with responsive CSS. */
/* eslint-disable @next/next/no-html-link-for-pages -- static internal links remain deliberately usable without client-side routing. */

import { FormEvent, useMemo, useState } from "react";
import { ArticleCard } from "./components/ArticleCard";
import { JsonLd } from "./components/JsonLd";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { categories, foodTopics, publishedArticles, sceneTopics } from "./content";
import { releaseLabel, siteConfig } from "./site-config";

const visualAssets = {
  science: { src: "https://images.unsplash.com/photo-1780426272142-b6726b590e71?auto=format&fit=crop&w=1400&q=82", alt: "光を受けてきらめく抽象的な泡のクローズアップ" },
  food: { src: "https://images.unsplash.com/photo-1658308766948-01c85ade2737?auto=format&fit=crop&w=1400&q=82", alt: "さつまいもと豆を使った料理" },
  morning: { src: "https://images.unsplash.com/photo-1761587412860-222f6ce02f82?auto=format&fit=crop&w=1400&q=82", alt: "朝の光が入る食卓と飲み物" },
};


const foodTopicLinks: Record<string, string> = {
  "さつまいも": "/food/sweet-potato/",
  "豆": "/food/beans/",
  "牛乳": "/food/milk/",
  "プロテイン": "/food/protein/",
  "玉ねぎ": "/food/onion/",
  "炭酸飲料": "/food/carbonated-drinks/",
  "ヨーグルト": "/food/yogurt/",
  "卵": "/food/egg/",
  "肉": "/food/meat/",
  "食物繊維": "/food/fiber/",
};
const sceneTopicLinks: Record<string, string> = {
  "朝": "/scene/morning/",
  "夜": "/scene/night/",
  "寝ている時": "/scene/sleep/",
  "食後": "/scene/after-meal/",
  "空腹時": "/scene/empty-stomach/",
  "職場": "/scene/workplace/",
  "デート": "/scene/date/",
  "運動中": "/scene/exercise/",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "ja",
};

const searchAliases: Record<string, string[]> = {
  "what-is-fart": [
    "おならってなんで出る",
    "おならはなんで出る",
    "おならなぜ出る",
    "おならの原因",
    "おならが出る理由",
    "ガスが出る理由",
  ],
  flatus: ["放屁とおならの違い", "ほうひ", "放屁 意味", "放屁 読み方", "flatus"],
  "medical-term": ["おならの医学用語", "排ガス", "腸内ガス", "医学ではなんていう"],
  components: ["おならの成分", "何でできている", "なにでできている", "窒素", "二酸化炭素", "水素", "メタン"],
  "why-smells": ["おならが臭い", "おならはなぜ臭い", "くさい", "臭い原因", "硫黄", "硫黄の臭い"],
  "how-many-per-day": ["おなら 何回", "1日何回", "一日何回", "回数", "多い", "おならが多い"],
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[ぁ-ん]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60))
    .replace(/[、。・,.!?！？「」『』（）()【】\[\]\s]/g, "");
}

function tokenizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKC")
    .split(/[、。・,.!?！？「」『』（）()【】\s]|って|とは|との|では|には|から|まで|より|なぜ|なんで|どうして|の|と|が|は|を|に|で|へ|や|か|も|ね|よ|です|ます/g)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function articleMatchesSearch(article: (typeof publishedArticles)[number], rawQuery: string) {
  const normalizedQuery = normalizeSearchText(rawQuery);
  if (!normalizedQuery) return true;

  const haystack = normalizeSearchText([
    article.title,
    article.description,
    article.conclusion,
    ...(article.sections?.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]) ?? []),
    ...(searchAliases[article.slug] ?? []),
  ].filter(Boolean).join(" "));

  if (haystack.includes(normalizedQuery)) return true;
  if ((searchAliases[article.slug] ?? []).some((alias) => normalizeSearchText(alias).includes(normalizedQuery) || normalizedQuery.includes(normalizeSearchText(alias)))) return true;

  const tokens = tokenizeSearchText(rawQuery);
  return tokens.length > 0 && tokens.every((token) => haystack.includes(normalizeSearchText(token)));
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const visibleArticles = useMemo(() => {
 const keyword = submittedQuery.trim();
 if (!keyword) return publishedArticles;
 return publishedArticles.filter((article) => articleMatchesSearch(article, keyword));
  }, [submittedQuery]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedQuery(query);
    document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return <main>
    <JsonLd data={webSiteSchema} />
    <SiteHeader />

    <section id="top" className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">おなら・放屁・腸内ガスの疑問を調べる専門メディア</p>
          {!siteConfig.isPublicRelease && <p className="preview-pill"><span>{releaseLabel}</span> 検索エンジンにはまだ公開しません</p>}
          <h1>おならの疑問、<br />だいたいここで調べられます。</h1>
          <p className="hero-lead">臭い、回数、食べ物、寝ている間のこと。少し気になるけれど聞きにくい疑問を、科学・医学・生活の視点でほどいていきます。</p>
          <form className="site-search" onSubmit={submitSearch} role="search">
            <label className="sr-only" htmlFor="hero-search">公開中の記事を検索</label>
            <input id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：おならが臭い、回数、放屁" />
            <button type="submit">調べる</button>
          </form>
          <p className="hero-note"><span aria-hidden="true">●</span> 診断・治療を目的としたサイトではありません</p>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-frame" aria-hidden="true"><img src={visualAssets.science.src} alt="" /></div>
          <div className="gas-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <div className="study-card study-card-main"><p>SCIENCE NOTE</p><strong>おならは何で<br />できている？</strong><span>空気と腸内由来のガス</span></div>
          <div className="study-card study-card-sub"><p>QUESTION</p><strong>臭いは、<br />どこから来る？</strong></div>
        </div>
      </div>
    </section>

      {!siteConfig.isPublicRelease && <section className="release-strip"><div className="shell release-grid"><div><strong>公開記事を拡充</strong><span>未執筆テーマを本文化</span></div><div><strong>食品・場面も追加</strong><span>食後、職場、デート前まで整理</span></div><div><strong>医療監修なし</strong><span>診断・治療の情報は扱いません</span></div></div></section>}

    <section id="questions" className="section">
      <div className="shell"><SectionHeading kicker="BROWSE BY QUESTION" title="疑問から探す" description="分類ごとに、公開中の記事と準備中のテーマを分けて表示します。" />
        <div className="category-grid">{categories.map((category) => <a key={category.slug} href={`/${category.slug}/`} className={`category-card ${category.tint}`}><span className="category-mark" aria-hidden="true">{category.mark}</span><strong>{category.label}</strong><small>{category.short}</small></a>)}</div>
      </div>
    </section>

    <section className="section wash-section">
      <div className="shell"><SectionHeading kicker="START HERE" title="公開候補の基本記事" description="初回は、資料と参考リンクを確認した6本から始めます。" />
        <div className="feature-grid">{publishedArticles.map((article, index) => <ArticleCard key={article.slug} article={article} emphasis={index === 0} />)}</div>
      </div>
    </section>

    <section className="section food-section">
      <div className="shell split-heading"><SectionHeading kicker="FOOD INDEX" title="食べ物から探す" /><a className="text-link" href="/food/">食べ物の記事を見る <span>→</span></a></div>
      <div className="shell topic-visual-grid"><figure className="topic-photo food-photo"><img src={visualAssets.food.src} alt={visualAssets.food.alt} loading="lazy" decoding="async" /><figcaption><span>FOOD NOTE</span><strong>食材ごとの疑問を、ひとつずつ。</strong></figcaption></figure>
        <div className="topic-detail"><p>食品名だけで原因を決めず、成分、食べ方、量、個人差を分けて考えます。食べ物の記事は、根拠の確認が済んだ順に追加します。</p><div className="chips">{foodTopics.map((food) => <a key={food} href={foodTopicLinks[food] ?? "/food/"}>{food}</a>)}</div></div>
      </div>
    </section>

    <section className="section wash-section">
      <div className="shell split-heading"><SectionHeading kicker="LIFE SCENES" title="場面から探す" /><a className="text-link" href="/scene/">時間・場面の記事を見る <span>→</span></a></div>
      <div className="shell topic-visual-grid scene-visual-grid"><div className="topic-detail"><p>朝、食後、寝ている間など、気になるタイミングを入口にします。生活場面の説明は、推測と確認済みの情報を分けて公開します。</p><div className="chips">{sceneTopics.map((scene) => <a key={scene} href={sceneTopicLinks[scene] ?? "/scene/"}>{scene}</a>)}</div></div>
        <figure className="topic-photo scene-photo"><img src={visualAssets.morning.src} alt={visualAssets.morning.alt} loading="lazy" decoding="async" /><figcaption><span>LIFE SCENE</span><strong>時間や場面から、落ち着いて調べる。</strong></figcaption></figure>
      </div>
    </section>

    <section id="science" className="section"><div className="shell science-panel"><div className="science-copy"><p className="eyebrow light">SCIENCE LIBRARY</p><h2>科学で調べる</h2><p>腸内細菌、ガスの成分、臭い物質。おならをなんとなくで終わらせず、分かっていることと未確認なことを分けて整理します。</p><div className="science-links"><a href="/science/components/">おならの成分は何でできている？ <span>→</span></a><a href="/smell/why-smells/">おならはなぜ臭い？ <span>→</span></a><a href="/sources/">参考資料の方針を見る <span>→</span></a></div></div><div className="molecules" aria-hidden="true"><div className="molecule molecule-a">N₂</div><div className="molecule molecule-b">CO₂</div><div className="molecule molecule-c">H₂</div><span className="molecule-line"></span></div></div></section>

    <section id="search-results" className="section wash-section search-results"><div className="shell"><SectionHeading kicker={submittedQuery ? `SEARCH: ${submittedQuery}` : "PUBLISHED ARTICLES"} title={submittedQuery ? `「${submittedQuery}」の検索結果` : "公開中の記事"} description={submittedQuery ? "公開中の記事だけを対象に検索しています。" : "資料と表示を確認した記事だけを掲載しています。"} />
      {visibleArticles.length > 0 ? <div className="article-grid">{visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}</div> : <div className="empty-result"><span aria-hidden="true">⌕</span><p>公開中の記事には一致がありませんでした。</p><a href="/">トップの記事一覧へ戻る</a></div>}
    </div></section>

      <section id="about" className="section"><div className="shell about-panel"><div className="lab-seal" aria-hidden="true">ONARA<br />LAB</div><div><p className="eyebrow">ABOUT THIS SITE</p><h2>少し気まずい疑問ほど、<br />落ち着いて調べられる場所に。</h2><p>おなら研究所は、医療機関ではありません。資料を確認しながら、生活の中で気になる疑問を、断定しすぎず分かりやすく整理します。</p><div className="about-points"><span>出典を確認</span><span>未確認は未確認と書く</span><span>診断・治療をしない</span></div><a className="inline-link" href="/about/">サイトの方針を見る →</a></div></div></section>
 <section className="section affiliate-strip"><div className="shell affiliate-strip-inner"><div><p className="eyebrow">PR / 商品メモ</p><h2>お腹・においが気になる時の商品選びを整理しています。</h2><p>腸内フローラ検査、食物繊維、プロテイン、エチケット用品を、診断・治療・改善保証ではなく「買う前の確認先」として紹介します。</p></div><a className="inline-link" href="/affiliate/">商品メモを見る →</a></div></section>
      <SiteFooter />
  </main>;
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return <div className="section-heading"><p>{kicker}</p><h2>{title}</h2>{description && <span>{description}</span>}</div>;
}
