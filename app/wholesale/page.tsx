import type { Metadata } from "next";
import { Coffee, UtensilsCrossed, Building2, PartyPopper } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/ui/art";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { QuoteForm } from "@/components/quote-form";
import { PRODUCTS } from "@/lib/products";
import { STATS } from "@/lib/site";

export const metadata: Metadata = {
  title: "รับผลิต / ส่ง (Wholesale)",
  description: "รับผลิตเบเกอรี่ OEM ส่งธุรกิจ คาเฟ่ ร้านอาหาร โรงแรม จัดเลี้ยง ขอใบเสนอราคาราคาส่ง ส่งขอนแก่นและทั่วประเทศ",
};

const SERVE = [
  { icon: Coffee, label: "คาเฟ่" },
  { icon: UtensilsCrossed, label: "ร้านอาหาร" },
  { icon: Building2, label: "โรงแรม" },
  { icon: PartyPopper, label: "จัดเลี้ยง / จัดเบรก" },
];

const STEPS = [
  { n: "1", title: "แจ้งความต้องการ", desc: "บอกสินค้า ปริมาณ ความถี่ที่ต้องการ", art: "/mascot/outline-mixing.png" },
  { n: "2", title: "เสนอราคา & ตัวอย่าง", desc: "ทีมงานเสนอราคาส่ง + ส่งตัวอย่างให้ชิม", art: "/mascot/outline-tools.png" },
  { n: "3", title: "ผลิตตามออเดอร์", desc: "อบสดใหม่ตามรอบ คุมคุณภาพทุกล็อต", art: "/mascot/outline-serving.png" },
  { n: "4", title: "จัดส่งถึงที่", desc: "ส่งตรงเวลา ขอนแก่นทุกวัน ทั่วประเทศ", art: "/mascot/outline-hug-donut.png" },
];

export default function WholesalePage() {
  return (
    <>
      <PageHero
        eyebrow="Wholesale / OEM"
        title="รับผลิต & ส่งเบเกอรี่สำหรับธุรกิจ"
        desc="ผลิตส่งร้านคาเฟ่ ร้านอาหาร โรงแรม จัดเลี้ยง รับทำแบรนด์ของคุณ (OEM) ราคาส่งพิเศษ"
      />

      {/* hero mascot */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">
              พาร์ตเนอร์เบเกอรี่ที่ธุรกิจไว้ใจ
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย ส่งถึงครัวคุณตรงเวลา
              รับผลิตทั้งสูตรมาตรฐานและทำแบรนด์เฉพาะ (OEM) ในปริมาณที่ยืดหยุ่น
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex justify-center">
            <Art src="/mascot/cart.png" alt="มาสคอตเข็นรถส่งเบเกอรี่" className="h-64 w-72 sm:h-72 sm:w-80" sizes="320px" />
          </div>
        </Reveal>
      </section>

      {/* who we serve */}
      <section className="bg-soft/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <Reveal>
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink">เราส่งให้ใครบ้าง</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVE.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <div className="rounded-[10px] border border-line bg-surface p-6 text-center">
                  <s.icon size={32} className="mx-auto text-brand" />
                  <p className="mt-3 font-medium text-ink">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* catalog preview — no prices */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
        <Reveal>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">แคตตาล็อกสินค้าส่ง</h2>
            <p className="mt-3 text-ink-soft">ราคาส่งขึ้นกับปริมาณและรอบส่ง — ขอใบเสนอราคาได้เลย</p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <div className="rounded-[10px] border border-line bg-surface p-5 text-center">
                <ImagePlaceholder label="ภาพสินค้า · 1:1" className="aspect-square w-full" />
                <h3 className="mt-3 font-medium text-ink text-sm sm:text-base">{p.name}</h3>
                <a href="#quote" className="mt-1 inline-block text-sm text-brand hover:underline">
                  ขอราคาส่ง
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OEM steps */}
      <section className="bg-soft/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <Reveal>
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink">ขั้นตอนรับผลิต OEM</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="rounded-[10px] border border-line bg-surface p-6 text-center h-full">
                  <Art src={s.art} className="mx-auto h-24 w-24" sizes="96px" />
                  <div className="mt-2 font-accent text-sm font-bold text-gold">STEP {s.n}</div>
                  <h3 className="mt-1 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* social proof */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 text-center">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-accent text-2xl sm:text-3xl font-bold text-brand">{s.value}</div>
                <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex h-16 items-center justify-center rounded-lg border border-dashed border-line bg-surface text-xs text-ink-soft">
                โลโก้ลูกค้า
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* quote form */}
      <section id="quote" className="bg-soft scroll-mt-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
          <Reveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-semibold text-ink">ขอใบเสนอราคา</h2>
              <p className="mt-3 text-ink-soft">กรอกข้อมูลสั้นๆ ทีมงานติดต่อกลับไว</p>
            </div>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
