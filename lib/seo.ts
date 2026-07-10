// ฐาน URL ของเว็บ — ใช้ใน metadata / sitemap / robots / JSON-LD
// ตั้ง NEXT_PUBLIC_SITE_URL เป็นโดเมนจริงตอน deploy (ยังไม่มี = ใช้ placeholder)
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://simplecafe.example";
