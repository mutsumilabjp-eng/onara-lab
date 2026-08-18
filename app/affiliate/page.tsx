import type { Metadata } from "next";
import { affiliatePrograms } from "../affiliate-content";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "お腹やにおいが気になる時、買う前に見る商品メモ",
  description: "おなら研究所が、腸内環境、食物繊維、外出前のにおい、プロテイン、牛乳が気になる時に、商品を選ぶ前の確認ポイントを整理します。",
};

type NeedLink = { href: string; label: string; note?: string };
type NeedGroup = { title: string; description: string; links: NeedLink[] };

const needGroups: NeedGroup[] = [
  {
    title: "自分の腸内環境を一度詳しく知りたい",
    description: "なんとなく腸活を続けるより、腸内環境について確認できる材料を増やしたい人へ。",
    links: [
      { href: "/compare/gut-flora-tests", label: "腸内フローラ検査の選択肢を見る", note: "MykinsoとFlora Scanで、先に確認したい項目を比べる" },
      { href: "/affiliate/mykinso", label: "Mykinsoの商品メモを見る" },
      { href: "/affiliate/premedica-flora-scan", label: "Flora Scanの商品メモを見る" },
    ],
  },
  {
    title: "食物繊維を意識した食生活に変えたい",
    description: "食物繊維を増やしたいけれど、お腹の張りやガス感も気になる人へ。",
    links: [{ href: "/affiliate/inulin", label: "イヌリンを選ぶ時の確認ポイントを見る", note: "原材料・1回量・増やすペースを確認する" }],
  },
  {
    title: "外出前や人と会う時のにおいが気になる",
    description: "デート・仕事・外出前に、エチケット用品も選択肢として確認したい人へ。",
    links: [{ href: "/affiliate/ladies-rose", label: "外出前のエチケット用品を見る", note: "成分・飲み方・期待しすぎないためのポイントを確認する" }],
  },
  {
    title: "プロテインを飲むとお腹が張る",
    description: "乳成分・甘味料・1回量などを確認しながら、自分に合うプロテインを探したい人へ。",
    links: [
      { href: "/affiliate/lyft-protein", label: "ホエイ系プロテインの選び方を見る", note: "乳成分・甘味料・フレーバーを確認する" },
      { href: "/affiliate/nichiga-soy-protein", label: "ソイプロテインの選び方を見る", note: "原材料・大豆アレルゲン・1回量を確認する" },
    ],
  },
  {
    title: "牛乳を飲んだ後にお腹が気になる",
    description: "乳糖の量や飲む量を分けて確認しながら、乳飲料の選択肢を見たい人へ。",
    links: [{ href: "/affiliate/acadi-lactose-reduced-milk", label: "乳糖を調整した飲料を見る", note: "乳糖の量・原材料・内容量を確認する" }],
  },
];

export default function AffiliatePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero product-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>商品メモ</span></div>
          <p className="eyebrow">PRODUCT GUIDE</p>
          <h1>お腹やにおいが気になる時、買う前に見る商品メモ。</h1>
          <p>おならやお腹のことが気になる時に、全員が同じ商品を見る必要はありません。気になる場面と確認したいことを分けて、商品メモで判断材料を整理します。</p>
        </div>
      </section>
      <section className="page-section product-guide-section">
        <div className="shell product-index">
          <div className="product-index-lead">
            <h2>何が気になっていますか？</h2>
            <p>このページには広告リンクを含みます。ただし、商品を診断・治療・改善保証の手段としては扱いません。成分、検査範囲、使い方、注意事項を確認するための入口です。</p>
          </div>
          <div className="need-guide-grid">
            {needGroups.map((group) => (
              <section className="need-guide-card" key={group.title}>
                <p>悩みから選ぶ</p>
                <h2>{group.title}</h2>
                <span>{group.description}</span>
                <div>
                  {group.links.map((link, index) => (
                    <a href={link.href} key={link.href} className={index === 0 ? "need-guide-primary" : undefined}>
                      <strong>{link.label}</strong>
                      {link.note && <small>{link.note}</small>}
                      <em>確認ポイントを見る →</em>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section wash-section">
        <div className="shell product-index">
          <div className="list-heading"><p>ALL PRODUCT NOTES</p><h2>商品名から探す</h2><span>比較したい商品名が決まっている場合は、ここから確認できます。</span></div>
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
