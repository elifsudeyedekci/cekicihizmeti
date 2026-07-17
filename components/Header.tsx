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
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-[var(--color-navy-900)]">
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
        <PhoneButton className="hidden text-sm md:inline-flex" />
      </div>
    </header>
  );
}
