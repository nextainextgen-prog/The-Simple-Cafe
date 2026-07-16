import { revalidatePath } from "next/cache";

// หน้าเว็บอ่านเนื้อหาผ่าน Local API (getPayload) แล้ว Next แคชผลตั้งแต่ build →
// แก้ใน CMS จะไม่ขึ้นจนกว่าจะ revalidate. เรียกตัวนี้จาก afterChange/afterDelete
// ของ collection/global ที่เป็นเนื้อหาหน้าเว็บ เพื่อล้างแคชทั้งเว็บทันทีที่มีการแก้.
export function revalidateSite(): void {
  try {
    // type "layout" = ล้างทุกหน้าใต้ root layout (ทั้งฝั่ง frontend)
    revalidatePath("/", "layout");
  } catch (err) {
    // ถูกเรียกนอก request scope (เช่นสคริปต์ standalone) — ข้ามได้ ไม่ให้ล้ม write
    console.warn("[revalidate] skipped:", (err as Error)?.message);
  }
}
