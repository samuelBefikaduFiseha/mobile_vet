import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, PenLine } from "lucide-react";
import { SectionHeader } from "@/components/site/SectionHeader";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field reports, technology insights, and development updates from the Mobile Vet team.",
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  cover_image: string | null;
  author: string;
  read_minutes: number;
  is_featured: boolean;
  published_at: string | null;
};

const CATEGORY_COLORS: Record<string, string> = {
  "Field Stories": "bg-moss-100 text-moss-600",
  Technology: "bg-gold-100 text-gold-500",
  "Livestock Health": "bg-[#c1272d]/10 text-[#c1272d]",
  Policy: "bg-cream-200 text-ink-500",
  Community: "bg-moss-50 text-moss-500",
};

const TOPICS = [
  { label: "Field Stories", desc: "Community visits, farmer perspectives, and ground-level observations from pastoral Ethiopia." },
  { label: "Technology", desc: "How we are building the platform — RFID hardware, ML models, USSD interfaces, and geospatial tools." },
  { label: "Livestock Health", desc: "Veterinary science, disease surveillance, and the role of digital records in animal health management." },
  { label: "Finance & Policy", desc: "How digital livestock records unlock insurance, credit, and the regulatory context in Ethiopia." },
  { label: "Community", desc: "Engagement lessons, cultural considerations, and what it takes to build trust with pastoralist communities." },
];

const PREVIEW_POSTS = [
  {
    category: "Field Stories",
    title: "Why We Chose Borena as Our First Pilot Region",
    excerpt:
      "The recent droughts in Borena Zone highlighted every problem we are trying to solve — and the communities there are ready for something new. Here is our reasoning.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
    readTime: "5 min",
  },
  {
    category: "Technology",
    title: "Building an RFID-GPS Ear Tag for Pastoral Ethiopia: Design Constraints",
    excerpt:
      "Designing hardware for remote, arid environments with no reliable power or connectivity is a different problem than building for cities. These are the constraints shaping our ear tag design.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    readTime: "7 min",
  },
  {
    category: "Community",
    title: "What Pastoralist Communities Actually Need From Technology",
    excerpt:
      "Before writing a single line of code, we need to listen. Here are the questions we are planning to ask — and why the answers will define the platform.",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=900&q=80",
    readTime: "6 min",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter((w) => !["dr.", "dr", "prof.", "prof"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = await createSupabaseServerClient();
    const { data } = await db
      .from("posts")
      .select(
        "id, slug, title, excerpt, category, cover_image, author, read_minutes, is_featured, published_at",
      )
      .eq("published", true)
      .order("published_at", { ascending: false });
    return (data as Post[]) ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const hasPosts = posts.length > 0;
  const featured = posts.find((p) => p.is_featured);
  const others = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-tibeb-pattern pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-moss-400">
              Blog & Insights
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-moss-600 text-balance sm:text-5xl">
              {hasPosts ? "Stories from the field." : "We are building in public."}
            </h1>
            <div
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-ink-400">
              {hasPosts
                ? `Field reports, technology deep-dives, and community insights from the Mobile Vet team. ${posts.length} ${posts.length === 1 ? "post" : "posts"} published.`
                : "Follow our development journey — design decisions, community insights, technology deep-dives, and field observations from our planning visits to Borena, Afar, and the Somali Region."}
            </p>
          </div>
        </div>
      </section>

      {hasPosts ? (
        <>
          {/* ── FEATURED POST ── */}
          {featured && (
            <section className="bg-cream-50 pt-16 pb-8 sm:pt-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <article className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-lift transition hover:shadow-xl">
                    <div className="grid lg:grid-cols-[1fr_1.4fr]">
                      <div className="flex flex-col justify-between p-8 lg:p-10">
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="rounded-full bg-gold-200 px-3 py-1 text-xs font-bold text-gold-600">
                              ★ Featured
                            </span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[featured.category] ?? "bg-moss-100 text-moss-600"}`}
                            >
                              {featured.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-ink-400">
                              <Clock className="h-3 w-3" /> {featured.read_minutes} min read
                            </span>
                          </div>
                          <h2 className="mt-4 font-display text-2xl font-bold text-moss-600 text-balance sm:text-3xl lg:text-4xl">
                            {featured.title}
                          </h2>
                          {featured.excerpt && (
                            <p className="mt-3 text-sm leading-relaxed text-ink-400 line-clamp-3 sm:text-base">
                              {featured.excerpt}
                            </p>
                          )}
                        </div>
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-2.5">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-moss-500 text-xs font-bold text-cream-50">
                              {getInitials(featured.author)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-ink-600">{featured.author}</p>
                              {featured.published_at && (
                                <p className="text-xs text-ink-400">{formatDate(featured.published_at)}</p>
                              )}
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-moss-500 px-5 py-2.5 text-sm font-semibold text-cream-50 transition group-hover:bg-moss-600">
                            Read story <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                      {featured.cover_image && (
                        <div className="relative h-64 overflow-hidden lg:h-auto">
                          <Image
                            src={featured.cover_image}
                            alt={featured.title}
                            fill
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent lg:bg-gradient-to-l" />
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </div>
            </section>
          )}

          {/* ── REST OF POSTS ── */}
          {others.length > 0 && (
            <section className={`bg-cream-50 pb-16 sm:pb-20 ${!featured ? "pt-16 sm:pt-20" : "pt-8"}`}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {featured && (
                  <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-ink-400">
                    More from the team
                  </p>
                )}
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {others.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {post.cover_image ? (
                          <Image
                            src={post.cover_image}
                            alt={post.title}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-moss-100 to-moss-200">
                            <span className="font-display text-4xl font-bold text-moss-300">
                              {post.category[0]}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-3 text-xs">
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-moss-100 text-moss-600"}`}
                          >
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-ink-400">
                            <Clock className="h-3 w-3" /> {post.read_minutes} min
                          </span>
                        </div>
                        <h3 className="mt-3 flex-1 font-display text-lg font-semibold text-moss-600 text-balance line-clamp-3">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 text-sm leading-relaxed text-ink-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="mt-5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss-500 text-[10px] font-bold text-cream-50">
                              {getInitials(post.author)}
                            </div>
                            <span className="max-w-[110px] truncate text-xs text-ink-500">
                              {post.author}
                            </span>
                          </div>
                          {post.published_at && (
                            <span className="whitespace-nowrap text-xs text-ink-400">
                              {formatDate(post.published_at)}
                            </span>
                          )}
                        </div>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-moss-500 transition group-hover:gap-2">
                          Read more <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          {/* ── COMING SOON BANNER ── */}
          <section className="bg-moss-500 py-5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-cream-50">
                  <PenLine className="h-5 w-5 shrink-0 text-gold-200" />
                  <p className="text-sm font-semibold">
                    Posts are coming soon — subscribe to get them first.
                  </p>
                </div>
                <div className="w-full sm:w-auto">
                  <NewsletterForm compact />
                </div>
              </div>
            </div>
          </section>

          {/* ── PREVIEW POSTS ── */}
          <section className="bg-cream-50 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHeader
                eyebrow="Upcoming Posts"
                title="What we're writing"
                description="These are the first posts we are working on. Subscribe below to be notified when they publish."
              />
              <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {PREVIEW_POSTS.map((post) => (
                  <div
                    key={post.title}
                    className="flex flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-ink-400">
                        Coming soon
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-moss-100 text-moss-600"}`}
                        >
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-ink-400">
                          <Clock className="h-3 w-3" /> {post.readTime} read
                        </span>
                      </div>
                      <h3 className="mt-3 flex-1 font-display text-lg font-semibold text-moss-600 text-balance">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── TOPICS ── */}
      <section className="bg-tibeb-pattern py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Topics"
            title="What this blog covers"
            description="Five content areas that reflect the breadth of what goes into building Mobile Vet."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TOPICS.map(({ label, desc }) => (
              <div
                key={label}
                className="rounded-2xl border border-cream-200 bg-white p-5 shadow-soft"
              >
                <p className="font-display font-semibold text-moss-600">{label}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="bg-tibeb-dark py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Stay Updated"
            title="Get posts delivered to your inbox"
            description="Field reports, technology updates, and development notes — once or twice a month."
            invert
          />
          <div className="mt-8">
            <NewsletterForm compact />
          </div>
        </div>
      </section>
    </>
  );
}
