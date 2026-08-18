import type { Metadata } from "next";
import { affiliatePrograms } from "../affiliate-content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "悩みから選ぶ商品メモ",
  description: "おなら研究所が、臭い、腸内環境、食物繊維、プロテイン、牛乳との関係が気になる時に、商品を選ぶ前の確認ポイントを整理します。",
};

const needGroups = [
  {
    title: "臭いが気になる",
    description: "外出前のエチケットを考えたい人向け。商品に期待しすぎず、成分や飲み方を確認します。",
    programIds: ["a8-ladies-rose"],
  },
  {
    title: "自分の腸内環境を詳しく知りたい",
    description: "検査を診断の代わりにせず、食生活を見直す材料として使いたい人向けです。",
    programIds: ["a8-mykinso", "a8-premedica"],
  },
  {
    title: "食物繊維を増やしたい",
    description: "急に増やさず、原材料と1回量を確認しながら選びたい人向けです。",
    programIds: ["a8-inulin"],
  },
  {
    title: "プロテインの後にお腹が気になる",
    description: "乳成分、甘味料、1回量など、原材料から比較したい人向けです。",
    programIds: ["moshimo-lyft", "a8-rakuten-nichiga-soy"],
  },
  {
    title: "牛乳の後に張りやガス感が気になる",
    description: "乳糖の量や内容量を比較したい人向け。原因を商品だけで決めない前提です。",
    programIds: ["a8-rakuten-acadi"],
  },
  {
    title: "発酵食品を間食として取り入れたい",
    description: "原材料、アレルゲン、内容量を確認して、食べる量を考えたい人向けです。",
    programIds: ["moshimo-happy-tempe"],
  },
];

function getPrograms(ids: string[]) {
  return ids
    .map((id) => affiliatePrograms.find((program) => program.id === id))
    .filter((program): program is (typeof affiliatePrograms)[number] => Boolean(program));
}

export default function AffiliatePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero product-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>商品メモ</span></div>
          <p className="eyebrow">PRODUCT GUIDE</p>
          <h1>商品名ではなく、いまの悩みから確認先を選ぶ。</h1>
          <p>おならやお腹のことが気になる時に、全員が同じ商品を見る必要はありません。気になる場面と確認したいことを分けて、商品メモで判断材料を整理します。</p>
        </div>
      </section>
      <section className="page-section product-guide-section">
        <div className="shell product-index">
          <div className="product-index-lead">
            <h2>まず「何を確認したいか」から選びます。</h2>
            <p>このページには広告リンクを含みます。ただし、商品を診断・治療・改善保証の手段としては扱いません。成分、検査範囲、使い方、注意事項を確認するための入口です。</p>
          </div>
          <div className="need-guide-grid">
            {needGroups.map((group) => {
              const programs = getPrograms(group.programIds);
              return (
                <section className="need-guide-card" key={group.title}>
                  <p>悩みから選ぶ</p>
                  <h2>{group.title}</h2>
                  <span>{group.description}</span>
                  <div>
                    {programs.map((program) => (
                      <a href={`/affiliate/${program.slug}`} key={program.id}>
                        <strong>{program.name}</strong><small>商品メモを読む →</small>
                      </a>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
      <section className="page-section wash-section">
        <div className="shell product-index">
          <div className="list-heading"><p>ALL PRODUCT NOTES</p><h2>商品別に一覧で見る</h2><span>比較したい商品名が決まっている場合は、ここから確認できます。</span></div>
          <div className="product-card-grid">
            {affiliatePrograms.map((program) => (
              <a className="product-card" href={`/affiliate/${program.slug}`} key={program.id}>
                <span>{program.category}</span>
                <h2>{program.name}</h2>
                <p>{program.description}</p>
                <small>商品メモを読む →</small>
              </a>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
