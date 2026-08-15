"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- header links are simple static navigations. */

import { useState } from "react";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <header className="site-header">
    <div className="shell header-inner">
      <a className="brand" href="/" onClick={closeMenu} aria-label="おなら研究所 トップへ">
        <span className="brand-mark" aria-hidden="true">◌</span>
        <span><span className="brand-name">おなら研究所</span><span className="brand-sub">おなら・放屁・腸内ガスの疑問を調べる</span></span>
      </a>
      <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">
        <span className="sr-only">メニューを開く</span><span aria-hidden="true">☰</span>
      </button>
      <nav className="desktop-nav" aria-label="主要メニュー">
 <a href="/#questions">疑問から探す</a><a href="/#science">科学で調べる</a><a href="/affiliate/">商品メモ</a><a href="/about/">サイトについて</a>
      </nav>
    </div>
    {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="モバイルメニュー">
 <a href="/#questions" onClick={closeMenu}>疑問から探す</a><a href="/#science" onClick={closeMenu}>科学で調べる</a><a href="/affiliate/" onClick={closeMenu}>商品メモ</a><a href="/about/" onClick={closeMenu}>サイトについて</a><a href="/sources/" onClick={closeMenu}>参考資料</a>
    </nav>}
  </header>;
}
