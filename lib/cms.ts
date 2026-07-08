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

export type CmsProduct = {
  id: string;
  name: string;
  price?: number;
  category: string; // category key (e.g. "cake")
  badge?: "ขายดี" | "ใหม่";
  grade?: "มาตรฐาน" | "พรีเมียม";
};

export type CmsCategory = { key: string; label: string };

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
