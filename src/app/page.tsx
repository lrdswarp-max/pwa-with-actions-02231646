import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-12">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Termux Dev Stack + GitHub Actions</p>
          <h1 className="text-4xl font-semibold">PWA Termux Starter</h1>
          <p className="text-lg text-slate-300">
            GitHub Actions ensures tests + build before Vercel deploy. Authentication status below.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold">Authentication Status</h2>
          <p className="mt-2 text-slate-300">
            {user
              ? `Signed in as ${user.email ?? user.id}`
              : 'No active session. Use the auth page to request a magic link and sign in quickly.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white" href="/auth">
              Manage session
            </Link>
            <Link className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white" href="/">
              Refresh status
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Deployment</h3>
            <p className="text-sm text-slate-300">GitHub Actions → Vercel pipeline handles reruns and audits.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-semibold">Live URL</h3>
            <p className="text-sm text-slate-300">https://pwa-with-actions-02231646.vercel.app</p>
          </article>
        </section>
      </div>
    </main>
  );
}
