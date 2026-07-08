import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getWhatWeDo } from "@/lib/cms";

// Sitemap แบบ dynamic — หน้า static + หน้ารายละเอียด what-we-do จาก CMS
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/catering`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/wholesale`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const wwd = await getWhatWeDo();
  const wwdRoutes: MetadataRoute.Sitemap = wwd.map((w) => ({
    url: `${SITE_URL}/what-we-do/${w.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...wwdRoutes];
}
