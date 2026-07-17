import { SITE, waLink, WA_DEFAULT_MESSAGE } from "@/lib/config";

export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
      <a
        href={waLink(WA_DEFAULT_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[var(--color-wa-500)] py-3 font-bold text-white"
      >
        WhatsApp
      </a>
      <a
        href={SITE.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-[var(--color-cta-500)] py-3 font-bold text-white"
      >
        Hemen Ara
      </a>
    </div>
  );
}
