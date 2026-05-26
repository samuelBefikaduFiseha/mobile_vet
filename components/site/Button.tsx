import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold-300 text-moss-700 hover:bg-gold-400 hover:text-cream-50 shadow-soft",
  secondary:
    "bg-moss-500 text-cream-50 hover:bg-moss-600 shadow-soft",
  ghost:
    "border border-white/40 text-cream-50 hover:bg-white hover:text-moss-600",
  light:
    "bg-cream-50 text-moss-600 hover:bg-cream-100 shadow-soft",
};

type CommonProps = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
};

const sizeClass = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ${VARIANTS[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "children" | "className"
  >) {
  return (
    <Link
      href={href}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition ${VARIANTS[variant]} ${sizeClass[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
