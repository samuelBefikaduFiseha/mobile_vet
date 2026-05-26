import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { deletePostAction, togglePublishAction } from "@/app/actions/admin/post";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";

export const metadata: Metadata = { title: "Blog Posts · Mobile Vet Admin" };

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  published: boolean;
  is_featured: boolean;
  created_at: string;
};

async function getPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = createSupabaseAdminClient();
    const { data } = await db
      .from("posts")
      .select("id, title, slug, category, author, published, is_featured, created_at")
      .order("created_at", { ascending: false });
    return (data as Post[]) ?? [];
  } catch {
    return [];
  }
}

export default async function PostsAdminPage() {
  const posts = await getPosts();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-moss-600">Blog Posts</h1>
          <p className="mt-1 text-sm text-ink-400">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-moss-500 px-5 py-2.5 text-sm font-semibold text-cream-50 shadow-soft transition hover:bg-moss-600"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {!isSupabaseConfigured() && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 px-5 py-4 text-sm text-gold-500">
          Supabase is not configured. Posts will appear here once the database is set up.
        </div>
      )}

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-cream-200 bg-white py-20 text-center">
          <p className="font-display text-lg font-semibold text-ink-400">No posts yet</p>
          <p className="mt-1 text-sm text-ink-400">Create your first blog post to get started.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-moss-500 px-5 py-2.5 text-sm font-semibold text-cream-50"
          >
            <Plus className="h-4 w-4" /> Create Post
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 bg-cream-50">
                {["Title", "Category", "Author", "Featured", "Status", "Date", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={post.id} className={`border-b border-cream-100 ${i % 2 === 0 ? "bg-white" : "bg-cream-50/40"}`}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-moss-600 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-ink-400 font-mono">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-moss-100 px-2.5 py-0.5 text-xs font-semibold text-moss-600">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{post.author}</td>
                  <td className="px-4 py-3 text-center">
                    {post.is_featured ? (
                      <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-500">★ Yes</span>
                    ) : (
                      <span className="text-xs text-ink-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <form action={togglePublishAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="published" value={String(post.published)} />
                      <button
                        type="submit"
                        className={`rounded-full px-3 py-0.5 text-xs font-semibold transition ${
                          post.published
                            ? "bg-moss-100 text-moss-600 hover:bg-red-100 hover:text-red-600"
                            : "bg-cream-200 text-ink-400 hover:bg-moss-100 hover:text-moss-600"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-400 whitespace-nowrap">
                    {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3">
                    <form action={deletePostAction}>
                      <input type="hidden" name="id" value={post.id} />
                      <ConfirmDeleteButton
                        message="Delete this post?"
                        className="rounded-lg px-3 py-1 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        Delete
                      </ConfirmDeleteButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
