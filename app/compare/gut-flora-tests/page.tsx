import type { Metadata } from "next";
import { affiliatePrograms } from "../../affiliate-content";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { TrackedLink } from "../../components/TrackedLink";

const mykinso = affiliatePrograms.find((program) => program.id === "a8-mykinso");
const floraScan = affiliatePrograms.find((program) => program.id === "a8-premedica");
const pageName = "MykinsoとFlora Scanはどう違う？腸内フローラ検査を選ぶ時の確認ポイント";
const sourceArticle = "compare/gut-flora-tests";
const confirmedDate = "2026-08-18";

export const metadata: Metadata = {
  title: "MykinsoとFlora Scanはどう違う？腸内フローラ検査を選ぶ時の確認ポイント",
  description: "MykinsoとFlora Scanを、検査の進め方、結果の見方、料金、個人情報・検体情報の扱いなど、公式で確認したい項目から比較します。",
};

function ComparisonAffiliateButton({
  program,
  children,
  position,
}: {
  program: NonNullable<typeof mykinso>;
  children: string;
  position: "middle" | "bottom";
}) {
  return (
    <div className="comparison-affiliate-cta">
      <p>PR</p>
      <TrackedLink
        href={program.link}
        target="_blank"
        rel="nofollow sponsored noreferrer"
        eventName="comparison_product_click"
        pageName={pageName}
        sourceArticle={sourceArticle}
        productName={program.id === "a8-mykinso" ? "mykinso" : "flora_scan"}
        ctaPosition={position}
      >
        {children}
      </TrackedLink>
      <small>PR｜リンク先は公式販売ページです</small>
    </div>
  );
}

function ProductMemoLink({ program, position = "middle" }: { program: NonNullable<typeof mykinso>; position?: "middle" | "bottom" }) {
  const memoName = program.id === "a8-mykinso" ? "Mykinso" : "Flora Scan";
  return (
    <TrackedLink
      className="comparison-internal-link"
      href={`/affiliate/${program.slug}`}
      eventName="product_memo_click"
      pageName={pageName}
      sourceArticle={sourceArticle}
      productName={program.name}
      ctaPosition={position}
    >
      まだ迷う方は{memoName}の商品メモを読む →
    </TrackedLink>
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
              <h2>まず、同じ項目で比べます</h2>
              <p>以下は、公式ページで確認できた内容を整理した表です。価格・仕様・キャンペーンは変わるため、確認日を付けています。申し込み前には、必ずリンク先の最新情報と利用規約をご確認ください。</p>
              <p className="comparison-update-note">確認日：{confirmedDate}。価格・検査内容・利用条件は変更される場合があります。最新情報は各公式ページで確認してください。</p>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead><tr><th>比較項目</th><th>Mykinso</th><th>Flora Scan</th></tr></thead>
                  <tbody>
                    <tr><th>検査方法</th><td>自宅で採便して郵送する検査キットです。キット購入から結果閲覧までオンラインで完結すると案内されています。</td><td>自宅で採便し、ポストに投函する検査サービスとして案内されています。</td></tr>
                    <tr><th>検査の流れ</th><td>キット購入後、アカウント登録・検査前質問票への回答・採便・返送を行います。採便後は1週間以内の返送が案内されています。</td><td>注文後3〜5営業日ほどで商品発送との案内があります。自宅で採便し、ポストへ投函する流れです。詳細な手順は公式の案内を確認してください。</td></tr>
                    <tr><th>結果の確認方法</th><td>マイページ上でWeb閲覧します。アカウント登録後に検査結果を確認する仕組みです。</td><td>結果報告書が案内されています。専属管理栄養士による無料の腸活アドバイスはオンラインまたは電話で利用できると案内されています。</td></tr>
                    <tr><th>主に確認できる内容</th><td>腸内細菌の割合・バランス、腸内環境のA〜Eの5段階評価、主要細菌の割合、菌種別の構成比率などが案内されています。</td><td>腸内細菌のバランス、5つの腸内フローラタイプ、要注意菌の有無などが案内されています。公式には10の疾患との関連度の案内もありますが、診断目的ではありません。</td></tr>
                    <tr><th>結果が届くまでの目安</th><td>返送した検体がラボへ到着してから約3〜4週間後に閲覧可能と案内されています。</td><td>今回確認できませんでした。購入前に公式の最新案内を確認してください。</td></tr>
                    <tr><th>現在価格</th><td>税込19,800円。確認日：{confirmedDate}。</td><td>税込19,800円。確認日：{confirmedDate}。</td></tr>
                    <tr><th>送料等</th><td>公式通販で送料無料の表示を確認しました。確認日：{confirmedDate}。</td><td>商品ページの送料無料表示を確認しました。確認日：{confirmedDate}。その他の費用は購入時に確認してください。</td></tr>
                    <tr><th>結果後に利用できる情報</th><td>マイページで検査結果に加え、コラムやレシピ等のコンテンツを閲覧できると案内されています。2回目以降は推移も閲覧できます。</td><td>結果報告書と、専属管理栄養士による無料の腸活アドバイスが案内されています。</td></tr>
                    <tr><th>個人情報・検体情報</th><td>今回、取り扱いの詳細は確認できませんでした。申し込み前に公式の利用規約・プライバシーに関する案内を確認してください。</td><td>今回、取り扱いの詳細は確認できませんでした。申し込み前に公式の利用規約・プライバシーに関する案内を確認してください。</td></tr>
                    <tr><th>向いている人</th><td>食事や体感の記録と結果をあわせて見たい人、複数回の検査で推移も確認したい人にとって、検査範囲を確認する候補です。</td><td>自宅で進める流れ、結果報告書、結果後の管理栄養士アドバイスまで確認して選びたい人にとって、利用条件を確認する候補です。</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="article-section comparison-which-to-choose">
              <h2>結局、どちらを選ぶ？</h2>
              <p>優劣ではなく、結果を何に使いたいか、検査後にどこまで確認したいかで見ます。</p>
              <div className="comparison-choice-grid">
                <div>
                  <p>比較の入口 1</p>
                  <h3>Mykinsoが候補になりやすい人</h3>
                  <ul>
                    <li>食事や体感のメモと、腸内細菌の結果を一緒に見たい</li>
                    <li>マイページで結果を確認し、必要に応じて推移も見たい</li>
                    <li>自分で確認する範囲と利用条件を整理してから申し込みたい</li>
                  </ul>
                  <p>Mykinsoだけでおならの原因が特定できるわけではありません。ただし、上の条件に近い場合は、検査内容を確認する候補になります。</p>
                  <ComparisonAffiliateButton program={mykinso} position="middle">Mykinsoの検査内容・現在料金を確認する →</ComparisonAffiliateButton>
                  <ProductMemoLink program={mykinso} />
                </div>
                <div>
                  <p>比較の入口 2</p>
                  <h3>Flora Scanが候補になりやすい人</h3>
                  <ul>
                    <li>自宅採便から結果確認までの流れを先に把握したい</li>
                    <li>結果報告書と、結果後の相談の選択肢まで確認したい</li>
                    <li>日本人向けの腸内フローラタイプという公式説明を見て検討したい</li>
                  </ul>
                  <p>Flora Scanだけでおならの原因や病気の有無が分かるわけではありません。ただし、上の条件に近い場合は、検査内容を確認する候補になります。</p>
                  <ComparisonAffiliateButton program={floraScan} position="middle">Flora Scanの検査内容・現在料金を確認する →</ComparisonAffiliateButton>
                  <ProductMemoLink program={floraScan} />
                </div>
              </div>
            </section>

            <section className="article-section comparison-final">
              <h2>迷ったまま決めなくても大丈夫です</h2>
              <p>腸内フローラ検査は、どちらかを選べばおならの原因が分かる、というものではありません。比較しても決めきれない場合は、何を知りたいか、結果を何に使いたいか、料金、検査方法の4つをもう一度確認してください。</p>
              <div className="comparison-final-actions comparison-memo-actions">
                <ProductMemoLink program={mykinso} position="bottom" />
                <ProductMemoLink program={floraScan} position="bottom" />
              </div>
            </section>

            <section className="article-section comparison-sources">
              <h2>比較に使用した公式情報源</h2>
              <p>以下の公式ページを{confirmedDate}に確認しました。料金・発送・利用条件は変更される場合があります。</p>
              <ul>
                <li><a href="https://mykinso.com/gut-v2" target="_blank" rel="noreferrer">Mykinso｜検査の流れ・結果閲覧の公式案内</a></li>
                <li><a href="https://store.mykinso.com/shop/products/kit_v2_ec_4793" target="_blank" rel="noreferrer">Mykinso公式通販｜価格・送料無料の表示</a></li>
                <li><a href="https://support.cykinso.co.jp/hc/ja/articles/8905793602713-%E6%A4%9C%E6%9F%BB%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E7%A8%AE%E9%A1%9E%E3%81%AE%E9%81%95%E3%81%84%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%9F%A5%E3%82%8A%E3%81%9F%E3%81%84%E3%81%A7%E3%81%99" target="_blank" rel="noreferrer">Mykinsoサポート｜自宅検査の案内</a></li>
                <li><a href="https://shop.premedica.co.jp/product/detail/FS0001" target="_blank" rel="noreferrer">Flora Scan公式商品ページ｜価格・検査内容・発送案内</a></li>
              </ul>
            </section>
          </article>
          <aside className="article-sidebar">
            <div className="sidebar-card">
              <h2>この比較ページの読み方</h2>
              <p>価格・検査範囲・利用条件は変わる場合があります。購入前に、必ずリンク先の公式情報を確認してください。</p>
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
