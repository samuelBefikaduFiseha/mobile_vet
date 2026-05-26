import Link from "next/link";
import {
  Briefcase,
  Globe,
  Mail,
  MapPin,
  PawPrint,
  Phone,
  Share2,
  X,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-tibeb-dark text-cream-100">
      <div className="h-1 w-full bg-ethiopia-accent" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gold-300 text-moss-700">
                <PawPrint className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="font-display text-xl font-bold text-cream-50">
                Mobile Vet
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream-200/85">
              Bridging technology and pastoralism to protect Ethiopia&apos;s
              livestock, livelihoods and future through data-driven innovation.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { Icon: X, label: "X (Twitter)" },
                { Icon: Briefcase, label: "LinkedIn" },
                { Icon: Share2, label: "Facebook" },
                { Icon: Globe, label: "Website" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-gold-300 hover:text-moss-700"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-gold-200">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/technology", "Technology"],
                ["/partners", "Partners"],
                ["/platform", "Platform"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream-200/80 transition hover:text-gold-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-gold-200">
              Resources
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["/faq", "FAQ"],
                ["/blog", "Blog & Insights"],
                ["/case-studies", "Case Studies"],
                ["/#contact", "Contact"],
                ["/admin/login", "Admin"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream-200/80 transition hover:text-gold-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-gold-200">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-cream-200/85">
                <Mail className="h-4 w-4 text-gold-200" />
                <a
                  href="mailto:partnerships@mobilevet.et"
                  className="hover:text-gold-200"
                >
                  partnerships@mobilevet.et
                </a>
              </li>
              <li className="flex items-center gap-2 text-cream-200/85">
                <Phone className="h-4 w-4 text-gold-200" />
                <a href="tel:+251996995878" className="hover:text-gold-200">
                  +251 996 995 878
                </a>
              </li>
              <li className="flex items-center gap-2 text-cream-200/85">
                <MapPin className="h-4 w-4 text-gold-200" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream-200/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Mobile Vet. Built for Ethiopian
            pastoralist resilience.
          </p>
          <p className="font-display tracking-wide text-gold-200">
            ሰላም · Selam · Welcome
          </p>
        </div>
      </div>
    </footer>
  );
}
