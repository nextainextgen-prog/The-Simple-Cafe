import { Gutter } from "@payloadcms/ui";
import type { AdminViewServerProps } from "payload";
import React from "react";

import { DashboardStyles } from "./dashboard-styles";

/**
 * หน้าแรกหลังบ้าน — KPI dashboard (แทน dashboard default ของ Payload)
 * wire ที่ admin.components.views.dashboard
 *
 * ตอบ 3 คำถามของเจ้าของร้านใน 3 วิ: มีออเดอร์ใหม่ไหม / ขายได้เท่าไร / มีอะไรค้าง
 *
 * เป็น Server Component ดึงข้อมูลผ่าน Payload Local API ที่ส่งมาทาง prop `payload`
 * (ดู DefaultDashboard ใน @payloadcms/next — dashboard view รับ payload/user เป็น serverProps ให้แล้ว
 *  จึงไม่ต้อง getPayload({config}) เองซ้ำ ใช้ instance เดียวกับที่ Payload ใช้เรนเดอร์หน้านี้)
 *
 * สไตล์ฝัง <style> ในตัวเอง (dashboard-styles.tsx) ไม่แตะ custom.scss —
 * ตามกติกา brief: CSS ของหน้าตัวเองห้ามรั่วไปทั้งแผง
 */

// ยอดขาย = เงินที่ได้จริง — ไม่นับ "รอชำระ" (ยังไม่จ่าย) และ "ยกเลิก" (ไม่เกิดรายได้)
const REVENUE_STATUSES = ["ชำระแล้ว", "กำลังเตรียม", "จัดส่ง", "สำเร็จ"];

const baht = new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 });
const thaiDate = (v: unknown) => {
  if (!v) return "-";
  const d = new Date(v as string);
  return Number.isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "2-digit" });
};

type RecentOrder = {
  id: string | number;
  orderNumber?: string;
  customerName?: string;
  total?: number;
  status?: string;
  createdAt?: string;
};

// สถานะ → คลาสสี badge (โทน CI ล้วน สื่อความหมายแต่ไม่จี๊ด)
const STATUS_TONE: Record<string, string> = {
  รอชำระ: "is-pending", // ทองอุ่น
  ชำระแล้ว: "is-paid", // โอลีฟอ่อน
  กำลังเตรียม: "is-progress",
  จัดส่ง: "is-progress",
  สำเร็จ: "is-done", // โอลีฟเข้ม
  ยกเลิก: "is-cancelled", // เทาหม่น
};

type DashboardData = {
  newOrders: number;
  monthRevenue: number;
  newLeads: number;
  rating: number | null;
  reviewCount: number | null;
  recent: RecentOrder[];
};

async function loadData(payload: AdminViewServerProps["payload"]): Promise<DashboardData> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  // ดึงพร้อมกัน — count/find/findGlobal เป็นคนละ query ไม่ขึ้นต่อกัน
  const [newOrdersRes, revenueRes, newLeadsRes, social, recentRes] = await Promise.all([
    payload.count({ collection: "orders", where: { status: { equals: "รอชำระ" } } }),
    payload.find({
      collection: "orders",
      where: {
        and: [
          { createdAt: { greater_than_equal: monthStart } },
          { status: { in: REVENUE_STATUSES } },
        ],
      },
      limit: 0, // 0 = ดึงทั้งหมดที่เข้าเงื่อนไข (รวมยอดเอง — Local API ไม่มี aggregate sum)
      depth: 0,
      select: { total: true },
    }),
    payload.count({ collection: "leads", where: { status: { equals: "new" } } }),
    payload.findGlobal({ slug: "social-proof", depth: 0 }),
    payload.find({
      collection: "orders",
      limit: 8,
      sort: "-createdAt",
      depth: 0,
      select: { orderNumber: true, customerName: true, total: true, status: true, createdAt: true },
    }),
  ]);

  const monthRevenue = (revenueRes.docs as { total?: number }[]).reduce(
    (sum, o) => sum + (typeof o.total === "number" ? o.total : 0),
    0,
  );

  return {
    newOrders: newOrdersRes.totalDocs,
    monthRevenue,
    newLeads: newLeadsRes.totalDocs,
    rating: (social as { googleRating?: number }).googleRating ?? null,
    reviewCount: (social as { googleReviewCount?: number }).googleReviewCount ?? null,
    recent: recentRes.docs as RecentOrder[],
  };
}

// ไอคอนเส้น lucide (โอลีฟ) — inline SVG กันพึ่ง network ในหลังบ้าน
const icons = {
  bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  wallet:
    "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5 M18 12a1 1 0 0 0 0 2h3v-2z",
  quote:
    "M18 21a8 8 0 0 0-16 0 M10 8a5 5 0 1 0-.001-.001 M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",
  star: "M11.5 2.3a.5.5 0 0 1 .95 0l2.3 4.68a2 2 0 0 0 1.6 1.16l5.16.75a.5.5 0 0 1 .3.86l-3.74 3.64a2 2 0 0 0-.6 1.87l.88 5.14a.5.5 0 0 1-.77.56l-4.62-2.42a2 2 0 0 0-1.97 0L6.4 21.43a.5.5 0 0 1-.77-.56l.88-5.14a2 2 0 0 0-.6-1.88L2.16 9.8a.5.5 0 0 1 .3-.9l5.16-.76a2 2 0 0 0 1.6-1.16z",
};

function KpiIcon({ d }: { d: string }) {
  return (
    <svg
      className="sc-dash-kpi__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split(" M").map((seg, i) => (
        <path key={i} d={(i === 0 ? seg : `M${seg}`).trim()} />
      ))}
    </svg>
  );
}

export async function Dashboard(props: AdminViewServerProps) {
  const { payload, user } = props;
  const admin = payload.config.routes.admin || "/admin";
  const displayName =
    (user as { name?: string; email?: string })?.name ||
    (user as { email?: string })?.email?.split("@")[0] ||
    "";

  let data: DashboardData | null = null;
  let failed = false;
  try {
    data = await loadData(payload);
  } catch (err) {
    // DB ล่ม/ต่อไม่ติด — dashboard ต้องไม่ทำให้ทั้งแผงขาว (แพตเทิร์นเดียวกับ lib/cms.ts)
    console.error("[admin] dashboard data load failed:", err);
    failed = true;
  }

  const link = (path: string, query?: Record<string, string>) => {
    const qs = query
      ? "?" +
        Object.entries(query)
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join("&")
      : "";
    return `${admin}${path}${qs}`;
  };

  const kpis = data
    ? [
        {
          key: "orders",
          label: "ออเดอร์ใหม่ (รอชำระ)",
          value: baht.format(data.newOrders),
          hint: data.newOrders > 0 ? "รอจัดการ" : "ไม่มีค้าง",
          icon: icons.bag,
          href: link("/collections/orders", { "where[status][equals]": "รอชำระ" }),
        },
        {
          key: "revenue",
          label: "ยอดขายเดือนนี้",
          value: `฿${baht.format(data.monthRevenue)}`,
          hint: "เฉพาะที่ชำระ/จัดส่ง/สำเร็จ",
          icon: icons.wallet,
          href: link("/collections/orders"),
        },
        {
          key: "leads",
          label: "คำขอใบเสนอราคา",
          value: baht.format(data.newLeads),
          hint: data.newLeads > 0 ? "ยังไม่ติดต่อกลับ" : "ติดต่อครบแล้ว",
          icon: icons.quote,
          href: link("/collections/leads", { "where[status][equals]": "new" }),
        },
        {
          key: "reviews",
          label: "คะแนนรีวิวเฉลี่ย",
          value: data.rating != null ? data.rating.toFixed(1) : "—",
          hint: data.reviewCount != null ? `จาก ${baht.format(data.reviewCount)} รีวิว` : "ยังไม่มีข้อมูล",
          icon: icons.star,
          href: link("/globals/social-proof"),
        },
      ]
    : [];

  const shortcuts = [
    { label: "เพิ่มสินค้า", href: link("/collections/products/create") },
    { label: "ดูออเดอร์ทั้งหมด", href: link("/collections/orders") },
    { label: "แก้เนื้อหาหน้าเว็บ", href: link("/globals/site-settings") },
    { label: "คลังสื่อ", href: link("/collections/media") },
  ];

  return (
    <Gutter className="sc-dash">
      <DashboardStyles />

      <header className="sc-dash__head">
        <h1 className="sc-dash__title">
          สวัสดี{displayName ? ` ${displayName}` : ""} 🌿
        </h1>
        <p className="sc-dash__sub">ภาพรวมร้าน The Simple Cafe วันนี้</p>
      </header>

      {failed && (
        <div className="sc-dash__error" role="alert">
          ตอนนี้ดึงข้อมูลจากฐานข้อมูลไม่ได้ ลองรีเฟรชอีกครั้ง — ส่วนอื่นของหลังบ้านยังใช้งานได้ปกติ
        </div>
      )}

      {data && (
        <>
          <section className="sc-dash-kpis" aria-label="ตัวเลขสำคัญ">
            {kpis.map((k) => (
              <a key={k.key} className="sc-dash-kpi" href={k.href}>
                <span className="sc-dash-kpi__top">
                  <span className="sc-dash-kpi__iconwrap">
                    <KpiIcon d={k.icon} />
                  </span>
                  <span className="sc-dash-kpi__label">{k.label}</span>
                </span>
                <span className="sc-dash-kpi__value">{k.value}</span>
                <span className="sc-dash-kpi__hint">{k.hint}</span>
              </a>
            ))}
          </section>

          <section className="sc-dash-panel" aria-label="ออเดอร์ล่าสุด">
            <div className="sc-dash-panel__head">
              <h2 className="sc-dash-panel__title">ออเดอร์ล่าสุด</h2>
              <a className="sc-dash-panel__more" href={link("/collections/orders")}>
                ดูทั้งหมด →
              </a>
            </div>

            {data.recent.length === 0 ? (
              <div className="sc-dash-empty">
                <span className="sc-dash-empty__mark">🧾</span>
                <p className="sc-dash-empty__title">ยังไม่มีออเดอร์</p>
                <p className="sc-dash-empty__text">
                  เมื่อมีลูกค้าสั่งซื้อผ่านหน้าเว็บ รายการจะขึ้นที่นี่
                </p>
              </div>
            ) : (
              <div className="sc-dash-table__scroll">
                <table className="sc-dash-table">
                  <thead>
                    <tr>
                      <th>เลขออเดอร์</th>
                      <th>ลูกค้า</th>
                      <th className="sc-dash-table__num">ยอด</th>
                      <th>สถานะ</th>
                      <th>วันที่</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent.map((o) => (
                      <tr key={String(o.id)} className="sc-dash-table__row">
                        <td>
                          <a className="sc-dash-table__link" href={link(`/collections/orders/${o.id}`)}>
                            {o.orderNumber || "—"}
                          </a>
                        </td>
                        <td>{o.customerName || "—"}</td>
                        <td className="sc-dash-table__num">฿{baht.format(o.total || 0)}</td>
                        <td>
                          <span className={`sc-dash-badge ${STATUS_TONE[o.status || ""] || ""}`}>
                            {o.status || "—"}
                          </span>
                        </td>
                        <td className="sc-dash-table__date">{thaiDate(o.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <section className="sc-dash-actions" aria-label="ทางลัด">
        {shortcuts.map((s) => (
          <a key={s.href} className="sc-dash-action" href={s.href}>
            {s.label}
          </a>
        ))}
      </section>
    </Gutter>
  );
}
