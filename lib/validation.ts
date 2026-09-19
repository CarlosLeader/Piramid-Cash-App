import { z } from 'zod';
export const credentialsSchema = z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(2).max(80).optional(), referralCode: z.string().regex(/^USER-[A-Z0-9]{6}$/).optional() });
export const redeemSchema = z.object({ code: z.string().trim().min(4).max(64) });