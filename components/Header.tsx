"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/config";
import { PhoneButton } from "./CtaButtons";

const NAV = [
  { href: "/hizmetler", label: "Hizmetlerimiz" },
  { href: "/bolgeler", label: "Bölgelerimiz" },
  { href: "/blog", label: "Blog" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-extrabold text-[var(--color-navy-900)]"
        >
          <span className="text-xl">🚨</span>
          <span className="text-base leading-tight md:text-lg">{SITE.name}</span>
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-6 text-sm font-medium text-[var(--color-navy-800)] lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--color-cta-600)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PhoneButton className="hidden text-sm md:inline-flex" />
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-navy-100)] text-[var(--color-navy-900)] lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobil menü"
          className="border-t border-[var(--color-navy-100)] bg-white lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-[var(--color-navy-800)] hover:bg-[var(--color-navy-50)]"
              >
                {item.label}
              </Link>
            ))}
            <PhoneButton className="mt-2 justify-center" />
          </div>
        </nav>
      )}
    </header>
  );
}
