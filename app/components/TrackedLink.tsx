"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type TrackingEvent = "product_memo_click" | "affiliate_click" | "comparison_product_click";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: TrackingEvent;
  /** 既存記事からの呼び出しとの互換用。page_name と source_article の初期値に使う。 */
  articleName?: string;
  pageName?: string;
  sourceArticle?: string;
  productName: string;
  ctaPosition: "top" | "middle" | "bottom";
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackedLink({
  eventName,
  articleName,
  pageName,
  sourceArticle,
  productName,
  ctaPosition,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const resolvedPageName = pageName ?? articleName ?? document.title;
    const resolvedSourceArticle = sourceArticle ?? articleName ?? "";
    const payload = {
      event: eventName,
      page_name: resolvedPageName,
      source_article: resolvedSourceArticle,
      product_name: productName,
      cta_position: ctaPosition,
      destination: props.href ?? "",
    };

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    window.gtag?.("event", eventName, {
      page_name: resolvedPageName,
      source_article: resolvedSourceArticle,
      product_name: productName,
      cta_position: ctaPosition,
      destination: props.href ?? "",
    });
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
