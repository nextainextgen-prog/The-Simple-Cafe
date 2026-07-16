import React from "react";

/**
 * ไอคอนเล็กบน nav หลังบ้าน — Simple Cafe
 * มาร์ก "S" (Simple) เส้นล้วน โทนโอลีฟ CI บนพื้น surface ขอบอุ่น
 * ไม่มีอีโมจิ · ห้าม indigo/น้ำเงินของ EasySpace
 */
export const Icon: React.FC = () => (
  <svg
    className="sc-admin-icon"
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Simple Cafe"
  >
    <rect
      x="1.25"
      y="1.25"
      width="29.5"
      height="29.5"
      rx="9"
      fill="#FFFCF0"
      stroke="#E4D4A6"
      strokeWidth="1.5"
    />
    {/* ตัว S ลายเส้น */}
    <path
      d="M21 11.6C21 9.1 18.7 8 16 8s-5 1.4-5 3.9c0 2.4 2.6 3.1 5 3.6 2.7.6 5 1.4 5 4 0 2.6-2.3 4.1-5 4.1s-5-1.2-5.8-2.9"
      stroke="#737C49"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Icon;
