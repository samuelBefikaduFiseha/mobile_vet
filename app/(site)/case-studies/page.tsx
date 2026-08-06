import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Quote, Telescope, PenLine } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Impact stories and field evidence from Mobile Vet pilot programmes across Borena, Afar, and the Somali Region.",
};

type Metric = { value: string; label: string };

type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  region: string;
  region_tag: string | null;
  cover_image: string | null;
  summary: string;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  metrics: Metric[];
};

const STATIC_PILOTS = [];

function parseMetrics(raw: unknown): Metric[] {
  if (Array.isArray(raw)) return raw as Metric[];
  if (typeof raw === "string") {
    try { return JSON.parse(raw) as Metric[]; } catch { return []; }
  }
  return [];
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = await createSupabaseServerClient();
    const { data } = await db
      .from("case_studies")
      .select(
        "id, slug, title, region, region_tag, cover_image, summary, testimonial_quote, testimonial_author, metrics",
      )
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (!data) return [];
    return (data as CaseStudy[]).map((s) => ({ ...s, metrics: parseMetrics(s.metrics) }));
  } catch {
    return [];
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  const hasStudies = studies.length > 0;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-tibeb-pattern pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {hasStudies ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-moss-200/60 bg-moss-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-moss-500">
                Published Evidence
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                <Telescope className="h-3 w-3" /> Pilot Phase Coming
              </span>
            )}
            <h1 className="mt-4 font-display text-4xl font-bold text-moss-600 text-balance sm:text-5xl lg:text-6xl">
              {hasStudies
                ? "Evidence from the field."
                : "Three regions. Three entry points. One platform."}
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-400 text-pretty">
              {hasStudies
                ? `${studies.length} published ${studies.length === 1 ? "case study" : "case studies"} from our pilot programmes across Borena, Afar, and the Somali Region. Real outcomes from real communities.`
                : "We are in active development. These are the three pilot regions we are designing for — each addressing a different entry point into the livestock protection problem. Case studies will be published here as pilots complete."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/partners" variant="primary" size="lg">
                {hasStudies ? "Become a partner" : "Become a pilot partner"}
              </LinkButton>
              <LinkButton href="/#contact" variant="secondary" size="lg">
                Get in touch
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {hasStudies ? (
        /* ── PUBLISHED CASE STUDIES ── */
        <section className="bg-cream-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
            {studies.map((study, i) => (
              <article
                key={study.id}
                className="grid gap-12 lg:grid-cols-2 lg:items-start"
              >
                {/* Image */}
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-moss-300/25 via-gold-200/25 to-[#c1272d]/10 blur-2xl" />
                  {study.cover_image ? (
                    <Image
                      src={study.cover_image}
                      alt={study.region_tag ?? study.region}
                      width={1200}
                      height={800}
                      className="relative aspect-[4/3] rounded-3xl object-cover shadow-lift"
                    />
                  ) : (
                    <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-moss-100 to-moss-200 shadow-lift flex items-center justify-center">
                      <span className="font-display text-6xl font-bold text-moss-300">
                        {study.region[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1.5 text-xs font-semibold text-moss-600 shadow-soft">
                    <MapPin className="h-3 w-3" /> {study.region_tag ?? study.region}
                  </div>
                </div>

                {/* Content */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="rounded-full bg-moss-100 px-3 py-1 text-xs font-semibold text-moss-600">
                    {study.region}
                  </span>
                  <h2 className="mt-4 font-display text-2xl font-bold text-moss-600 text-balance sm:text-3xl">
                    {study.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">{study.summary}</p>

                  {/* Metrics */}
                  {study.metrics?.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {study.metrics.slice(0, 4).map(({ value, label }) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-cream-200 bg-white p-4 text-center shadow-soft"
                        >
                          <p className="font-display text-2xl font-bold text-gold-400">{value}</p>
                          <p className="mt-1 text-xs leading-tight text-ink-400">{label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Testimonial */}
                  {study.testimonial_quote && (
                    <blockquote className="mt-6 rounded-2xl border border-gold-200/60 bg-gold-50 px-5 py-4">
                      <Quote className="h-5 w-5 text-gold-300 mb-2" />
                      <p className="text-sm leading-relaxed text-ink-500 italic">
                        {study.testimonial_quote}
                      </p>
                      {study.testimonial_author && (
                        <footer className="mt-2 text-xs font-semibold text-moss-500">
                          — {study.testimonial_author}
                        </footer>
                      )}
                    </blockquote>
                  )}

                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss-500 px-5 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-moss-600"
                  >
                    Read full study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* ── COMING SOON BANNER ── */}
          <section className="bg-moss-500 py-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-cream-50">
                  <PenLine className="h-5 w-5 shrink-0 text-gold-200" />
                  <p className="text-sm font-semibold">
                    Posts are coming soon — subscribe to get them first.
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  <NewsletterForm compact />
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <section className="bg-tibeb-dark py-20 text-cream-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Be Part of the Evidence"
            title="Pilot partnerships open for 2026"
            description="We are actively seeking government agencies, NGOs, insurance companies, and veterinary organisations to co-design and co-implement our first pilots."
            invert
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/partners" variant="primary" size="lg">
              View partner types
            </LinkButton>
            <LinkButton href="/#contact" variant="ghost" size="lg">
              Contact us
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
