"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchSite } from "@/lib/search";

/**
 * Header'daki canlı arama kutusu — hem masaüstü (satır içi) hem mobil (hamburger menü içinde)
 * için kullanılır. 2+ karakterden itibaren anlık öneri listesi gösterir; Enter'a basılırsa veya
 * "Tüm sonuçları gör" seçilirse /ara sayfasına gider (bkz. app/ara — aynı arama kaynağını kullanır).
 */
export function HeaderSearch({
  className = "",
  placeholder = "İlçe, marka, hizmet ara...",
  onNavigate,
}: {
  className?: string;
  placeholder?: string;
  onNavigate?: () => void;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => (q.trim().length >= 2 ? searchSite(q, 8) : []), [q]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goToSearchPage() {
    if (!q.trim()) return;
    router.push(`/ara?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
    onNavigate?.();
  }

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToSearchPage();
        }}
      >
        <label htmlFor="header-search" className="sr-only">
          Sitede ara
        </label>
        <input
          id="header-search"
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[var(--color-navy-200)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--color-cta-500)]"
        />
      </form>

      {open && results.length > 0 && (
        <ul
          data-testid="header-search-results"
          className="absolute z-50 mt-1 w-full max-h-80 overflow-y-auto divide-y divide-[var(--color-navy-100)] rounded-lg border border-[var(--color-navy-100)] bg-white shadow-lg"
        >
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                  onNavigate?.();
                }}
                className="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-[var(--color-navy-50)]"
              >
                <span className="text-[var(--color-navy-900)]">{r.title}</span>
                <span className="shrink-0 text-xs text-[#5a6b80]">{r.category}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={goToSearchPage}
              className="block w-full px-3 py-2 text-left text-sm font-semibold text-[var(--color-cta-600)] hover:bg-[var(--color-navy-50)]"
            >
              Tüm sonuçları gör →
            </button>
          </li>
        </ul>
      )}

      {open && q.trim().length >= 2 && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-[var(--color-navy-100)] bg-white p-3 text-sm text-[#5a6b80] shadow-lg">
          "{q}" için sonuç bulunamadı.
        </div>
      )}
    </div>
  );
}
