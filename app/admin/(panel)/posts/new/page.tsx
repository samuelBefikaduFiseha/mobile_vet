import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createPostAction } from "@/app/actions/admin/post";

export const metadata: Metadata = { title: "New Post · Mobile Vet Admin" };

const CATEGORIES = [
  "Field Stories",
  "Technology",
  "Livestock Health",
  "Finance & Policy",
  "Product",
  "Community",
];

const inputClass =
  "w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm text-ink-500 placeholder:text-ink-300 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-200";

export default async function NewPostPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/posts" className="flex items-center gap-1.5 text-sm text-ink-400 hover:text-moss-600">
          <ArrowLeft className="h-4 w-4" /> Back to Posts
        </Link>
      </div>

      <h1 className="mb-6 font-display text-2xl font-bold text-moss-600">New Blog Post</h1>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error === "missing" ? "Title and content are required." : `Error: ${error}`}
        </div>
      )}

      <form action={createPostAction} className="max-w-3xl space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Title *</span>
            <input name="title" required placeholder="Post title" className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Slug (auto-generated if blank)</span>
            <input name="slug" placeholder="my-post-slug" className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Category</span>
            <select name="category" className={inputClass} defaultValue="Field Stories">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Excerpt</span>
            <textarea
              name="excerpt"
              rows={2}
              placeholder="Short summary shown in blog listings…"
              className={`${inputClass} resize-none`}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Content * (plain text or markdown)</span>
            <textarea
              name="content"
              required
              rows={12}
              placeholder="Write your full post content here…"
              className={`${inputClass} resize-y`}
            />
          </label>

          <label className="block sm:col-span-2">
            <span className={labelClass}>Cover Image URL</span>
            <input
              name="cover_image"
              type="url"
              placeholder="https://images.unsplash.com/…"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Author</span>
            <input name="author" defaultValue="Mobile Vet Team" className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Read time (minutes)</span>
            <input name="read_minutes" type="number" min={1} max={60} defaultValue={5} className={inputClass} />
          </label>
        </div>

        <div className="flex flex-wrap gap-6 rounded-2xl border border-cream-200 bg-white px-6 py-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink-500">
            <input type="checkbox" name="is_featured" className="h-4 w-4 rounded accent-moss-500" />
            Featured post
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink-500">
            <input type="checkbox" name="published" className="h-4 w-4 rounded accent-moss-500" />
            Publish immediately
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-full bg-moss-500 px-6 py-3 text-sm font-semibold text-cream-50 shadow-soft transition hover:bg-moss-600"
          >
            Save Post
          </button>
          <Link
            href="/admin/posts"
            className="rounded-full border border-cream-200 bg-white px-6 py-3 text-sm font-semibold text-ink-500 transition hover:bg-cream-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

const labelClass = "mb-1.5 block text-sm font-semibold text-moss-600";
