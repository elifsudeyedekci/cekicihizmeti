import { SITE } from "@/lib/config";
import { WhatsAppButton } from "@/components/CtaButtons";

const LABELS = {
  tr: { updated: "Son güncelleme", author: "Çekici Hizmeti İstanbul Ekibi", wa: "WhatsApp'tan Yazın" },
  en: { updated: "Last updated", author: "Çekici Hizmeti İstanbul Team", wa: "Message on WhatsApp" },
  ar: { updated: "آخر تحديث", author: "فريق Çekici Hizmeti İstanbul", wa: "راسلنا عبر واتساب" },
} as const;

/**
 * Her blog/sayfada tutarlı E-E-A-T bloğu: son güncelleme tarihi + yazar/kurum bilgisi + iletişim.
 * TEK bir yerden render edilir — sayfa sayfa ayrı ayrı yazılmaz (bkz. app/blog/[slug]/page.tsx vb.).
 */
export function BlogMeta({
  dateModified,
  locale = "tr",
}: {
  dateModified: string;
  locale?: keyof typeof LABELS;
}) {
  const t = LABELS[locale];
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[var(--color-navy-100)] pb-4 text-sm text-[#5a6b80]">
      <span>
        {t.updated}: <time dateTime={dateModified}>{dateModified}</time>
      </span>
      <span aria-hidden="true">·</span>
      <span>{t.author}</span>
      <span aria-hidden="true">·</span>
      <a href={SITE.phoneHref} className="font-semibold text-[var(--color-cta-600)]">
        {SITE.phone}
      </a>
      <WhatsAppButton label={t.wa} className="px-3 py-1.5 text-xs" />
    </div>
  );
}
