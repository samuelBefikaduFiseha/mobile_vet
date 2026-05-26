import type { Metadata } from "next";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Mobile Vet — how the platform works, who it serves, and how to get involved.",
};

type FAQItem = { q: string; a: string };

const SECTIONS: { title: string; items: FAQItem[] }[] = [
  {
    title: "About Mobile Vet",
    items: [
      {
        q: "What is Mobile Vet?",
        a: "Mobile Vet is a technology-driven livestock monitoring, veterinary traceability, and advisory platform designed for pastoralist communities in Ethiopia. It combines satellite environmental data, smart RFID-GPS ear tags, machine learning predictions, and SMS/USSD alerts to help farmers protect their animals from drought, disease, and financial exclusion — before disasters become severe.",
      },
      {
        q: "Who is Mobile Vet designed for?",
        a: "Our primary users are pastoralist and agro-pastoral farmers across Ethiopia — especially in Borena Zone, the Afar Region, and the Somali Region. The platform also serves veterinary clinics, government extension workers, insurance companies, banks, and NGOs who need trusted livestock data to do their work.",
      },
      {
        q: "What problem does Mobile Vet solve?",
        a: "Recurring droughts, disease outbreaks, and a complete lack of digital livestock records cost Ethiopian pastoralists billions of birr each year. Without digital identity or health records, animals cannot serve as collateral for loans, insurance is nearly impossible to price, and disease outbreaks go undetected until it is too late. Mobile Vet addresses all three through a single integrated platform.",
      },
      {
        q: "What regions is Mobile Vet currently active in?",
        a: "We have active pilots in Borena Zone (Oromia), the Afar Region, and the Somali Region — three of the most livestock-dependent and climate-stressed areas of Ethiopia. We are actively seeking partners to expand to additional pastoral zones in 2026–2027.",
      },
    ],
  },
  {
    title: "Technology & Data",
    items: [
      {
        q: "What types of data does Mobile Vet use?",
        a: "We integrate three categories of data: (1) Satellite environmental data — land surface temperature (NASA MODIS), rainfall (CHIRPS), vegetation health (NDVI), and drought indicators (SPI); (2) Livestock field data — animal health reports submitted via USSD by farmers and extension workers; and (3) Hardware data — real-time GPS location and movement from RFID-GPS ear tags. For MVP, we prioritise NDVI vegetation health, rainfall anomaly, and USSD-based animal health reports as the highest-impact, lowest-friction data types.",
      },
      {
        q: "How does the RFID-GPS ear tag work?",
        a: "Each ear tag is a tamper-evident hardware device fitted to an individual animal. It records a unique animal ID tied to owner details, GPS coordinates, movement history, vaccination records, and treatment logs. Tags can be scanned with standard RFID readers used by vets and extension workers, or read automatically at fixed checkpoints near water points and markets.",
      },
      {
        q: "How are early warnings delivered to farmers without smartphones?",
        a: "All farmer-facing alerts are delivered via SMS and USSD — services that work on any basic mobile phone, including Nokia feature phones on 2G networks. Messages are sent in Amharic, Afaan Oromo, and Somali. Farmers can also use USSD menus to report herd status, receive vaccination reminders, and access grazing advisories without any data connection.",
      },
      {
        q: "How accurate are the disease and drought predictions?",
        a: "During our Borena pilot, drought risk alerts preceded visible vegetation stress by 14–21 days, giving farmers time to move herds to better grazing land. Disease outbreak alerts are validated in partnership with Ministry of Agriculture extension workers before delivery. We continuously retrain our models on new field data to improve accuracy as more regions come online.",
      },
      {
        q: "What environmental data is currently available and prioritised?",
        a: "The most immediately available and impactful data sources are: NDVI vegetation indices (freely available at 250m resolution, updated every 16 days), CHIRPS rainfall estimates (5km resolution, near-real-time), and land surface temperature from MODIS. These three alone are sufficient to build a meaningful drought and grazing stress early warning system. Animal disease surveillance data from the Ministry of Agriculture and veterinary clinics is the next priority for integration.",
      },
    ],
  },
  {
    title: "Partnerships & Access",
    items: [
      {
        q: "Who are the target paying customers?",
        a: "Our commercial model targets institutional customers with budgets and a clear need for livestock data: insurance companies (for risk pricing), banks and microfinance institutions (for livestock collateral assessment), NGOs and development organisations (for programme targeting and impact reporting), and government agencies (for disease surveillance and policy data). Farmers access the SMS/USSD alert service for free or at subsidised cost through these institutional partnerships.",
      },
      {
        q: "How can our organisation partner with Mobile Vet?",
        a: "Fill in the contact form on our Partners page or email us at partnerships@mobilevet.et. We respond within two business days and will schedule a 30-minute discovery call to understand your needs. Partnership options range from data-sharing MOUs with government agencies to commercial API integrations with insurance companies.",
      },
      {
        q: "Are field visits to pilot regions possible?",
        a: "Yes — and we strongly encourage them. Field visits to Borena, Afar, and the Somali Region are an important part of our co-design process. We can facilitate introductions to community leaders, government extension workers, and local veterinary clinics for partners who want to conduct needs assessments or community engagement sessions. Contact us to arrange a joint field visit.",
      },
      {
        q: "Which regions are recommended for initial pilot partnerships?",
        a: "We recommend Borena Zone as the highest-priority pilot region due to the recent severe drought, existing relationships with local government, and the urgency of community need. The Somali Region is ideal for testing insurance and credit linkage models given its large pastoralist populations and mobile-first communities. Afar offers strong potential for scaling drought prediction given its arid climate and established livestock market networks.",
      },
    ],
  },
  {
    title: "MVP & Development",
    items: [
      {
        q: "What does a simple but impactful MVP look like?",
        a: "Our MVP guidance: start with satellite + USSD data before deploying hardware. A USSD-based herd reporting system combined with NDVI and rainfall alerts can deliver immediate value to farmers in weeks, not months. Hardware (RFID ear tags) is then layered in as the user base and trust is established. Keep the farmer interface to 3 USSD screens maximum. Validate alerts with at least two local veterinary extension workers before delivering them to farmers.",
      },
      {
        q: "How should Mobile Vet be introduced to pastoralist communities?",
        a: "Community introduction must go through trusted intermediaries — kebele leaders, local veterinary extension workers, and existing farmer cooperatives. Avoid top-down rollouts. Start with 10–20 trusted farmers in each community (early adopters), demonstrate the value of alerts over one rainy season, and let word-of-mouth drive expansion. Language is critical: all communications must be in the local language from day one. Partnership with faith-based organisations and community radio has also proven effective in reaching pastoral communities.",
      },
      {
        q: "What are the key steps before, during, and after MVP development?",
        a: "Before: conduct a 2–3 day field visit per target region; engage local government and extension workers; select 3–5 community data proxies to validate alerts. During: deploy USSD + satellite MVP to 50–100 farmers; measure alert accuracy and response rate weekly; hold monthly check-ins with extension workers. After: document impact with verifiable metrics; co-author a field report with government partners; use validated data to approach insurance and financial institution partners.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-tibeb-pattern pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-moss-400">
            FAQ
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold text-moss-600 text-balance sm:text-5xl">
            Common questions, honest answers.
          </h1>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]"
            aria-hidden
          />
          <p className="mt-6 text-lg leading-relaxed text-ink-400 text-pretty">
            Everything you need to know about the platform, the technology, and
            how to work with us.
          </p>
        </div>
      </section>

      {/* ── FAQ SECTIONS ── */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
          {SECTIONS.map(({ title, items }) => (
            <div key={title}>
              <h2 className="font-display text-2xl font-bold text-moss-600 mb-6">
                {title}
              </h2>
              <div className="space-y-3">
                {items.map(({ q, a }) => (
                  <details
                    key={q}
                    className="group rounded-2xl border border-cream-200 bg-white shadow-soft open:shadow-lift"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-display font-semibold text-moss-600 select-none list-none">
                      <span>{q}</span>
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss-100 text-moss-500 transition group-open:rotate-45 group-open:bg-gold-300 group-open:text-moss-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-cream-200 px-6 py-5">
                      <p className="text-sm leading-relaxed text-ink-400">{a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-tibeb-dark py-20 text-cream-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Still have questions?"
            title="Talk to the team directly"
            description="We respond to all partnership and technical enquiries within two business days."
            invert
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/#contact" variant="primary" size="lg">
              Contact us
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
