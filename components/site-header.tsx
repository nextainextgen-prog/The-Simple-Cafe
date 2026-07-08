"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/brand-lockup";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

const ANNOUNCE = [
  "ส่งขอนแก่นทุกวัน",
  "รับผลิต & จัดเบรกครบวงจร",
  "อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย",
  "สั่งล่วงหน้าได้ ส่งทั่วประเทศ",
];
// ซ้ำหลายรอบให้ track กว้างเกินจอ → เลื่อนต่อเนื่องไม่มีช่องว่าง
const GROUP = [...ANNOUNCE, ...ANNOUNCE, ...ANNOUNCE];

export function SiteHeader({
  nav,
  lineUrl,
}: {
  nav: NavItem[];
  lineUrl: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      {/* แถบประกาศ — ข้อความเลื่อนวนต่อเนื่อง (marquee) */}
      <div className="bg-brand-deep text-cream text-xs sm:text-sm py-1.5 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0" aria-hidden={group === 1}>
              {GROUP.map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6">{t}</span>
                  <span className="opacity-40">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* แถวหลัก: โลโก้ซ้าย · nav · ปุ่มขวา */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 h-24">
        {/* ซ้าย: โลโก้ */}
        <BrandLockup className="shrink-0" />

        {/* กลาง: เมนู (desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base text-ink/85 hover:text-brand transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ขวา: ปุ่ม สั่งซื้อเลย + ติดต่อ (desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-deep px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-brand"
          >
            สั่งซื้อเลย
          </a>
          <Link
            href="/contact"
            className="rounded-full border border-brand-deep px-5 py-2.5 text-sm font-medium text-brand-deep transition-colors hover:bg-brand-deep hover:text-cream"
          >
            ติดต่อ
          </Link>
        </div>

        {/* hamburger (mobile) */}
        <button
          aria-label="เมนู"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink shrink-0"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* เมนู mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-line transition-[max-height] duration-300",
          open ? "max-h-[26rem]" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-base text-ink/85 hover:bg-surface hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex gap-2.5 px-1">
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center rounded-full bg-brand-deep px-4 py-2.5 text-sm font-medium text-cream"
            >
              สั่งซื้อเลย
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-full border border-brand-deep px-4 py-2.5 text-sm font-medium text-brand-deep"
            >
              ติดต่อ
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
