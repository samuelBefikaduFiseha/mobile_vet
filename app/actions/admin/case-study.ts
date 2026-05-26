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

export async function createCaseStudyAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim();
  const region_tag = String(formData.get("region_tag") ?? "").trim() || null;
  const cover_image = String(formData.get("cover_image") ?? "").trim() || null;
  const summary = String(formData.get("summary") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const testimonial_quote = String(formData.get("testimonial_quote") ?? "").trim() || null;
  const testimonial_author = String(formData.get("testimonial_author") ?? "").trim() || null;
  const published = formData.get("published") === "on";

  if (!title || !region || !summary || !body)
    redirect("/admin/case-studies/new?error=missing");

  // Collect up to 4 metrics
  const metrics: { value: string; label: string }[] = [];
  for (let i = 1; i <= 4; i++) {
    const value = String(formData.get(`metric_value_${i}`) ?? "").trim();
    const label = String(formData.get(`metric_label_${i}`) ?? "").trim();
    if (value && label) metrics.push({ value, label });
  }

  const slug = slugInput || toSlug(title);

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("case_studies").insert({
    title,
    slug,
    region,
    region_tag,
    cover_image,
    summary,
    body,
    testimonial_quote,
    testimonial_author,
    metrics: JSON.stringify(metrics),
    published,
  });

  if (error)
    redirect(`/admin/case-studies/new?error=${encodeURIComponent(error.message)}`);

  revalidatePath("/case-studies");
  revalidatePath("/admin/case-studies");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudyAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = createSupabaseAdminClient();
  await supabase.from("case_studies").delete().eq("id", id);
  revalidatePath("/case-studies");
  revalidatePath("/admin/case-studies");
}
