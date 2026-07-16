import React from "react";

/**
 * โลโก้หน้า Login หลังบ้าน — Simple Cafe
 * มาสคอต "น้องโดว์" ท่าทักทาย (/mascot/hello.png) + เวิร์ดมาร์ก THE / SIMPLE / cafe & bakery
 * (สัดส่วนตาม components/brand-lockup.tsx)
 *
 * self-contained: ฝังฟอนต์ + สไตล์ในตัวเอง เพราะ admin layout ไม่ได้โหลด Cormorant/Caveat ให้
 * (โหลดผ่าน next/font เฉพาะฝั่ง frontend) และห้ามแตะ app/(payload)/layout.tsx
 * สีใช้ CI Simple Cafe ล้วน — ห้าม indigo/น้ำเงิน (หลุดจาก CI ร้าน)
 */

const CI = {
  surface: "#FFFCF0",
  brand: "#737C49", // โอลีฟ
  ink: "#2E3F26", // ตัวอักษร
  line: "#E4D4A6", // เส้นอุ่น
};

export const Logo: React.FC = () => (
  <div className="sc-admin-logo">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Caveat:wght@600&display=swap');
      .sc-admin-logo{
        display:flex;flex-direction:column;align-items:center;gap:16px;
        padding:6px 0 2px;
      }
      .sc-admin-logo__mascot{
        width:108px;height:108px;object-fit:contain;
        filter:drop-shadow(0 8px 16px rgba(68,85,60,.14));
      }
      .sc-admin-logo__mark{
        display:flex;flex-direction:column;align-items:center;
        line-height:1;text-align:center;user-select:none;color:${CI.ink};
      }
      /* THE — serif ตัวเล็ก ระยะห่างตัวอักษรกว้าง (text-indent ชดเชยช่องท้ายให้ยังกึ่งกลาง) */
      .sc-admin-logo__the{
        font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;
        font-size:13px;letter-spacing:.5em;text-indent:.5em;color:${CI.brand};
      }
      /* SIMPLE — พระเอก serif หนา letter-spacing ติดลบให้ดูแน่นพรีเมียม */
      .sc-admin-logo__simple{
        font-family:'Cormorant Garamond',Georgia,serif;font-weight:600;
        font-size:44px;letter-spacing:-.015em;margin-top:1px;color:${CI.ink};
      }
      /* cafe & bakery — ลายมือ */
      .sc-admin-logo__sub{
        font-family:'Caveat','Segoe Script',cursive;font-weight:600;
        font-size:23px;margin-top:-1px;color:${CI.brand};
      }
    `}</style>

    {/* eslint-disable-next-line @next/next/no-img-element -- graphics component ของ Payload admin อยู่นอก next/image pipeline; ใช้ <img> ตรงเพื่อความชัวร์ */}
    <img
      className="sc-admin-logo__mascot"
      src="/mascot/hello.png"
      alt="น้องโดว์ Simple Cafe"
      width={108}
      height={108}
    />

    <span className="sc-admin-logo__mark">
      <span className="sc-admin-logo__the">THE</span>
      <span className="sc-admin-logo__simple">SIMPLE</span>
      <span className="sc-admin-logo__sub">cafe &amp; bakery</span>
    </span>
  </div>
);

export default Logo;
