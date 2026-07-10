import type { GlobalConfig } from "payload";

// คะแนนรวมจาก Google — อัปเดตอัตโนมัติโดย cron sync-reviews (แอดมินไม่ต้องแก้เอง)
// เก็บแยกจากรีวิวรายตัว เพราะ Places API คืนยอดรวมจริง (เช่น 4.9 จาก 312 รีวิว)
// ซึ่งมากกว่ารีวิวที่ cache ได้ (~5 รายการ)
export const SocialProof: GlobalConfig = {
  slug: "social-proof",
  label: "คะแนนรวม (Google)",
  admin: {
    group: "รีวิว",
  },
  fields: [
    {
      name: "googleRating",
      type: "number",
      label: "คะแนนเฉลี่ย Google",
      admin: { description: "อัปเดตอัตโนมัติจาก cron", readOnly: true },
    },
    {
      name: "googleReviewCount",
      type: "number",
      label: "จำนวนรีวิวทั้งหมดใน Google",
      admin: { description: "อัปเดตอัตโนมัติจาก cron", readOnly: true },
    },
    {
      name: "lastSyncedAt",
      type: "date",
      label: "sync ล่าสุดเมื่อ",
      admin: {
        description: "อัปเดตอัตโนมัติจาก cron",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },
  ],
};
