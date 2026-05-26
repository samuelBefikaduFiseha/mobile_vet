"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { sendContactMessageAction } from "@/app/actions/contact";

const ORG_OPTIONS = [
  { value: "", label: "Select organization type" },
  { value: "ngo", label: "NGO / Development Partner" },
  { value: "government", label: "Government Institution" },
  { value: "insurance", label: "Insurance Company" },
  { value: "bank", label: "Bank / Microfinance" },
  { value: "vet", label: "Veterinary Clinic" },
  { value: "farmer", label: "Farmers' Cooperative" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    { kind: "idle" | "success" | "error"; message?: string }
  >({ kind: "idle" });

  const onSubmit = (formData: FormData) => {
    setStatus({ kind: "idle" });
    startTransition(async () => {
      const res = await sendContactMessageAction(formData);
      setStatus({
        kind: res.ok ? "success" : "error",
        message: res.message,
      });
    });
  };

  if (status.kind === "success") {
    return (
      <div className="rounded-3xl border border-moss-200 bg-moss-50 p-8">
        <CheckCircle2 className="h-8 w-8 text-moss-500" />
        <h3 className="mt-3 font-display text-xl font-semibold text-moss-600">
          Message received
        </h3>
        <p className="mt-2 text-sm text-ink-400">{status.message}</p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <Field label="Full Name">
        <input
          name="full_name"
          required
          placeholder="Your name"
          className={inputClass}
        />
      </Field>
      <Field label="Email Address">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className={inputClass}
        />
      </Field>
      <Field label="Organization Type">
        <select name="organization" className={inputClass} defaultValue="">
          {ORG_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Tell us about your interest in Mobile Vet…"
          className={`${inputClass} min-h-[120px]`}
        />
      </Field>

      {status.kind === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-moss-500 px-6 py-3 text-sm font-semibold text-cream-50 shadow-soft transition hover:bg-moss-600 disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm text-ink-500 placeholder:text-ink-300 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-200";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-moss-600">
        {label}
      </span>
      {children}
    </label>
  );
}
