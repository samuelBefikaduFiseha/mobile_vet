import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  Bell,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Cloud,
  Globe2,
  Landmark,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Radio,
  Satellite,
  ShieldCheck,
  Smartphone,
  Sun,
  Tag,
  Bug,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";
import { ContactForm } from "@/components/site/ContactForm";

const PROBLEMS = [
  {
    icon: Sun,
    title: "Recurring Droughts",
    body:
      "Climate change and erratic rainfall patterns cause massive livestock deaths and displacement, as seen recently in Borena.",
  },
  {
    icon: Bug,
    title: "Disease Outbreaks",
    body:
      "Limited veterinary access and poor traceability allow diseases to spread rapidly through herds with devastating economic impact.",
  },
  {
    icon: Tag,
    title: "No Digital Identity",
    body:
      "Animals lack reliable identification and health records, preventing farmers from accessing insurance and financial services.",
  },
  {
    icon: Banknote,
    title: "Financial Exclusion",
    body:
      "Banks and insurers cannot assess livestock value or risk, leaving pastoralists without collateral-based loans or insurance.",
  },
];

const FEATURES = [
  {
    icon: Satellite,
    title: "Geospatial Intelligence",
    body:
      "Integration of temperature, humidity, rainfall, vegetation and drought indicators using QGIS and satellite analysis.",
  },
  {
    icon: BrainCircuit,
    title: "Predictive Analytics",
    body:
      "Machine learning algorithms analyse historical and real-time data to predict disease outbreaks and environmental threats.",
  },
  {
    icon: Tag,
    title: "Smart RFID-GPS Tags",
    body:
      "Digital identity for each animal enabling real-time tracking, ownership verification and complete veterinary traceability.",
  },
  {
    icon: Smartphone,
    title: "SMS & USSD Alerts",
    body:
      "Timely warnings, vaccination reminders and grazing advisories delivered via basic mobile phones for universal accessibility.",
  },
  {
    icon: ShieldCheck,
    title: "Early Warning System",
    body:
      "Risk assessments and proactive alerts help farmers and vets take preventive action before livestock losses occur.",
  },
  {
    icon: Landmark,
    title: "Financial Inclusion",
    body:
      "Trusted digital records enable banks to provide livestock-collateralised loans and insurers to offer tailored products.",
  },
];

const STEPS = [
  {
    n: 1,
    title: "Tag & Identify",
    body:
      "Each animal receives a smart RFID-GPS ear tag creating a unique digital profile with ownership and health history.",
  },
  {
    n: 2,
    title: "Monitor & Collect",
    body:
      "Satellite data and field reports feed into the platform, tracking environment, health and movement patterns.",
  },
  {
    n: 3,
    title: "Predict & Alert",
    body:
      "ML models identify risks and send early warnings via SMS/USSD to farmers and veterinary professionals.",
  },
  {
    n: 4,
    title: "Protect & Finance",
    body:
      "Verified records unlock insurance and credit services while preventive action reduces livestock losses.",
  },
];

const STATS = [
  { value: "45%", label: "of Agricultural GDP from Livestock" },
  { value: "Millions", label: "Pastoralists Dependent on Herds" },
  { value: "100%", label: "Digital Traceability Per Animal" },
  { value: "24/7", label: "Real-time Monitoring & Alerts" },
];

const REGIONS = [
  {
    name: "Borena Zone",
    body:
      "Recently affected by severe drought causing massive livestock losses. High urgency for early warning systems and restocking support.",
    tags: ["High Priority", "Pastoralist"],
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Afar Region",
    body:
      "Arid and semi-arid lands with significant livestock populations. Strong need for drought prediction and veterinary traceability.",
    tags: ["Arid Climate", "Scale Potential"],
    image:
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Somali Region",
    body:
      "Large pastoralist communities with limited financial inclusion. Ideal for testing insurance and credit linkage models.",
    tags: ["Financial Inclusion", "Mobile First"],
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ──────────── HERO ──────────── */}
      <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36">
        <Image
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=80"
          alt="Pastoralist landscape in Ethiopia"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700/85 via-moss-500/80 to-earth-300/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
              ሞባይል ቬት · Mobile Vet
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-cream-50 text-balance sm:text-5xl lg:text-6xl">
              Protecting Ethiopia&apos;s livestock,
              <br className="hidden sm:block" /> securing pastoralist futures.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-100/90 text-pretty sm:text-lg">
              Satellite intelligence, smart RFID-GPS ear tags and SMS/USSD
              alerts that help pastoralist families protect their animals and
              livelihoods — before disaster strikes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#solution" variant="primary" size="lg">
                Explore the platform <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="#contact" variant="ghost" size="lg">
                <Mail className="h-4 w-4" /> Partner with us
              </LinkButton>
            </div>

            <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-6 text-cream-50">
              {[
                ["12,400+", "Animals tagged"],
                ["3,200+", "Households reached"],
                ["3", "Pilot regions"],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl font-bold text-gold-200 sm:text-3xl">
                    {value}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-cream-100/80">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ──────────── PROBLEM ──────────── */}
      <section id="problem" className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Challenge"
            title="Ethiopia's livestock sector faces critical threats"
            description="Recurring droughts, disease outbreaks and a lack of digital records put millions of pastoralist livelihoods at risk every year."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-3xl border border-cream-200 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-moss-100 text-moss-500 transition group-hover:bg-gold-300 group-hover:text-moss-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-moss-600">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── SOLUTION ──────────── */}
      <section
        id="solution"
        className="bg-tibeb-pattern py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Solution"
            title="A complete digital ecosystem for livestock management"
            description="Mobile Vet integrates geospatial intelligence, predictive analytics and digital traceability — designed for the realities of remote pastoralist life."
          />

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-moss-300/40 via-gold-200/40 to-earth-200/40 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80"
                alt="Ethiopian pastoralists with their cattle"
                width={1200}
                height={900}
                className="relative rounded-3xl object-cover shadow-lift"
              />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-moss-600 sm:text-3xl">
                Bridging satellites and pastoralists.
              </h3>
              <p className="mt-3 text-ink-400">
                Mobile Vet creates secure digital profiles for every animal
                using smart RFID-GPS ear tags, combined with satellite data and
                machine learning to predict threats before they become crises.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Real-time livestock identification and movement tracking",
                  "Satellite-based drought and vegetation monitoring",
                  "ML-powered disease outbreak prediction",
                  "SMS/USSD alerts for basic mobile phones",
                  "Verified digital records for banks and insurers",
                  "QGIS geospatial analysis integration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-500">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LinkButton href="#features" variant="primary">
                  See features <ArrowDown className="h-4 w-4" />
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── FEATURES ──────────── */}
      <section
        id="features"
        className="bg-tibeb-dark py-20 text-cream-50 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform Features"
            title="Built for pastoralist realities"
            description="Designed for low-connectivity environments without compromising on predictive power."
            invert
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="group rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur transition hover:-translate-y-1 hover:border-gold-200/40 hover:bg-white/[0.10]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-300 text-moss-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-cream-50">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/80">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── HOW IT WORKS ──────────── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How It Works"
            title="From field data to financial inclusion"
            description="Four simple steps connect satellite signals to actionable advice on a Nokia."
          />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ n, title, body }, i) => (
              <li key={n} className="relative">
                {i < STEPS.length - 1 ? (
                  <span
                    className="pointer-events-none absolute left-1/2 top-7 hidden h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-gold-300/70 to-transparent lg:block"
                    aria-hidden
                  />
                ) : null}
                <div className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-moss-500 font-display text-xl font-bold text-gold-200 shadow-soft">
                  {n}
                </div>
                <h3 className="mt-5 text-center font-display text-lg font-semibold text-moss-600">
                  {title}
                </h3>
                <p className="mt-2 text-center text-sm leading-relaxed text-ink-400">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ──────────── STATS ──────────── */}
      <section className="relative isolate overflow-hidden bg-moss-500 py-16 text-cream-50">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700 via-moss-500 to-moss-400"
          aria-hidden
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-4xl font-bold text-gold-200 sm:text-5xl">
                {value}
              </p>
              <p className="mt-2 text-sm text-cream-100/85">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────── REGIONS ──────────── */}
      <section id="regions" className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Target Regions"
            title="Where we&apos;re piloting"
            description="Strategic pilot regions for initial deployment and community engagement."
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {REGIONS.map((r) => (
              <article
                key={r.name}
                className="group overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50/95 px-3 py-1 text-xs font-semibold text-moss-600">
                    <MapPin className="h-3 w-3" /> {r.name}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-ink-400">
                    {r.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-moss-100 px-3 py-1 text-xs font-semibold text-moss-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CONTACT ──────────── */}
      <section id="contact" className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get In Touch"
            title="Partner with us"
            description="Whether you&apos;re a government agency, NGO, insurer or veterinary clinic, we&apos;d love to explore how Mobile Vet can work for your communities."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold text-moss-600">
                Start the conversation
              </h3>
              <p className="mt-3 text-ink-400">
                We respond within two business days. Pilot partnerships open for
                Borena, Afar and the Somali Region in 2026 — 2027.
              </p>
              <ul className="mt-6 space-y-3 text-ink-500">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold-300" />
                  <a
                    href="mailto:partnerships@mobilevet.et"
                    className="hover:text-moss-600"
                  >
                    partnerships@mobilevet.et
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold-300" />
                  <a href="tel:+251996995878" className="hover:text-moss-600">
                    +251 996 995 878
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold-300" />
                  <span>Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold-300" />
                  <span>Mon — Fri · 8:00 AM — 5:00 PM EAT</span>
                </li>
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { Icon: Cloud, label: "Satellite & QGIS" },
                  { Icon: Radio, label: "SMS · USSD · Voice" },
                  { Icon: Globe2, label: "Multilingual" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm text-ink-500"
                  >
                    <Icon className="h-4 w-4 text-moss-500" /> {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-cream-200 bg-white p-7 shadow-soft">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Featured callouts */}
      <section className="bg-cream-50 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              Icon: Bell,
              title: "Latest stories",
              body: "Field reports, technology updates and pastoralist research.",
              href: "/blog",
              cta: "Read the blog",
            },
            {
              Icon: ShieldCheck,
              title: "Case studies",
              body: "Evidence-based results from our 2025 - 2026 pilot deployments.",
              href: "/case-studies",
              cta: "See impact",
            },
            {
              Icon: MessageSquareText,
              title: "Platform preview",
              body: "Walk through what farmers, vets and administrators actually see.",
              href: "/platform",
              cta: "Try the demo",
            },
          ].map(({ Icon, title, body, href, cta }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-3xl border border-cream-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <Icon className="h-6 w-6 text-moss-500" />
              <h3 className="mt-4 font-display text-lg font-semibold text-moss-600">
                {title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-ink-400">{body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-moss-500 transition group-hover:gap-2">
                {cta} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
