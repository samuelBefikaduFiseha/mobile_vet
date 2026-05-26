import type { Metadata } from "next";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  HeartPulse,
  Layers,
  MapPin,
  Shield,
  Smartphone,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { LinkButton } from "@/components/site/Button";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Walk through the Mobile Vet platform — designed dashboards for farmers, veterinarians, and administrators managing livestock across Ethiopia.",
};

const ROLES = [
  {
    icon: Smartphone,
    label: "Farmer Interface",
    subtitle: "SMS & USSD — any mobile phone",
    desc: "Farmers interact entirely via basic mobile. No smartphone or internet required. All menus in Amharic, Afaan Oromo, or Somali.",
  },
  {
    icon: HeartPulse,
    label: "Veterinarian Portal",
    subtitle: "Web + Android app",
    desc: "Vets access full animal health records, vaccination schedules, and regional disease alerts through a web portal or lightweight Android app.",
  },
  {
    icon: Layers,
    label: "Administrator Dashboard",
    subtitle: "Web dashboard",
    desc: "Government officials, NGO partners, and insurers see herd maps, risk scores, programme coverage, and impact metrics.",
  },
];

const FARMER_ALERTS = [
  {
    type: "warning",
    title: "Drought Risk: HIGH",
    message:
      "Vegetation stress detected in your woreda. Consider moving herds north toward supplementary grazing zones.",
    time: "Today, 7:42 AM",
  },
  {
    type: "info",
    title: "Vaccination Reminder",
    message:
      "CBPP vaccination due for Tag #ET-BOR-00412 within 7 days. Contact your veterinary extension worker.",
    time: "Yesterday, 2:15 PM",
  },
  {
    type: "success",
    title: "Grazing Advisory",
    message:
      "Rainfall detected in nearby zone (+48mm last 7 days). Vegetation recovery expected. Movement now safe.",
    time: "3 days ago",
  },
];

const ANIMAL_RECORDS = [
  { id: "ET-BOR-00412", species: "Cattle", owner: "Galgalo Wario", vaccinations: 3, status: "Healthy" },
  { id: "ET-BOR-00413", species: "Cattle", owner: "Galgalo Wario", vaccinations: 2, status: "Monitoring" },
  { id: "ET-BOR-00587", species: "Goat", owner: "Lelise Guyo", vaccinations: 1, status: "Healthy" },
  { id: "ET-AFR-01102", species: "Camel", owner: "Hassan Abdi", vaccinations: 4, status: "Healthy" },
];

const RISK_ZONES = [
  { woreda: "Dire Woreda", risk: "High", ndvi: "0.18", rainfall: "-62%" },
  { woreda: "Arero Woreda", risk: "Medium", ndvi: "0.31", rainfall: "-28%" },
  { woreda: "Yaballo Woreda", risk: "Low", ndvi: "0.54", rainfall: "+12%" },
  { woreda: "Moyale Woreda", risk: "Low", ndvi: "0.61", rainfall: "+48%" },
];

const FEATURES = [
  { icon: Tag, title: "Animal Registry", desc: "Every tagged animal has a digital profile with ownership, health history, and GPS track log." },
  { icon: Bell, title: "Early Warning Alerts", desc: "Drought and disease risk alerts pushed to farmers via SMS before visible stress appears." },
  { icon: MapPin, title: "Regional Risk Maps", desc: "Woreda-level maps showing real-time NDVI, rainfall anomaly, and livestock risk scores." },
  { icon: HeartPulse, title: "Veterinary Records", desc: "Complete treatment, vaccination, and health history for every animal — accessible at the clinic." },
  { icon: Shield, title: "Insurance Integration", desc: "Digital herd records and risk triggers shared (with consent) to insurance partners." },
  { icon: TrendingUp, title: "Impact Reporting", desc: "Programme metrics for NGO and government partners: animals covered, alerts sent, outcomes tracked." },
];

export default function PlatformPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative isolate overflow-hidden bg-tibeb-dark pt-28 pb-20 sm:pt-36 sm:pb-28 text-cream-50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700 via-moss-600 to-moss-500" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-200">
                Platform Preview
              </span>
              <h1 className="mt-3 font-display text-4xl font-bold text-cream-50 text-balance sm:text-5xl lg:text-6xl">
                What farmers, vets, and administrators will see.
              </h1>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-300 via-gold-300 to-[#c1272d]" aria-hidden />
              <p className="mt-6 text-lg leading-relaxed text-cream-100/85 text-pretty">
                Three interfaces. One shared data layer. Every role sees exactly
                what they need — from a Nokia SMS menu to a geospatial risk
                dashboard. Here is what we are designing.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/#contact" variant="primary" size="lg">Request a demo briefing</LinkButton>
                <LinkButton href="/technology" variant="ghost" size="lg">Technical details</LinkButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-2 rounded-[2rem] bg-gold-300/10 blur-2xl" />
              <Image
                src="https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1200&q=80"
                alt="Pastoralist community with livestock in Ethiopia"
                width={1200}
                height={800}
                className="relative rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE OVERVIEW ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Three Interfaces"
            title="Built for every stakeholder"
            description="Each interface is designed from scratch for its users — not adapted from a generic template."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {ROLES.map(({ icon: Icon, label, subtitle, desc }) => (
              <div key={label} className="rounded-3xl border border-cream-200 bg-white p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-moss-100 text-moss-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-moss-600">{label}</h3>
                <p className="text-xs font-semibold text-gold-300">{subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FARMER VIEW ── */}
      <section className="bg-tibeb-pattern py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Farmer Interface" title="Alerts on any mobile phone" align="left"
                description="Farmers receive structured SMS messages and interact via USSD menus — no internet, no smartphone, no app needed." />
              <ul className="mt-8 space-y-3">
                {["Drought risk alerts in local language", "Vaccination and treatment reminders", "Grazing advisories and water point guidance", "Herd status reporting via *345# USSD", "Insurance and claim notifications"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-moss-400" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
              {/* Phone mockup */}
              <div className="mx-auto w-full max-w-xs">
                <div className="rounded-3xl bg-moss-700 p-4 shadow-lift">
                  <div className="flex items-center justify-between px-2 py-1 text-xs text-cream-100/60">
                    <span>9:41 AM</span><span>Mobile Vet</span><span>●●●</span>
                  </div>
                  <div className="mt-2 space-y-3 rounded-2xl bg-moss-800/60 p-3">
                    {FARMER_ALERTS.map((alert) => (
                      <div key={alert.title} className={`rounded-xl p-3 text-sm ${alert.type === "warning" ? "bg-[#c1272d]/15 border border-[#c1272d]/30" : alert.type === "info" ? "bg-gold-300/10 border border-gold-300/25" : "bg-moss-500/20 border border-moss-400/30"}`}>
                        <div className="flex items-center gap-2">
                          {alert.type === "warning" ? <AlertTriangle className="h-4 w-4 text-[#c1272d] shrink-0" /> : alert.type === "info" ? <Bell className="h-4 w-4 text-gold-200 shrink-0" /> : <CheckCircle2 className="h-4 w-4 text-moss-300 shrink-0" />}
                          <span className="font-semibold text-cream-50 text-xs">{alert.title}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-cream-100/80">{alert.message}</p>
                        <p className="mt-1 text-[10px] text-cream-100/40">{alert.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Context image */}
              <div className="relative hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=600&q=80"
                  alt="Pastoralist with livestock in Ethiopia"
                  width={600}
                  height={700}
                  className="rounded-3xl object-cover shadow-soft h-full max-h-96 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VET VIEW ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Registry + image */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft">
                <div className="border-b border-cream-200 bg-moss-50 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-moss-600">Animal Registry</h3>
                  <span className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-semibold text-moss-600">4 shown</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-cream-200 bg-cream-50">
                        {["Tag ID", "Species", "Owner", "Vax", "Status"].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider text-ink-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ANIMAL_RECORDS.map((r, i) => (
                        <tr key={r.id} className={`border-b border-cream-100 ${i % 2 === 0 ? "bg-white" : "bg-cream-50/50"}`}>
                          <td className="px-4 py-2.5 font-mono font-semibold text-moss-500">{r.id}</td>
                          <td className="px-4 py-2.5 text-ink-500">{r.species}</td>
                          <td className="px-4 py-2.5 text-ink-400">{r.owner}</td>
                          <td className="px-4 py-2.5 text-center"><span className="rounded-full bg-moss-100 px-2 py-0.5 font-semibold text-moss-600">{r.vaccinations}</span></td>
                          <td className="px-4 py-2.5">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-semibold ${r.status === "Healthy" ? "bg-moss-100 text-moss-600" : "bg-gold-100 text-gold-500"}`}>
                              {r.status === "Healthy" ? <CheckCircle2 className="h-3 w-3" /> : <Activity className="h-3 w-3" />}
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1574482620911-9dc5d26ccec0?auto=format&fit=crop&w=900&q=80"
                  alt="Veterinarian examining livestock in Ethiopia"
                  width={900}
                  height={400}
                  className="w-full object-cover h-48"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-moss-700/60 to-transparent flex items-center px-6">
                  <p className="font-display text-lg font-semibold text-cream-50 max-w-xs">
                    Every scan. Every visit. Recorded against the animal&apos;s digital ID.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Veterinarian Portal" title="Complete animal health records" align="left"
                description="Vets access full treatment histories, schedule vaccinations, and submit disease reports — all linked to the animal's RFID ear tag." />
              <ul className="mt-8 space-y-3">
                {["RFID tag scan → instant health record lookup", "Vaccination scheduling and automated reminders", "Disease outbreak reporting to Ministry of Agriculture", "Export records for insurance and bank partners", "Regional disease surveillance heat-map"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-moss-400" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADMIN VIEW ── */}
      <section className="bg-tibeb-dark py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow="Administrator Dashboard" title="Regional risk at a glance" align="left" invert
                description="Government officials and NGO partners see woreda-level risk maps, programme coverage, and herd statistics — updated regularly from satellite and field data." />
              <ul className="mt-8 space-y-3">
                {["Woreda-level NDVI and rainfall risk maps", "Herd coverage and alert delivery statistics", "Disease outbreak alerts and vaccination progress", "Insurance coverage and claim reporting", "CSV export for donor and government reporting"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-cream-100/90">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-gold-200" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {/* Risk zone mockup */}
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur">
                <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-cream-50">Borena Zone — Drought Risk</h3>
                  <span className="text-xs text-cream-100/50">Satellite data</span>
                </div>
                <div className="p-4 space-y-3">
                  {RISK_ZONES.map((zone) => (
                    <div key={zone.woreda} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-gold-200 shrink-0" />
                          <span className="font-semibold text-cream-50 text-sm">{zone.woreda}</span>
                        </div>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${zone.risk === "High" ? "bg-[#c1272d]/20 text-[#f87171]" : zone.risk === "Medium" ? "bg-gold-300/20 text-gold-200" : "bg-moss-400/20 text-moss-300"}`}>
                          {zone.risk} Risk
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-3 text-center text-xs">
                        <div><p className="text-cream-100/50">NDVI</p><p className="font-semibold text-cream-50">{zone.ndvi}</p></div>
                        <div><p className="text-cream-100/50">Rainfall Δ</p><p className={`font-semibold ${zone.rainfall.startsWith("-") ? "text-[#f87171]" : "text-moss-300"}`}>{zone.rainfall}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map image */}
              <div className="relative overflow-hidden rounded-3xl">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80"
                  alt="Geospatial map of Ethiopia"
                  width={900}
                  height={300}
                  className="w-full object-cover h-44"
                />
                <div className="absolute inset-0 bg-moss-900/50 flex items-center justify-center">
                  <p className="font-display text-sm font-semibold text-cream-50 text-center px-4">
                    Woreda-level risk maps powered by satellite data & QGIS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform Features"
            title="Everything in one place"
            description="Six core modules that work together — data collected by a vet automatically improves the drought alert a farmer receives by SMS."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl border border-cream-200 bg-white p-7 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-moss-100 text-moss-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-moss-600">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative isolate overflow-hidden bg-moss-500 py-20 text-cream-50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-700 via-moss-500 to-moss-400" aria-hidden />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Users className="mx-auto h-12 w-12 text-gold-200" />
          <h2 className="mt-4 font-display text-3xl font-bold text-cream-50 sm:text-4xl">
            Want a walkthrough for your team?
          </h2>
          <p className="mt-4 text-cream-100/85">
            We offer live demo briefings for government agencies, NGOs,
            insurance companies, and veterinary organisations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <LinkButton href="/#contact" variant="primary" size="lg">Request a briefing</LinkButton>
            <LinkButton href="/case-studies" variant="ghost" size="lg">See pilot plans</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
