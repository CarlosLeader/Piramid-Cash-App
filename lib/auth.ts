import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

const cookieName = 'piramid_session';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'local-development-secret');

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('7d').sign(secret);
  cookies().set(cookieName, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 604800 });
}
export async function getCurrentUser() {
  const token = cookies().get(cookieName)?.value;
  if (!token) return null;
  try { const { payload } = await jwtVerify(token, secret); return typeof payload.userId === 'string' ? db.user.findUnique({ where: { id: payload.userId } }) : null; } catch { return null; }
}
export function clearSession() { cookies().delete(cookieName); }