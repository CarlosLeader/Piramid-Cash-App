'use server';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

async function requireAdmin() { const user = await getCurrentUser(); if (!user || user.role !== 'ADMIN') redirect('/dashboard'); return user; }
export async function createTokenCode(formData: FormData) { await requireAdmin(); const amount = Number(formData.get('amount')); const code = `TOKEN-${crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()}`; if (Number.isInteger(amount) && amount > 0) await db.tokenCode.create({ data: { code, amount } }); redirect('/admin'); }
export async function deactivateTokenCode(formData: FormData) { await requireAdmin(); await db.tokenCode.updateMany({ where: { id: String(formData.get('id')) }, data: { active: false } }); redirect('/admin'); }