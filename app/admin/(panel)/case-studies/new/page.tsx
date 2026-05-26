import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCaseStudyAction } from "@/app/actions/admin/case-study";

export const metadata: Metadata = { title: "New Case Study · Mobile Vet Admin" };

const inputClass =
  "w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm text-ink-500 placeholder:text-ink-300 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-200";
const labelClass = "mb-1.5 block text-sm font-semibold text-moss-600";

export default async function NewCaseStudyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/case-studies" className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-moss-600">
          <ArrowLeft className="h-4 w-4" /> Back to Case Studies
        </Link>
      </div>

      <h1 className="mb-6 font-display text-2xl font-bold text-moss-600">New Case Study</h1>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error === "missing" ? "Title, region, summary and body are required." : `Error: ${error}`}
        </div>
      )}

      <form action={createCaseStudyAction} className="max-w-3xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Title *</span>
            <input name="title" required placeholder="Case study title" className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Slug (auto-generated if blank)</span>
            <input name="slug" placeholder="borena-drought-pilot" className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Region * (e.g. Borena)</span>
            <input name="region" required placeholder="Borena" className={inputClass} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Region Tag (e.g. Borena Zone, Oromia)</span>
            <input name="region_tag" placeholder="Borena Zone, Oromia" className={inputClass} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Cover Image URL</span>
            <input name="cover_image" type="url" placeholder="https://images.unsplash.com/…" className={inputClass} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Summary * (shown in listing cards)</span>
            <textarea name="summary" required rows={3} placeholder="Short summary of the case study…" className={`${inputClass} resize-none`} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Body * (full case study content)</span>
            <textarea name="body" required rows={10} placeholder="Full case study content…" className={`${inputClass} resize-y`} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Testimonial Quote</span>
            <textarea name="testimonial_quote" rows={2} placeholder="Quote from a farmer or partner…" className={`${inputClass} resize-none`} />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Testimonial Author</span>
            <input name="testimonial_author" placeholder="Name, Role, Location" className={inputClass} />
          </label>
        </div>

        {/* Metrics */}
        <div>
          <p className={labelClass}>Metrics (up to 4)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex gap-2">
                <input name={`metric_value_${n}`} placeholder={`Value ${n} (e.g. 28%)`} className={`${inputClass} w-32 shrink-0`} />
                <input name={`metric_label_${n}`} placeholder={`Label ${n} (e.g. Mortality reduction)`} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-cream-200 bg-white px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink-500">
            <input type="checkbox" name="published" defaultChecked className="h-4 w-4 rounded accent-moss-500" />
            Publish immediately
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-gold-300 px-6 py-3 text-sm font-semibold text-moss-700 shadow-soft transition hover:bg-gold-400"
          >
            Save Case Study
          </button>
          <Link
            href="/admin/case-studies"
            className="rounded-full border border-cream-200 bg-white px-6 py-3 text-sm font-semibold text-ink-500 transition hover:bg-cream-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
