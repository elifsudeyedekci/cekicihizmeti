import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { enPosts } from "@/lib/blog/posts-en";
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

function getEnPost(slug: string) {
  return enPosts.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return enPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getEnPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/en/blog/${post.slug}` },
  };
}

export default async function EnglishBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEnPost(slug);
  if (!post) notFound();
  const related = post.relatedPostSlugs.map((s) => getEnPost(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.metaDescription,
          url: `${SITE.url}/en/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          image: `${SITE.url}${getTowImages(`${post.slug}-en`, blogAltKeyword(post.title, "en"), 2, "en")[0].file}`,
        })}
      />
      <Breadcrumbs items={[{ name: "Blog", href: "/en/blog" }, { name: post.title, href: `/en/blog/${post.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cta-600)]">
          {EN_CATEGORY_LABEL[post.category]}
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">{post.title}</h1>
        <BlogMeta dateModified={post.dateModified} locale="en" />
        <div className="prose-tow mt-6">
          <p className="text-lg font-medium">{post.intro}</p>
        </div>

        <TowImageGallery seed={`${post.slug}-en`} keyword={blogAltKeyword(post.title, "en")} locale="en" />
        {post.arrivalTable && (
          <div className="mt-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--color-navy-900)]">Estimated Arrival Times</h2>
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
      <FaqSection faqs={post.faqs} title="Frequently Asked Questions" />
      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">Related Articles</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/en/blog/${r.slug}`}
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
    </>
  );
}
