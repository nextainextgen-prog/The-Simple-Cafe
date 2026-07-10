import type { Metadata } from "next";
import { Noto_Sans_Thai, Cormorant, Caveat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteData } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ฟอนต์โลโก้แบรนด์ THE SIMPLE (serif elegant) + cafe & bakery (ลายมือ)
const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simple Cafe — เบเกอรี่อบสดใหม่ รับผลิต จัดเบรก ส่งขอนแก่นและทั่วประเทศ",
    template: "%s · Simple Cafe",
  },
  description:
    "คราฟต์เบเกอรี่อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย รับผลิต OEM จัดเบรกครบวงจร ส่งขอนแก่นทุกวันและทั่วประเทศ ประสบการณ์กว่า 6 ปี ลูกค้าองค์กร 60+ ราย",
  keywords: [
    "เบเกอรี่ขอนแก่น",
    "รับผลิตเบเกอรี่",
    "จัดเบรกขอนแก่น",
    "เค้กส่งขอนแก่น",
    "ครัวซองต์",
    "ซาวโดว์",
    "OEM เบเกอรี่",
  ],
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: "Simple Cafe",
    title: "Simple Cafe — เบเกอรี่อบสดใหม่ รับผลิต จัดเบรก",
    description:
      "คราฟต์เบเกอรี่อบสดใหม่ทุกวัน รับผลิต OEM จัดเบรก ส่งทั่วประเทศ",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteData();
  const businessLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.brand.name,
    description: site.brand.tagline,
    url: SITE_URL,
    telephone: site.brand.phone,
    email: site.brand.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.brand.address,
      addressCountry: "TH",
    },
    openingHours: site.brand.hours,
    sameAs: [site.lineUrl].filter(Boolean),
  };
  return (
    <html
      lang="th"
      className={`${notoThai.variable} ${cormorant.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
        />
        <SiteHeader nav={site.nav} lineUrl={site.lineUrl} />
        <main className="flex-1">{children}</main>
        <SiteFooter nav={site.nav} brand={site.brand} lineUrl={site.lineUrl} />
      </body>
    </html>
  );
}
