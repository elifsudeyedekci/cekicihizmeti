import type { Metadata } from "next";
import Link from "next/link";
import { posts, CATEGORY_LABEL } from "@/lib/blog/registry";
import type { BlogCategory } from "@/lib/blog/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteSearch } from "@/components/SiteSearch";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const TITLE = "Çekici ve Yol Yardım Blog — 90+ Rehber Yazısı";
const DESCRIPTION =
  "İlçe, marka, otoyol ve araç tipine göre hazırlanmış 7/24 çekici ve yol yardım rehberleri. İstanbul'da yolda kaldığınızda bilmeniz gereken her şey burada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    languages: {
      "tr-TR": "/blog",
      "en-US": "/en/blog",
      ar: "/ar/blog",
    },
  },
  ...socialMeta("/blog", "blog", "Blog Rehberlerimiz", { title: TITLE, description: DESCRIPTION }),
};

const CATEGORY_ORDER: BlogCategory[] = [
  "cornerstone",
  "yaka",
  "kok-kelime",
  "bilgilendirici",
  "ilce",
  "marka",
  "otoyol",
  "arac-tipi",
];

export default function BlogHubPage() {
  const searchItems = posts.map((p) => ({
    title: p.title,
    href: `/blog/${p.slug}`,
    category: CATEGORY_LABEL[p.category],
  }));

  return (
    <>
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
      <div className="mx-auto max-w-5xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">Blog</h1>
        <p className="mt-2 max-w-2xl text-[#2d3f57]">
          İstanbul'un tüm ilçeleri, araç markaları, otoyolları ve araç tipleri için hazırladığımız
          7/24 çekici ve yol yardım rehberleri.
        </p>
        <div className="mt-6 max-w-xl">
          <SiteSearch items={searchItems} />
        </div>
        <TowImageGallery seed="blog" keyword="Blog Rehberlerimiz" />
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = posts.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mx-auto max-w-5xl px-4 py-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">
              {CATEGORY_LABEL[cat]} <span className="text-sm font-normal text-[#5a6b80]">({items.length})</span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
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
