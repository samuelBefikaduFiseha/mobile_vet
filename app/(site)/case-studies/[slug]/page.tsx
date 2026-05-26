import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Quote } from "lucide-react";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LinkButton } from "@/components/site/Button";

type Props = { params: Promise<{ slug: string }> };

type Metric = { value: string; label: string };

type CaseStudy = {
  title: string;
  slug: string;
  region: string;
  region_tag: string | null;
  cover_image: string | null;
  summary: string;
  body: string;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  metrics: Metric[];
  report_url: string | null;
};

function parseMetrics(raw: unknown): Metric[] {
  if (Array.isArray(raw)) return raw as Metric[];
  if (typeof raw === "string") {
    try { return JSON.parse(raw) as Metric[]; } catch { return []; }
  }
  return [];
}

async function getStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const db = await createSupabaseServerClient();
    const { data } = await db
      .from("case_studies")
      .select(
        "title, slug, region, region_tag, cover_image, summary, body, testimonial_quote, testimonial_author, metrics, report_url",
      )
      .eq("slug", slug)
      .eq("published", true)
      .single();
    if (!data) return null;
    const study = data as CaseStudy;
    return { ...study, metrics: parseMetrics(study.metrics) };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getStudy(slug);
  if (!study) notFound();

  const paragraphs = study.body.split(/\n\n+/).filter(Boolean);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-tibeb-pattern pt-28 pb-12 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-moss-500 transition hover:text-moss-600"
          >
            <ArrowLeft className="h-4 w-4" /> All Case Studies
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3.5 w-3.5 text-moss-400" />
                <span className="font-semibold text-moss-500">
                  {study.region_tag ?? study.region}
                </span>
              </div>
              <h1 className="mt-3 font-display text-3xl font-bold text-moss-600 text-balance sm:text-4xl lg:text-5xl">
                {study.title}
              </h1>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]" />
              <p className="mt-5 text-lg leading-relaxed text-ink-400">{study.summary}</p>
            </div>

            {/* Metrics hero grid */}
            {study.metrics?.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {study.metrics.slice(0, 4).map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-cream-200 bg-white p-6 text-center shadow-soft"
                  >
                    <p className="font-display text-3xl font-bold text-gold-400 sm:text-4xl">
                      {value}
                    </p>
                    <p className="mt-2 text-xs leading-tight text-ink-400">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      {study.cover_image && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={study.cover_image}
              alt={study.region_tag ?? study.region}
              fill
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <section className={`pb-20 ${!study.cover_image ? "pt-12" : ""}`}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-ink-500">
                {para}
              </p>
            ))}
          </div>

          {/* Testimonial */}
          {study.testimonial_quote && (
            <blockquote className="mt-12 rounded-3xl border border-gold-200/60 bg-gold-50 p-8">
              <Quote className="h-8 w-8 text-gold-300 mb-3" />
              <p className="font-display text-lg font-medium leading-relaxed text-ink-600 italic">
                {study.testimonial_quote}
              </p>
              {study.testimonial_author && (
                <footer className="mt-4 text-sm font-semibold text-moss-500">
                  — {study.testimonial_author}
                </footer>
              )}
            </blockquote>
          )}

          {/* Report download */}
          {study.report_url && (
            <div className="mt-8">
              <a
                href={study.report_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-moss-300 px-5 py-2.5 text-sm font-semibold text-moss-600 transition hover:bg-moss-50"
              >
                Download full report <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-tibeb-dark py-16 text-cream-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-display text-2xl font-bold text-cream-50 sm:text-3xl">
            Want to replicate these outcomes?
          </p>
          <p className="mt-3 text-cream-100/80">
            We are actively seeking partners for our 2026 pilot expansion. Government agencies,
            NGOs, insurers, and veterinary organisations are all welcome.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/partners" variant="primary" size="lg">
              Become a partner
            </LinkButton>
            <LinkButton href="/case-studies" variant="ghost" size="lg">
              All case studies
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
