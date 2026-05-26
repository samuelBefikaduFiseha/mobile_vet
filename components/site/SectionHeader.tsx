type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
}: Props) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow ? (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] ${
            invert ? "text-gold-200" : "text-moss-400"
          }`}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl ${
          invert ? "text-cream-50" : "text-moss-600"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full ${
          align === "center" ? "mx-auto" : ""
        } bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]`}
        aria-hidden
      />
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${
            invert ? "text-cream-100/85" : "text-ink-400"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
