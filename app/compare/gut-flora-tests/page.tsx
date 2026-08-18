import type { Metadata } from "next";
import { affiliatePrograms } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

const mykinso = affiliatePrograms.find((program) => program.id === "a8-mykinso");
const floraScan = affiliatePrograms.find((program) => program.id === "a8-premedica");

export const metadata: Metadata = {
  title: "MykinsoとFlora Scanはどう違う？腸内フローラ検査を選ぶ時の確認ポイント",
  description: "MykinsoとFlora Scanを、検査の進め方、結果の見方、料金、個人情報・検体情報の扱いなど、公式で確認したい項目から比較します。",
};

function AffiliateButton({ program, children, position }: { program: NonNullable<typeof mykinso>; children: string; position: "middle" | "bottom" }) {
  return (
    <div className="comparison-affiliate-cta">
      <p>PR</p>
      <TrackedLink
        href={program.link}
        target="_blank"
        rel="nofollow sponsored noreferrer"
        eventName="affiliate_click"
        productName={program.name}
        ctaPosition={position}
      >
        {children}
      </TrackedLink>
      <small>PR｜リンク先は公式販売ページです</small>
    </div>
  );
}

export default function GutFloraTestsComparisonPage() {
  if (!mykinso || !floraScan) return null;

  return (
    <main>
      <SiteHeader />
      <section className="page-hero product-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><a href="/affiliate">商品メモ</a><span>/</span><span>腸内フローラ検査の比較</span></div>
          <p className="eyebrow">COMPARISON GUIDE</p>
          <h1>MykinsoとFlora Scanはどう違う？</h1>
          <p>腸内フローラ検査を選ぶ時は、「どちらが絶対に上か」よりも、自分が何を確認したいかから見ます。</p>
        </div>
      </section>
      <section className="article-page-section">
        <div className="shell article-layout">
          <article className="article-content comparison-article">
            <section className="article-conclusion">
              <p>先に結論</p>
              <h2>検査で確認したいこと、結果を受け取った後にどう使いたいかで選びます。</h2>
              <p>どちらも、おならの原因や病気の有無を診断するためのページとしては扱いません。食事・便通・ガスが気になる場面を見直す材料として、検査の範囲と利用条件を公式情報で確認してください。</p>
            </section>

            <section className="article-section">
              <h2>比較する前に、5つだけ確認します</h2>
              <p>比較表は「何を買うか」を決めるためではなく、公式ページで確認する場所を整理するためのものです。料金や仕様は変更される場合があります。</p>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead><tr><th>確認したい項目</th><th>Mykinso</th><th>Flora Scan</th></tr></thead>
                  <tbody>
                    <tr><th>検査で確認する範囲</th><td>腸内環境について何を確認できるか、レポート内容を公式で確認します。</td><td>腸内フローラの結果で何を確認できるか、公式の検査内容を確認します。</td></tr>
                    <tr><th>検査の進め方</th><td>申込みから検体提出・結果確認までの流れを公式で確認します。</td><td>公式ページでは、自宅で採便しポストに投函する手順を案内しています。</td></tr>
                    <tr><th>結果を受け取った後</th><td>結果の見方と、食生活の見直しにどう使うかを公式で確認します。</td><td>公式ページでは、結果報告書と管理栄養士による腸活アドバイスを案内しています。</td></tr>
                    <tr><th>料金</th><td>キャンペーン・通常料金・追加費用を公式で確認します。</td><td>公式表示は19,800円（税込、2026-08-18確認）。最新価格は公式で確認します。</td></tr>
                    <tr><th>個人情報・検体情報</th><td>利用規約、個人情報・検体情報の扱いを公式で確認します。</td><td>利用規約、個人情報・検体情報の扱いを公式で確認します。</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="comparison-choice-grid">
              <div>
                <p>比較の入口 1</p>
                <h2>Mykinsoが候補になりやすい人</h2>
                <p>食事や体感のメモとあわせて、自分の腸内環境を考える材料を増やしたい人は、検査範囲・結果レポート・料金を確認してから検討します。</p>
                <AffiliateButton program={mykinso} position="middle">Mykinsoの検査内容・料金を確認する</AffiliateButton>
              </div>
              <div>
                <p>比較の入口 2</p>
                <h2>Flora Scanが候補になりやすい人</h2>
                <p>自宅での検査の流れや、結果を受け取った後の確認方法まで見て選びたい人は、検査キット・結果の見方・料金を確認します。</p>
                <AffiliateButton program={floraScan} position="middle">Flora Scanの検査の流れ・料金を確認する</AffiliateButton>
              </div>
            </section>

            <section className="article-section comparison-final">
              <h2>迷ったら、ここだけ確認します</h2>
              <p>「何が分かるか」だけでなく、結果を受け取った後に自分でどう見るか、価格と個人情報の扱いに納得できるかを比べます。腹痛、下痢や便秘の急な変化、体重減少などがある場合は、検査だけで判断せず医療機関へ相談してください。</p>
              <div className="comparison-final-actions">
                <AffiliateButton program={mykinso} position="bottom">Mykinsoの公式情報を確認する</AffiliateButton>
                <AffiliateButton program={floraScan} position="bottom">Flora Scanの公式情報を確認する</AffiliateButton>
              </div>
            </section>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-card">
              <h2>この比較ページの読み方</h2>
              <p>料金・検査範囲・利用条件は変わる場合があります。購入前に、必ずリンク先の公式情報を確認してください。</p>
            </div>
            <div className="sidebar-card">
              <h2>関連する記事</h2>
              <ul>
                <li><a href="/science/gut-bacteria">おならと腸内細菌の関係</a></li>
                <li><a href="/smell/why-smells">おならはなぜ臭い？</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
