import type { Metadata } from "next";
import { PawPrint } from "lucide-react";
import { loginAction } from "@/app/actions/admin/auth";

export const metadata: Metadata = { title: "Admin Login · Mobile Vet" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-moss-600 px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-300 text-moss-700">
            <PawPrint className="h-7 w-7" strokeWidth={2.4} />
          </span>
          <div className="text-center">
            <h1 className="font-display text-xl font-bold text-cream-50">
              Mobile Vet Admin
            </h1>
            <p className="mt-1 text-sm text-cream-100/60">
              Sign in to manage content
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          action={loginAction}
          className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.08] p-8 backdrop-blur"
        >
          {error ? (
            <div className="rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200">
              Invalid email or password. Please try again.
            </div>
          ) : null}

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-cream-100">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@mobilevet.et"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/25"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-cream-100">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-cream-50 placeholder:text-cream-100/30 focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300/25"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-gold-300 px-6 py-3 text-sm font-semibold text-moss-700 shadow-soft transition hover:bg-gold-400 hover:text-cream-50"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-cream-100/40">
          Set <code className="font-mono">ADMIN_EMAIL</code> and{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> in{" "}
          <code className="font-mono">.env.local</code>
        </p>
      </div>
    </div>
  );
}
