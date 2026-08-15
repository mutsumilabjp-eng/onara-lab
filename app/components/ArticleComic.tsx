/* eslint-disable @next/next/no-img-element -- static comic assets are responsive source images. */
import type { ArticleComic as ArticleComicData } from "../comic-content";
import type { ComicDialogue } from "../comic-dialogues";

type ArticleComicProps = {
  comic: ArticleComicData;
  dialogue?: ComicDialogue;
};

function getPageLines(dialogue: ComicDialogue | undefined, pageIndex: number, pageCount: number) {
  if (!dialogue) return [];
  if (pageCount === 1) return dialogue.lines;
  return pageIndex === 0 ? dialogue.lines.slice(0, 2) : dialogue.lines.slice(2);
}

export function ArticleComic({ comic, dialogue }: ArticleComicProps) {
  return (
    <section className="article-comic" aria-labelledby="article-comic-title">
      <div className="article-comic-heading">
        <p>COMIC NOTE</p>
        <h2 id="article-comic-title">漫画でわかる：{comic.title}</h2>
        <span>{comic.summary}</span>
      </div>
      <div className="article-comic-pages">
        {comic.images.map((src, pageIndex) => {
          const pageLines = getPageLines(dialogue, pageIndex, comic.images.length);
          return (
            <figure className={comic.images.length > 1 ? "comic-page comic-page-spread" : "comic-page"} key={src}>
              <img
                src={src}
                alt={comic.images.length > 1 ? `${comic.alt}（${pageIndex + 1}ページ目）` : comic.alt}
                loading="lazy"
              />
              {pageLines.map((line, lineIndex) => (
                <span className={`comic-bubble comic-bubble-${lineIndex + 1}`} key={line}>{line}</span>
              ))}
              <figcaption>{pageIndex === comic.images.length - 1 ? comic.readingNote : ""}</figcaption>
            </figure>
          );
        })}
      </div>
      <details className="article-comic-note">
        <summary>この漫画の読みどころ</summary>
        <p>{comic.readingNote}</p>
      </details>
    </section>
  );
}
