"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, PawPrint, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/technology", label: "Technology" },
  { href: "/partners", label: "Partners" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/platform", label: "Platform" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "glass shadow-[0_2px_20px_rgba(20,37,7,0.10)]"
          : "bg-cream-50/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Mobile Vet — Home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-moss-500 text-gold-200 shadow-soft">
            <PawPrint className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-moss-600">
              Mobile Vet
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-ink-400">
              ሞባይል ቬት · Ethiopia
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-moss-500 text-cream-50"
                    : "text-ink-500 hover:bg-moss-100/70 hover:text-moss-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-gold-300 px-4 py-2 text-sm font-semibold text-moss-700 shadow-soft transition hover:bg-gold-400 hover:text-cream-50"
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-moss-100 bg-cream-50 text-moss-600 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cream-200 bg-cream-50/95 backdrop-blur lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-xl px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-moss-500 text-cream-50"
                      : "text-ink-500 hover:bg-moss-100/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gold-300 px-4 py-2.5 text-sm font-semibold text-moss-700"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
