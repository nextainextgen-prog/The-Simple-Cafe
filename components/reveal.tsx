"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  now = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  /** now = animate ตอน mount ทันที (ใช้กับ hero/above-fold ที่ต้องเห็นเลย) */
  now?: boolean;
  className?: string;
}) {
  const transition = { duration: 0.55, delay, ease: EASE };

  if (now) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
