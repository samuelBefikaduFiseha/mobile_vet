"use client";

import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { subscribeAction } from "@/app/actions/subscribe";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<
    { kind: "idle" | "success" | "error"; message?: string }
  >({ kind: "idle" });

  const onSubmit = (formData: FormData) => {
    setStatus({ kind: "idle" });
    startTransition(async () => {
      const res = await subscribeAction(formData);
      if (res.ok) {
        setStatus({
          kind: "success",
          message: res.message ?? "Thanks for subscribing!",
        });
      } else {
        setStatus({
          kind: "error",
          message: res.message ?? "Something went wrong. Please try again.",
        });
      }
    });
  };

  if (status.kind === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-moss-100 px-4 py-3 text-sm text-moss-600">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p>{status.message}</p>
      </div>
    );
  }

  return (
    <form
      action={onSubmit}
      className={`flex w-full flex-col gap-3 ${
        compact ? "sm:flex-row" : ""
      }`}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-full border border-cream-200 bg-cream-50 px-5 py-3 text-sm text-ink-500 placeholder:text-ink-300 focus:border-moss-400 focus:outline-none focus:ring-2 focus:ring-moss-200"
      />
      <input type="hidden" name="source" value="blog" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-moss-500 px-6 py-3 text-sm font-semibold text-cream-50 shadow-soft transition hover:bg-moss-600 disabled:opacity-70"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Subscribe <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {status.kind === "error" ? (
        <p className="text-sm text-red-600 sm:basis-full">{status.message}</p>
      ) : null}
    </form>
  );
}
