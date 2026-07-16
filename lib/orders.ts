// โครงข้อมูล + กติกาการสั่งซื้อ (ใช้ร่วมกัน client + server)
// ค่าคอนฟิกธุรกิจอ่านจาก env — ยังไม่ตั้ง = ค่า default (ไม่มีขั้นต่ำ/ส่งฟรี)
// พอเจ้าของให้ "โซน/ค่าส่ง/ขั้นต่ำ" จริง แค่เติม env (หรือย้ายไป CMS ภายหลัง)

export type CartLine = {
  id: string; // product id
  name: string;
  price: number; // ราคาต่อชิ้น (บาท)
  qty: number;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  deliveryDate: string; // ISO date (yyyy-mm-dd)
  note?: string;
};

export type OrderStatus =
  | "รอชำระ"
  | "ชำระแล้ว"
  | "กำลังเตรียม"
  | "จัดส่ง"
  | "สำเร็จ"
  | "ยกเลิก";

export const ORDER_STATUSES: OrderStatus[] = [
  "รอชำระ",
  "ชำระแล้ว",
  "กำลังเตรียม",
  "จัดส่ง",
  "สำเร็จ",
  "ยกเลิก",
];

// กติกาธุรกิจ (env-driven, มี default ปลอดภัย)
export const MIN_ORDER_TOTAL = Number(
  process.env.NEXT_PUBLIC_MIN_ORDER_TOTAL || 0
); // 0 = ไม่มีขั้นต่ำ
export const DELIVERY_FEE = Number(process.env.NEXT_PUBLIC_DELIVERY_FEE || 0); // 0 = ส่งฟรี/นัดรับ
export const FREE_DELIVERY_OVER = Number(
  process.env.NEXT_PUBLIC_FREE_DELIVERY_OVER || 0
); // ยอดที่ส่งฟรี (0 = ปิดฟีเจอร์)

export function calcSubtotal(lines: CartLine[]): number {
  return lines.reduce((s, l) => s + l.price * l.qty, 0);
}

export function calcDeliveryFee(subtotal: number): number {
  if (DELIVERY_FEE <= 0) return 0;
  if (FREE_DELIVERY_OVER > 0 && subtotal >= FREE_DELIVERY_OVER) return 0;
  return DELIVERY_FEE;
}

export function calcTotal(lines: CartLine[]): number {
  const sub = calcSubtotal(lines);
  return sub + calcDeliveryFee(sub);
}

export function meetsMinimum(lines: CartLine[]): boolean {
  if (MIN_ORDER_TOTAL <= 0) return true;
  return calcSubtotal(lines) >= MIN_ORDER_TOTAL;
}

// เลขออเดอร์อ่านง่าย: SC-<base36 ของ timestamp>-<สุ่มสั้น>
export function makeOrderNumber(seed: number, salt: string): string {
  const t = Math.floor(seed / 1000).toString(36).toUpperCase();
  return `SC-${t}-${salt.slice(0, 4).toUpperCase()}`;
}

export function formatTHB(n: number): string {
  return `฿${n.toLocaleString("th-TH")}`;
}
