import type { Metadata } from "next";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Subscribers · Mobile Vet Admin" };

type Subscriber = {
  id: string;
  email: string;
  source: string | null;
  is_active: boolean;
  created_at: string;
};

async function getSubscribers(): Promise<Subscriber[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("subscribers")
      .select("id, email, source, is_active, created_at")
      .order("created_at", { ascending: false });
    return (data as Subscriber[]) ?? [];
  } catch {
    return [];
  }
}

export default async function SubscribersPage() {
  const subscribers = await getSubscribers();
  const active = subscribers.filter((s) => s.is_active).length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-moss-600">Subscribers</h1>
        <p className="mt-1 text-sm text-ink-400">
          {subscribers.length} total · {active} active
        </p>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-500">
          Supabase is not configured. Subscriber data will appear here once the database is set up.
        </div>
      )}

      {subscribers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-200 bg-white py-20 text-center">
          <p className="font-display text-lg font-semibold text-ink-400">No subscribers yet</p>
          <p className="mt-1 text-sm text-ink-400">Subscribers from the newsletter form will appear here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-cream-200 bg-cream-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Email</p>
            <div className="flex gap-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Source</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Status</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Joined</p>
            </div>
          </div>
          {subscribers.map((sub, i) => (
            <div
              key={sub.id}
              className={`flex items-center justify-between px-4 py-3 text-sm ${
                i % 2 === 0 ? "bg-white" : "bg-cream-50/40"
              } ${i < subscribers.length - 1 ? "border-b border-cream-100" : ""}`}
            >
              <span className="font-medium text-ink-500">{sub.email}</span>
              <div className="flex items-center gap-8">
                <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-semibold text-ink-400">
                  {sub.source ?? "blog"}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    sub.is_active
                      ? "bg-moss-100 text-moss-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {sub.is_active ? "Active" : "Unsubscribed"}
                </span>
                <span className="text-xs text-ink-400 whitespace-nowrap">
                  {new Date(sub.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
