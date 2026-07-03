import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "line";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 border select-none";

const variants: Record<Variant, string> = {
  // ปุ่มหลัก: เขียวเข้ม → hover invert เป็นครีม
  primary:
    "bg-brand-deep text-cream border-brand-deep hover:bg-cream hover:text-brand-deep",
  // ปุ่มรอง: เส้นเขียว โปร่ง → hover เติมสี
  secondary:
    "bg-transparent text-brand-deep border-brand-deep hover:bg-brand-deep hover:text-cream",
  ghost:
    "bg-transparent text-ink border-transparent hover:text-brand hover:border-line",
  // ปุ่ม LINE
  line: "bg-[#06C755] text-white border-[#06C755] hover:brightness-95",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: CommonProps &
  ({ href: string } & React.ComponentProps<typeof Link>)) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonEl({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
