// โครงข้อมูลสินค้า — typed ไว้ เผื่อย้ายเข้า DB/CMS เฟส B โดยไม่ต้องรื้อ UI
// ราคาเป็น placeholder รอข้อมูลจริงจากลูกค้า (บางรายการเว้นว่างไว้ก่อน = สอบถามราคา)

export type Category =
  | "cake"
  | "cupcake"
  | "bread"
  | "croissant"
  | "cookie"
  | "other";

export type Product = {
  id: string;
  name: string;
  price?: number; // ราคาปลีก (บาท) — เว้นว่าง = ยังไม่กำหนด (แสดง "สอบถามราคา")
  category: Category;
  icon: string; // path ใน /public/icons (สำรอง — ตอนนี้ UI ใช้ placeholder รูปจริงแทน)
  badge?: "ขายดี" | "ใหม่";
  grade?: "มาตรฐาน" | "พรีเมียม";
};

export const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: "cake", label: "เค้ก", icon: "/icons/pie.png" },
  { key: "cupcake", label: "คัพเค้ก", icon: "/icons/pie.png" },
  { key: "bread", label: "ขนมปัง", icon: "/icons/loaf.png" },
  { key: "croissant", label: "ครัวซองต์", icon: "/icons/croissant.png" },
  { key: "cookie", label: "คุกกี้", icon: "/icons/cookie.png" },
  { key: "other", label: "อื่นๆ", icon: "/icons/baguette.png" },
];

export const PRODUCTS: Product[] = [
  { id: "croissant-butter", name: "ครัวซองต์เนยฝรั่งเศส", price: 65, category: "croissant", icon: "/icons/croissant.png", badge: "ขายดี", grade: "พรีเมียม" },
  { id: "sourdough", name: "ซาวโดว์โฮมเมด", price: 120, category: "bread", icon: "/icons/loaf.png", badge: "ขายดี" },
  { id: "choc-cookie", name: "คุกกี้ช็อกโกแลตชิป", price: 45, category: "cookie", icon: "/icons/cookie.png", grade: "มาตรฐาน" },
  { id: "butter-cake", name: "บัตเตอร์เค้กเนยสด", price: 320, category: "cake", icon: "/icons/pie.png", badge: "ใหม่", grade: "พรีเมียม" },
  { id: "baguette", name: "บาแกตต์ฝรั่งเศส", price: 75, category: "bread", icon: "/icons/baguette.png" },
  { id: "donut-set", name: "โดนัทเคลือบช็อก", price: 55, category: "other", icon: "/icons/donuts.png", badge: "ใหม่" },
  // คัพเค้ก — โครงเปล่า รอเติมชื่อ/ราคา/ภาพจริงทีหลัง
  { id: "cupcake-1", name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", icon: "/icons/pie.png", badge: "ใหม่" },
  { id: "cupcake-2", name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", icon: "/icons/pie.png" },
  { id: "cupcake-3", name: "คัพเค้ก (รอข้อมูล)", category: "cupcake", icon: "/icons/pie.png" },
];

// เมนูขายดีหน้าแรก — คัดชุดแรก 6 รายการ (ไม่รวมรายการโครงเปล่า)
export const FEATURED = PRODUCTS.slice(0, 6);
