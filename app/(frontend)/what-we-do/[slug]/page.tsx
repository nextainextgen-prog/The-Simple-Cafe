import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, MessageCircle } from "lucide-react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/ui/art";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  getWhatWeDo,
  getWhatWeDoBySlug,
  getSiteData,
} from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// pre-render slugs ที่มีอยู่ (ยังคง dynamic ได้ถ้าเพิ่มใหม่)
export async function generateStaticParams() {
  const items = await getWhatWeDo();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWhatWeDoBySlug(slug);
  if (!item) return { title: "ไม่พบหน้า" };
  const title = item.metaTitle || item.title;
  const description = item.metaDescription || item.summary;
  return {
    title,
    description,
    alternates: { canonical: `/what-we-do/${item.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/what-we-do/${item.slug}`,
    },
  };
}

export default async function WhatWeDoDetailPage({ params }: Params) {
  const { slug } = await params;
  const [item, site] = await Promise.all([
    getWhatWeDoBySlug(slug),
    getSiteData(),
  ]);
  if (!item) notFound();

  const base = SITE_URL;
  const url = `${base}/what-we-do/${item.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.metaDescription || item.summary,
    url,
    provider: {
      "@type": "Bakery",
      name: site.brand.name,
      telephone: site.brand.phone,
      address: site.brand.address,
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "หน้าแรก", item: base + "/" },
      { "@type": "ListItem", position: 2, name: "สิ่งที่เราทำ", item: `${base}/#what-we-do` },
      { "@type": "ListItem", position: 3, name: item.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero eyebrow="สิ่งที่เราทำ" title={item.title} desc={item.summary} />

      {/* breadcrumb */}
      <nav
        aria-label="breadcrumb"
        className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 text-sm text-ink-soft"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-brand transition-colors">
              หน้าแรก
            </Link>
          </li>
          <ChevronRight size={14} className="shrink-0" />
          <li>
            <Link href="/#what-we-do" className="hover:text-brand transition-colors">
              สิ่งที่เราทำ
            </Link>
          </li>
          <ChevronRight size={14} className="shrink-0" />
          <li className="text-ink font-medium">{item.title}</li>
        </ol>
      </nav>

      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-10">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
            <div>
              {item.content ? (
                <div className="prose-simple max-w-none text-ink leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5">
                  <RichText data={item.content as never} />
                </div>
              ) : (
                <p className="text-ink-soft leading-relaxed">{item.summary}</p>
              )}
            </div>
            <div className="sm:w-56 shrink-0">
              {item.image?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image.url}
                  alt={item.image.alt || item.title}
                  className="w-full rounded-[10px] border border-line"
                />
              ) : item.art ? (
                <Art src={item.art} className="mx-auto h-40 w-40" sizes="160px" />
              ) : (
                <ImagePlaceholder label="ภาพประกอบ" className="aspect-square w-full" />
              )}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <div className="mt-12 rounded-[10px] bg-soft p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-ink">
            สนใจบริการนี้?
          </h2>
          <p className="mt-2 text-ink-soft">ทักมาคุยได้เลย ทีมงานตอบกลับไว ประเมินราคาให้ฟรี</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={site.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 font-medium text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} /> แอด LINE
            </a>
            <Button href="/contact" variant="secondary" size="lg">
              ติดต่อเรา
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/#what-we-do"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all"
          >
            <ArrowLeft size={16} /> กลับไปหน้า สิ่งที่เราทำ
          </Link>
        </div>
      </article>
    </>
  );
}
