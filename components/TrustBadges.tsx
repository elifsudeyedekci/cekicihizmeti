import { SITE, STATS } from "@/lib/config";

export function TrustBadges() {
  const badges = [
    { label: SITE.k1Belge, icon: "🛡️" },
    { label: "Sigortalı Taşıma", icon: "✅" },
    { label: "7/24 Hizmet", icon: "🕐" },
    { label: "Resmi Kayıtlı", icon: "📋" },
  ];
  return (
    <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3 px-4 py-6">
      {badges.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-navy-100)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-navy-900)]"
        >
          <span aria-hidden="true">{b.icon}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}

export function StatsCounter() {
  const items = [
    { value: `${STATS.yearsInService}+`, label: "Yıllık Deneyim" },
    { value: `${STATS.vehiclesRescued.toLocaleString("tr-TR")}+`, label: "Kurtarılan Araç" },
    { value: STATS.districtsCovered, label: "İlçede Hizmet" },
    { value: `${STATS.avgArrivalMinutes} dk`, label: "Ortalama Varış" },
  ];
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="rounded-xl bg-[var(--color-navy-900)] p-5 text-center text-white">
          <div className="text-2xl font-extrabold md:text-3xl">{it.value}</div>
          <div className="mt-1 text-xs text-[var(--color-navy-200)] md:text-sm">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
