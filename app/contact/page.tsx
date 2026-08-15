import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "おなら研究所の記事の誤記、引用、掲載内容に関するお問い合わせページです。",
};

const googleFormUrl = process.env.NEXT_PUBLIC_CONTACT_GOOGLE_FORM_URL ?? "";
const googleFormEmbedUrl = googleFormUrl.includes("embedded=true")
  ? googleFormUrl
  : googleFormUrl.replace("/viewform", "/viewform?embedded=true");

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>お問い合わせ</span></div>
          <p className="eyebrow">CONTACT</p>
          <h1>お問い合わせ</h1>
          <p>記事の誤記、引用、掲載内容に関するご連絡はこちらからお願いします。</p>
        </div>
      </section>
      <section className="page-section">
        <div className="shell contact-layout">
          <section className="contact-note">
            <h2>送信前にご確認ください</h2>
            <p>このサイトでは、個別の症状、診断、治療、薬やサプリメントの選び方についての相談には回答できません。</p>
            <p>フォームには、氏名、住所、電話番号、病歴、検査結果などの個人情報・健康情報を書き込まないでください。</p>
          </section>
          <section className="contact-form-panel" aria-label="Googleフォーム">
            {googleFormEmbedUrl ? (
              <iframe
                src={googleFormEmbedUrl}
                title="おなら研究所 お問い合わせフォーム"
                loading="lazy"
              >
                読み込んでいます...
              </iframe>
            ) : (
              <div className="contact-form-empty">
                <h2>GoogleフォームURLの設定待ちです</h2>
                <p>フォームURLを `NEXT_PUBLIC_CONTACT_GOOGLE_FORM_URL` に設定すると、この場所にGoogleフォームが表示されます。</p>
              </div>
            )}
          </section>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
