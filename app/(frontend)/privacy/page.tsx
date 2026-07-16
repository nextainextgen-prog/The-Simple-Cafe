import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { getSiteData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description: "นโยบายการเก็บและใช้ข้อมูลส่วนบุคคล (PDPA) ของ Simple Cafe",
};

// โครงนโยบายความเป็นส่วนตัว (PDPA) — เนื้อหาปรับได้เมื่อได้ข้อมูลนิติบุคคล/DPO จริง
export default async function PrivacyPage() {
  const site = await getSiteData();
  const b = site.brand;

  return (
    <>
      <PageHero
        eyebrow="PDPA"
        title="นโยบายความเป็นส่วนตัว"
        desc="เราเก็บข้อมูลส่วนบุคคลเท่าที่จำเป็นต่อการให้บริการเท่านั้น"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 space-y-6 text-ink-soft leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-ink">ข้อมูลที่เราเก็บ</h2>
          <p className="mt-2">
            ชื่อ เบอร์โทร ที่อยู่จัดส่ง และรายละเอียดคำสั่งซื้อ
            เพื่อใช้ดำเนินการผลิต จัดส่ง และติดต่อกลับเกี่ยวกับออเดอร์ของคุณ
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">การใช้และเปิดเผยข้อมูล</h2>
          <p className="mt-2">
            ใช้เพื่อดำเนินการสั่งซื้อและบริการหลังการขายเท่านั้น
            ไม่จำหน่ายหรือเปิดเผยต่อบุคคลภายนอกนอกเหนือจากผู้ให้บริการที่จำเป็น
            (เช่น ขนส่ง/ผู้ให้บริการชำระเงิน)
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">สิทธิของเจ้าของข้อมูล</h2>
          <p className="mt-2">
            คุณสามารถขอเข้าถึง แก้ไข หรือลบข้อมูลส่วนบุคคลของคุณได้
            โดยติดต่อเราตามช่องทางด้านล่าง
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-ink">ติดต่อ</h2>
          <p className="mt-2">
            {b.name}
            {b.phone ? ` · โทร ${b.phone}` : ""}
            {b.email ? ` · อีเมล ${b.email}` : ""}
          </p>
        </section>
      </div>
    </>
  );
}
