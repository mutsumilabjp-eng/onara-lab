"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: "article_to_product_click" | "affiliate_cta_click";
  program?: string;
  placement: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function TrackedLink({ eventName, program, placement, onClick, ...props }: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const payload = {
      event: eventName,
      affiliate_program: program ?? "",
      cta_placement: placement,
      destination: props.href ?? "",
    };

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
    window.gtag?.("event", eventName, {
      affiliate_program: program ?? "",
      cta_placement: placement,
      destination: props.href ?? "",
    });
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
