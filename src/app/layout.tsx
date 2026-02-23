import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PWA Termux Starter',
  description: 'Next.js + Supabase SSR starter',
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
