import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "./constants";

export { ADMIN_COOKIE };
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set to a long random string in .env.local",
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export type AdminSession = {
  email: string;
  issuedAt: number;
};

function encode(session: AdminSession): string {
  const json = JSON.stringify(session);
  const payload = Buffer.from(json).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): AdminSession | null {
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(payload))) return null;
  try {
    const json = Buffer.from(payload, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as AdminSession;
    if (typeof parsed.email !== "string") return null;
    if (typeof parsed.issuedAt !== "number") return null;
    const ageSeconds = (Date.now() - parsed.issuedAt) / 1000;
    if (ageSeconds > COOKIE_MAX_AGE_SECONDS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function createAdminSession(email: string): Promise<void> {
  const store = await cookies();
  const token = encode({ email, issuedAt: Date.now() });
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return decode(token);
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function isAdminPasswordValid(email: string, password: string): boolean {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedEmail || !expectedPassword) return false;
  // Case-insensitive email, exact password.
  if (email.toLowerCase() !== expectedEmail.toLowerCase()) return false;
  return safeEqual(password, expectedPassword);
}
