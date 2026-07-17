import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, CATEGORY_LABEL } from "@/lib/blog/registry";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { BlogEndCta } from "@/components/BlogEndCta";
import { ArrivalTable } from "@/components/ArrivalTable";
import { RichParagraph } from "@/components/RichParagraph";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { SITE } from "@/lib/config";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = post.relatedPostSlugs
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.metaDescription,
          url: `${SITE.url}/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
        })}
      />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }]} />
      <article className="mx-auto max-w-3xl px-4 pb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-cta-600)]">
          {CATEGORY_LABEL[post.category]}
        </p>
        <h1 className="text-3xl font-extrabold text-[var(--color-navy-900)] md:text-4xl">{post.title}</h1>
        <p className="mt-2 text-sm text-[#5a6b80]">Son güncelleme: {post.dateModified}</p>

        <div className="prose-tow mt-6">
          <p className="text-lg font-medium">{post.intro}</p>
        </div>

        {post.arrivalTable && (
          <div className="mt-6">
            <h2 className="mb-3 text-xl font-bold text-[var(--color-navy-900)]">Tahmini Varış Süreleri</h2>
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

      <FaqSection faqs={post.faqs} />

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 py-6">
          <h2 className="mb-4 text-xl font-bold text-[var(--color-navy-900)]">İlgili Yazılar</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="block rounded-lg border border-[var(--color-navy-100)] px-4 py-3 hover:border-[var(--color-cta-500)]">
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
