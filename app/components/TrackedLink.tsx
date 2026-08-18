"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: "product_memo_click" | "affiliate_click";
  articleName?: string;
  productName: string;
  ctaPosition: "top" | "middle" | "bottom";
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackedLink({ eventName, articleName, productName, ctaPosition, onClick, ...props }: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const payload = {
      event: eventName,
      article_name: articleName ?? "",
      product_name: productName,
      cta_position: ctaPosition,
      destination: props.href ?? "",
    };

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    window.gtag?.("event", eventName, {
      article_name: articleName ?? "",
      product_name: productName,
      cta_position: ctaPosition,
      destination: props.href ?? "",
    });
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
