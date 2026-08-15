/* eslint-disable @next/next/no-img-element -- static comic assets are responsive source images. */
import type { ArticleComic as ArticleComicData } from "../comic-content";

type ArticleComicProps = {
  comic: ArticleComicData;
};

export function ArticleComic({ comic }: ArticleComicProps) {
  return (
    <section className="article-comic" aria-labelledby="article-comic-title">
      <div className="article-comic-heading">
        <p>COMIC NOTE</p>
        <h2 id="article-comic-title">漫画でわかる：{comic.title}</h2>
        <span>{comic.summary}</span>
      </div>
      <div className="article-comic-pages">
        {comic.images.map((src, index) => (
          <figure key={src}>
            <img
              src={src}
              alt={comic.images.length > 1 ? `${comic.alt}（${index + 1}ページ目）` : comic.alt}
              loading="lazy"
            />
            <figcaption>{index === comic.images.length - 1 ? comic.readingNote : ""}</figcaption>
          </figure>
        ))}
      </div>
      <details className="article-comic-note">
        <summary>この漫画の読みどころ</summary>
        <p>{comic.readingNote}</p>
      </details>
    </section>
  );
}
