import React from "react";

/**
 * สไตล์หน้า /admin/settings — ฝังในตัวเอง ไม่แตะ custom.scss (กัน CSS รั่วทั้งแผง)
 * เข้าชุดกับ Dashboard: การ์ดพื้น surface ขอบอุ่น ไอคอนโอลีฟ มุมโค้ง hover ยกเบาๆ
 * ใช้ตัวแปรธีม (--theme-elevation-*) เพื่อตาม light/dark เอง hardcode เฉพาะสีแบรนด์
 * ทุกคลาส prefix .sc-set กันชนแผงส่วนอื่น
 */
const BRAND = "#737C49";

export function SettingsHubStyles() {
  return (
    <style>{`
      .sc-set { padding-block: 8px 40px; }

      .sc-set__head { margin-bottom: 26px; }
      .sc-set__title {
        margin: 0; font-size: 1.7rem; font-weight: 700;
        color: var(--theme-elevation-800); letter-spacing: -0.01em;
      }
      .sc-set__sub { margin: 4px 0 0; color: var(--theme-elevation-500); font-size: 0.92rem; }

      .sc-set-group { margin-bottom: 28px; }
      .sc-set-group__title {
        margin: 0 0 12px; font-size: 0.78rem; font-weight: 700;
        text-transform: uppercase; letter-spacing: .06em;
        color: var(--theme-elevation-500);
      }

      .sc-set-grid {
        display: grid; gap: 14px;
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 1000px) { .sc-set-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 600px)  { .sc-set-grid { grid-template-columns: 1fr; } }

      .sc-set-card {
        display: flex; align-items: flex-start; gap: 14px;
        padding: 18px;
        background: var(--theme-input-bg, var(--theme-elevation-0));
        border: 1px solid var(--theme-elevation-150);
        border-radius: var(--style-radius-l, 20px);
        text-decoration: none; color: inherit;
        transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
      }
      .sc-set-card:hover {
        border-color: ${BRAND};
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(68,85,60,.10);
      }
      .sc-set-card:focus-visible { outline: 2px solid ${BRAND}; outline-offset: 2px; }

      .sc-set-card__iconwrap {
        display: inline-flex; align-items: center; justify-content: center;
        width: 42px; height: 42px; flex-shrink: 0;
        border-radius: 12px;
        background: rgba(115,124,73,.12); color: ${BRAND};
      }
      .sc-set-card__icon { width: 22px; height: 22px; }

      .sc-set-card__body { display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
      .sc-set-card__title { font-size: 1rem; font-weight: 700; color: var(--theme-elevation-800); }
      .sc-set-card__desc { font-size: 0.83rem; line-height: 1.45; color: var(--theme-elevation-500); }

      .sc-set-card__arrow {
        align-self: center; flex-shrink: 0;
        color: var(--theme-elevation-300); font-size: 1.1rem;
        transition: color .15s ease, transform .15s ease;
      }
      .sc-set-card:hover .sc-set-card__arrow { color: ${BRAND}; transform: translateX(3px); }

      /* dark mode: โด้ pin --theme-input-bg เป็นครีมสว่างคงที่ → พื้นการ์ดต้อง override เป็น surface เข้ม
         ไม่งั้นตัวอักษร (--theme-elevation-800 = สว่างใน dark) จะจางหายบนพื้นสว่าง */
      html[data-theme="dark"] .sc-set-card {
        background: var(--theme-elevation-50);
        border-color: var(--theme-elevation-100);
      }
      html[data-theme="dark"] .sc-set-card__iconwrap { background: rgba(151,163,105,.18); color: #B7C08A; }
    `}</style>
  );
}
