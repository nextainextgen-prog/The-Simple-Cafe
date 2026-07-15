// แยกจาก leads.ts เพราะไฟล์ "use server" export ได้เฉพาะ async function เท่านั้น —
// ค่า/ชนิดที่ทั้ง action และฟอร์มฝั่ง client ใช้ร่วมกันต้องอยู่ในโมดูลธรรมดาแบบนี้

// สถานะที่ฟอร์มฝั่ง client อ่านผ่าน useActionState
export type LeadState = {
  ok: boolean;
  // error รายช่อง — key ตรงกับ name ของ input
  errors?: Record<string, string>;
  // error ระดับฟอร์ม (เช่น DB ล่ม) แสดงเหนือปุ่มส่ง
  formError?: string;
};

export const initialLeadState: LeadState = { ok: false };
