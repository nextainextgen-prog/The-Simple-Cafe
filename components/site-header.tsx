"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, LINE_URL, BRAND } from "@/lib/site";
import { cn } from "@/lib/utils";

const ANNOUNCE = [
  "ส่งขอนแก่นทุกวัน",
  "รับผลิต & จัดเบรกครบวงจร",
  "อบสดใหม่ทุกวัน ไม่ใส่สารกันเสีย",
  "สั่งล่วงหน้าได้ ส่งทั่วประเทศ",
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      {/* แถบประกาศ — ข้อความเลื่อนวน (marquee) */}
      <div className="bg-brand-deep text-cream text-xs sm:text-sm py-1.5 overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0" aria-hidden={group === 1}>
              {ANNOUNCE.map((t, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6">{t}</span>
                  <span className="opacity-40">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 h-16">
        {/* โลโก้ + มาสคอต */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/mascot/hello.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="font-display text-xl font-semibold tracking-tight text-ink">
            {BRAND.name}
          </span>
        </Link>

        {/* เมนู desktop */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink/80 hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ปุ่ม LINE + hamburger */}
        <div className="flex items-center gap-2">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-sm font-medium text-white transition hover:brightness-95"
          >
            แอด LINE
          </a>
          <button
            aria-label="เมนู"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* เมนู mobile */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-line transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-ink/85 hover:bg-surface hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center rounded-full bg-[#06C755] px-4 py-2.5 text-sm font-medium text-white"
          >
            แอด LINE
          </a>
        </nav>
      </div>
    </header>
  );
}
