"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchSite } from "@/lib/search";
import { PhoneButton, WhatsAppButton } from "@/components/CtaButtons";

export function AraResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") ?? "";
  const [q, setQ] = useState(initialQ);

  // Adres çubuğundaki ?q= değeri (paylaşılan/geri-ileri gezinilen bir link) değişirse input'u senkronize et.
  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  const results = useMemo(() => searchSite(q, 30), [q]);

  function handleChange(value: string) {
    setQ(value);
    const url = value.trim() ? `/ara?q=${encodeURIComponent(value.trim())}` : "/ara";
    router.replace(url, { scroll: false });
  }

  return (
    <div className="mt-6">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="ara-input" className="mb-2 block text-sm font-semibold text-[var(--color-navy-900)]">
          Ne arıyorsunuz?
        </label>
        <input
          id="ara-input"
          type="search"
          autoFocus
          value={q}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Örn. Kadıköy, BMW, akü takviyesi, TEM Otoyolu..."
          className="w-full rounded-lg border border-[var(--color-navy-200)] px-4 py-3 text-base outline-none focus:border-[var(--color-cta-500)]"
        />
      </form>

      {!q.trim() && (
        <p className="mt-4 text-sm text-[#5a6b80]">
          İlçe (Kadıköy, Üsküdar...), marka (BMW, Mercedes...), hizmet (akü takviyesi, lastik
          değişimi...) veya otoyol (TEM, D-100...) adı yazarak arayabilirsiniz.
        </p>
      )}

      {q.trim() && results.length === 0 && (
        <div className="mt-4 rounded-xl border border-[var(--color-navy-100)] bg-white p-6 text-center">
          <p className="font-semibold text-[var(--color-navy-900)]">"{q}" için sonuç bulunamadı.</p>
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
          <p className="mb-3 mt-4 text-sm text-[#5a6b80]">
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
