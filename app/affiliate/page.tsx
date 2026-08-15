import type { Metadata } from "next";
import { affiliatePrograms } from "../affiliate-content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "お腹・においが気になる人の商品メモ",
  description: "おなら研究所が、腸内環境、食物繊維、プロテイン、エチケット用品を選ぶ前に確認したいことを商品ごとに整理します。",
};

export default function AffiliatePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero product-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>商品メモ</span></div>
          <h1>お腹やにおいが気になる時、買う前に見る商品メモ。</h1>
          <p>腸内環境、食物繊維、プロテイン、エチケット用品。商品をすすめる前に、まず「何を確認すればいいか」を1商品ずつ整理します。</p>
        </div>
      </section>
      <section className="page-section">
        <div className="shell product-index">
          <div className="product-index-lead">
            <h2>商品は、悩みを消す魔法ではなく、確認先の一つです。</h2>
            <p>このページには広告リンクを含みます。診断・治療・改善保証ではなく、成分や検査範囲、使い方を確認するための入口として読んでください。</p>
          </div>
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
