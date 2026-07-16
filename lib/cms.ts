// Server-side data access — reads content from Payload CMS (local API).
// Every loader falls back to the static lib/products.ts + lib/site.ts data if
// the DB is unreachable, so pages never hard-fail. Wrapped in React cache() so
// the header/footer/page share one query per request.
import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  PRODUCTS as STATIC_PRODUCTS,
  CATEGORIES as STATIC_CATEGORIES,
} from "@/lib/products";
import { BRAND, LINE_URL, NAV, STATS } from "@/lib/site";
import { MOCK_REVIEWS_PAYLOAD } from "@/lib/google-reviews";

export type CmsProduct = {
  id: string;
  name: string;
  price?: number;
  category: string; // category key (e.g. "cake")
  badge?: "ขายดี" | "ใหม่";
  grade?: "มาตรฐาน" | "พรีเมียม";
};

export type CmsCategory = { key: string; label: string };

export type WhatWeDoItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  art?: string;
  image?: { url: string; alt?: string } | null;
  content?: unknown; // lexical rich-text (serialized) — rendered via RichText
  metaTitle?: string;
  metaDescription?: string;
};

export type Review = {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profilePhoto?: string;
};

export type SocialProofData = {
  rating: number; // คะแนนเฉลี่ยที่โชว์
  count: number; // จำนวนรีวิวที่โชว์
  reviews: Review[];
};

export type ClientLogo = {
  id: string;
  name: string;
  logo: { url: string; alt?: string } | null;
  url?: string;
};

export type SiteData = {
  brand: {
    name: string;
    tagline: string;
    phone: string;
    lineId: string;
    email: string;
    address: string;
    hours: string;
  };
  lineUrl: string;
  nav: { label: string; href: string }[];
  stats: { value: string; label: string }[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getProducts = cache(async (): Promise<CmsProduct[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "products",
      depth: 1,
      limit: 200,
      sort: "order",
      where: { visible: { equals: true } },
    });
    return docs.map((d: any) => ({
      id: String(d.id),
      name: d.name,
      price: typeof d.price === "number" ? d.price : undefined,
      category:
        d.category && typeof d.category === "object" ? d.category.key : "other",
      badge: d.badge && d.badge !== "none" ? d.badge : undefined,
      grade: d.grade && d.grade !== "none" ? d.grade : undefined,
    }));
  } catch (err) {
    console.error("[cms] getProducts fell back to static data:", err);
    return STATIC_PRODUCTS.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category,
      badge: p.badge,
      grade: p.grade,
    }));
  }
});

// เมนูขายดีหน้าแรก — สินค้าที่มีราคา 6 รายการแรก (ตามลำดับ order)
export const getFeatured = cache(async (): Promise<CmsProduct[]> => {
  const products = await getProducts();
  return products.filter((p) => p.price != null).slice(0, 6);
});

export const getCategories = cache(async (): Promise<CmsCategory[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "categories",
      limit: 100,
      sort: "order",
    });
    return docs.map((d: any) => ({ key: d.key, label: d.label }));
  } catch (err) {
    console.error("[cms] getCategories fell back to static data:", err);
    return STATIC_CATEGORIES.map((c) => ({ key: c.key, label: c.label }));
  }
});

function mapWhatWeDo(d: any): WhatWeDoItem {
  return {
    id: String(d.id),
    title: d.title,
    slug: d.slug,
    summary: d.summary,
    art: d.art || undefined,
    image:
      d.image && typeof d.image === "object"
        ? { url: d.image.url, alt: d.image.alt || d.title }
        : null,
    content: d.content ?? undefined,
    metaTitle: d.metaTitle || undefined,
    metaDescription: d.metaDescription || undefined,
  };
}

export const getWhatWeDo = cache(async (): Promise<WhatWeDoItem[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "what-we-do",
      depth: 1,
      limit: 100,
      sort: "order",
      where: { visible: { equals: true } },
    });
    return docs.map(mapWhatWeDo);
  } catch (err) {
    console.error("[cms] getWhatWeDo failed:", err);
    return [];
  }
});

export const getWhatWeDoBySlug = cache(
  async (slug: string): Promise<WhatWeDoItem | null> => {
    try {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
        collection: "what-we-do",
        depth: 1,
        limit: 1,
        where: {
          and: [{ slug: { equals: slug } }, { visible: { equals: true } }],
        },
      });
      return docs[0] ? mapWhatWeDo(docs[0]) : null;
    } catch (err) {
      console.error("[cms] getWhatWeDoBySlug failed:", err);
      return null;
    }
  }
);

// รีวิว + คะแนนรวม — ดึงจาก DB (cache โดย cron). DB ว่าง/ล่ม = ใช้ mock ระหว่างรอคีย์จริง
export const getSocialProof = cache(async (): Promise<SocialProofData> => {
  const mock: SocialProofData = {
    rating: MOCK_REVIEWS_PAYLOAD.rating ?? 5,
    count: MOCK_REVIEWS_PAYLOAD.total ?? MOCK_REVIEWS_PAYLOAD.reviews.length,
    reviews: MOCK_REVIEWS_PAYLOAD.reviews.map((r, i) => ({
      id: `mock-${i}`,
      authorName: r.authorName,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relativeTime,
      profilePhoto: r.profilePhoto || undefined,
    })),
  };
  try {
    const payload = await getPayload({ config });
    const [{ docs }, meta] = await Promise.all([
      payload.find({
        collection: "reviews",
        limit: 20,
        sort: "order",
        where: { visible: { equals: true } },
      }),
      payload.findGlobal({ slug: "social-proof" }).catch(() => null as any),
    ]);

    const reviews: Review[] = docs.map((d: any) => ({
      id: String(d.id),
      authorName: d.authorName,
      rating: typeof d.rating === "number" ? d.rating : 5,
      text: d.text || "",
      relativeTime: d.relativeTime || undefined,
      profilePhoto: d.profilePhoto || undefined,
    }));

    if (!reviews.length) return mock; // ยังไม่เคย sync → mock

    const rating =
      meta && typeof meta.googleRating === "number"
        ? meta.googleRating
        : Number(
            (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
          );
    const count =
      meta && typeof meta.googleReviewCount === "number"
        ? meta.googleReviewCount
        : reviews.length;

    return { rating, count, reviews };
  } catch (err) {
    console.error("[cms] getSocialProof fell back to mock:", err);
    return mock;
  }
});

export const getClientLogos = cache(async (): Promise<ClientLogo[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "client-logos",
      depth: 1,
      limit: 50,
      sort: "order",
      where: { visible: { equals: true } },
    });
    return docs.map((d: any) => ({
      id: String(d.id),
      name: d.name,
      logo:
        d.logo && typeof d.logo === "object"
          ? { url: d.logo.url, alt: d.logo.alt || d.name }
          : null,
      url: d.url || undefined,
    }));
  } catch (err) {
    console.error("[cms] getClientLogos returned empty:", err);
    return [];
  }
});

export const getSiteData = cache(async (): Promise<SiteData> => {
  try {
    const payload = await getPayload({ config });
    const s: any = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    return {
      brand: {
        name: s.brandName || BRAND.name,
        tagline: s.tagline || BRAND.tagline,
        phone: s.phone || BRAND.phone,
        lineId: s.lineId || BRAND.lineId,
        email: s.email || BRAND.email,
        address: s.address || BRAND.address,
        hours: s.hours || BRAND.hours,
      },
      lineUrl: s.lineUrl || LINE_URL,
      nav:
        Array.isArray(s.nav) && s.nav.length
          ? s.nav.map((n: any) => ({ label: n.label, href: n.href }))
          : [...NAV],
      stats:
        Array.isArray(s.stats) && s.stats.length
          ? s.stats.map((n: any) => ({ value: n.value, label: n.label }))
          : [...STATS],
    };
  } catch (err) {
    console.error("[cms] getSiteData fell back to static data:", err);
    return {
      brand: { ...BRAND },
      lineUrl: LINE_URL,
      nav: [...NAV],
      stats: [...STATS],
    };
  }
});

// ---- จัดเบรก (catering) — ย้ายจาก hardcode ในหน้า catering เข้า CMS ----
export type CateringPackage = {
  id: string;
  name: string;
  price: string; // ราคาต่อท่าน (string เพื่อคงรูปแบบเดิมในหน้าเว็บ)
  featured: boolean;
  items: string[];
};
export type CateringMenuGroup = { id: string; title: string; items: string[] };
export type CateringFaqItem = { id: string; q: string; a: string };

// fallback = ค่าเดิมที่เคย hardcode ในหน้า catering (กันหน้าพังตอน DB ว่าง/ล่ม)
const CATERING_PACKAGES_FALLBACK: CateringPackage[] = [
  { id: "f0", name: "แพ็กเกจเริ่มต้น", price: "89", featured: false, items: ["เบเกอรี่ 2 ชิ้น/ท่าน", "เครื่องดื่ม 1 แก้ว", "จัดเซ็ตพร้อมเสิร์ฟ"] },
  { id: "f1", name: "แพ็กเกจมาตรฐาน", price: "139", featured: true, items: ["เบเกอรี่ 3 ชิ้น/ท่าน", "เครื่องดื่ม 1 แก้ว", "ของว่าง 1 อย่าง", "อุปกรณ์ครบชุด"] },
  { id: "f2", name: "แพ็กเกจพรีเมียม", price: "199", featured: false, items: ["เบเกอรี่พรีเมียม 4 ชิ้น/ท่าน", "เครื่องดื่ม 2 แก้ว", "ของว่าง 2 อย่าง", "จัด Table Setting"] },
];
const CATERING_MENU_FALLBACK: CateringMenuGroup[] = [
  { id: "f0", title: "เบเกอรี่", items: ["ครัวซองต์", "ขนมปัง", "เค้ก", "คัพเค้ก", "คุกกี้", "โดนัท"] },
  { id: "f1", title: "เครื่องดื่ม", items: ["กาแฟ", "ชา / มัทฉะ", "โกโก้", "น้ำผลไม้", "สมูทตี้", "น้ำเปล่า / โซดา"] },
];
const CATERING_FAQ_FALLBACK: CateringFaqItem[] = [
  { id: "f0", q: "ขั้นต่ำในการสั่ง", a: "รับจัดเบรกขั้นต่ำ 20 ท่านขึ้นไป สำหรับงานเล็กสามารถสอบถามเพิ่มเติมได้" },
  { id: "f1", q: "จองล่วงหน้ากี่วัน", a: "แนะนำจองล่วงหน้าอย่างน้อย 2-3 วัน สำหรับงานใหญ่หรือเมนูพิเศษ 5-7 วัน" },
  { id: "f2", q: "พื้นที่จัดส่ง", a: "ขอนแก่นส่งถึงงานทุกวัน ต่างจังหวัดจัดส่งได้ทั่วประเทศ (มีค่าจัดส่งตามระยะทาง)" },
];

export const getCateringPackages = cache(async (): Promise<CateringPackage[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "catering-packages",
      limit: 50,
      sort: "order",
      where: { visible: { equals: true } },
    });
    if (!docs.length) return CATERING_PACKAGES_FALLBACK;
    return docs.map((d: any) => ({
      id: String(d.id),
      name: d.name,
      price: String(d.pricePerPerson ?? ""),
      featured: Boolean(d.featured),
      items: Array.isArray(d.items) ? d.items.map((i: any) => i.text).filter(Boolean) : [],
    }));
  } catch (err) {
    console.error("[cms] getCateringPackages fell back to static data:", err);
    return CATERING_PACKAGES_FALLBACK;
  }
});

export const getCateringMenu = cache(async (): Promise<CateringMenuGroup[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "catering-menu",
      limit: 50,
      sort: "order",
      where: { visible: { equals: true } },
    });
    if (!docs.length) return CATERING_MENU_FALLBACK;
    return docs.map((d: any) => ({
      id: String(d.id),
      title: d.title,
      items: Array.isArray(d.items) ? d.items.map((i: any) => i.label).filter(Boolean) : [],
    }));
  } catch (err) {
    console.error("[cms] getCateringMenu fell back to static data:", err);
    return CATERING_MENU_FALLBACK;
  }
});

export const getCateringFaq = cache(async (): Promise<CateringFaqItem[]> => {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "catering-faq",
      limit: 50,
      sort: "order",
      where: { visible: { equals: true } },
    });
    if (!docs.length) return CATERING_FAQ_FALLBACK;
    return docs.map((d: any) => ({ id: String(d.id), q: d.question, a: d.answer }));
  } catch (err) {
    console.error("[cms] getCateringFaq fell back to static data:", err);
    return CATERING_FAQ_FALLBACK;
  }
});
