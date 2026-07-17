import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full = [{ name: "Anasayfa", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-4 py-3 text-sm">
      <JsonLd
        data={breadcrumbSchema(full.map((c) => ({ name: c.name, url: `${SITE.url}${c.href}` })))}
      />
      <ol className="flex flex-wrap items-center gap-1 text-[#5a6b80]">
        {full.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === full.length - 1 ? (
              <span className="font-medium text-[var(--color-navy-900)]">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:text-[var(--color-cta-600)]">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
