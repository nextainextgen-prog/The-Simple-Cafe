// สัญญากลางของ payment provider — สลับ provider ได้โดยไม่แตะ flow สั่งซื้อ
export type PaymentIntentInput = {
  orderNumber: string;
  amount: number; // บาท (จำนวนเต็ม)
  customerName: string;
  customerPhone: string;
};

export type PaymentIntent = {
  provider: string;
  status: "pending" | "requires_action" | "paid" | "failed";
  reference: string; // id อ้างอิงฝั่ง provider
  // ช่องทางชำระต่อ (แล้วแต่ provider): QR PromptPay / ลิงก์ชำระ / คำสั่งโอน
  qrImage?: string; // data URL หรือ URL รูป QR
  redirectUrl?: string;
  instructions?: string; // เช่น "โอนแล้วแนบสลิป"
};

export interface PaymentProvider {
  readonly name: string;
  createIntent(input: PaymentIntentInput): Promise<PaymentIntent>;
}
