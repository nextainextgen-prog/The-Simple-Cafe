// แจ้งเตือนออเดอร์ผ่าน LINE Messaging API (LINE Notify ปิดบริการแล้ว — ห้ามใช้)
// อ่าน config จาก env:
//   LINE_CHANNEL_ACCESS_TOKEN = channel access token ของ LINE OA
//   LINE_ADMIN_TARGET_ID      = userId/groupId ปลายทาง (ร้าน/กลุ่มแอดมิน)
// ยังไม่ตั้ง env = log ข้อความไว้เฉย ๆ (mock) ไม่ push จริง และไม่ทำให้ flow ล้ม

export function isLineConfigured(): boolean {
  return Boolean(
    process.env.LINE_CHANNEL_ACCESS_TOKEN && process.env.LINE_ADMIN_TARGET_ID
  );
}

export type OrderNotifyInput = {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  total: number;
  itemCount: number;
  deliveryDate: string;
};

function buildMessage(o: OrderNotifyInput): string {
  return [
    "🧾 ออเดอร์ใหม่",
    `เลขที่: ${o.orderNumber}`,
    `ลูกค้า: ${o.customerName} (${o.customerPhone})`,
    `รายการ: ${o.itemCount} ชิ้น`,
    `ยอดรวม: ฿${o.total.toLocaleString("th-TH")}`,
    `รับ/ส่ง: ${o.deliveryDate}`,
  ].join("\n");
}

// push แจ้งร้าน — retry 1 ครั้งถ้าส่งไม่สำเร็จ. คืน true ถ้าส่งจริงสำเร็จ
export async function pushOrderNotification(
  o: OrderNotifyInput
): Promise<{ sent: boolean; mocked: boolean }> {
  const text = buildMessage(o);

  if (!isLineConfigured()) {
    console.log("[line] (mock — ยังไม่ตั้ง env) จะส่งข้อความ:\n" + text);
    return { sent: false, mocked: true };
  }

  const body = JSON.stringify({
    to: process.env.LINE_ADMIN_TARGET_ID,
    messages: [{ type: "text", text }],
  });

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body,
      });
      if (res.ok) return { sent: true, mocked: false };
      console.error(`[line] push ล้มเหลว (ครั้งที่ ${attempt}) HTTP ${res.status}`);
    } catch (err) {
      console.error(`[line] push error (ครั้งที่ ${attempt}):`, err);
    }
  }
  return { sent: false, mocked: false };
}
