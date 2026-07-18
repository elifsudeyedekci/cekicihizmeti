import type { Metadata } from "next";
import Link from "next/link";
import { arPosts } from "@/lib/blog/posts-ar";
import type { BlogCategory } from "@/lib/blog/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TowImageGallery } from "@/components/TowImageGallery";
import { socialMeta } from "@/lib/seo";

const AR_BLOG_TITLE = "المدونة — أدلة سطحة السحب والمساعدة على الطريق";
const AR_BLOG_DESCRIPTION =
  "أدلة خدمة سطحة السحب والمساعدة على الطريق على مدار الساعة لأحياء إسطنبول وجانبيها والمسافرين. كل ما تحتاج معرفته إذا تعطلت سيارتك في إسطنبول.";

export const metadata: Metadata = {
  title: AR_BLOG_TITLE,
  description: AR_BLOG_DESCRIPTION,
  ...socialMeta("/ar/blog", "ar-blog", "إسطنبول", {
    locale: "ar",
    title: AR_BLOG_TITLE,
    description: AR_BLOG_DESCRIPTION,
  }),
  alternates: {
    canonical: "/ar/blog",
    languages: {
      "tr-TR": "/blog",
      "en-US": "/en/blog",
      ar: "/ar/blog",
    },
  },
};

const AR_CATEGORY_LABEL: Record<BlogCategory, string> = {
  cornerstone: "الدليل الرئيسي",
  yaka: "حسب جانب المدينة",
  "kok-kelime": "معلومات عامة",
  ilce: "حسب الحي",
  marka: "حسب الماركة",
  otoyol: "الطرق السريعة والجسور",
  "arac-tipi": "حسب نوع المركبة",
  bilgilendirici: "معلومات إرشادية",
};

const CATEGORY_ORDER: BlogCategory[] = ["cornerstone", "yaka", "ilce"];

export default function ArabicBlogHubPage() {
  return (
    <div dir="rtl" lang="ar">
      <Breadcrumbs items={[{ name: "المدونة", href: "/ar/blog" }]} />
      <div className="mx-auto max-w-5xl px-4 pb-6">
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">المدونة</h1>
        <p className="mt-2 max-w-2xl text-[#2d3f57]">
          أدلة خدمة سطحة السحب والمساعدة على الطريق على مدار الساعة لأحياء إسطنبول وجانبيها والمسافرين —
          كل ما تحتاج معرفته إذا تعطلت سيارتك في هذه المدينة.
        </p>
        <TowImageGallery seed="ar-blog" keyword="إسطنبول" locale="ar" />
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const items = arPosts.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mx-auto max-w-5xl px-4 py-6">
            <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">
              {AR_CATEGORY_LABEL[cat]} <span className="text-sm font-normal text-[#5a6b80]">({items.length})</span>
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/ar/blog/${p.slug}`}
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
    </div>
  );
}
