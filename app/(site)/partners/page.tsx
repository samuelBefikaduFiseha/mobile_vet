import type { Metadata } from "next";
import {
  ArrowRight,
  Banknote,
  BookOpen,
  Building2,
  CheckCircle2,
  Globe2,
  HandHeart,
  HeartPulse,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Mobile Vet — we are seeking government agencies, NGOs, insurance companies, banks, veterinary clinics, and research institutions for our pilot phase.",
};

const PARTNER_TYPES = [
  {
    icon: Building2,
    title: "Government Institutions",
    subtitle: "Ministry of Agriculture · Regional Livestock Bureaus",
    body: "Government partners will gain real-time livestock data to inform policy, target interventions, and coordinate emergency responses. We are designing integrations with MoA disease reporting systems and regional extension worker networks.",
    benefits: [
      "Woreda-level livestock coverage dashboard",
      "Disease outbreak early warning feeds",
      "Extension worker reporting tools",
      "Data contribution to national livestock systems",
    ],
  },
  {
    icon: HandHeart,
    title: "NGOs & Development Partners",
    subtitle: "USAID · FAO · Mercy Corps · ICRC",
    body: "Development organisations will be able to target restocking programmes, track vaccination campaigns, and measure herd recovery after drought events — with verified digital records for donor reporting.",
    benefits: [
      "Verified beneficiary livestock records",
      "Vaccination campaign tracking",
      "Post-drought herd recovery monitoring",
      "Impact reporting dashboards for donors",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Insurance Companies",
    subtitle: "Livestock insurance · Index-based products",
    body: "Insurers will gain the digital identity and health records needed to price livestock risk accurately and pay claims faster. Index-based insurance products can be calibrated against our environmental risk signals.",
    benefits: [
      "Digital herd valuation data",
      "Environmental risk index integration",
      "Faster claim assessment with verified records",
      "Farmer onboarding via ear-tag registration",
    ],
  },
  {
    icon: Landmark,
    title: "Banks & Microfinance",
    subtitle: "Livestock-collateralised lending",
    body: "Financial institutions will be able to use verified livestock records to assess collateral value, reduce default risk, and extend credit to pastoralist farmers currently excluded from formal financial services.",
    benefits: [
      "Herd valuation scoring for loan officers",
      "Movement and health history reports",
      "Digital ownership verification",
      "Reduced livestock-collateral assessment cost",
    ],
  },
  {
    icon: HeartPulse,
    title: "Veterinary Clinics & Associations",
    subtitle: "Regional vet clinics · Associations · Universities",
    body: "Veterinary partners will access complete, up-to-date health records for every tagged animal, enabling faster diagnoses, better vaccination planning, and contribution to national disease surveillance.",
    benefits: [
      "Patient history at point of care via RFID scan",
      "Vaccination schedule reminders",
      "Disease outbreak alerts by region",
      "Integration with MoA surveillance systems",
    ],
  },
  {
    icon: BookOpen,
    title: "Research Institutions",
    subtitle: "Universities · Agricultural Research Institutes",
    body: "Academic and research partners will gain access to anonymised, geo-referenced livestock and environmental datasets for climate adaptation research, disease modelling, and pastoral livelihood studies.",
    benefits: [
      "Anonymised herd and health datasets",
      "Satellite + livestock data API access",
      "Co-development of ML prediction models",
      "Joint field studies and publications",
    ],
  },
];

export default function PartnersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-tibeb-pattern pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
              Seeking Partners
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-moss-600 text-balance sm:text-5xl lg:text-6xl">
              No single actor can solve this alone.
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-400 text-pretty">
              Protecting Ethiopia&apos;s livestock requires government, NGOs,
              insurers, lenders, vets, and farmers all working from the same
              trusted data. We are building the shared platform — and we are
              actively looking for the partners who will make it work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#partner-types" variant="primary" size="lg">
                Explore partner types
              </LinkButton>
              <LinkButton href="#become-partner" variant="secondary" size="lg">
                Get in touch
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PARTNER ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Partner Early"
            title="Shape the platform before it ships"
            description="Early partners influence what gets built, get priority access to pilot regions, and help establish the data standards the whole ecosystem will rely on."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                Icon: Globe2,
                title: "Co-design influence",
                body: "Early partners help define the data fields, access levels, and alert formats that will serve your organisation's specific needs — before the platform is locked in.",
              },
              {
                Icon: Banknote,
                title: "First-mover advantage",
                body: "The first insurer, bank, or NGO to integrate with Mobile Vet will have the deepest dataset and the longest track record when scaling to new regions.",
              },
              {
                Icon: CheckCircle2,
                title: "Shared impact evidence",
                body: "All partners co-author the field evidence that demonstrates the platform's value — creating a shared body of proof for funders, governments, and scale decisions.",
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft"
              >
                <Icon className="h-8 w-8 text-moss-400" />
                <h3 className="mt-4 font-display text-lg font-semibold text-moss-600">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER TYPES ── */}
      <section id="partner-types" className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Partner Types"
            title="A role for every stakeholder"
            description="Six partner categories — each with a clear contribution to the platform and specific benefits from joining the ecosystem."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {PARTNER_TYPES.map(({ icon: Icon, title, subtitle, body, benefits }) => (
              <article
                key={title}
                className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-moss-100 text-moss-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-moss-600">
                      {title}
                    </h3>
                    <p className="text-xs font-semibold text-gold-300 mt-0.5">
                      {subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">{body}</p>
                <ul className="mt-4 space-y-1.5">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-ink-500">
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-moss-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-tibeb-dark py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How to Partner"
            title="Four simple steps"
            description="We make it easy to get started — from first contact to onboarding onto the pilot."
            invert
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Reach out", body: "Fill in the contact form or email partnerships@mobilevet.et with your organisation type and area of interest." },
              { n: "02", title: "Discovery call", body: "We schedule a 30-minute call within two business days to understand your context and goals." },
              { n: "03", title: "Partnership design", body: "We co-design a partnership agreement, data-sharing protocol, and pilot scope together." },
              { n: "04", title: "Pilot onboarding", body: "Join the platform as an early partner in Borena, Afar, or the Somali Region in 2026." },
            ].map(({ n, title, body }) => (
              <div key={n} className="rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gold-300 font-display text-lg font-bold text-moss-700">
                  {n}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-cream-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="become-partner" className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                eyebrow="Get in Touch"
                title="Become a founding partner"
                align="left"
                description="We are actively seeking partners for our 2026 pilot phase in Borena, Afar, and the Somali Region. We respond within two business days."
              />
              <p className="mt-6 text-ink-400 leading-relaxed">
                Whether you are a government agency looking to strengthen
                livestock surveillance, an NGO preparing a restocking programme,
                an insurer exploring index-based products, or a researcher
                studying pastoral livelihoods — we want to hear from you.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Pilot partnerships open for Borena, Afar & Somali Region",
                  "Research collaboration and API access available",
                  "Co-design sessions for early institutional partners",
                  "All partnership proposals considered within 2 business days",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-ink-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-moss-400" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
