import Image from "next/image";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  imageUrl,
  align = "left",
  children,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-600/85 via-moss-500/80 to-earth-300/70"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-moss-600 via-moss-500 to-earth-300"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50"
        aria-hidden
      />

      <div
        className={`mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-200/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-cream-50 text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-cream-100/90 text-pretty sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
