"use client";

import { useId } from "react";

// ใช้ร่วมกันระหว่าง contact-form / quote-form — เดิมสอง ไฟล์ก๊อป class ชุดนี้ซ้ำกันเป๊ะ
export const inputCls =
  "w-full rounded-lg border border-line bg-cream px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand/40 aria-[invalid=true]:border-red-500";
export const labelCls = "block text-sm font-medium text-ink mb-1.5";

type FieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  // รับ id/aria/required มาผูกเอง เพราะ input จริงอยู่ที่ผู้เรียก (input/select/textarea ต่างกัน)
  // required ต้องส่งต่อลง control ด้วย ไม่ใช่แค่เติม * ที่ป้าย — ไม่งั้น validation ฝั่ง
  // เบราว์เซอร์หายไป กดส่งฟอร์มเปล่าจะต้องวิ่งไป server ก่อนถึงจะรู้ว่าลืมกรอก
  children: (props: {
    id: string;
    required: boolean;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
};

// ห่อ label + control + ข้อความ error ให้ผูก htmlFor/id/aria-describedby ครบ
// (ของเดิม label ลอยๆ ไม่มี htmlFor เลย screen reader อ่านไม่ออกว่าเป็นช่องอะไร)
export function Field({ label, error, required, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label}
        {required ? " *" : ""}
      </label>
      {children({
        id,
        required: Boolean(required),
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

// ช่องล่อบอท — ซ่อนจากคนและจาก screen reader แต่บอทที่กรอกทุกช่องจะติดกับ
export function Honeypot() {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );
}
