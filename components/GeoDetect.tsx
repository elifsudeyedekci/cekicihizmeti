"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nearestDistrict } from "@/lib/data/districts";

/** Tarayıcı geolocation: gerçek enlem/boylama Haversine mesafesiyle en yakın ilçeyi bulup bölge sayfasına yönlendirme önerir. */
export function GeoDetect() {
  const [suggestion, setSuggestion] = useState<{ name: string; slug: string } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    const stored = sessionStorage.getItem("geo-dismissed");
    if (stored) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = nearestDistrict(latitude, longitude);
        setSuggestion({ name: nearest.name, slug: nearest.slug });
      },
      () => {
        /* izin verilmedi, sessizce geç */
      },
      { timeout: 5000 }
    );
  }, []);

  if (!suggestion || dismissed) return null;

  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-[var(--color-navy-50)] px-4 py-3 text-sm">
        <span>
          Şu an <strong>{suggestion.name}</strong> civarında mısınız?{" "}
          <Link href={`/bolgeler/${suggestion.slug}`} className="font-semibold text-[var(--color-cta-600)] underline">
            Bölgeye özel bilgilere bakın
          </Link>
        </span>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem("geo-dismissed", "1");
            setDismissed(true);
          }}
          aria-label="Kapat"
          className="shrink-0 text-lg leading-none text-[#5a6b80]"
        >
          ×
        </button>
      </div>
    </div>
  );
}
