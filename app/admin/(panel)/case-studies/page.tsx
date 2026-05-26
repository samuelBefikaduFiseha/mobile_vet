import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { deleteCaseStudyAction } from "@/app/actions/admin/case-study";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";

export const metadata: Metadata = { title: "Case Studies · Mobile Vet Admin" };

type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  region: string;
  region_tag: string | null;
  published: boolean;
  created_at: string;
};

async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("case_studies")
      .select("id, title, slug, region, region_tag, published, created_at")
      .order("created_at", { ascending: false });
    return (data as CaseStudy[]) ?? [];
  } catch {
    return [];
  }
}

export default async function CaseStudiesAdminPage() {
  const studies = await getCaseStudies();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-moss-600">Case Studies</h1>
          <p className="mt-1 text-sm text-ink-400">{studies.length} total</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="inline-flex items-center gap-2 rounded-full bg-gold-300 px-5 py-2.5 text-sm font-semibold text-moss-700 shadow-soft transition hover:bg-gold-400"
        >
          <Plus className="h-4 w-4" /> New Case Study
        </Link>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-500">
          Supabase is not configured. Case studies will appear here once the database is set up.
        </div>
      )}

      {studies.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-200 bg-white py-20 text-center">
          <p className="font-display text-lg font-semibold text-ink-400">No case studies yet</p>
          <p className="mt-1 text-sm text-ink-400">Add your first case study once pilots begin.</p>
          <Link
            href="/admin/case-studies/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-300 px-5 py-2.5 text-sm font-semibold text-moss-700"
          >
            <Plus className="h-4 w-4" /> Add Case Study
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50">
                {["Title", "Region", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {studies.map((s, i) => (
                <tr key={s.id} className={`border-b border-cream-100 ${i % 2 === 0 ? "bg-white" : "bg-cream-50/40"}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-moss-600 line-clamp-1">{s.title}</p>
                    <p className="text-xs font-mono text-ink-400">/case-studies/{s.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-semibold text-moss-600">
                      {s.region_tag ?? s.region}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${s.published ? "bg-moss-100 text-moss-600" : "bg-cream-200 text-ink-400"}`}>
                      {s.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-400 whitespace-nowrap">
                    {new Date(s.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <form action={deleteCaseStudyAction}>
                      <input type="hidden" name="id" value={s.id} />
                      <ConfirmDeleteButton
                        message="Delete this case study?"
                        className="rounded-lg px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Delete
                      </ConfirmDeleteButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
