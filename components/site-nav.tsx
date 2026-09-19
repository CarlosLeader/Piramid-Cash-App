import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { logout } from '@/app/actions/auth';

export async function SiteNav() {
  const user = await getCurrentUser();
  return <header className="border-b border-ink/10 bg-cream/90 px-6 py-5"><div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
    <Link href="/" className="font-display text-2xl tracking-tight">PIRAMID<span className="text-moss">.CASH</span></Link>
    <nav className="hidden items-center gap-5 text-sm md:flex"><Link href="/cards">Tarjetas</Link>{user ? <><Link href="/dashboard">Dashboard</Link><Link href="/my-cards">Mis tarjetas</Link><Link href="/history">Historial</Link></> : <Link href="/login">Entrar</Link>}</nav>
    {user ? <form action={logout}><button className="border border-ink/20 px-4 py-2 text-sm">Salir</button></form> : <Link href="/register" className="bg-ink px-4 py-2 text-sm text-cream">Crear cuenta</Link>}
  </div></header>;
}