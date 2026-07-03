"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";

const inputCls =
  "w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand";
const labelCls = "block text-sm font-medium text-ink mb-1.5";

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[10px] border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto text-brand" size={40} />
        <h3 className="mt-4 text-xl font-semibold text-ink">ส่งคำขอเรียบร้อย</h3>
        <p className="mt-2 text-ink-soft">
          ทีมงานจะติดต่อกลับพร้อมใบเสนอราคาภายใน 2-3 วันทำการ ขอบคุณครับ
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-sm text-brand hover:underline"
        >
          ส่งคำขอใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-[10px] border border-line bg-surface p-6 sm:p-8 space-y-4"
    >
      <div>
        <label className={labelCls}>ชื่อธุรกิจ / ร้าน *</label>
        <input required className={inputCls} placeholder="เช่น ร้านกาแฟ ABC" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>ประเภทธุรกิจ *</label>
          <select required className={inputCls} defaultValue="">
            <option value="" disabled>
              เลือกประเภท
            </option>
            <option>คาเฟ่</option>
            <option>ร้านอาหาร</option>
            <option>โรงแรม</option>
            <option>จัดเลี้ยง / จัดเบรก</option>
            <option>อื่นๆ</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>ปริมาณ &amp; ความถี่</label>
          <input className={inputCls} placeholder="เช่น 200 ชิ้น/สัปดาห์" />
        </div>
      </div>

      <div>
        <label className={labelCls}>สินค้าที่สนใจ</label>
        <input className={inputCls} placeholder="เช่น ครัวซองต์ ซาวโดว์ เค้ก" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>ชื่อผู้ติดต่อ *</label>
          <input required className={inputCls} placeholder="ชื่อ-นามสกุล" />
        </div>
        <div>
          <label className={labelCls}>เบอร์โทร *</label>
          <input required className={inputCls} placeholder="0X-XXX-XXXX" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>LINE ID</label>
          <input className={inputCls} placeholder="@yourline" />
        </div>
        <div>
          <label className={labelCls}>อีเมล</label>
          <input type="email" className={inputCls} placeholder="you@email.com" />
        </div>
      </div>

      <ButtonEl type="submit" size="lg" className="w-full">
        ขอใบเสนอราคา
      </ButtonEl>
      <p className="text-center text-xs text-ink-soft">
        ทีมงานตอบกลับภายใน 2-3 วันทำการ
      </p>
    </form>
  );
}
