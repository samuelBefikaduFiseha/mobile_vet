"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SubscribeResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeAction(
  formData: FormData,
): Promise<SubscribeResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const source = String(formData.get("source") ?? "blog");

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      ok: false,
      message:
        "Newsletter is not configured yet. Set up Supabase env vars to enable signups.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("subscribers")
    .insert({ email, source, is_active: true });

  if (error) {
    if (error.code === "23505") {
      return { ok: true, message: "You're already subscribed — thank you!" };
    }
    return {
      ok: false,
      message: "We could not save your subscription. Please try again later.",
    };
  }

  revalidatePath("/admin/subscribers");
  return { ok: true, message: "Thanks! You're now subscribed." };
}
