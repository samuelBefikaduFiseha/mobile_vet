import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, MapPin, Quote, Telescope } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";
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

const STATIC_PILOTS = [
  {
    region: "Borena Zone, Oromia",
    title: "Drought Early Warning & Herd Protection",
    focus: "Early Warning",
    tags: ["High Priority", "Drought Response", "Pastoralist"],
    image: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=1200&q=80",
    context:
      "Borena Zone experienced one of its worst droughts in recent memory, causing devastating livestock losses and displacement of pastoralist communities. The zone is our highest-priority pilot site because the urgency is highest and the need for early warning is most acute.",
    pilotGoal:
      "Deploy RFID-GPS ear tags and SMS/USSD early warning alerts to a community of 50–100 enrolled farmers. Validate that satellite-derived drought risk signals can reach farmers via basic mobile phones with enough lead time to act.",
    expectedOutcomes: [
      "Early warning lead time of 14+ days before visible pasture stress",
      "Farmer alert response rate of 70%+",
      "Reduction in drought-related mortality in enrolled households",
      "Baseline digital herd records for 1,000+ animals",
    ],
  },
  {
    region: "Afar Region",
    title: "Digital Livestock Identity & Veterinary Traceability",
    focus: "Digital Identity",
    tags: ["Traceability", "Vet Records", "Market Access"],
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80",
    context:
      "Afar Region hosts large livestock market networks but lacks any digital identity system for animals. Theft, disease transmission across market boundaries, and the absence of ownership verification are all problems that digital traceability can directly address.",
    pilotGoal:
      "Pilot RFID ear tag deployment at two livestock market entry points in Afar Region, in partnership with the regional veterinary service. Create verifiable digital profiles for animals at the point of sale.",
    expectedOutcomes: [
      "100% of tagged animals with complete ownership records",
      "Veterinary records accessible at point of care via RFID scan",
      "Disease outbreak tracing time reduced from days to hours",
      "Foundation for livestock collateral documentation for banks",
    ],
  },
  {
    region: "Somali Region",
    title: "Financial Inclusion via Livestock Insurance",
    focus: "Financial Inclusion",
    tags: ["Insurance", "Credit", "Mobile First"],
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80",
    context:
      "The Somali Region has large pastoralist populations with near-zero insurance penetration. Mobile phone usage is high, making it ideal for testing USSD-based insurance products. Verified digital livestock records are the missing link that insurers need to offer products at scale.",
    pilotGoal:
      "Partner with an insurance provider to co-design an index-based livestock insurance product calibrated to our environmental risk signals. Test USSD-based premium collection and automated claim triggering.",
    expectedOutcomes: [
      "First index-based livestock insurance product in the region",
      "USSD-based premium collection and claim notification",
      "Claim processing time under 72 hours from trigger event",
      "Trust baseline established for future credit products",
    ],
  },
];

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
        /* ── STATIC PLANNED PILOTS ── */
        <section className="bg-cream-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
            {STATIC_PILOTS.map((pilot, i) => (
              <article
                key={pilot.region}
                className="grid gap-12 lg:grid-cols-2 lg:items-start"
              >
                <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-moss-300/25 via-gold-200/25 to-earth-200/25 blur-2xl" />
                  <Image
                    src={pilot.image}
                    alt={pilot.region}
                    width={1200}
                    height={800}
                    className="relative aspect-[4/3] rounded-3xl object-cover shadow-lift"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1.5 text-xs font-semibold text-moss-600 shadow-soft">
                    <MapPin className="h-3 w-3" /> {pilot.region}
                  </div>
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="flex flex-wrap gap-2">
                    {pilot.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-moss-100 px-3 py-1 text-xs font-semibold text-moss-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-moss-600 text-balance sm:text-3xl">
                    {pilot.title}
                  </h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-300">
                    Planned Pilot · {pilot.focus}
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-300">
                        Context
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-400">{pilot.context}</p>
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-300">
                        Pilot Goal
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-ink-400">{pilot.pilotGoal}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-moss-400">
                      Expected Outcomes
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {pilot.expectedOutcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-sm text-ink-500">
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-moss-400" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
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
