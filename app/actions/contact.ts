"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ContactResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessageAction(
  formData: FormData,
): Promise<ContactResult> {
  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const organization = String(formData.get("organization") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (full_name.length < 2) {
    return { ok: false, message: "Please share your full name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return {
      ok: false,
      message: "Please add a bit more detail to your message (10+ chars).",
    };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return {
      ok: false,
      message:
        "Contact form is not configured yet. Set up Supabase env vars first.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contact_messages").insert({
    full_name,
    email,
    organization: organization || null,
    message,
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      message: "We could not send your message. Please try again later.",
    };
  }

  revalidatePath("/admin/messages");
  return {
    ok: true,
    message:
      "Thank you! Our partnerships team will be in touch within two business days.",
  };
}
