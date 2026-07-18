import type { Metadata } from "next";
import Link from "next/link";
import { enPosts } from "@/lib/blog/posts-en";
import type { BlogCategory } from "@/lib/blog/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TowImageGallery } from "@/components/TowImageGallery";

export const metadata: Metadata = {
  title: "Blog — Tow Truck & Roadside Assistance Guides",
  description:
    "24/7 tow truck and roadside assistance guides for Istanbul's districts, both sides of the Bosphorus, and travelers. What to know if you break down in Istanbul.",
  alternates: {
    canonical: "/en/blog",
    languages: {
      "tr-TR": "/blog",
      "en-US": "/en/blog",
      ar: "/ar/blog",
    },
  },
};

const EN_CATEGORY_LABEL: Record<BlogCategory, string> = {
  cornerstone: "Main Guide",
  yaka: "By Side of the City",
  "kok-kelime": "General Info",
  ilce: "By District",
  marka: "By Brand",
  otoyol: "Highways & Bridges",
  "arac-tipi": "By Vehicle Type",
  bilgilendirici: "Informational",
};

const CATEGORY_ORDER: BlogCategory[] = ["cornerstone", "yaka", "ilce"];

export default function EnglishBlogHubPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/en/blog" }]} />
      <div className="mx-auto max-w-5xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Blog</h1>
        <p className="mt-2 max-w-2xl text-[#2d3f57]">
          24/7 tow truck and roadside assistance guides for Istanbul's districts, both sides of the
          Bosphorus, and travelers — everything you need to know if your car breaks down in this city.
        </p>
        <TowImageGallery seed="en-blog" keyword="Istanbul" locale="en" />
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = enPosts.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mx-auto max-w-5xl px-4 py-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">
              {EN_CATEGORY_LABEL[cat]} <span className="text-sm font-normal text-[#5a6b80]">({items.length})</span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/en/blog/${p.slug}`}
                    className="block rounded-lg border border-[var(--color-navy-100)] bg-white px-4 py-3 text-sm font-medium hover:border-[var(--color-cta-500)]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </>
  );
}
