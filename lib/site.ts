// ข้อมูลกลางของเว็บ — แก้ที่เดียว ใช้ทั้งเว็บ
// (ค่า contact/LINE เป็น placeholder รอข้อมูลจริงจากลูกค้า)

export const BRAND = {
  name: "Simple Cafe",
  tagline: "คราฟต์เบเกอรี่ อบสดใหม่ทุกวัน",
  phone: "0X-XXX-XXXX",
  lineId: "@simplecafe",
  email: "hello@simplecafe.co",
  address: "ขอนแก่น",
  hours: "ทุกวัน 08:00 – 18:00 น.",
} as const;

export const LINE_URL = "https://line.me/R/ti/p/@simplecafe";

export const NAV = [
  { label: "หน้าแรก", href: "/" },
  { label: "สินค้า", href: "/products" },
  { label: "จัดเบรก", href: "/catering" },
  { label: "รับผลิต/ส่ง", href: "/wholesale" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "ติดต่อ", href: "/contact" },
] as const;

export const STATS = [
  { value: "6+", label: "ปีประสบการณ์" },
  { value: "60+", label: "ลูกค้าองค์กร" },
  { value: "ทุกวัน", label: "อบสดใหม่" },
  { value: "ทั่วประเทศ", label: "จัดส่ง" },
] as const;
