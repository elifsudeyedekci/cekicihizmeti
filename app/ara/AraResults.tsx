"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/data/services";
import { districts } from "@/lib/data/districts";
import { brands } from "@/lib/data/brands";
import { highways } from "@/lib/data/highways";
import { posts, CATEGORY_LABEL } from "@/lib/blog/registry";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";

interface Item {
  title: string;
  href: string;
  category: string;
}

const ITEMS: Item[] = [
  ...services.map((s) => ({ title: s.name, href: `/hizmetler/${s.slug}`, category: "Hizmet" })),
  ...districts.map((d) => ({ title: `${d.name} Çekici`, href: `/bolgeler/${d.slug}`, category: "Bölge" })),
  ...brands.map((b) => ({ title: `${b.name} Çekici Hizmeti`, href: `/blog/${b.slug}-cekici-hizmeti`, category: "Marka" })),
  ...highways.map((h) => ({ title: h.name, href: `/blog/${h.slug}-arac-arizasi-cekici`, category: "Otoyol/Köprü" })),
  ...posts.map((p) => ({ title: p.title, href: `/blog/${p.slug}`, category: CATEGORY_LABEL[p.category] })),
];

export function AraResults() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const results = useMemo(() => {
    if (!q) return [];
    const needle = q.toLocaleLowerCase("tr");
    return ITEMS.filter((it) => it.title.toLocaleLowerCase("tr").includes(needle)).slice(0, 30);
  }, [q]);

  return (
    <div className="mt-6">
      {!q && (
        <p className="text-sm text-[#5a6b80]">
          Arama yapmak için adres çubuğuna <code>?q=kelime</code> ekleyebilir veya üst menüdeki arama
          kutusunu kullanabilirsiniz.
        </p>
      )}

      {q && results.length === 0 && (
        <div className="rounded-xl border border-[var(--color-navy-100)] bg-white p-6 text-center">
          <p className="font-semibold text-[var(--color-navy-900)]">
            "{q}" için sonuç bulunamadı.
          </p>
          <p className="mt-2 text-sm text-[#5a6b80]">
            Aracınızla ilgili yardıma mı ihtiyacınız var? Doğrudan arayın, size yardımcı olalım.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <PhoneButton />
            <WhatsAppButton />
          </div>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className="mb-3 text-sm text-[#5a6b80]">
            "{q}" için {results.length} sonuç bulundu.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {results.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]"
                >
                  <span>{r.title}</span>
                  <span className="shrink-0 text-xs text-[#5a6b80]">{r.category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
