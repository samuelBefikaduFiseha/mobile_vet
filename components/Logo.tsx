import Link from "next/link";
import { PawPrint } from "lucide-react";

export function Logo({
  href = "/",
  size = "md",
  tone = "dark",
}: {
  href?: string;
  size?: "sm" | "md" | "lg";
  tone?: "dark" | "light";
}) {
  const sizes = {
    sm: { wrap: "h-9 w-9", text: "text-base", icon: 18 },
    md: { wrap: "h-11 w-11", text: "text-lg", icon: 22 },
    lg: { wrap: "h-14 w-14", text: "text-2xl", icon: 28 },
  } as const;
  const s = sizes[size];

  const text = tone === "dark" ? "text-moss-600" : "text-cream-50";
  const sub = tone === "dark" ? "text-ink-400" : "text-cream-100/80";

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3"
      aria-label="Mobile Vet home"
    >
      <span
        className={`${s.wrap} relative grid place-items-center rounded-2xl bg-gradient-to-br from-moss-500 to-moss-600 text-cream-50 shadow-soft transition-transform group-hover:scale-105`}
      >
        <PawPrint size={s.icon} strokeWidth={2.25} />
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded-full bg-ethiopia-accent" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`font-semibold ${s.text} font-[var(--font-display)] ${text}`}>
          Mobile Vet
        </span>
        <span className={`text-[11px] uppercase tracking-[0.18em] ${sub}`}>
          ሞባይል&nbsp;ቬት · Ethiopia
        </span>
      </span>
    </Link>
  );
}
