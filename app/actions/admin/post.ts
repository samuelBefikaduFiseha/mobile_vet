"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createPostAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "Field Stories");
  const cover_image = String(formData.get("cover_image") ?? "").trim() || null;
  const author = String(formData.get("author") ?? "Mobile Vet Team").trim();
  const read_minutes = Number(formData.get("read_minutes") ?? 5);
  const is_featured = formData.get("is_featured") === "on";
  const published = formData.get("published") === "on";

  if (!title || !content) redirect("/admin/posts/new?error=missing");

  const slug = slugInput || toSlug(title);

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("posts").insert({
    title,
    slug,
    excerpt: excerpt || null,
    content,
    category,
    cover_image,
    author,
    read_minutes,
    is_featured,
    published,
    published_at: published ? new Date().toISOString() : null,
  });

  if (error) redirect(`/admin/posts/new?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = createSupabaseAdminClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}

export async function togglePublishAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";
  if (!id) return;
  const supabase = createSupabaseAdminClient();
  await supabase
    .from("posts")
    .update({
      published: !published,
      published_at: !published ? new Date().toISOString() : null,
    })
    .eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
}
