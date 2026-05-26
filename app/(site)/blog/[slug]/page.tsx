import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NewsletterForm } from "@/components/site/NewsletterForm";

type Props = { params: Promise<{ slug: string }> };

type Post = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
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

async function getPost(slug: string): Promise<Post | null> {
  try {
    const db = await createSupabaseServerClient();
    const { data } = await db
      .from("posts")
      .select(
        "title, slug, excerpt, content, category, cover_image, author, read_minutes, is_featured, published_at",
      )
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data as Post | null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-tibeb-pattern pt-28 pb-12 sm:pt-36">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-moss-500 transition hover:text-moss-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mt-2 flex flex-wrap items-center gap-2.5 text-xs">
            <span
              className={`rounded-full px-2.5 py-0.5 font-semibold ${CATEGORY_COLORS[post.category] ?? "bg-moss-100 text-moss-600"}`}
            >
              {post.category}
            </span>
            {post.is_featured && (
              <span className="rounded-full bg-gold-100 px-2.5 py-0.5 font-semibold text-gold-500">
                ★ Featured
              </span>
            )}
            <span className="flex items-center gap-1 text-ink-400">
              <Clock className="h-3 w-3" /> {post.read_minutes} min read
            </span>
            {post.published_at && (
              <span className="flex items-center gap-1 text-ink-400">
                <Calendar className="h-3 w-3" /> {formatDate(post.published_at)}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold text-moss-600 text-balance sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-ink-400">{post.excerpt}</p>
          )}

          <div className="mt-6 flex items-center gap-3 border-t border-cream-200 pt-6">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-moss-500 text-sm font-bold text-cream-50">
              {getInitials(post.author)}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-600">{post.author}</p>
              {post.published_at && (
                <p className="text-xs text-ink-400">{formatDate(post.published_at)}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COVER IMAGE ── */}
      {post.cover_image && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-2 mb-12">
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-lift">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1280px) 1024px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ── BODY ── */}
      <section className={post.cover_image ? "pb-20" : "py-16"}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!post.cover_image && (
            <div className="mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-moss-400 via-gold-300 to-[#c1272d]" />
          )}
          <div className="space-y-5">
            {paragraphs.map((para, i) => (
              <p key={i} className="leading-relaxed text-ink-500">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section className="bg-tibeb-dark py-16">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="font-display text-xl font-bold text-cream-50">Enjoyed this post?</p>
          <p className="mt-2 text-sm text-cream-100/80">
            Get field reports and updates delivered to your inbox — once or twice a month.
          </p>
          <div className="mt-6">
            <NewsletterForm compact />
          </div>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 text-sm text-cream-100/60 transition hover:text-cream-50"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
        </div>
      </section>
    </>
  );
}
