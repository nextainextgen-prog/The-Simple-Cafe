import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Art } from "@/components/ui/art";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description: "เรื่องราว Simple Cafe คราฟต์เบเกอรี่อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย ประสบการณ์กว่า 6 ปี พร้อมมาตรฐานการผลิต",
};

const PROCESS = [
  { title: "คัดวัตถุดิบ", desc: "เลือกเนย แป้ง ช็อกโกแลตเกรดดี", art: "/mascot/outline-tools.png" },
  { title: "นวด & หมัก", desc: "ใส่ใจทุกขั้นตอน ได้เนื้อสัมผัสดี", art: "/mascot/outline-mixing.png" },
  { title: "อบสดใหม่", desc: "อบทุกวัน ไม่ค้างคืน ไม่แช่แข็ง", art: "/mascot/outline-serving.png" },
  { title: "ส่งถึงมือคุณ", desc: "แพ็กดี ส่งไว ถึงครัวตรงเวลา", art: "/mascot/outline-hug-donut.png" },
];

const STANDARDS = ["อย.", "GMP", "HACCP"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="เกี่ยวกับเรา"
        title="เรื่องราวของ Simple Cafe"
        desc="คราฟต์เบเกอรี่จากขอนแก่น อบด้วยใจทุกวันมากว่า 6 ปี"
      />

      {/* brand story */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <ImagePlaceholder label="ภาพร้าน / ทีมงาน · 3:2" className="aspect-[3/2] w-full" />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink">เริ่มจากความรักในการอบ</h2>
            <div className="mt-4 space-y-4 text-ink-soft leading-relaxed">
              <p>
                Simple Cafe เริ่มต้นจากความตั้งใจง่ายๆ ว่าอยากให้ทุกคนได้กินเบเกอรี่ที่อบสดใหม่จริงๆ
                ไม่ใส่สารกันเสีย ในราคาที่เข้าถึงได้
              </p>
              <p>
                จากหน้าร้านเล็กๆ วันนี้เราเติบโตเป็นผู้ผลิตที่ลูกค้าองค์กรกว่า 60 ราย
                ทั่วประเทศไว้วางใจ ทั้งคาเฟ่ ร้านอาหาร โรงแรม และงานจัดเลี้ยง
              </p>
              <p className="italic text-brand">
                &ldquo;อบสดใหม่ทุกวัน คือหัวใจที่เราไม่เคยลดทอน&rdquo;
              </p>
            </div>
            <div className="mt-6 flex justify-start">
              <Art src="/mascot/secret-rest.png" alt="" className="h-28 w-40" sizes="160px" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* production process */}
      <section className="bg-soft/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
          <Reveal>
            <h2 className="text-center text-3xl sm:text-4xl font-semibold text-ink">กระบวนการผลิต</h2>
            <p className="mt-3 text-center text-ink-soft">ใส่ใจตั้งแต่วัตถุดิบจนถึงมือคุณ</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="rounded-[10px] border border-line bg-surface p-6 text-center h-full">
                  <Art src={s.art} className="mx-auto h-24 w-24" sizes="96px" />
                  <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* standards */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
        <Reveal>
          <ShieldCheck size={36} className="mx-auto text-brand" />
          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-ink">มาตรฐานการผลิต</h2>
          <p className="mt-3 text-ink-soft max-w-lg mx-auto">
            ผลิตในโรงงานที่ได้มาตรฐาน สะอาด ปลอดภัย ตรวจสอบได้ทุกขั้นตอน
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {STANDARDS.map((s) => (
              <div
                key={s}
                className="flex h-20 w-28 items-center justify-center rounded-[10px] border border-dashed border-line bg-surface font-accent font-semibold text-ink-soft"
              >
                {s}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-soft">* ใส่โลโก้/เลขที่ใบรับรองจริงเมื่อได้ข้อมูลจากลูกค้า</p>
        </Reveal>
      </section>
    </>
  );
}
