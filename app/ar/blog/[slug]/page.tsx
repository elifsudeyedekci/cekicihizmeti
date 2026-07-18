import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { arPosts } from "@/lib/blog/posts-ar";
import type { BlogCategory } from "@/lib/blog/types";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { BlogEndCta } from "@/components/BlogEndCta";
import { ArrivalTable } from "@/components/ArrivalTable";
import { RichParagraph } from "@/components/RichParagraph";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";
import { TowImageGallery } from "@/components/TowImageGallery";
import { BlogMeta } from "@/components/BlogMeta";
import { blogAltKeyword, getTowImages } from "@/lib/data/images";
import { socialMeta } from "@/lib/seo";

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

function getArPost(slug: string) {
  return arPosts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return arPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getArPost(slug);
  if (!post) return {};
  const path = `/ar/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: path },
    ...socialMeta(path, `${post.slug}-ar`, blogAltKeyword(post.title, "ar"), {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      locale: "ar",
    }),
  };
}

export default async function ArabicBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getArPost(slug);
  if (!post) notFound();
  const related = post.relatedPostSlugs.map((s) => getArPost(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div dir="rtl" lang="ar">
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.metaDescription,
          url: `${SITE.url}/ar/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          image: `${SITE.url}${getTowImages(`${post.slug}-ar`, blogAltKeyword(post.title, "ar"), 2, "ar")[0].file}`,
        })}
      />
      <Breadcrumbs items={[{ name: "المدونة", href: "/ar/blog" }, { name: post.title, href: `/ar/blog/${post.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cta-600)]">
          {AR_CATEGORY_LABEL[post.category]}
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">{post.title}</h1>
        <BlogMeta dateModified={post.dateModified} locale="ar" />
        <div className="prose-tow mt-6">
          <p className="text-lg font-medium">{post.intro}</p>
        </div>

        <TowImageGallery seed={`${post.slug}-ar`} keyword={blogAltKeyword(post.title, "ar")} locale="ar" />
        {post.arrivalTable && (
          <div className="mt-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--color-navy-900)]">أوقات الوصول التقديرية</h2>
            <ArrivalTable rows={post.arrivalTable} />
          </div>
        )}
        <div className="prose-tow mt-6">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <RichParagraph key={j} text={p} />
              ))}
            </section>
          ))}
        </div>
      </article>
      <FaqSection faqs={post.faqs} title="الأسئلة الشائعة" />
      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">مقالات ذات صلة</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/ar/blog/${r.slug}`}
                  className="block rounded-lg border border-[var(--color-navy-100)] px-4 py-3 hover:border-[var(--color-cta-500)]"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <BlogEndCta context={post.title} />
    </div>
  );
}
