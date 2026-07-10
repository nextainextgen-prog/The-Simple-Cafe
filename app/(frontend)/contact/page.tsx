import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Truck, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getSiteData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "ติดต่อ",
  description: "ติดต่อ Simple Cafe — สั่งเบเกอรี่ จัดเบรก ขอใบเสนอราคา ผ่าน LINE โทร หรืออีเมล ส่งขอนแก่นและทั่วประเทศ",
};

export default async function ContactPage() {
  const { brand: BRAND, lineUrl: LINE_URL } = await getSiteData();
  const info = [
    { icon: MapPin, label: "ที่อยู่", value: BRAND.address },
    { icon: Phone, label: "โทร", value: BRAND.phone },
    { icon: MessageCircle, label: "LINE", value: BRAND.lineId },
    { icon: Mail, label: "อีเมล", value: BRAND.email },
    { icon: Clock, label: "เวลาทำการ", value: BRAND.hours },
    { icon: Truck, label: "พื้นที่ส่ง", value: "ขอนแก่นทุกวัน · ทั่วประเทศ" },
  ];

  return (
    <>
      <PageHero
        eyebrow="ติดต่อเรา"
        title="ติดต่อ Simple Cafe"
        desc="สั่งสินค้า จัดเบรก หรือสอบถามได้เลย เราพร้อมดูแล"
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 lg:grid-cols-2">
        {/* info */}
        <Reveal>
          <div>
            <h2 className="text-2xl font-semibold text-ink">ช่องทางติดต่อ</h2>
            <div className="mt-6 space-y-4">
              {info.map((it) => (
                <div key={it.label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft text-brand">
                    <it.icon size={18} />
                  </span>
                  <div>
                    <div className="text-sm text-ink-soft">{it.label}</div>
                    <div className="font-medium text-ink">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 font-medium text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} /> แอด LINE เลย
            </a>
          </div>
        </Reveal>

        {/* form */}
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>

      {/* map */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <Reveal>
          <ImagePlaceholder label="แผนที่ Google Maps · 16:9" className="aspect-video w-full" />
        </Reveal>
      </section>
    </>
  );
}
