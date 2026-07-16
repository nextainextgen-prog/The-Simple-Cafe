import React from "react";

/**
 * สไตล์ของหน้า Dashboard — ฝังในตัวเอง ไม่แตะ custom.scss (กัน CSS รั่วทั้งแผง)
 * ใช้ตัวแปรธีมของโด้ (--theme-elevation-*, --theme-input-bg, --style-radius-*)
 * เพื่อให้ตาม light/dark เองอัตโนมัติ hardcode เฉพาะสีแบรนด์จริง (โอลีฟ)
 * ทุกคลาส prefix .sc-dash เพื่อไม่ชนของแผงส่วนอื่น
 */
const BRAND = "#737C49";
const BRAND_DARK = "#44553C";

export function DashboardStyles() {
  return (
    <style>{`
      .sc-dash { padding-block: 8px 40px; }

      .sc-dash__head { margin-bottom: 22px; }
      .sc-dash__title {
        margin: 0; font-size: 1.7rem; font-weight: 700;
        color: var(--theme-elevation-800); letter-spacing: -0.01em;
      }
      .sc-dash__sub { margin: 4px 0 0; color: var(--theme-elevation-500); font-size: 0.92rem; }

      .sc-dash__error {
        margin-bottom: 20px; padding: 14px 16px;
        border: 1px solid var(--theme-elevation-200);
        border-left: 3px solid ${BRAND};
        border-radius: var(--style-radius-m, 12px);
        background: var(--theme-elevation-50); color: var(--theme-elevation-700);
        font-size: 0.9rem;
      }

      /* ===== KPI cards ===== */
      .sc-dash-kpis {
        display: grid; gap: 14px; margin-bottom: 26px;
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 1100px) { .sc-dash-kpis { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 560px)  { .sc-dash-kpis { grid-template-columns: 1fr; } }

      .sc-dash-kpi {
        display: flex; flex-direction: column; gap: 10px;
        padding: 18px 18px 16px;
        background: var(--theme-input-bg, var(--theme-elevation-0));
        border: 1px solid var(--theme-elevation-150);
        border-radius: var(--style-radius-l, 20px);
        text-decoration: none; color: inherit;
        transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
      }
      .sc-dash-kpi:hover {
        border-color: ${BRAND};
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(68,85,60,.10);
      }
      .sc-dash-kpi:focus-visible { outline: 2px solid ${BRAND}; outline-offset: 2px; }

      .sc-dash-kpi__top { display: flex; align-items: center; gap: 10px; }
      .sc-dash-kpi__iconwrap {
        display: inline-flex; align-items: center; justify-content: center;
        width: 34px; height: 34px; flex-shrink: 0;
        border-radius: 10px;
        background: rgba(115,124,73,.12); color: ${BRAND};
      }
      .sc-dash-kpi__icon { width: 19px; height: 19px; }
      .sc-dash-kpi__label {
        font-size: 0.82rem; font-weight: 600; color: var(--theme-elevation-600);
        line-height: 1.25;
      }
      .sc-dash-kpi__value {
        font-size: 2rem; font-weight: 800; line-height: 1.05;
        color: var(--theme-elevation-800); letter-spacing: -0.02em;
      }
      .sc-dash-kpi__hint { font-size: 0.76rem; color: var(--theme-elevation-450); }

      /* ===== panel (ออเดอร์ล่าสุด) ===== */
      .sc-dash-panel {
        padding: 20px;
        background: var(--theme-input-bg, var(--theme-elevation-0));
        border: 1px solid var(--theme-elevation-150);
        border-radius: var(--style-radius-l, 20px);
        margin-bottom: 26px;
      }
      .sc-dash-panel__head {
        display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
        margin-bottom: 14px;
      }
      .sc-dash-panel__title { margin: 0; font-size: 1.05rem; font-weight: 700; color: var(--theme-elevation-800); }
      .sc-dash-panel__more {
        font-size: 0.85rem; font-weight: 600; color: ${BRAND}; text-decoration: none; white-space: nowrap;
      }
      .sc-dash-panel__more:hover { color: ${BRAND_DARK}; text-decoration: underline; }

      .sc-dash-table__scroll { overflow-x: auto; }
      .sc-dash-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
      .sc-dash-table thead th {
        text-align: left; font-weight: 600; font-size: 0.78rem;
        text-transform: uppercase; letter-spacing: .04em;
        color: var(--theme-elevation-500);
        padding: 8px 12px; border-bottom: 1px solid var(--theme-elevation-150);
        white-space: nowrap;
      }
      .sc-dash-table__num { text-align: right; }
      .sc-dash-table tbody td {
        padding: 11px 12px; border-bottom: 1px solid var(--theme-elevation-100);
        color: var(--theme-elevation-700); white-space: nowrap;
      }
      /* row click แบบ stretched-link — ลิงก์เลขออเดอร์คลุมทั้งแถว (คีย์บอร์ด/เมาส์ใช้ได้ ไม่ต้อง JS) */
      .sc-dash-table__row { position: relative; }
      .sc-dash-table__row:hover td { background: var(--theme-elevation-50); }
      .sc-dash-table__link { color: ${BRAND_DARK}; font-weight: 600; text-decoration: none; }
      .sc-dash-table__link::after { content: ""; position: absolute; inset: 0; }
      .sc-dash-table__row:hover .sc-dash-table__link { text-decoration: underline; }
      .sc-dash-table__link:focus-visible { outline: none; }
      .sc-dash-table__row:has(.sc-dash-table__link:focus-visible) { outline: 2px solid ${BRAND}; outline-offset: -2px; }
      .sc-dash-table__date { color: var(--theme-elevation-500); }

      /* badge สถานะ — โทน CI ล้วน */
      .sc-dash-badge {
        display: inline-block; padding: 3px 10px; border-radius: 999px;
        font-size: 0.76rem; font-weight: 600; white-space: nowrap;
        background: var(--theme-elevation-100); color: var(--theme-elevation-700);
      }
      .sc-dash-badge.is-pending  { background: #F4E7C4; color: #7A5B12; }
      .sc-dash-badge.is-paid     { background: #E3EBCD; color: #4A5A2E; }
      .sc-dash-badge.is-progress { background: #E7ECDA; color: #55603C; }
      .sc-dash-badge.is-done     { background: ${BRAND}; color: #FFFCF0; }
      .sc-dash-badge.is-cancelled{ background: var(--theme-elevation-150); color: var(--theme-elevation-500); }

      /* empty state */
      .sc-dash-empty { text-align: center; padding: 40px 20px; }
      .sc-dash-empty__mark { font-size: 2rem; display: block; margin-bottom: 8px; filter: grayscale(.2); }
      .sc-dash-empty__title { margin: 0 0 4px; font-weight: 700; color: var(--theme-elevation-700); }
      .sc-dash-empty__text { margin: 0; font-size: 0.86rem; color: var(--theme-elevation-500); }

      /* ===== ปุ่มลัด ===== */
      .sc-dash-actions { display: flex; flex-wrap: wrap; gap: 10px; }
      .sc-dash-action {
        display: inline-flex; align-items: center; padding: 9px 18px;
        border-radius: 999px; font-size: 0.88rem; font-weight: 600;
        text-decoration: none;
        background: ${BRAND_DARK}; color: #FFFCF0;
        border: 1px solid ${BRAND_DARK};
        transition: background .15s ease, transform .15s ease;
      }
      .sc-dash-action:hover { background: ${BRAND}; transform: translateY(-1px); }
      .sc-dash-action:focus-visible { outline: 2px solid ${BRAND}; outline-offset: 2px; }
      /* ปุ่มรอง (ตัวที่ 2 เป็นต้นไป) เป็น outline โปร่งให้ปุ่มแรกเด่น */
      .sc-dash-action:not(:first-child) {
        background: transparent; color: ${BRAND_DARK};
        border-color: var(--theme-elevation-200);
      }
      .sc-dash-action:not(:first-child):hover {
        background: var(--theme-elevation-50); border-color: ${BRAND}; color: ${BRAND_DARK};
      }

      /* ===== dark mode =====
         โด้ pin --theme-input-bg เป็นครีมสว่างคงที่ (ไม่ theme-aware) ถ้าใช้เป็นพื้นการ์ด
         พอ dark mode ตัวอักษร (--theme-elevation-800 = สว่าง) จะจางหายบนพื้นสว่าง
         → override พื้นการ์ด/พาเนลเป็น surface เข้มที่ตามธีม ให้ตัวอักษร (สว่าง) อ่านออก */
      html[data-theme="dark"] .sc-dash-kpi,
      html[data-theme="dark"] .sc-dash-panel {
        background: var(--theme-elevation-50);
        border-color: var(--theme-elevation-100);
      }
      html[data-theme="dark"] .sc-dash-kpi__iconwrap { background: rgba(151,163,105,.18); color: #B7C08A; }
      html[data-theme="dark"] .sc-dash-action:not(:first-child) { color: var(--theme-elevation-800); }
      html[data-theme="dark"] .sc-dash-table__link { color: #B7C08A; }
      html[data-theme="dark"] .sc-dash-badge.is-pending  { background: #4A4021; color: #EBD9A6; }
      html[data-theme="dark"] .sc-dash-badge.is-paid     { background: #333F22; color: #CFE0A8; }
      html[data-theme="dark"] .sc-dash-badge.is-progress { background: #35402A; color: #C3D0A8; }
      html[data-theme="dark"] .sc-dash-badge.is-done     { background: #97A369; color: #1A2215; }
    `}</style>
  );
}
