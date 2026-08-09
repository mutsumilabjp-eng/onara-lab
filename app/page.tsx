"use client";

import { FormEvent, useMemo, useState } from "react";

type Category = {
  slug: string;
  label: string;
  short: string;
  mark: string;
  tint: string;
};

type Article = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  related: string[];
};

const categories: Category[] = [
  { slug: "basic", label: "基本・仕組み", short: "言葉・仕組み", mark: "○", tint: "mint" },
  { slug: "smell", label: "臭い", short: "臭い・成分", mark: "〰", tint: "apricot" },
  { slug: "amount", label: "回数・量・音", short: "回数・音", mark: "∿", tint: "sun" },
  { slug: "food", label: "食べ物", short: "食品・飲料", mark: "◇", tint: "mint" },
  { slug: "scene", label: "時間・場面", short: "朝・夜・生活", mark: "◷", tint: "apricot" },
  { slug: "body", label: "身体", short: "身体との関係", mark: "+", tint: "sun" },
  { slug: "science", label: "科学", short: "腸内細菌・化学", mark: "⌘", tint: "mint" },
  { slug: "trivia", label: "雑学", short: "動物・文化", mark: "✦", tint: "apricot" },
];

const articles: Article[] = [
  {
    slug: "what-is-fart",
    category: "basic",
    title: "おならとは？なぜ出るのかをわかりやすく解説",
    summary:
      "おならは、腸内にあるガスが肛門から出る現象を指す日常語です。発生には飲み込んだ空気や、消化・腸内での過程が関係します。この記事では、確認できる仕組みと個人差が大きい部分を分けて説明します。",
    related: ["放屁とは？意味・読み方・おならとの違い", "おならの成分は何でできている？", "おならはなぜ臭い？"],
  },
  {
    slug: "flatus",
    category: "basic",
    title: "放屁とは？意味・読み方・おならとの違い",
    summary:
      "放屁は「ほうひ」と読み、肛門からガスを出すことを表す語です。日常会話では「おなら」が一般的で、放屁は説明文や医学・科学の文脈で使われることがあります。",
    related: ["おならの医学用語は？放屁・排ガスとの違い", "おならとは？なぜ出るのかをわかりやすく解説"],
  },
  {
    slug: "medical-term",
    category: "basic",
    title: "おならの医学用語は？放屁・排ガスとの違い",
    summary:
      "おならに近い言葉には、放屁、腸内ガス、排ガスなどがあります。ただし、使われる場面や意味の範囲は同じではありません。",
    related: ["放屁とは？意味・読み方・おならとの違い", "おならとは？なぜ出るのかをわかりやすく解説"],
  },
  {
    slug: "components",
    category: "science",
    title: "おならの成分は何でできている？",
    summary:
      "おならには複数のガスが含まれます。成分の割合は条件によって変わるため、単一の数字だけで決めつけないことが大切です。この記事では、成分・臭い・発生源の関係を分けて調べます。",
    related: ["おならはなぜ臭い？", "おならと腸内細菌の関係"],
  },
  {
    slug: "why-smells",
    category: "smell",
    title: "おならはなぜ臭い？",
    summary:
      "おならの臭いには、腸内で生じる一部の成分が関わります。臭いの強さには食事や腸内環境など複数の要素が関係し得るため、臭いだけで体の状態を断定することはできません。",
    related: ["臭くないおならが出るのはなぜ？", "硫黄のような臭いのおならが出るのはなぜ？", "おならの成分は何でできている？"],
  },
  {
    slug: "no-smell",
    category: "smell",
    title: "臭くないおならが出るのはなぜ？",
    summary:
      "おならが出ても、必ずしも強い臭いがあるわけではありません。この記事では、ガスの量や音とは別に、臭いに関わる要素があることを、資料をもとに整理します。",
    related: ["おならはなぜ臭い？", "おならの成分は何でできている？"],
  },
  {
    slug: "sulfur",
    category: "smell",
    title: "硫黄のような臭いのおならが出るのはなぜ？",
    summary:
      "硫黄のように感じる臭いは、日常的な表現です。臭いの印象には複数の成分や食事などが関係し得ますが、臭いだけで病気の有無を判断することはできません。",
    related: ["おならはなぜ臭い？", "臭くないおならが出るのはなぜ？"],
  },
  {
    slug: "how-many-per-day",
    category: "amount",
    title: "おならは1日何回くらい出る？",
    summary:
      "おならの回数には個人差があり、単一の回数だけで正常・異常を決めることはできません。この記事では、資料に示される目安と、日常生活で気になったときに見るべき点を分けて整理します。",
    related: ["おならを我慢するとどうなる？", "朝におならが多いのはなぜ？"],
  },
  {
    slug: "sound",
    category: "amount",
    title: "おならの音はなぜ鳴る？",
    summary:
      "おならの音は、体の外へ出るガスの流れと出口周辺の条件によって生じます。音の出方には個人差があり、量だけで決まるわけではありません。",
    related: ["おならの音が大きくなるのはなぜ？", "おならを我慢するとどうなる？"],
  },
  {
    slug: "loud",
    category: "amount",
    title: "おならの音が大きくなるのはなぜ？",
    summary:
      "おならの音の大きさは、単純にガスの量だけで決まるとは限りません。この記事では、説明できる要素と、科学的な確認が十分でない部分を分けて扱います。",
    related: ["おならの音はなぜ鳴る？", "おならを我慢するとどうなる？"],
  },
  {
    slug: "holding",
    category: "basic",
    title: "おならを我慢するとどうなる？",
    summary:
      "おならを我慢したときに感じることには個人差があります。不快感がある場合でも、サイト上の情報だけで原因を決めることはできません。",
    related: ["おならは1日何回くらい出る？", "おならの音はなぜ鳴る？"],
  },
  {
    slug: "sleep",
    category: "scene",
    title: "寝ている間にもおならは出る？",
    summary:
      "寝ている間にも腸内のガスが排出されることはあり得ます。睡眠中の排ガスの出方には個人差があるため、一般論と、医療機関への相談を考える場合を分けて説明します。",
    related: ["朝におならが多いのはなぜ？", "食後におならが出やすいのはなぜ？"],
  },
  {
    slug: "morning",
    category: "scene",
    title: "朝におならが多いのはなぜ？",
    summary:
      "朝におならが多いと感じる背景には、前日の食事、睡眠中の体の状態、朝の活動など複数の要素が関係し得ます。",
    related: ["寝ている間にもおならは出る？", "食後におならが出やすいのはなぜ？"],
  },
  {
    slug: "after-meal",
    category: "scene",
    title: "食後におならが出やすいのはなぜ？",
    summary:
      "食後におならが出やすいと感じることには、食事中に飲み込む空気や、消化されにくい成分が腸内で分解される過程などが関係し得ます。どの要素が大きいかは個人差があります。",
    related: ["牛乳を飲むとおならが出るのはなぜ？", "炭酸飲料とおならの関係"],
  },
  {
    slug: "sweet-potato",
    category: "food",
    title: "さつまいもを食べるとおならが出るのはなぜ？",
    summary:
      "さつまいもを食べたあとにおならが増えたと感じる人もいます。食物繊維などの成分が腸内で分解される過程が関係し得ますが、反応には量や食べ方、個人差があります。",
    related: ["食後におならが出やすいのはなぜ？", "おならと腸内細菌の関係"],
  },
  {
    slug: "beans",
    category: "food",
    title: "豆を食べるとおならが増えるのはなぜ？",
    summary:
      "豆類には、消化管で十分に消化されず大腸まで届く成分が含まれることがあります。腸内細菌がそれらを分解する過程でガスが生じ得ますが、感じ方や量には個人差があります。",
    related: ["さつまいもを食べるとおならが出るのはなぜ？", "おならと腸内細菌の関係"],
  },
  {
    slug: "milk",
    category: "food",
    title: "牛乳を飲むとおならが出るのはなぜ？",
    summary:
      "牛乳のあとにおならが気になることには、乳糖の消化のされ方などが関係する場合があります。ただし、症状だけで原因を決めることはできません。",
    related: ["食後におならが出やすいのはなぜ？", "プロテインとおならの関係"],
  },
  {
    slug: "protein",
    category: "food",
    title: "プロテインとおならの関係",
    summary:
      "プロテインと呼ばれる製品には原材料や成分が異なるものがあります。飲んだあとにおならが気になる場合も、製品の種類、量、飲み方などを分けて考える必要があります。",
    related: ["牛乳を飲むとおならが出るのはなぜ？", "食後におならが出やすいのはなぜ？"],
  },
  {
    slug: "carbonated-drinks",
    category: "food",
    title: "炭酸飲料とおならの関係",
    summary:
      "炭酸飲料は、飲み込む気体の量に関係し得ます。一方で、おならは腸内で生じるガスとも関係するため、炭酸を飲んだから必ず同じようにおならが増えるとは限りません。",
    related: ["食後におならが出やすいのはなぜ？", "おならの成分は何でできている？"],
  },
  {
    slug: "gut-bacteria",
    category: "science",
    title: "おならと腸内細菌の関係",
    summary:
      "大腸の細菌は、消化されずに届いた一部の炭水化物を分解する過程でガスを生じさせることがあります。腸内細菌とおならの関係は単純ではないため、資料に沿って分かっている範囲を整理します。",
    related: ["おならの成分は何でできている？", "豆を食べるとおならが増えるのはなぜ？"],
  },
];

const foods = ["さつまいも", "豆", "牛乳", "プロテイン", "玉ねぎ", "炭酸飲料", "ヨーグルト", "卵", "肉", "食物繊維"];
const scenes = ["朝", "夜", "寝ている時", "食後", "空腹時", "職場", "デート", "運動中"];

function categoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.label ?? "おなら研究所";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Article | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleArticles = useMemo(() => {
    const keyword = submittedQuery.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesCategory = !activeCategory || article.category === activeCategory;
      const text = `${article.title} ${article.summary} ${categoryName(article.category)}`.toLowerCase();
      return matchesCategory && (!keyword || text.includes(keyword));
    });
  }, [activeCategory, submittedQuery]);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveCategory(null);
    setSubmittedQuery(query);
    document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseCategory(slug: string) {
    setQuery("");
    setSubmittedQuery("");
    setActiveCategory((current) => (current === slug ? null : slug));
    document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="おなら研究所 トップへ">
            <span className="brand-mark" aria-hidden="true">◌</span>
            <span>
              <span className="brand-name">おなら研究所</span>
              <span className="brand-sub">おなら・放屁・腸内ガスの疑問を調べる</span>
            </span>
          </a>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu">
            <span className="sr-only">メニューを開く</span><span aria-hidden="true">☰</span>
          </button>
          <nav className="desktop-nav" aria-label="主要メニュー">
            <a href="#questions">疑問から探す</a>
            <a href="#science">科学で調べる</a>
            <a href="#about">サイトについて</a>
          </nav>
        </div>
        {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="モバイルメニュー"><a href="#questions" onClick={() => setMenuOpen(false)}>疑問から探す</a><a href="#science" onClick={() => setMenuOpen(false)}>科学で調べる</a><a href="#about" onClick={() => setMenuOpen(false)}>サイトについて</a></nav>}
      </header>

      <section id="top" className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">おなら・放屁・腸内ガスの疑問を調べる専門メディア</p>
            <p className="preview-pill"><span>確認版</span> 検索公開前のデザイン確認用です</p>
            <h1>おならの疑問、<br />だいたいここで調べられます。</h1>
            <p className="hero-lead">臭い、回数、食べ物、寝ている間のこと。少し気になるけれど聞きにくい疑問を、科学・医学・生活の視点でほどいていきます。</p>
            <form className="site-search" onSubmit={submitSearch} role="search">
              <label className="sr-only" htmlFor="hero-search">サイト内を検索</label>
              <input id="hero-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="例：おならが臭い、朝に多い、牛乳" />
              <button type="submit">調べる</button>
            </form>
            <p className="hero-note"><span aria-hidden="true">●</span> 診断・治療を目的としたサイトではありません</p>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="gas-dots"><i></i><i></i><i></i><i></i><i></i></div>
            <div className="study-card study-card-main"><p>SCIENCE NOTE</p><strong>おならは何で<br />できている？</strong><span>飲み込んだ空気と腸内由来のガス</span></div>
            <div className="study-card study-card-sub"><p>QUESTION</p><strong>臭いは、<br />どこから来る？</strong></div>
          </div>
        </div>
      </section>

      <section id="questions" className="section">
        <div className="shell">
          <SectionHeading kicker="BROWSE BY QUESTION" title="疑問から探す" />
          <div className="category-grid">
            {categories.map((category) => <button key={category.slug} onClick={() => chooseCategory(category.slug)} className={`category-card ${category.tint} ${activeCategory === category.slug ? "selected" : ""}`}><span className="category-mark" aria-hidden="true">{category.mark}</span><strong>{category.label}</strong><small>{category.short}</small></button>)}
          </div>
        </div>
      </section>

      <section className="section wash-section">
        <div className="shell">
          <SectionHeading kicker="START HERE" title="よく読まれる基本記事" description="最初に読む6本は、構造と出典を確認してから公開します。" />
          <div className="feature-grid">
            {articles.slice(0, 6).map((article, index) => <ArticleCard key={article.slug} article={article} emphasis={index === 0} onSelect={setSelected} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-heading"><SectionHeading kicker="FOOD INDEX" title="食べ物から探す" /><button className="text-link" onClick={() => chooseCategory("food")}>食べ物の記事を見る <span>→</span></button></div>
        <div className="shell chips">{foods.map((food) => <button key={food} onClick={() => { setQuery(food); setSubmittedQuery(food); setActiveCategory(null); document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" }); }}>{food}</button>)}</div>
      </section>

      <section className="section wash-section">
        <div className="shell split-heading"><SectionHeading kicker="LIFE SCENES" title="場面から探す" /><button className="text-link" onClick={() => chooseCategory("scene")}>時間・場面の記事を見る <span>→</span></button></div>
        <div className="shell chips">{scenes.map((scene) => <button key={scene} onClick={() => { setQuery(scene); setSubmittedQuery(scene); setActiveCategory(null); document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth" }); }}>{scene}</button>)}</div>
      </section>

      <section id="science" className="section">
        <div className="shell science-panel">
          <div className="science-copy"><p className="eyebrow light">SCIENCE LIBRARY</p><h2>科学で調べる</h2><p>腸内細菌、ガスの成分、臭い物質、音の仕組み。おならをなんとなくで終わらせず、分かっていることと未確認なことを分けて整理します。</p><div className="science-links"><button onClick={() => setSelected(articles.find((article) => article.slug === "gut-bacteria") ?? null)}>おならと腸内細菌の関係 <span>→</span></button><button onClick={() => setSelected(articles.find((article) => article.slug === "components") ?? null)}>おならの成分は何でできている？ <span>→</span></button><button onClick={() => setSelected(articles.find((article) => article.slug === "why-smells") ?? null)}>おならはなぜ臭い？ <span>→</span></button></div></div>
          <div className="molecules" aria-hidden="true"><div className="molecule molecule-a">N₂</div><div className="molecule molecule-b">CO₂</div><div className="molecule molecule-c">H₂</div><span className="molecule-line"></span></div>
        </div>
      </section>

      <section id="search-results" className="section wash-section search-results">
        <div className="shell">
          <SectionHeading kicker={submittedQuery ? `SEARCH: ${submittedQuery}` : activeCategory ? categoryName(activeCategory) : "ARTICLE INDEX"} title={submittedQuery ? `「${submittedQuery}」の検索結果` : activeCategory ? `${categoryName(activeCategory)}の記事` : "初期20記事の設計"} description={submittedQuery || activeCategory ? "公開前の確認用に、該当する下書きの結論を表示しています。" : "すべて下書きです。根拠の確認が済んだものから公開します。"} />
          {visibleArticles.length > 0 ? <div className="article-grid">{visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} onSelect={setSelected} />)}</div> : <div className="empty-result"><span aria-hidden="true">⌕</span><p>一致する記事設計は見つかりませんでした。</p><button onClick={() => { setQuery(""); setSubmittedQuery(""); setActiveCategory(null); }}>すべての記事を見る</button></div>}
        </div>
      </section>

      <section id="about" className="section">
        <div className="shell about-panel"><div className="lab-seal" aria-hidden="true">ONARA<br />LAB</div><div><p className="eyebrow">ABOUT THIS SITE</p><h2>少し気まずい疑問ほど、<br />落ち着いて調べられる場所に。</h2><p>おなら研究所は、医療機関ではありません。医学・科学の資料を確認しながら、生活の中で気になる疑問を、断定しすぎず分かりやすく整理します。</p><div className="about-points"><span>出典を確認</span><span>未確認は未確認と書く</span><span>診断・治療をしない</span></div></div></div>
      </section>

      <footer className="site-footer"><div className="shell footer-grid"><div><a className="footer-brand" href="#top">おなら研究所</a><p>おなら・放屁・腸内ガスの疑問を調べる専門メディア</p></div><div><strong>確認版について</strong><p>デザイン・検索動線・記事テンプレート確認用。検索エンジンへは公開しません。</p></div><div><strong>医療情報について</strong><p>強い痛み、血便、発熱、急な体重減少などがある場合や、気になる症状が続く場合は医療機関へ相談してください。</p></div></div><div className="shell footer-bottom">© 2026 おなら研究所　確認版</div></footer>

      {selected && <ArticlePreview article={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}

function SectionHeading({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return <div className="section-heading"><p>{kicker}</p><h2>{title}</h2>{description && <span>{description}</span>}</div>;
}

function ArticleCard({ article, emphasis = false, onSelect }: { article: Article; emphasis?: boolean; onSelect: (article: Article) => void }) {
  return <button className={`article-card ${emphasis ? "article-emphasis" : ""}`} onClick={() => onSelect(article)}><span>{categoryName(article.category)}</span><strong>{article.title}</strong><small>記事の見え方を確認 <i>→</i></small></button>;
}

function ArticlePreview({ article, onClose }: { article: Article; onClose: () => void }) {
  return <div className="article-overlay" role="dialog" aria-modal="true" aria-label="記事プレビュー"><button className="overlay-backdrop" aria-label="閉じる" onClick={onClose}></button><article className="article-preview"><button className="close-button" onClick={onClose} aria-label="記事プレビューを閉じる">×</button><div className="preview-breadcrumb">ホーム / {categoryName(article.category)} / {article.title}</div><p className="article-category">{categoryName(article.category)}</p><h2>{article.title}</h2><div className="article-meta">更新日：2026年8月9日　　編集：おなら研究所 編集部</div><section className="conclusion"><h3>この記事の結論</h3><p>{article.summary}</p></section><section className="article-body"><h3>仕組み・理由</h3><p>ここには、確認済みの資料と照らし合わせた説明を入れます。根拠の強さや個人差を分け、検索した人が次に気になる疑問までつなげます。</p><h3>関連する疑問</h3><ul>{article.related.map((item) => <li key={item}>{item}</li>)}</ul></section><aside><strong>体調についての注意</strong><p>この記事は一般的な情報を整理したものです。気になる症状が続く場合は、自己判断せず医療機関へ相談してください。</p></aside></article></div>;
}
