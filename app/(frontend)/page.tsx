import Link from "next/link";
import {
  Sunrise,
  Truck,
  Award,
  ChefHat,
  Star,
  ArrowRight,
  Check,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Art } from "@/components/ui/art";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { getFeatured, getSiteData, getWhatWeDo } from "@/lib/cms";

// fallback ถ้ายังไม่มีข้อมูลใน CMS (การ์ดจะไม่ลิงก์)
const WHAT_WE_DO_FALLBACK = [
  { title: "ผลิตเบเกอรี่", summary: "อบสดใหม่ทุกวัน คัดวัตถุดิบพรีเมียม", art: "/mascot/outline-mixing.png", slug: "" },
  { title: "จัดเบรก", summary: "เบเกอรี่ + เครื่องดื่ม ครบชุดพร้อมเสิร์ฟ", art: "/mascot/outline-serving.png", slug: "" },
  { title: "Wholesale / OEM", summary: "รับผลิตส่งธุรกิจ ทำแบรนด์ของคุณได้", art: "/mascot/outline-hug-donut.png", slug: "" },
  { title: "ร้านคาเฟ่", summary: "กาแฟและเบเกอรี่หน้าร้าน ขอนแก่น", art: "/mascot/outline-coffee.png", slug: "" },
];

const WHY = [
  "อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย",
  "รับผลิตทุกรูปแบบ OEM ทำแบรนด์ลูกค้า",
  "ส่งทั่วประเทศ ขอนแก่นส่งทุกวัน",
  "ลูกค้าองค์กรไว้วางใจกว่า 60 ราย",
];

export default async function HomePage() {
  const [FEATURED, site, wwd] = await Promise.all([
    getFeatured(),
    getSiteData(),
    getWhatWeDo(),
  ]);
  const { stats: STATS, lineUrl: LINE_URL } = site;
  const WHAT_WE_DO = wwd.length ? wwd : WHAT_WE_DO_FALLBACK;
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* มาสคอตตกแต่งมุมล่างซ้าย (ไม่ใช่ภาพหลัก) */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-2 z-0 hidden lg:block h-40 w-36 -rotate-6 opacity-90"
        >
          <Art src="/mascot/serving.png" alt="" className="h-full w-full" sizes="144px" />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal now>
            <div>
              <Badge tone="gold">อบสดใหม่ทุกวัน</Badge>
              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.08]">
                เบเกอรี่อบสดใหม่
                <br />
                ส่งตรงถึง
                <span className="u-gold"> ธุรกิจคุณ</span>
              </h1>
              <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed max-w-md">
                คราฟต์เบเกอรี่คุณภาพ รับผลิต OEM · จัดเบรก · ส่งทั่วประเทศ
                ประสบการณ์กว่า 6 ปี
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/products" size="lg">
                  ดูสินค้า <ArrowRight size={18} />
                </Button>
                <Button href="/wholesale" variant="secondary" size="lg">
                  ขอใบเสนอราคา
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal now delay={0.15}>
            <div className="relative">
              <div className="absolute inset-0 -z-10 m-auto h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-soft blur-2xl opacity-70" />
              <ImagePlaceholder
                label="ภาพเบเกอรี่ / บรรยากาศร้าน · 4:5"
                className="aspect-[4/5] w-full max-w-sm mx-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Sunrise, label: "อบสดทุกวัน" },
            { icon: Truck, label: "ส่งทั่วประเทศ" },
            { icon: Award, label: "ประสบการณ์ 6+ ปี" },
            { icon: ChefHat, label: "รับผลิต OEM" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5 text-center">
              <Icon size={22} className="text-brand shrink-0" />
              <span className="text-sm font-medium text-ink">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHAT WE DO ============ */}
      <section id="what-we-do" className="mx-auto max-w-6xl px-4 sm:px-6 py-20 scroll-mt-28">
        <Reveal>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-ink">สิ่งที่เราทำ</h2>
            <p className="mt-3 text-ink-soft">
              ครบวงจรตั้งแต่ผลิต จัดเบรก ส่งธุรกิจ จนถึงหน้าร้านคาเฟ่
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_WE_DO.map((item, i) => {
            const inner = (
              <>
                <Art
                  src={item.art || "/mascot/outline-hello.png"}
                  className="mx-auto h-28 w-28"
                  sizes="112px"
                />
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{item.summary}</p>
                {item.slug && (
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand transition-all group-hover:gap-2">
                    อ่านเพิ่มเติม <ArrowRight size={15} />
                  </span>
                )}
              </>
            );
            const cardClass =
              "group h-full rounded-[10px] border border-line bg-surface p-6 text-center transition-colors hover:border-brand";
            return (
              <Reveal key={item.slug || item.title} delay={i * 0.08}>
                {item.slug ? (
                  <Link href={`/what-we-do/${item.slug}`} className={`block ${cardClass}`}>
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-soft/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold text-ink">เมนูขายดี</h2>
                <p className="mt-3 text-ink-soft">อบใหม่ทุกวัน คัดเน้นๆ ให้เลือก</p>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all"
              >
                ดูทั้งหมด <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <div className="group h-full rounded-[10px] border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(46,63,38,0.25)]">
                  <div className="relative">
                    {p.badge && (
                      <span className="absolute -top-1 left-0 z-10">
                        <Badge tone={p.badge === "ขายดี" ? "gold" : "blush"}>
                          {p.badge}
                        </Badge>
                      </span>
                    )}
                    <ImagePlaceholder label="ภาพสินค้า · 1:1" className="aspect-square w-full" />
                  </div>
                  <h3 className="mt-3 text-center font-medium text-ink text-sm sm:text-base">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-center font-accent text-brand font-semibold">
                    ฿{p.price}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY SIMPLE CAFE ============ */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="absolute inset-0 -z-10 m-auto h-64 w-64 rounded-full bg-gold/25 blur-2xl" />
            <Art src="/mascot/mixing.png" alt="มาสคอตกำลังตีแป้ง" className="h-72 w-72 sm:h-80 sm:w-80" sizes="320px" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="order-1 lg:order-2">
            <Badge tone="green">ทำไมต้อง Simple Cafe</Badge>
            <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-ink">
              คราฟต์จริง อบเองทุกวัน
            </h2>
            <ul className="mt-6 space-y-3.5">
              {WHY.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-cream">
                    <Check size={14} />
                  </span>
                  <span className="text-ink">{w}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-4 gap-3 border-t border-line pt-6">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-accent text-lg sm:text-2xl font-bold text-brand">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] sm:text-xs text-ink-soft">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={22} className="fill-gold-bright text-gold-bright" />
              ))}
            </div>
            <p className="mt-3 text-lg font-medium text-ink">
              4.9 จากรีวิวลูกค้ากว่า 300+ ราย
            </p>
            <p className="mt-1 text-sm text-ink-soft">ลูกค้าองค์กรทั่วประเทศไว้วางใจ</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-lg border border-dashed border-line bg-cream text-xs text-ink-soft"
                >
                  โลโก้ลูกค้า
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CATERING PREVIEW ============ */}
      <section className="bg-soft">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20 grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative flex justify-center">
              <Art src="/mascot/armful.png" alt="มาสคอตถือเบเกอรี่เต็มอ้อมแขน" className="h-72 w-72 sm:h-80 sm:w-80" sizes="320px" />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div>
              <Badge tone="gold">บริการจัดเบรก</Badge>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-ink">
                จัดเบรกครบวงจร
                <br />
                เบเกอรี่ + เครื่องดื่ม
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed max-w-md">
                ชุดเบรกพร้อมเสิร์ฟสำหรับงานสัมมนา ประชุม เลี้ยงบริษัท เลือกแพ็กเกจ
                ตามงบได้ พร้อมส่งถึงที่
              </p>
              <div className="mt-7">
                <Button href="/catering" size="lg">
                  ดูแพ็กเกจจัดเบรก <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ CTA BAND ============ */}
      <section className="bg-brand-deep text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-cream">
                สนใจสั่งผลิต หรือขอใบเสนอราคา?
              </h2>
              <p className="mt-4 text-cream/80 leading-relaxed max-w-md">
                ทักมาคุยได้เลย ทีมงานตอบกลับไว ประเมินราคาให้ฟรี
                ส่งได้ทั้งขอนแก่นและทั่วประเทศ
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-7 py-3.5 font-medium text-white transition hover:brightness-95"
                >
                  <MessageCircle size={18} /> แอด LINE
                </a>
                <Button
                  href="/wholesale"
                  variant="secondary"
                  size="lg"
                  className="border-cream text-cream hover:bg-cream hover:text-brand-deep"
                >
                  กรอกฟอร์มขอใบเสนอราคา
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex justify-center">
              <Art src="/mascot/cart.png" alt="มาสคอตเข็นรถส่งเบเกอรี่" className="h-64 w-72 sm:h-72 sm:w-80" sizes="320px" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
