import React from "react";

/**
 * การ์ดผู้ใช้ ล่างสุดของเมนูหลังบ้าน — Simple Cafe (slot: admin.components.afterNavLinks)
 * แสดง ชื่อ + สิทธิ์ + ปุ่มออกจากระบบ · สไตล์อยู่ใน NavBrand (ธีม nav รวมที่เดียว)
 * server component — รับ `user` จาก serverProps ของ nav
 */

type NavUser = { name?: string | null; email?: string | null; role?: string | null };

const ROLE_LABEL: Record<string, string> = {
  admin: "แอดมิน",
  editor: "เอดิเตอร์",
};

export const NavUserCard: React.FC<{ user?: NavUser }> = ({ user }) => {
  if (!user) return null;

  const display = (user.name && user.name.trim()) || user.email || "ผู้ใช้";
  const initial = display.trim().charAt(0).toUpperCase();
  const role = user.role ? ROLE_LABEL[user.role] ?? user.role : "";

  return (
    <div className="sc-nav-user">
      <span className="sc-nav-user__avatar" aria-hidden="true">
        {initial}
      </span>
      <span className="sc-nav-user__info">
        <span className="sc-nav-user__name">{display}</span>
        {role ? <span className="sc-nav-user__role">{role}</span> : null}
      </span>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- logout ต้อง full navigation ให้ Payload ล้าง session/cookie ชัวร์ ไม่ใช่ client-side nav */}
      <a
        className="sc-nav-user__logout"
        href="/admin/logout"
        title="ออกจากระบบ"
        aria-label="ออกจากระบบ"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        </svg>
      </a>
    </div>
  );
};

export default NavUserCard;
