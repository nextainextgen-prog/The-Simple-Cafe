"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";
import { Field, Honeypot, inputCls } from "@/components/ui/field";
import { submitQuote } from "@/lib/actions/leads";
import { initialLeadState } from "@/lib/actions/lead-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <ButtonEl type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "กำลังส่ง..." : "ขอใบเสนอราคา"}
    </ButtonEl>
  );
}

// useActionState รีเซ็ตเองไม่ได้ — เปลี่ยน key เพื่อ remount ตัวใน คือวิธีล้างสถานะให้กลับไปเป็นฟอร์มเปล่า
export function QuoteForm() {
  const [attempt, setAttempt] = useState(0);
  return <QuoteFormFields key={attempt} onReset={() => setAttempt((n) => n + 1)} />;
}

function QuoteFormFields({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(submitQuote, initialLeadState);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-[10px] border border-line bg-surface p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-brand" size={40} />
        <h3 className="mt-4 text-xl font-semibold text-ink">ส่งคำขอเรียบร้อย</h3>
        <p className="mt-2 text-ink-soft">
          ทีมงานจะติดต่อกลับพร้อมใบเสนอราคาภายใน 2-3 วันทำการ ขอบคุณครับ
        </p>
        <button onClick={onReset} className="mt-5 text-sm text-brand hover:underline">
          ส่งคำขอใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[10px] border border-line bg-surface p-6 sm:p-8 space-y-4"
    >
      <Honeypot />

      <Field label="ชื่อธุรกิจ / ร้าน" required error={state.errors?.businessName}>
        {(p) => (
          <input
            {...p}
            name="businessName"
            className={inputCls}
            placeholder="เช่น ร้านกาแฟ ABC"
          />
        )}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ประเภทธุรกิจ" required error={state.errors?.businessType}>
          {(p) => (
            <select {...p} name="businessType" className={inputCls} defaultValue="">
              <option value="" disabled>
                เลือกประเภท
              </option>
              <option value="cafe">คาเฟ่</option>
              <option value="restaurant">ร้านอาหาร</option>
              <option value="hotel">โรงแรม</option>
              <option value="catering">จัดเลี้ยง / จัดเบรก</option>
              <option value="other">อื่นๆ</option>
            </select>
          )}
        </Field>

        <Field label="ปริมาณ & ความถี่">
          {(p) => (
            <input
              {...p}
              name="volume"
              className={inputCls}
              placeholder="เช่น 200 ชิ้น/สัปดาห์"
            />
          )}
        </Field>
      </div>

      <Field label="สินค้าที่สนใจ">
        {(p) => (
          <input
            {...p}
            name="products"
            className={inputCls}
            placeholder="เช่น ครัวซองต์ ซาวโดว์ เค้ก"
          />
        )}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ชื่อผู้ติดต่อ" required error={state.errors?.name}>
          {(p) => (
            <input {...p} name="name" className={inputCls} placeholder="ชื่อ-นามสกุล" />
          )}
        </Field>

        <Field label="เบอร์โทร" required error={state.errors?.phone}>
          {(p) => (
            <input {...p} name="phone" className={inputCls} placeholder="0X-XXX-XXXX" />
          )}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="LINE ID">
          {(p) => (
            <input {...p} name="lineId" className={inputCls} placeholder="@yourline" />
          )}
        </Field>

        <Field label="อีเมล" error={state.errors?.email}>
          {(p) => (
            <input
              {...p}
              type="email"
              name="email"
              className={inputCls}
              placeholder="you@email.com"
            />
          )}
        </Field>
      </div>

      {state.formError ? (
        <p role="alert" className="text-sm text-red-600">
          {state.formError}
        </p>
      ) : null}

      <SubmitButton />
      <p className="text-center text-xs text-ink-soft">ทีมงานตอบกลับภายใน 2-3 วันทำการ</p>
    </form>
  );
}
