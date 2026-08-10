import { infoPages, type InfoPageKey } from "../info-content";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/* eslint-disable @next/next/no-html-link-for-pages -- information pages use static internal links. */

export function InfoPage({ pageKey }: { pageKey: InfoPageKey }) {
  const page = infoPages[pageKey];
  return <main><SiteHeader />
    <section className="page-hero"><div className="shell"><div className="breadcrumbs"><a href="/">ホーム</a><span>/</span><span>{page.title}</span></div><p className="eyebrow">{page.eyebrow}</p><h1>{page.title}</h1><p>{page.lead}</p></div></section>
    <section className="page-section"><div className="shell info-layout">
      {page.blocks.map((block) => <section className="info-block" key={block.heading}><h2>{block.heading}</h2>{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.bullets && <ul>{block.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}
      {page.sources && <section className="info-block source-list"><h2>主な参考資料</h2><ul>{page.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><span>{source.publisher}</span></li>)}</ul></section>}
      <p className="page-updated">最終更新：{page.updatedAt}</p>
    </div></section>
    <SiteFooter />
  </main>;
}
