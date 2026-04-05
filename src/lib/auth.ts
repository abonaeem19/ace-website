import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import prisma from "./db";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret-change-in-production");
const COOKIE_NAME = "ace_admin_token";

export interface AdminPayload { id: string; email: string; name: string; role: string; }

export async function createToken(payload: AdminPayload): Promise<string> {
  return await new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").setIssuedAt().sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try { const { payload } = await jwtVerify(token, JWT_SECRET); return payload as unknown as AdminPayload; } catch { return null; }
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !admin.isActive) return { success: false, error: "بيانات الدخول غير صحيحة" };
    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) return { success: false, error: "بيانات الدخول غير صحيحة" };
    const token = await createToken({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24, path: "/" });
    return { success: true };
  } catch (error) { console.error("Login error:", error); return { success: false, error: "حدث خطأ غير متوقع" }; }
}

export async function logout(): Promise<void> { const cookieStore = await cookies(); cookieStore.delete(COOKIE_NAME); }

export async function getSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies(); const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null; return await verifyToken(token);
}

export async function requireAuth(): Promise<AdminPayload> {
  const session = await getSession(); if (!session) throw new Error("Unauthorized"); return session;
}