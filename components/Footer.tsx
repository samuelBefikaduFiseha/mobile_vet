import Link from "next/link";
import { Briefcase, Globe, Mail, MapPin, Phone, Share2, X } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_LINKS = {
  Explore: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/technology", label: "Technology" },
    { href: "/partners", label: "Partners" },
    { href: "/platform", label: "Platform Preview" },
  ],
  Resources: [
    { href: "/faq", label: "FAQ" },
    { href: "/blog", label: "Blog" },
    { href: "/case-studies", label: "Case Studies" },
  ],
} as const;

export function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-tibeb-dark text-cream-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-ethiopia-accent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-100/80">
            Bridging technology and pastoralism to protect Ethiopia&rsquo;s
            livestock, livelihoods, and future through data-driven innovation.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { Icon: X, label: "Twitter / X" },
              { Icon: Briefcase, label: "LinkedIn" },
              { Icon: Share2, label: "Facebook" },
              { Icon: Globe, label: "Website" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-cream-100/10 text-cream-100 transition hover:-translate-y-0.5 hover:bg-gold-300 hover:text-moss-700"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
              {heading}
            </h4>
            <ul className="mt-5 space-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-100/80 transition hover:text-gold-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
            Contact
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3 text-cream-100/85">
              <Mail size={16} className="text-gold-200" />
              <a href="mailto:partnerships@mobilevet.et" className="hover:text-gold-200">
                partnerships@mobilevet.et
              </a>
            </li>
            <li className="flex items-center gap-3 text-cream-100/85">
              <Phone size={16} className="text-gold-200" />
              <a href="tel:+251996995878" className="hover:text-gold-200">
                +251 996 995 878
              </a>
            </li>
            <li className="flex items-center gap-3 text-cream-100/85">
              <MapPin size={16} className="text-gold-200" />
              <span>Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-cream-100/60 sm:flex-row sm:px-8">
          <p>
            &copy; {new Date().getFullYear()} Mobile Vet. Built for Ethiopian
            pastoralist resilience.
          </p>
          <p className="flex items-center gap-2">
            <span>Made with care in</span>
            <span className="rounded-full bg-cream-100/10 px-2 py-0.5 text-cream-100">
              Addis Ababa
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
