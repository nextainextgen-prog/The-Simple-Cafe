"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import type { LeadState } from "@/lib/actions/lead-state";

const BUSINESS_TYPES = ["cafe", "restaurant", "hotel", "catering", "other"];

function text(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

// กันสแปมบอทแบบง่าย: ช่องซ่อนที่คนจริงมองไม่เห็นและไม่มีทางกรอก
// ถ้ามีค่า = บอท → ตอบ ok ไปเฉยๆ ไม่บันทึก (ไม่บอกบอทว่าโดนจับได้)
function isBot(formData: FormData): boolean {
  return text(formData, "website") !== "";
}

// เบอร์ไทย/LINE id — เอาแค่กันค่าขยะ ไม่เข้มจนลูกค้ากรอกไม่ผ่าน
function looksLikeContact(v: string): boolean {
  return v.length >= 6;
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function createLead(data: Record<string, unknown>): Promise<LeadState> {
  try {
    const payload = await getPayload({ config });
    // overrideAccess: collection ปิด create ไว้ ไม่ให้ยิงผ่าน REST ได้
    await payload.create({ collection: "leads", data, overrideAccess: true });
    return { ok: true };
  } catch (err) {
    // ไม่โยน error ออกไป — ลูกค้าไม่ควรเห็น stack trace
    console.error("[leads] create failed:", err);
    return {
      ok: false,
      formError: "ระบบขัดข้องชั่วคราว ส่งไม่สำเร็จ รบกวนติดต่อทาง LINE หรือลองใหม่อีกครั้ง",
    };
  }
}

// ฟอร์มติดต่อ (/contact)
export async function submitContact(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  if (isBot(formData)) return { ok: true };

  const name = text(formData, "name");
  const phone = text(formData, "phone");
  const message = text(formData, "message");

  const errors: Record<string, string> = {};
  if (!name) errors.name = "กรอกชื่อด้วยครับ";
  if (!phone) errors.phone = "กรอกเบอร์โทรหรือ LINE ด้วยครับ";
  else if (!looksLikeContact(phone)) errors.phone = "เบอร์โทร/LINE ดูไม่ถูกต้อง";
  if (!message) errors.message = "กรอกข้อความด้วยครับ";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return createLead({ source: "contact", status: "new", name, phone, message });
}

// ฟอร์มขอใบเสนอราคา (/wholesale)
export async function submitQuote(
  _prev: LeadState,
  formData: FormData,
): Promise<LeadState> {
  if (isBot(formData)) return { ok: true };

  const businessName = text(formData, "businessName");
  const businessType = text(formData, "businessType");
  const name = text(formData, "name");
  const phone = text(formData, "phone");
  const email = text(formData, "email");

  const errors: Record<string, string> = {};
  if (!businessName) errors.businessName = "กรอกชื่อธุรกิจด้วยครับ";
  if (!businessType) errors.businessType = "เลือกประเภทธุรกิจด้วยครับ";
  else if (!BUSINESS_TYPES.includes(businessType))
    errors.businessType = "ประเภทธุรกิจไม่ถูกต้อง";
  if (!name) errors.name = "กรอกชื่อผู้ติดต่อด้วยครับ";
  if (!phone) errors.phone = "กรอกเบอร์โทรด้วยครับ";
  else if (!looksLikeContact(phone)) errors.phone = "เบอร์โทรดูไม่ถูกต้อง";
  if (email && !isEmail(email)) errors.email = "อีเมลดูไม่ถูกต้อง";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return createLead({
    source: "quote",
    status: "new",
    businessName,
    businessType,
    volume: text(formData, "volume"),
    products: text(formData, "products"),
    name,
    phone,
    lineId: text(formData, "lineId"),
    email,
  });
}
