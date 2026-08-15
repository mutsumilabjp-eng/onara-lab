import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { affiliatePrograms } from "../affiliate-content";

export const metadata: Metadata = {
  title: "広告・提携案件",
  description: "おなら研究所で掲載候補として管理している広告・アフィリエイト案件の一覧です。",
};

export default function AffiliatePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero affiliate-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>広告・提携案件</span></div>
          <p className="eyebrow">PR / AFFILIATE</p>
          <h1>広告案件は、記事の文脈に合うものだけを扱います。</h1>
          <p>おなら研究所では、治療や改善を保証する広告表現は避け、食品・検査・エチケット用品を比較検討するための選択肢として掲載します。</p>
        </div>
      </section>
      <section className="page-section">
        <div className="shell affiliate-layout">
          <section className="affiliate-policy">
            <h2>掲載ルール</h2>
            <p>広告リンクにはPR表記を付けます。商品や検査サービスは、公式情報、成分表示、価格、注意事項を確認したうえで、診断・治療・改善保証に見える表現を避けます。</p>
            <ul>
              <li>病気の診断や症状改善をうたわない</li>
              <li>個人の体感を一般化しない</li>
              <li>定期購入、価格、検査範囲などの確認を促す</li>
            </ul>
          </section>
          <section className="affiliate-list" aria-label="掲載候補案件">
            {affiliatePrograms.map((program) => (
              <article className="affiliate-card" key={program.id}>
                <div className="affiliate-card-head">
                  <span className="affiliate-provider">{program.provider}</span>
                  <span className={`affiliate-fit fit-${program.fit}`}>関連度 {program.fit}</span>
                </div>
                <h2>{program.name}</h2>
                <p className="affiliate-meta">{program.category} / {program.advertiser}</p>
                <p>{program.safeCopy}</p>
                <dl className="affiliate-facts">
                  <div><dt>報酬</dt><dd>{program.reward}</dd></div>
                  <div><dt>指標</dt><dd>{program.approvalSignal}</dd></div>
                  <div><dt>想定記事</dt><dd>{program.recommendedPages.join("、")}</dd></div>
                </dl>
                <p className="affiliate-caution">{program.caution}</p>
                <div className="affiliate-actions">
                  <a href={program.link} target="_blank" rel="nofollow sponsored noreferrer">公式ページを見る</a>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
