"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PawPrint,
  Users,
} from "lucide-react";
import { logoutAction } from "@/app/actions/admin/auth";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/posts", icon: FileText, label: "Blog Posts" },
  { href: "/admin/case-studies", icon: BookOpen, label: "Case Studies" },
  { href: "/admin/subscribers", icon: Users, label: "Subscribers" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-cream-200 bg-white">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-cream-200 px-5 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-moss-500 text-gold-200">
          <PawPrint className="h-4.5 w-4.5" strokeWidth={2.4} />
        </span>
        <div className="leading-none">
          <p className="font-display text-sm font-bold text-moss-600">Mobile Vet</p>
          <p className="text-[10px] text-ink-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 p-3">
        {NAV.map(({ href, icon: Icon, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-moss-500 text-cream-50"
                  : "text-ink-500 hover:bg-moss-50 hover:text-moss-600"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-cream-200 p-3">
        <p className="truncate px-3 text-xs text-ink-400">{email}</p>
        <form action={logoutAction} className="mt-1">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
