"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";

const inputCls =
  "w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand";
const labelCls = "block text-sm font-medium text-ink mb-1.5";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-[10px] border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto text-brand" size={40} />
        <h3 className="mt-4 text-xl font-semibold text-ink">ส่งข้อความเรียบร้อย</h3>
        <p className="mt-2 text-ink-soft">ทีมงานจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ</p>
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
        <label className={labelCls}>ชื่อ *</label>
        <input required className={inputCls} placeholder="ชื่อ-นามสกุล" />
      </div>
      <div>
        <label className={labelCls}>เบอร์โทร / LINE *</label>
        <input required className={inputCls} placeholder="0X-XXX-XXXX หรือ @line" />
      </div>
      <div>
        <label className={labelCls}>ข้อความ *</label>
        <textarea
          required
          rows={4}
          className={inputCls + " resize-none"}
          placeholder="สอบถามสินค้า / สั่งจัดเบรก / อื่นๆ"
        />
      </div>
      <ButtonEl type="submit" size="lg" className="w-full">
        ส่งข้อความ
      </ButtonEl>
    </form>
  );
}
