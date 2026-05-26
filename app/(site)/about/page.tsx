import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Target, Users, Zap } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Mobile Vet — a technology platform in development, built to protect Ethiopia's pastoralist communities through early warning, digital livestock identity, and financial inclusion.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Community First",
    body: "Every decision is guided by what genuinely helps pastoralist farmers and their animals. Technology is a means, not an end.",
  },
  {
    icon: Zap,
    title: "Accessible by Design",
    body: "We build for the Nokia, not the iPhone. SMS, USSD, and offline-first design ensure our tools reach those who need them most.",
  },
  {
    icon: Target,
    title: "Data-Driven Impact",
    body: "We combine satellite intelligence and field data to make accurate, actionable predictions — not guesses.",
  },
  {
    icon: Users,
    title: "Collaborative Ecosystem",
    body: "We connect farmers, vets, insurers, and government into one trusted network, multiplying impact for every participant.",
  },
];

const TEAM = [
  {
    name: "Samuel Befikadu",
    role: "Co-Founder",
    bio: "Building Mobile Vet from the ground up — from platform architecture to field partnerships. Focused on making technology that genuinely works for Ethiopian pastoralist communities.",
    initials: "SB",
    bg: "bg-moss-500",
  },
  {
    name: "Tsion Lema",
    role: "Co-Founder",
    bio: "Shaping the community engagement and partnership strategy that will carry Mobile Vet from development into deployed pilots across Borena, Afar, and the Somali Region.",
    initials: "TL",
    bg: "bg-gold-400",
  },
];

const ROADMAP = [
  {
    phase: "Now",
    label: "Building",
    items: [
      "Platform architecture & database design",
      "RFID-GPS ear tag hardware prototyping",
      "Satellite data pipeline development",
      "Community needs assessment planning",
    ],
    active: true,
  },
  {
    phase: "Next",
    label: "Pilot Preparation",
    items: [
      "Field visits to Borena, Afar & Somali Region",
      "Government & NGO partnership discussions",
      "SMS/USSD alert system testing",
      "First small-scale community deployment",
    ],
    active: false,
  },
  {
    phase: "Ahead",
    label: "Scale",
    items: [
      "Multi-region RFID tag rollout",
      "Insurance & credit integration",
      "Ministry of Agriculture data sharing",
      "Open API for research partners",
    ],
    active: false,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-tibeb-pattern pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
              In Development
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-moss-600 text-balance sm:text-5xl lg:text-6xl">
              We started where the problem is worst.
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-400 text-pretty">
              Mobile Vet is being built in response to Ethiopia&apos;s recurring
              livestock crises — droughts, disease outbreaks, and the complete
              absence of digital infrastructure that leaves pastoralist families
              unable to protect their herds or access financial services.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-400">
              We are in active development, designing the platform, prototyping
              hardware, and building the partnerships that will make it work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/#contact" variant="primary" size="lg">
                Partner with us
              </LinkButton>
              <LinkButton href="/technology" variant="secondary" size="lg">
                Our approach
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Mission & Vision"
                title="Protecting livestock, securing livelihoods"
                align="left"
              />
              <p className="mt-6 leading-relaxed text-ink-400">
                Ethiopia has one of the largest livestock populations in Africa.
                For millions of pastoralist families, animals are not just
                income — they are savings, insurance, and identity. Yet the
                sector lacks the digital infrastructure to survive modern climate
                pressures.
              </p>
              <p className="mt-4 leading-relaxed text-ink-400">
                Our mission is to give every animal a digital identity, every
                farmer a predictive warning, and every community the tools to
                navigate climate shocks before they become crises. We are
                building the platform that makes this possible.
              </p>
              <blockquote className="mt-6 border-l-4 border-gold-300 pl-4 font-display text-lg font-semibold italic text-moss-600">
                &ldquo;If you can predict it, you can prevent it.&rdquo;
              </blockquote>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-moss-300/30 via-gold-200/30 to-earth-200/30 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
                alt="Cattle herd in Ethiopian pastoral landscape"
                width={1200}
                height={900}
                className="relative rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why We Exist"
            title="A crisis hiding in plain sight"
            description="The livestock sector contributes 45% of Ethiopia's agricultural GDP, yet it remains digitally invisible — no identification, no health records, and no way to predict threats before they strike."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              {
                stat: "45%",
                label: "of agricultural GDP",
                body: "Livestock is the backbone of Ethiopia's rural economy, yet it remains largely unprotected by modern risk tools.",
              },
              {
                stat: "Millions",
                label: "of pastoralists at risk",
                body: "Communities in Borena, Afar, and the Somali Region face recurring drought, disease, and financial exclusion every season.",
              },
              {
                stat: "Zero",
                label: "digital traceability today",
                body: "Without digital IDs, farmers cannot access insurance or credit — and vets cannot manage disease outbreaks effectively.",
              },
            ].map(({ stat, label, body }) => (
              <div
                key={label}
                className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft text-center"
              >
                <p className="font-display text-4xl font-bold text-gold-300">
                  {stat}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-moss-400">
                  {label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-tibeb-dark py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="What We Believe"
            title="Our values"
            description="Four principles that guide every product, partnership, and design decision we make."
            invert
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-3xl border border-white/15 bg-white/[0.06] p-7 backdrop-blur"
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

      {/* ── ROADMAP ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where We Are"
            title="Development roadmap"
            description="We are currently building the platform and preparing for our first field pilots. Here is where we are and where we are headed."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {ROADMAP.map(({ phase, label, items, active }) => (
              <div
                key={phase}
                className={`rounded-3xl border p-8 ${
                  active
                    ? "border-moss-300 bg-moss-50 shadow-lift"
                    : "border-cream-200 bg-white shadow-soft"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      active
                        ? "bg-moss-500 text-cream-50"
                        : "bg-cream-200 text-ink-400"
                    }`}
                  >
                    {phase}
                  </span>
                  <span className="font-display text-lg font-semibold text-moss-600">
                    {label}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-ink-500">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          active ? "bg-moss-400" : "bg-cream-300"
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Team"
            title="Two founders. One shared mission."
            description="Mobile Vet is built by two co-founders committed to creating technology that reaches Ethiopia's most vulnerable pastoralist communities."
          />
          <div className="mt-14 mx-auto max-w-2xl grid gap-8 sm:grid-cols-2">
            {TEAM.map((member) => (
              <article
                key={member.name}
                className="rounded-3xl border border-cream-200 bg-white p-8 shadow-soft text-center"
              >
                <div
                  className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full ${member.bg} font-display text-2xl font-bold text-cream-50 shadow-soft`}
                >
                  {member.initials}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-moss-600">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-300">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">
                  {member.bio}
                </p>
              </article>
            ))}
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
          <SectionHeader
            eyebrow="Join Us"
            title="Help shape what we build"
            description="We are actively seeking government partners, NGOs, veterinary organisations, and research institutions to co-design our first pilots."
            invert
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/#contact" variant="primary" size="lg">
              Get in touch
            </LinkButton>
            <LinkButton href="/partners" variant="ghost" size="lg">
              Partner types
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
