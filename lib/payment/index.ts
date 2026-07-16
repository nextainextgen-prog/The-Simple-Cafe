import type { PaymentProvider } from "./types";
import { MockPaymentProvider } from "./mock";

export * from "./types";

// เลือก provider จาก env: PAYMENT_PROVIDER = mock (default) | omise | stripe
// omise/stripe: โครงพร้อมต่อ — พอใส่คีย์จริง ค่อยเติม SDK ในไฟล์ provider ของมัน
// ตอนนี้ถ้าเลือกไว้แต่ยังไม่มีคีย์ → fallback เป็น mock (ไม่พัง flow)
export function getPaymentProvider(): PaymentProvider {
  const choice = (process.env.PAYMENT_PROVIDER || "mock").toLowerCase();

  switch (choice) {
    case "omise":
      if (process.env.OMISE_SECRET_KEY) {
        // TODO: ต่อ Omise SDK จริงเมื่อได้คีย์ (charges + PromptPay source)
        console.warn("[payment] omise เลือกไว้แต่ยังไม่ได้ต่อ SDK — ใช้ mock ชั่วคราว");
      } else {
        console.warn("[payment] ยังไม่ได้ตั้ง OMISE_SECRET_KEY — ใช้ mock");
      }
      return new MockPaymentProvider();

    case "stripe":
      if (process.env.STRIPE_SECRET_KEY) {
        // TODO: ต่อ Stripe SDK จริงเมื่อได้คีย์ (PaymentIntent + PromptPay)
        console.warn("[payment] stripe เลือกไว้แต่ยังไม่ได้ต่อ SDK — ใช้ mock ชั่วคราว");
      } else {
        console.warn("[payment] ยังไม่ได้ตั้ง STRIPE_SECRET_KEY — ใช้ mock");
      }
      return new MockPaymentProvider();

    case "mock":
    default:
      return new MockPaymentProvider();
  }
}
