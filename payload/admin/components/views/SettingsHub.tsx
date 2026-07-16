import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import type { AdminViewServerProps } from "payload";
import React from "react";

import { SettingsHubStyles } from "./settings-hub-styles";

/**
 * หน้า hub ตั้งค่า /admin/settings — card grid แต่ละใบ = หมวดการตั้งค่า
 * wire ที่ admin.components.views.settings (path: /settings)
 *
 * ⚠️ custom route ระดับบนสุดของ Payload ไม่ได้ถูกครอบ DefaultTemplate ให้ (ต่างจาก view dashboard)
 * — ถ้าไม่เรนเดอร์ DefaultTemplate เอง หน้าจะไม่มีเมนูข้าง/หัว (ยืนยันจาก
 *   node_modules/@payloadcms/next/dist/views/Root/getRouteData.js: custom route → templateType undefined)
 * จึงห่อ children ด้วย DefaultTemplate โดยดึง prop จาก initPageResult ที่ Payload ส่งมาให้
 *
 * สไตล์ฝังในตัวเอง (settings-hub-styles.tsx) ไม่แตะ custom.scss ของโด้
 */

type CardDef = {
  key: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  group: "เว็บไซต์" | "ระบบ";
  adminOnly?: boolean;
};

// ไอคอนเส้น lucide (โอลีฟผ่าน currentColor) — inline กันพึ่ง network
const I = {
  store: (
    <>
      <path d="M2 7 3.5 3.5A1 1 0 0 1 4.4 3h15.2a1 1 0 0 1 .9.5L22 7" />
      <path d="M4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7" />
      <path d="M2 7a3 3 0 0 0 5 2 3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5-2" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  phone: (
    <path d="M13.83 19.9A10 10 0 0 1 4.1 10.17 2 2 0 0 1 6 8l2 .4a2 2 0 0 1 1.5 1.9l-.2 1.3a12 12 0 0 0 3 3l1.3-.2a2 2 0 0 1 1.9 1.5l.4 2a2 2 0 0 1-2.17 1.9z" />
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h10" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 15-6v14l-15-6z" />
      <path d="M3 11v4a1 1 0 0 0 1 1h2l1 5h3l-1-6" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 15l3-4 3 2 4-6" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="sc-set-card__icon"
    >
      {children}
    </svg>
  );
}

export function SettingsHub(props: AdminViewServerProps) {
  const { payload, i18n, params, searchParams, initPageResult, viewActions } = props;
  const { req, permissions, locale, visibleEntities } = initPageResult;
  const user = req.user;
  const admin = payload.config.routes.admin || "/admin";
  const isAdmin = (user as { role?: string } | null)?.role === "admin";
  const g = (path: string) => `${admin}${path}`;
  const SETTINGS = g("/globals/site-settings");

  const cards: CardDef[] = [
    { key: "brand", group: "เว็บไซต์", href: SETTINGS, icon: I.store, title: "ข้อมูลร้าน", desc: "ชื่อร้าน โลโก้ สโลแกน ที่อยู่ และเวลาทำการ" },
    { key: "contact", group: "เว็บไซต์", href: SETTINGS, icon: I.phone, title: "ช่องทางติดต่อ", desc: "เบอร์โทร LINE และอีเมลที่แสดงบนเว็บ" },
    { key: "nav", group: "เว็บไซต์", href: SETTINGS, icon: I.menu, title: "เมนูนำทาง", desc: "เมนูบนหัวเว็บและลิงก์ปลายทาง" },
    { key: "marquee", group: "เว็บไซต์", href: SETTINGS, icon: I.megaphone, title: "แถบข้อความวิ่ง", desc: "ข้อความประกาศที่วิ่งบนสุดของหน้าเว็บ" },
    { key: "stats", group: "เว็บไซต์", href: SETTINGS, icon: I.chart, title: "สถิติหน้าแรก", desc: "ตัวเลขความน่าเชื่อถือ เช่น 6+ ปี, 60+ ลูกค้า" },
    { key: "users", group: "ระบบ", href: g("/collections/users"), icon: I.users, title: "ผู้ใช้และสิทธิ์", desc: "เพิ่มหรือแก้ทีมงานที่เข้าหลังบ้านได้", adminOnly: true },
  ];

  const groups: CardDef["group"][] = ["เว็บไซต์", "ระบบ"];

  return (
    <DefaultTemplate
      i18n={i18n}
      locale={locale}
      params={params}
      payload={payload}
      permissions={permissions}
      req={req}
      searchParams={searchParams}
      user={user ?? undefined}
      viewActions={viewActions}
      viewType="dashboard"
      visibleEntities={visibleEntities}
    >
      <Gutter className="sc-set">
        <SettingsHubStyles />

        <header className="sc-set__head">
          <h1 className="sc-set__title">ตั้งค่า</h1>
          <p className="sc-set__sub">ปรับข้อมูลร้านและระบบหลังบ้าน เลือกหมวดที่ต้องการแก้</p>
        </header>

        {groups.map((group) => {
          const items = cards.filter((c) => c.group === group && (!c.adminOnly || isAdmin));
          if (items.length === 0) return null;
          return (
            <section key={group} className="sc-set-group" aria-label={group}>
              <h2 className="sc-set-group__title">{group}</h2>
              <div className="sc-set-grid">
                {items.map((c) => (
                  <a key={c.key} className="sc-set-card" href={c.href}>
                    <span className="sc-set-card__iconwrap">
                      <CardIcon>{c.icon}</CardIcon>
                    </span>
                    <span className="sc-set-card__body">
                      <span className="sc-set-card__title">{c.title}</span>
                      <span className="sc-set-card__desc">{c.desc}</span>
                    </span>
                    <span className="sc-set-card__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </Gutter>
    </DefaultTemplate>
  );
}
