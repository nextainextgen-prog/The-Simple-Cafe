import type { PaymentProvider, PaymentIntent, PaymentIntentInput } from "./types";

// Provider จำลอง — ใช้ระหว่างยังไม่ได้ตั้งค่า provider จริง
// คืนสถานะ "รอชำระ" พร้อมคำสั่งโอน/พร้อมเพย์ (ถ้าตั้ง PROMPTPAY_ID) ไม่ตัดเงินจริง
export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  async createIntent(input: PaymentIntentInput): Promise<PaymentIntent> {
    const promptpay = process.env.PROMPTPAY_ID;
    return {
      provider: this.name,
      status: "pending",
      reference: `mock_${input.orderNumber}`,
      instructions: promptpay
        ? `โอนพร้อมเพย์ไปที่ ${promptpay} จำนวน ${input.amount} บาท แล้วแนบสลิปยืนยัน`
        : "ระบบชำระเงินยังไม่เปิดใช้งานจริง — ทีมงานจะติดต่อกลับเพื่อยืนยันการชำระเงิน",
    };
  }
}
