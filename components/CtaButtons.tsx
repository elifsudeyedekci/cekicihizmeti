"use client";

import { SITE, waLink, WA_DEFAULT_MESSAGE } from "@/lib/config";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function trackConversion(event: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, page_path: window.location.pathname });
}

export function PhoneButton({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={SITE.phoneHref}
      onClick={() => trackConversion("phone_click")}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-cta-500)] px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-cta-600)] active:bg-[var(--color-cta-700)] ${className}`}
    >
      <PhoneIcon />
      {label ?? `Hemen Ara: ${SITE.phone}`}
    </a>
  );
}

export function WhatsAppButton({
  className = "",
  message = WA_DEFAULT_MESSAGE,
  label = "WhatsApp'tan Yazın",
}: {
  className?: string;
  message?: string;
  label?: string;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion("whatsapp_click")}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-wa-500)] px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-[var(--color-wa-600)] active:bg-[var(--color-wa-700)] ${className}`}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

export function ShareLocationButton({
  message = "Merhaba, konumum:",
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-share-location
      data-message={message}
      onClick={() => trackConversion("location_share_click")}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-navy-700)] px-5 py-3 font-bold text-[var(--color-navy-900)] transition-colors hover:bg-[var(--color-navy-50)] ${className}`}
    >
      <PinIcon />
      Konumunu Paylaş
    </button>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.2 2.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.9 3.8 13.5 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.4-.1.4-.2 1.2-.5 1.4-1 .2-.5.2-.9.1-1z"
        fill="currentColor"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C7.6 2 4 5.6 4 10c0 5.6 6.5 11.1 7.5 12 .3.3.7.3 1 0 1-.9 7.5-6.4 7.5-12 0-4.4-3.6-8-8-8zm0 10.8a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6z"
        fill="currentColor"
      />
    </svg>
  );
}
