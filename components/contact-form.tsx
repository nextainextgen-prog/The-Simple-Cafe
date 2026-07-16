"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";
import { ButtonEl } from "@/components/ui/button";
import { Field, Honeypot, inputCls } from "@/components/ui/field";
import { submitContact } from "@/lib/actions/leads";
import { initialLeadState } from "@/lib/actions/lead-state";

function SubmitButton() {
  // useFormStatus ต้องอยู่ในลูกของ <form> ถึงจะอ่าน pending ได้
  const { pending } = useFormStatus();
  return (
    <ButtonEl type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "กำลังส่ง..." : "ส่งข้อความ"}
    </ButtonEl>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialLeadState);

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-[10px] border border-line bg-surface p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-brand" size={40} />
        <h3 className="mt-4 text-xl font-semibold text-ink">ส่งข้อความเรียบร้อย</h3>
        <p className="mt-2 text-ink-soft">ทีมงานจะติดต่อกลับโดยเร็วที่สุด ขอบคุณครับ</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-[10px] border border-line bg-surface p-6 sm:p-8 space-y-4"
    >
      <Honeypot />

      <Field label="ชื่อ" required error={state.errors?.name}>
        {(p) => <input {...p} name="name" className={inputCls} placeholder="ชื่อ-นามสกุล" />}
      </Field>

      <Field label="เบอร์โทร / LINE" required error={state.errors?.phone}>
        {(p) => (
          <input
            {...p}
            name="phone"
            className={inputCls}
            placeholder="0X-XXX-XXXX หรือ @line"
          />
        )}
      </Field>

      <Field label="ข้อความ" required error={state.errors?.message}>
        {(p) => (
          <textarea
            {...p}
            name="message"
            rows={4}
            className={inputCls + " resize-none"}
            placeholder="สอบถามสินค้า / สั่งจัดเบรก / อื่นๆ"
          />
        )}
      </Field>

      {state.formError ? (
        <p role="alert" className="text-sm text-red-600">
          {state.formError}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
