import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { getProducts, getCategories } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "สินค้า",
  description: "แคตตาล็อกเบเกอรี่ Simple Cafe — เค้ก ขนมปัง ครัวซองต์ ซาวโดว์ คุกกี้ อบสดใหม่ทุกวัน",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "สินค้าเบเกอรี่ Simple Cafe",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        category: categories.find((c) => c.key === p.category)?.label,
        ...(p.price != null
          ? {
              offers: {
                "@type": "Offer",
                price: p.price,
                priceCurrency: "THB",
                availability: "https://schema.org/InStock",
                url: `${SITE_URL}/products`,
              },
            }
          : {}),
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <PageHero
        eyebrow="เมนูของเรา"
        title="สินค้าเบเกอรี่"
        desc="อบสดใหม่ทุกวัน คัดวัตถุดิบคุณภาพ เลือกดูตามหมวดได้เลย"
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <ProductGrid products={products} categories={categories} />

        <Reveal className="mt-16">
          <div className="rounded-[10px] bg-soft p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              สนใจสั่งจำนวนมากสำหรับธุรกิจ?
            </h2>
            <p className="mt-3 text-ink-soft max-w-lg mx-auto">
              รับผลิตส่งร้านคาเฟ่ ร้านอาหาร โรงแรม พร้อมราคาส่งพิเศษ ขอใบเสนอราคาได้เลย
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/wholesale" size="lg">
                ขอใบเสนอราคาสำหรับธุรกิจ
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
