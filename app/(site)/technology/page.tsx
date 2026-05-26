import type { Metadata } from "next";
import Image from "next/image";
import {
  BrainCircuit,
  CheckCircle2,
  Database,
  Landmark,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  Tag,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Explore the technology behind Mobile Vet — RFID-GPS ear tags, machine learning, veterinary traceability, and SMS/USSD alert delivery.",
};

const PILLARS = [
  {
    icon: Tag,
    title: "Smart RFID-GPS Ear Tags",
    body: "Each animal receives a tamper-evident RFID-GPS ear tag that creates a unique digital identity. The tag stores ownership details, GPS location, movement history, vaccination records, and treatment logs — giving vets and insurers a complete, verifiable profile for every animal.",
    highlights: [
      "Unique animal ID linked to owner profile",
      "Real-time GPS location and movement history",
      "Tamper-evident hardware design",
      "Compatible with standard RFID readers used by vets",
    ],
    status: "In Development",
  },
  {
    icon: BrainCircuit,
    title: "Predictive Analytics & ML",
    body: "We are building machine learning models that analyse environmental and livestock data to identify early signatures of drought stress and disease risk — issuing warnings weeks before visible symptoms appear. Models will be trained on historical satellite data and calibrated with local veterinary field data.",
    highlights: [
      "Drought risk classification per woreda",
      "Vegetation anomaly detection (NDVI-based)",
      "Herd-level health score generation",
      "Continuously retrained on incoming field data",
    ],
    status: "In Development",
  },
  {
    icon: Smartphone,
    title: "SMS & USSD Delivery",
    body: "All farmer-facing alerts, vaccination reminders, and grazing advisories are delivered via SMS and USSD — ensuring farmers in areas without smartphones or internet still receive timely guidance. The interface will support Amharic, Afaan Oromo, and Somali from day one.",
    highlights: [
      "Works on any basic mobile phone",
      "Multi-language: Amharic, Afaan Oromo, Somali",
      "Two-way USSD for farmer herd status reporting",
      "Designed for 2G networks and sub-1 KB payloads",
    ],
    status: "Designing",
  },
  {
    icon: ShieldCheck,
    title: "Veterinary Traceability",
    body: "Every vaccination, treatment, and health observation will be recorded against the animal's digital ear tag ID. Veterinary clinics, Ministry of Agriculture extension workers, and research institutes will all contribute to — and benefit from — a shared traceability system.",
    highlights: [
      "Complete treatment history per animal",
      "Vaccination certificate generation",
      "Disease reporting linked to Ministry of Agriculture",
      "Export-ready records for insurance and bank partners",
    ],
    status: "Designing",
  },
  {
    icon: Landmark,
    title: "Financial Inclusion Layer",
    body: "Verified digital livestock records — shared with farmer consent — will enable banks and microfinance institutions to assess livestock as loan collateral, and insurers to price livestock risk accurately. This is a future layer built on the foundation of reliable digital identity.",
    highlights: [
      "Secure, consent-based data sharing with partners",
      "Herd valuation scoring for loan officers",
      "Insurance risk assessment reporting",
      "Farmer-controlled data consent system",
    ],
    status: "Planned",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    body: "The platform is being built on a Supabase Postgres backend with PostGIS extensions for geospatial queries. A Next.js web dashboard will serve vets, government officials, and NGO partners, while the farmer-facing interface is optimised for USSD and SMS channels.",
    highlights: [
      "PostGIS geospatial data layer",
      "Role-based access: farmer, vet, admin, insurer",
      "Offline-sync architecture for field data collection",
      "Open API for government and research integrations",
    ],
    status: "In Development",
  },
];

const DATA_PLANNED = [
  { label: "NASA MODIS", category: "Satellite (planned)", desc: "Land surface temperature & vegetation indices" },
  { label: "CHIRPS", category: "Satellite (planned)", desc: "Rainfall estimates at 5km resolution" },
  { label: "ESA Copernicus", category: "Satellite (planned)", desc: "Soil moisture & land cover data" },
  { label: "Ethiopian MoA", category: "Government (planned)", desc: "Livestock census & disease outbreak records" },
  { label: "Vet Clinics", category: "Field (planned)", desc: "Vaccination & treatment records via our portal" },
  { label: "Farmer USSD", category: "Field (planned)", desc: "Real-time herd status reports from farmers" },
  { label: "RFID-GPS Tags", category: "Hardware (building)", desc: "Animal GPS location & movement data" },
  { label: "FEWS NET", category: "Advisory (planned)", desc: "Famine early warning system indicators" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Development": "bg-moss-100 text-moss-600",
  "Designing": "bg-gold-100 text-gold-500",
  "Planned": "bg-cream-200 text-ink-400",
};

export default function TechnologyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-tibeb-dark pt-28 pb-20 sm:pt-36 sm:pb-28 text-cream-50">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700 via-moss-600 to-moss-500"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
              Under Development
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-cream-50 text-balance sm:text-5xl lg:text-6xl">
              Technology designed for the realities of pastoral Ethiopia.
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-300 via-gold-300 to-[#c1272d]"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-cream-100/85 text-pretty">
              From RFID-GPS ear tags in the field to SMS alerts on a Nokia 105 —
              we are building a six-layer technology stack that delivers early
              warnings and veterinary traceability to the people who need it most.
              Here is what we are building and why.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/#contact" variant="primary" size="lg">
                Partner with us
              </LinkButton>
              <LinkButton href="/platform" variant="ghost" size="lg">
                See the platform
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="System Design"
            title="From ear tag to SMS alert"
            description="Five processing stages will convert raw GPS pings and environmental signals into actionable messages in under 30 minutes."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-5">
            {[
              { n: "01", label: "Collect", desc: "RFID-GPS tags + USSD farmer reports + environmental data" },
              { n: "02", label: "Ingest", desc: "PostGIS pipeline processes and geo-references incoming data" },
              { n: "03", label: "Analyse", desc: "ML models score drought and disease risk per woreda" },
              { n: "04", label: "Alert", desc: "Risk thresholds trigger targeted notification queue" },
              { n: "05", label: "Deliver", desc: "SMS / USSD in Amharic, Afaan Oromo, or Somali" },
            ].map(({ n, label, desc }, i, arr) => (
              <div key={n} className="relative flex flex-col items-center text-center">
                {i < arr.length - 1 && (
                  <span
                    className="pointer-events-none absolute right-0 top-7 hidden h-0.5 w-1/2 bg-gradient-to-r from-gold-300/60 to-transparent sm:block"
                    aria-hidden
                  />
                )}
                <div className="grid h-14 w-14 place-items-center rounded-full bg-moss-500 font-display text-lg font-bold text-gold-200 shadow-soft">
                  {n}
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-moss-600">
                  {label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH PILLARS ── */}
      <section className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We're Building"
            title="Six layers of livestock protection"
            description="Each layer is designed to work independently and together — so progress on one creates immediate value, and all layers compound as the platform matures."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {PILLARS.map(({ icon: Icon, title, body, highlights, status }) => (
              <article
                key={title}
                className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft"
              >
                <div className="flex items-start gap-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-moss-100 text-moss-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-moss-600">
                        {title}
                      </h3>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[status]}`}>
                        {status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-400">
                      {body}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-ink-500">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-moss-400" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA SOURCES PLANNED ── */}
      <section className="bg-tibeb-dark py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Data Sources"
            title="What we will integrate"
            description="We are designing the platform to ingest eight data sources. We are actively building the hardware and field data layers first, with satellite integrations following."
            invert
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DATA_PLANNED.map(({ label, category, desc }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              >
                <span className="inline-block rounded-full bg-gold-300/20 px-2.5 py-1 text-xs font-semibold text-gold-200">
                  {category}
                </span>
                <p className="mt-3 font-display text-base font-semibold text-cream-50">
                  {label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-cream-100/70">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MVP APPROACH ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="MVP Approach"
                title="Start simple. Validate fast."
                align="left"
              />
              <p className="mt-6 leading-relaxed text-ink-400">
                Our MVP prioritises the three components with the highest
                immediate impact: the RFID-GPS ear tag for animal identity,
                a basic USSD herd reporting channel, and SMS early warning
                alerts triggered by environmental risk signals.
              </p>
              <p className="mt-4 leading-relaxed text-ink-400">
                Before scaling, we will validate alert accuracy with local
                veterinary extension workers and calibrate our models with
                community feedback — ensuring the technology is trusted before
                it is deployed at scale.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Hardware (RFID tags) and field data first — complex integrations later",
                  "Alerts co-validated with veterinary extension workers",
                  "Amharic-first interface for all farmer-facing features",
                  "Works on 2G networks with minimal data requirements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-500">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss-400" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-gold-200/30 to-moss-200/30 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
                alt="Technology development"
                width={1200}
                height={900}
                className="relative rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden bg-moss-500 py-20 text-cream-50">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700 via-moss-500 to-moss-400"
          aria-hidden
        />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <MessageSquareText className="mx-auto h-12 w-12 text-gold-200" />
          <h2 className="mt-4 font-display text-3xl font-bold text-cream-50 sm:text-4xl">
            Technical partnership or research collaboration?
          </h2>
          <p className="mt-4 text-cream-100/85">
            We are open to co-development with universities, technology
            institutions, and research organisations working on climate
            adaptation, livestock systems, or agricultural data.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/#contact" variant="primary" size="lg">
              Start a conversation
            </LinkButton>
            <LinkButton href="/platform" variant="ghost" size="lg">
              View the platform
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
