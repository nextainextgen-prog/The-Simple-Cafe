import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simplecafe.example"),
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${notoThai.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
