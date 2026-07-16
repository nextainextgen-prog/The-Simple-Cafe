import React from "react";

/**
 * ธีมหน้า Login หลังบ้าน — Simple Cafe
 * ฉีด CSS เฉพาะหน้า login ผ่าน slot `admin.components.beforeLogin` (component นี้ไม่มี element ที่มองเห็น)
 *
 * ทำไมทำแบบนี้: ห้ามแตะ app/(payload)/custom.scss + layout.tsx (โด้ถือ) และ Payload 3 ถอด admin.css
 * ออกแล้ว — จึงจัดธีม login ผ่าน component ที่ห้องนี้เป็นเจ้าของ target คลาสจริงของ template Payload
 *
 * ดีไซน์ตามบรีฟ: การ์ด frosted glass ลอยกลางจอ, พื้นครีมอุ่นมีแสงจาง, ปุ่มโอลีฟแบรนด์,
 * ช่อง/ปุ่มโค้งมน, focus/hover transition นุ่ม — สี CI ล้วน ไม่มี indigo ไม่เพิ่ม element/copy
 */
export const LoginTheme: React.FC = () => (
  <style>{`
    /* ===== พื้นหลังนอกการ์ด: ครีมอุ่น + แสงจางให้การ์ดใสเด้ง ===== */
    .template-minimal.template-minimal {
      background:
        radial-gradient(1100px 560px at 50% -12%, rgba(208,192,119,.20), transparent 60%),
        radial-gradient(820px 460px at 108% 112%, rgba(115,124,73,.12), transparent 55%),
        #FFFAE3;
    }

    /* ===== การ์ด login: frosted glass ลอยกลาง มุมโค้งใหญ่ เงานุ่มฟุ้ง ขอบอุ่นบาง ===== */
    .template-minimal .template-minimal__wrap {
      max-width: 416px;
      padding: 40px 36px 34px;
      background: rgba(255,252,240,.72);
      -webkit-backdrop-filter: blur(16px) saturate(1.05);
      backdrop-filter: blur(16px) saturate(1.05);
      border: 1px solid rgba(228,212,166,.9);
      border-radius: 26px;
      box-shadow:
        0 28px 64px -28px rgba(68,85,60,.24),
        0 6px 18px -10px rgba(68,85,60,.12);
    }

    /* ===== label ===== */
    .template-minimal .field-label,
    .login__form label {
      color: #2E3F26;
      font-weight: 500;
      letter-spacing: -.003em;
    }
    .template-minimal .field-label .required { color: #B08A4A; }

    /* ===== ช่องกรอก: โค้งมน ขอบอุ่น + focus/hover transition นุ่ม ===== */
    .template-minimal .field-type input,
    .login__form input:not([type="checkbox"]) {
      border-radius: 13px;
      border: 1px solid #E4D4A6;
      background: rgba(255,255,255,.55);
      color: #2E3F26;
      transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
    }
    .template-minimal .field-type input:hover,
    .login__form input:not([type="checkbox"]):hover { border-color: #D0C077; }
    .template-minimal .field-type input:focus,
    .template-minimal .field-type input:focus-visible,
    .login__form input:not([type="checkbox"]):focus {
      outline: none;
      border-color: #737C49;
      box-shadow: 0 0 0 3px rgba(115,124,73,.18);
      background: #fff;
    }

    /* ===== ปุ่ม Login: โอลีฟแบรนด์ (override ผ่าน CSS var ของ Payload) โค้งมน hover นุ่ม ===== */
    .template-minimal .login__form .btn--style-primary,
    .template-minimal .form-submit .btn--style-primary {
      --bg-color: #44553C;
      --color: #FFFCF0;
      --hover-bg: #3A4A33;
      --hover-color: #FFFCF0;
      border-radius: 13px;
      box-shadow: 0 10px 22px -12px rgba(68,85,60,.55);
      transition: background .18s ease, box-shadow .18s ease, transform .06s ease;
    }
    .template-minimal .login__form .btn--style-primary:hover {
      box-shadow: 0 12px 26px -12px rgba(68,85,60,.6);
    }
    .template-minimal .login__form .btn--style-primary:active { transform: translateY(1px); }

    /* ===== ลิงก์ (ลืมรหัสผ่าน) ===== */
    .template-minimal .login__form a,
    .template-minimal a {
      color: #737C49;
      transition: color .18s ease;
    }
    .template-minimal .login__form a:hover { color: #44553C; }
  `}</style>
);

export default LoginTheme;
