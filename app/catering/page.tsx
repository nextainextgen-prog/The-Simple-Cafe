import type { Metadata } from "next";
import { Check, Download, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Art } from "@/components/ui/art";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { BreadDecor } from "@/components/ui/bread-decor";
import { Accordion } from "@/components/ui/accordion";
import { LINE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "จัดเบรก",
  description: "บริการจัดเบรกครบวงจร เบเกอรี่ + เครื่องดื่ม สำหรับงานสัมมนา ประชุม เลี้ยงบริษัท ส่งขอนแก่นและทั่วประเทศ",
};

const PACKAGES = [
  {
    name: "แพ็กเกจเริ่มต้น",
    price: "89",
    items: ["เบเกอรี่ 2 ชิ้น/ท่าน", "เครื่องดื่ม 1 แก้ว", "จัดเซ็ตพร้อมเสิร์ฟ"],
  },
  {
    name: "แพ็กเกจมาตรฐาน",
    price: "139",
    featured: true,
    items: ["เบเกอรี่ 3 ชิ้น/ท่าน", "เครื่องดื่ม 1 แก้ว", "ของว่าง 1 อย่าง", "อุปกรณ์ครบชุด"],
  },
  {
    name: "แพ็กเกจพรีเมียม",
    price: "199",
    items: ["เบเกอรี่พรีเมียม 4 ชิ้น/ท่าน", "เครื่องดื่ม 2 แก้ว", "ของว่าง 2 อย่าง", "จัด Table Setting"],
  },
];

const MENU = ["ครัวซองต์", "ขนมปัง", "เค้ก", "คุกกี้", "โดนัท", "เบเกอรี่อื่นๆ"];

const CONDITIONS = [
  { q: "ขั้นต่ำในการสั่ง", a: "รับจัดเบรกขั้นต่ำ 20 ท่านขึ้นไป สำหรับงานเล็กสามารถสอบถามเพิ่มเติมได้" },
  { q: "จองล่วงหน้ากี่วัน", a: "แนะนำจองล่วงหน้าอย่างน้อย 2-3 วัน สำหรับงานใหญ่หรือเมนูพิเศษ 5-7 วัน" },
  { q: "พื้นที่จัดส่ง", a: "ขอนแก่นส่งถึงงานทุกวัน ต่างจังหวัดจัดส่งได้ทั่วประเทศ (มีค่าจัดส่งตามระยะทาง)" },
];

export default function CateringPage() {
  return (
    <>
      <PageHero
        eyebrow="บริการจัดเบรก"
        title="จัดเบรกครบวงจร"
        desc="เบเกอรี่อบสด + เครื่องดื่ม พร้อมเสิร์ฟสำหรับงานสัมมนา ประชุม เลี้ยงบริษัท"
      />

      {/* hero image + intro */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <ImagePlaceholder label="ภาพชุดจัดเบรก / Table Setting · 16:9" className="aspect-video w-full" />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              เบรกสวย อร่อย ครบในเซ็ตเดียว
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              เราจัดชุดเบรกให้พร้อมเสิร์ฟ ตั้งแต่เบเกอรี่อบสด เครื่องดื่ม ของว่าง
              จนถึงอุปกรณ์จัดเซ็ต เลือกแพ็กเกจตามงบและจำนวนคนได้เลย
            </p>
            <div className="mt-6 flex justify-start">
              <Art src="/mascot/serving.png" alt="" className="h-32 w-32" sizes="128px" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* packages */}
      <section className="bg-soft/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <BreadDecor className="mb-5" />
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink">แพ็กเกจจัดเบรก</h2>
              <p className="mt-3 text-ink-soft">ราคาต่อท่าน เลือกได้ตามงบและสไตล์งาน</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div
                  className={
                    "h-full rounded-[10px] border bg-surface p-6 " +
                    (p.featured ? "border-brand ring-1 ring-brand" : "border-line")
                  }
                >
                  {p.featured && <Badge tone="gold">แนะนำ</Badge>}
                  <h3 className="mt-2 text-lg font-semibold text-ink">{p.name}</h3>
                  <p className="mt-2">
                    <span className="font-accent text-3xl font-bold text-brand">฿{p.price}</span>
                    <span className="text-ink-soft text-sm"> /ท่าน</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-ink">
                        <Check size={16} className="mt-0.5 text-brand shrink-0" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" variant={p.featured ? "primary" : "secondary"} className="mt-6 w-full">
                    เลือกแพ็กเกจนี้
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-ink-soft">
            * ราคาเป็นตัวอย่าง ปรับได้ตามเมนูและจำนวน สอบถามใบเสนอราคาได้
          </p>
        </div>
      </section>

      {/* sample menu */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <Reveal>
          <BreadDecor className="mb-5" />
          <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink">ตัวอย่างเมนู</h2>
          <p className="mt-3 text-center text-ink-soft">เลือกผสมได้ตามชอบ</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {MENU.map((label, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <div className="rounded-[10px] border border-line bg-surface p-3">
                <ImagePlaceholder label="ภาพเมนู · 1:1" className="aspect-square w-full" />
                <p className="mt-2 text-center text-sm text-ink">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* conditions */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink text-center mb-6">เงื่อนไขการจอง</h2>
          <Accordion items={CONDITIONS} />
        </Reveal>
      </section>

      {/* CTA 3-way */}
      <section className="bg-brand-deep text-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-cream">พร้อมจัดเบรกให้งานคุณ</h2>
          <p className="mt-3 text-cream/80">เลือกวิธีที่สะดวก ทีมงานพร้อมดูแล</p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 font-medium text-white transition hover:brightness-95"
            >
              <MessageCircle size={18} /> แอด LINE
            </a>
            <Button href="/contact" variant="secondary" className="border-cream text-cream hover:bg-cream hover:text-brand-deep">
              ขอจัดเบรก
            </Button>
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm text-cream/70">
              <Download size={16} /> เมนู PDF (เร็วๆ นี้)
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
