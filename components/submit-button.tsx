'use client';
import { useFormStatus } from 'react-dom';
export function SubmitButton({ children }: { children: React.ReactNode }) { const { pending } = useFormStatus(); return <button disabled={pending} className="bg-ink px-5 py-3 text-sm font-bold text-cream disabled:opacity-50">{pending ? 'Procesando...' : children}</button>; }