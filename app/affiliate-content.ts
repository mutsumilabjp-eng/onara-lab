export type AffiliateProgram = {
  id: string;
  name: string;
  provider: "A8.net" | "もしもアフィリエイト";
  advertiser: string;
  category: string;
  reward: string;
  approvalSignal: string;
  fit: "高" | "中";
  link: string;
  officialUrl: string;
  recommendedPages: string[];
  safeCopy: string;
  caution: string;
};

export const affiliatePrograms: AffiliateProgram[] = [
  {
    id: "a8-mykinso",
    name: "マイキンソー（Mykinso）",
    provider: "A8.net",
    advertiser: "株式会社サイキンソー",
    category: "腸内フローラ検査",
    reward: "購入（税抜）10%",
    approvalSignal: "EPC 37.59 / 確定率 96.77%",
    fit: "高",
    link: "https://px.a8.net/svt/ejp?a8mat=4BA5LB+BLCXDU+5SF2+601S1",
    officialUrl: "https://lp.mykinso.com/campaign",
    recommendedPages: ["腸内ガスと腸内環境", "腸内フローラ検査で分かる範囲"],
    safeCopy: "腸内フローラ検査は、食生活を見直すきっかけの一つとして紹介します。",
    caution: "検査で病気やおならの原因が分かる、という断定はしません。",
  },
  {
    id: "a8-premedica",
    name: "プリメディカショップ Flora Scan",
    provider: "A8.net",
    advertiser: "株式会社プリメディカ",
    category: "腸内フローラ検査",
    reward: "購入15%",
    approvalSignal: "EPC - / 確定率 -",
    fit: "高",
    link: "https://px.a8.net/svt/ejp?a8mat=4BA5LB+C37XJ6+5WFI+5ZEMP",
    officialUrl: "https://shop.premedica.co.jp/product/detail/FS0001",
    recommendedPages: ["腸内ガスと腸内環境", "検査サービス比較"],
    safeCopy: "自宅でできる検査サービスとして、価格や検査範囲を確認する文脈で扱います。",
    caution: "検査結果を医療診断の代わりとして扱わないよう明記します。",
  },
  {
    id: "a8-inulin",
    name: "高純度・水溶性食物繊維イヌリン",
    provider: "A8.net",
    advertiser: "株式会社燦樹",
    category: "食物繊維",
    reward: "初回購入980円",
    approvalSignal: "EPC 2.68 / 確定率 92.3%",
    fit: "高",
    link: "https://px.a8.net/svt/ejp?a8mat=4BA5LB+BK626A+35LQ+HV7V6",
    officialUrl: "https://www.e-ninniku.jp/a8inu/",
    recommendedPages: ["食物繊維とおなら", "さつまいも・豆・玉ねぎの記事"],
    safeCopy: "水溶性食物繊維を選ぶときの、成分表示や摂り方の確認先として紹介します。",
    caution: "これを飲めば臭い・回数が改善する、という表現は避けます。",
  },
  {
    id: "a8-ladies-rose",
    name: "レディーズローズ",
    provider: "A8.net",
    advertiser: "日本サプリメントフーズ株式会社",
    category: "エチケットサプリ",
    reward: "新規購入1900円",
    approvalSignal: "EPC - / 確定率 94.11%",
    fit: "中",
    link: "https://px.a8.net/svt/ejp?a8mat=4BA5LB+C2MHXE+2UOE+15RRSY",
    officialUrl: "https://www.krachaidam.jp/pr_ladies/afi.php?AC=p37",
    recommendedPages: ["外出前のエチケット", "においが気になる時の準備"],
    safeCopy: "外出前のエチケット用品を比較する一候補として、香りや成分の確認に寄せて扱います。",
    caution: "体臭・口臭・おならの改善を保証する表現は使いません。",
  },
  {
    id: "moshimo-lyft",
    name: "LYFT プロテイン",
    provider: "もしもアフィリエイト",
    advertiser: "LYFT",
    category: "プロテイン",
    reward: "購入500円",
    approvalSignal: "ユーザー確認により提携中",
    fit: "高",
    link: "https://af.moshimo.com/af/c/click?a_id=5753646&p_id=7546&pc_id=21789&pl_id=95000",
    officialUrl: "https://lyft-fit.com/collections/nutrition-all?cid=c01kzxksdm2jhbadmw6kzg0c8dh&p=pidayck6qlvy",
    recommendedPages: ["プロテインでおならが増える？"],
    safeCopy: "プロテインを選ぶときに、乳成分や甘味料など原材料表示を見る例として紹介します。",
    caution: "このプロテインならおならが出ない、臭わない、という表現は使いません。",
  },
];
