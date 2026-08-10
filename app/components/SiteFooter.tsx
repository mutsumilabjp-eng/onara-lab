import { siteConfig } from "../site-config";

/* eslint-disable @next/next/no-html-link-for-pages -- footer links are simple static navigations. */

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell footer-grid">
      <div><a className="footer-brand" href="/">おなら研究所</a><p>おなら・放屁・腸内ガスの疑問を調べる専門メディア</p></div>
      <div className="footer-link-group"><strong>運営方針</strong><a href="/about/">サイトについて</a><a href="/editorial-policy/">編集方針</a><a href="/sources/">参考資料</a></div>
      <div className="footer-link-group"><strong>ご利用にあたって</strong><a href="/medical-policy/">医療情報の扱い</a><a href="/disclaimer/">免責事項</a><a href="/privacy/">プライバシー</a><a href="/contact/">お問い合わせ</a></div>
    </div>
    <div className="shell footer-bottom">© 2026 おなら研究所　最終更新：{siteConfig.updatedAt}</div>
  </footer>;
}
