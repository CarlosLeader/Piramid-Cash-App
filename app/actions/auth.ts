'use server';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { clearSession, createSession } from '@/lib/auth';

function code() { return `USER-${Math.random().toString(36).slice(2, 8).toUpperCase()}`; }
export async function register(formData: FormData) {
  const email = String(formData.get('email')).toLowerCase().trim(); const password = String(formData.get('password')); const name = String(formData.get('name') || 'Usuario'); const referral = String(formData.get('referralCode') || '').trim() || undefined;
  if (!email || password.length < 8) return;
  const referredBy = referral ? await db.user.findUnique({ where: { userCode: referral } }) : null;
  const user = await db.user.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12), userCode: code(), referredById: referredBy?.id } });
  await createSession(user.id); redirect('/dashboard');
}
export async function login(formData: FormData) {
  const email = String(formData.get('email')).toLowerCase().trim(); const password = String(formData.get('password')); const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) return;
  await createSession(user.id); redirect('/dashboard');
}
export async function logout() { clearSession(); redirect('/'); }