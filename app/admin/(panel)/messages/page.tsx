import type { Metadata } from "next";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Messages · Mobile Vet Admin" };

type Message = {
  id: string;
  full_name: string;
  email: string;
  organization: string | null;
  message: string;
  status: string;
  created_at: string;
};

async function getMessages(): Promise<Message[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("contact_messages")
      .select("id, full_name, email, organization, message, status, created_at")
      .order("created_at", { ascending: false });
    return (data as Message[]) ?? [];
  } catch {
    return [];
  }
}

export default async function MessagesPage() {
  const messages = await getMessages();
  const newCount = messages.filter((m) => m.status === "new").length;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-moss-600">Contact Messages</h1>
        <p className="mt-1 text-sm text-ink-400">
          {messages.length} total · {newCount} new
        </p>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-500">
          Supabase is not configured. Messages from the contact form will appear here once the database is set up.
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-200 bg-white py-20 text-center">
          <p className="font-display text-lg font-semibold text-ink-400">No messages yet</p>
          <p className="mt-1 text-sm text-ink-400">Messages from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-2xl border border-cream-200 bg-white p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display font-semibold text-moss-600">{msg.full_name}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-ink-400">
                    <a href={`mailto:${msg.email}`} className="hover:text-moss-600 underline underline-offset-2">
                      {msg.email}
                    </a>
                    {msg.organization && (
                      <>
                        <span>·</span>
                        <span>{msg.organization}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-semibold ${
                      msg.status === "new"
                        ? "bg-gold-100 text-gold-500"
                        : "bg-moss-100 text-moss-600"
                    }`}
                  >
                    {msg.status}
                  </span>
                  <span className="text-xs text-ink-400">
                    {new Date(msg.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{msg.message}</p>
              <div className="mt-3">
                <a
                  href={`mailto:${msg.email}?subject=Re: Your message to Mobile Vet`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-moss-100 px-4 py-1.5 text-xs font-semibold text-moss-600 transition hover:bg-moss-500 hover:text-cream-50"
                >
                  Reply via email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
