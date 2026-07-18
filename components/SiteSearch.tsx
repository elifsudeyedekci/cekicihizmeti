"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchSite, type SearchItem } from "@/lib/search";

/**
 * Sayfa içi arama kutusu (blog hub, 404 sayfası). Ayrı bir `items` verilmezse merkezi arama
 * kaynağını (lib/search.ts — 39 ilçe, 20 marka, 12 hizmet, 7 otoyol, tüm bloglar) kullanır; bu,
 * header'daki HeaderSearch ve /ara sayfasıyla aynı kaynak ve aynı eşleştirme mantığıdır.
 */
export function SiteSearch({ items }: { items?: SearchItem[] }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    if (!q.trim()) return [];
    if (items) {
      const needle = q.trim().toLocaleLowerCase("tr");
      return items.filter((it) => it.title.toLocaleLowerCase("tr").includes(needle)).slice(0, 8);
    }
    return searchSite(q, 8);
  }, [q, items]);

  return (
    <form
      className="mx-auto max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/ara?q=${encodeURIComponent(q.trim())}`);
      }}
      role="search"
    >
      <label htmlFor="site-search" className="mb-2 block text-sm font-semibold text-[var(--color-navy-900)]">
        Sitede Ara
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="İlçe, marka veya hizmet arayın (örn. Kadıköy, BMW, akü)"
        className="w-full rounded-lg border border-[var(--color-navy-200)] px-4 py-3 text-base outline-none focus:border-[var(--color-cta-500)]"
      />
      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-[var(--color-navy-100)] rounded-lg border border-[var(--color-navy-100)] bg-white">
          {results.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="flex items-center justify-between px-4 py-2 hover:bg-[var(--color-navy-50)]">
                <span>{r.title}</span>
                <span className="text-xs text-[#5a6b80]">{r.category}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
