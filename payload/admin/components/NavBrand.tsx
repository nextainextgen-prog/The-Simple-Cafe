import React from "react";

/**
 * แบรนด์ + ไอคอนเมนูหลังบ้าน — Simple Cafe (slot: admin.components.beforeNavLinks)
 * - เรนเดอร์โลโก้+ชื่อแบรนด์บนสุดของเมนู
 * - ฉีดเฉพาะ CSS ที่ยังไม่มีในธีมของโด้ (custom.scss): ไอคอน lucide ต่อเมนู + การ์ดผู้ใช้ + ซ่อน logout เดิม
 *
 * ทาง "hybrid" (ไม่แทน Nav) — คง Nav เดิม (collapse/มือถือ/active ของโด้ทำงานเหมือนเดิม)
 * ⚠️ ไม่ทำซ้ำกับ custom.scss ของโด้: link base (padding/radius/hover), หัวข้อกลุ่ม (.nav-group__toggle),
 *    active-state (.nav__link:has(.nav__link-indicator)) และแถบ indicator — โด้ทำไว้แล้ว ใช้ของเขา
 * ไอคอนวางที่ .nav__link-label::before (ไม่ใช่ .nav__link) เพื่อไม่ชนแถบซ้าย active
 * สี CI ล้วน ไม่มี indigo · ไอคอนเป็น artwork lucide v1.23 (โอลีฟ) gen จาก lucide-react ตรงๆ
 */
export const NavBrand: React.FC = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Caveat:wght@600&display=swap');

      /* label เป็น flex เพื่อวางไอคอนหน้า text (โด้ไม่ได้ style .nav__link-label) */
      .nav__link-label { display: inline-flex; align-items: center; gap: 11px; }

      /* ===== ไอคอนเส้น lucide ต่อเมนู (โอลีฟ) — ที่ label::before กันชนแถบซ้าย active ของ custom.scss ===== */
      #nav-products .nav__link-label::before,
      #nav-categories .nav__link-label::before,
      #nav-orders .nav__link-label::before,
      #nav-leads .nav__link-label::before,
      #nav-users .nav__link-label::before,
      #nav-media .nav__link-label::before,
      #nav-what-we-do .nav__link-label::before,
      #nav-reviews .nav__link-label::before,
      #nav-client-logos .nav__link-label::before,
      #nav-global-site-settings .nav__link-label::before,
      #nav-global-social-proof .nav__link-label::before,
      #nav-catering-packages .nav__link-label::before,
      #nav-catering-menu .nav__link-label::before,
      #nav-catering-faq .nav__link-label::before{content:"";width:18px;height:18px;flex-shrink:0;background-repeat:no-repeat;background-position:center;background-size:contain;opacity:.92}
      #nav-products .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487'/%3E%3Cpath d='M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132'/%3E%3Cpath d='M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42'/%3E%3Cpath d='M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14'/%3E%3Cpath d='M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676'/%3E%3C/svg%3E")}
      #nav-categories .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z'/%3E%3Cpath d='M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193'/%3E%3Ccircle cx='10.5' cy='6.5' r='.5' fill='%23737C49'/%3E%3C/svg%3E")}
      #nav-orders .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M13 16H8'/%3E%3Cpath d='M14 8H8'/%3E%3Cpath d='M16 12H8'/%3E%3Cpath d='M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z'/%3E%3C/svg%3E")}
      #nav-leads .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M18 21a8 8 0 0 0-16 0'/%3E%3Ccircle cx='10' cy='8' r='5'/%3E%3Cpath d='M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3'/%3E%3C/svg%3E")}
      #nav-users .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 15H6a4 4 0 0 0-4 4v2'/%3E%3Cpath d='m14.305 16.53.923-.382'/%3E%3Cpath d='m15.228 13.852-.923-.383'/%3E%3Cpath d='m16.852 12.228-.383-.923'/%3E%3Cpath d='m16.852 17.772-.383.924'/%3E%3Cpath d='m19.148 12.228.383-.923'/%3E%3Cpath d='m19.53 18.696-.382-.924'/%3E%3Cpath d='m20.772 13.852.924-.383'/%3E%3Cpath d='m20.772 16.148.924.383'/%3E%3Ccircle cx='18' cy='15' r='3'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3C/svg%3E")}
      #nav-media .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E")}
      #nav-what-we-do .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='7' height='7' x='3' y='3' rx='1'/%3E%3Crect width='7' height='7' x='14' y='3' rx='1'/%3E%3Crect width='7' height='7' x='14' y='14' rx='1'/%3E%3Crect width='7' height='7' x='3' y='14' rx='1'/%3E%3C/svg%3E")}
      #nav-reviews .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z'/%3E%3C/svg%3E")}
      #nav-client-logos .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 12h4'/%3E%3Cpath d='M10 8h4'/%3E%3Cpath d='M14 21v-3a2 2 0 0 0-4 0v3'/%3E%3Cpath d='M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2'/%3E%3Cpath d='M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16'/%3E%3C/svg%3E")}
      #nav-global-site-settings .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E")}
      #nav-global-social-proof .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z'/%3E%3Cpath d='M20 2v4'/%3E%3Cpath d='M22 4h-4'/%3E%3Ccircle cx='4' cy='20' r='2'/%3E%3C/svg%3E")}
      #nav-catering-packages .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 22v-9'/%3E%3Cpath d='M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z'/%3E%3Cpath d='M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13'/%3E%3Cpath d='M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z'/%3E%3C/svg%3E")}
      #nav-catering-menu .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8'/%3E%3Cpath d='M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7'/%3E%3Cpath d='m2.1 21.8 6.4-6.3'/%3E%3Cpath d='m19 5-7 7'/%3E%3C/svg%3E")}
      #nav-catering-faq .nav__link-label::before{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23737C49' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E%3Cpath d='M12 17h.01'/%3E%3C/svg%3E")}

      /* ===== ซ่อนปุ่ม logout เดิมของ Payload (มีในการ์ดผู้ใช้แล้ว) ===== */
      .nav__log-out { display: none !important; }

      /* ===== โลโก้ + ชื่อแบรนด์ บนสุด ===== */
      .sc-nav-brand {
        display: flex; align-items: center; gap: 11px;
        padding: 4px 12px 14px;
        margin-bottom: 4px;
        border-bottom: 1px solid rgba(228,212,166,.55);
      }
      .sc-nav-brand__mark {
        width: 38px; height: 38px; object-fit: contain; flex-shrink: 0;
        filter: drop-shadow(0 4px 8px rgba(68,85,60,.12));
      }
      .sc-nav-brand__text { display: flex; flex-direction: column; line-height: 1; min-width: 0; }
      .sc-nav-brand__name {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 600; font-size: 22px; letter-spacing: .01em; color: #2E3F26;
      }
      .sc-nav-brand__sub {
        font-family: 'Caveat', cursive; font-weight: 600; font-size: 14px;
        color: #737C49; margin-top: 1px;
      }

      /* ===== การ์ดผู้ใช้ ล่างสุด ===== */
      .sc-nav-user {
        display: flex; align-items: center; gap: 10px;
        margin: 14px 10px 6px;
        padding: 10px 11px;
        background: rgba(255,252,240,.6);
        border: 1px solid rgba(228,212,166,.7);
        border-radius: 14px;
      }
      .sc-nav-user__avatar {
        width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        background: #EAEDDF; color: #44553C; font-weight: 700; font-size: 15px;
        font-family: 'Cormorant Garamond', Georgia, serif;
      }
      .sc-nav-user__info { display: flex; flex-direction: column; min-width: 0; flex: 1; }
      .sc-nav-user__name {
        font-size: 13px; font-weight: 600; color: #2E3F26;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .sc-nav-user__role { font-size: 11px; color: #737C49; margin-top: 1px; }
      .sc-nav-user__logout {
        display: flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 9px; flex-shrink: 0;
        color: #737C49; transition: background .15s ease, color .15s ease;
      }
      .sc-nav-user__logout:hover { background: rgba(115,124,73,.12); color: #44553C; }
    `}</style>

    <div className="sc-nav-brand">
      {/* eslint-disable-next-line @next/next/no-img-element -- admin graphics อยู่นอก next/image pipeline */}
      <img className="sc-nav-brand__mark" src="/mascot/hello.png" alt="" width={38} height={38} />
      <span className="sc-nav-brand__text">
        <span className="sc-nav-brand__name">The Simple</span>
        <span className="sc-nav-brand__sub">cafe &amp; bakery</span>
      </span>
    </div>
  </>
);

export default NavBrand;
