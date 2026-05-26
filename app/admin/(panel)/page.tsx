import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard · Mobile Vet Admin" };

async function getStats() {
  if (!isSupabaseConfigured()) return null;
  try {
    const db = createSupabaseAdminClient();
    const [posts, studies, subscribers, messages] = await Promise.all([
      db.from("posts").select("id, published", { count: "exact" }),
      db.from("case_studies").select("id", { count: "exact" }),
      db.from("subscribers").select("id", { count: "exact" }),
      db.from("contact_messages").select("id, status, full_name, email, organization, message, created_at").order("created_at", { ascending: false }).limit(5),
    ]);
    return {
      posts: posts.data ?? [],
      postCount: posts.count ?? 0,
      studyCount: studies.count ?? 0,
      subscriberCount: subscribers.count ?? 0,
      recentMessages: messages.data ?? [],
    };
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const STAT_CARDS = [
    {
      href: "/admin/posts",
      icon: FileText,
      label: "Blog Posts",
      value: stats?.postCount ?? "—",
      sub: stats ? `${stats.posts.filter((p) => p.published).length} published` : "Supabase not configured",
      color: "bg-moss-100 text-moss-500",
    },
    {
      href: "/admin/case-studies",
      icon: BookOpen,
      label: "Case Studies",
      value: stats?.studyCount ?? "—",
      sub: "Total",
      color: "bg-gold-100 text-gold-500",
    },
    {
      href: "/admin/subscribers",
      icon: Users,
      label: "Subscribers",
      value: stats?.subscriberCount ?? "—",
      sub: "Newsletter signups",
      color: "bg-earth-100 text-earth-400",
    },
    {
      href: "/admin/messages",
      icon: MessageSquare,
      label: "Messages",
      value: stats?.recentMessages?.length ?? "—",
      sub: "Recent 5 shown",
      color: "bg-cream-200 text-ink-400",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-moss-600">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-400">Welcome back. Here&apos;s what&apos;s happening.</p>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-500">
          <strong>Supabase not configured.</strong> Add{" "}
          <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> and{" "}
          <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to{" "}
          <code className="font-mono">.env.local</code> to enable data features.
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_CARDS.map(({ href, icon: Icon, label, value, sub, color }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-cream-200 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-display text-3xl font-bold text-moss-600">{value}</p>
            <p className="mt-0.5 text-sm font-semibold text-ink-500">{label}</p>
            <p className="mt-0.5 text-xs text-ink-400">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="mb-4 font-display text-base font-semibold text-moss-600">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-full bg-moss-500 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-soft transition hover:bg-moss-600"
          >
            <Plus className="h-4 w-4" /> New Blog Post
          </Link>
          <Link
            href="/admin/case-studies/new"
            className="inline-flex items-center gap-2 rounded-full bg-gold-300 px-5 py-2.5 text-sm font-semibold text-moss-700 shadow-soft transition hover:bg-gold-400"
          >
            <Plus className="h-4 w-4" /> New Case Study
          </Link>
        </div>
      </div>

      {/* Recent messages */}
      {stats?.recentMessages && stats.recentMessages.length > 0 && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-moss-600">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs font-semibold text-moss-400 hover:text-moss-600">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {stats.recentMessages.map((msg: { id: string; full_name: string; email: string; organization?: string | null; message: string; status: string; created_at: string }) => (
              <div key={msg.id} className="rounded-2xl border border-cream-200 bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-moss-600 text-sm truncate">{msg.full_name}</p>
                    <p className="text-xs text-ink-400 truncate">{msg.email} {msg.organization ? `· ${msg.organization}` : ""}</p>
                    <p className="mt-1 text-sm text-ink-500 line-clamp-2">{msg.message}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${msg.status === "new" ? "bg-gold-100 text-gold-500" : "bg-moss-100 text-moss-600"}`}>
                    {msg.status}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-ink-400">
                  {new Date(msg.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
