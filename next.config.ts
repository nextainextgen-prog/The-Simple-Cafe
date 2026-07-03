import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // แก้ warning: มี lockfile หลายที่ → ล็อก root ให้เป็นโฟลเดอร์โปรเจกต์นี้
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
