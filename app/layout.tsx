import type { Metadata } from 'next';
import './globals.css';
import { SiteNav } from '@/components/site-nav';

export const metadata: Metadata = { title: 'Piramid Cash', description: 'Construye tu energía solar.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteNav />{children}</body></html>;
}