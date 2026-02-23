'use server';

import { createSupabaseServerClient } from '@/lib/supabase-server';
import Link from 'next/link';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

function buildRedirectUrl() {
  const hdr = headers();
  const host = hdr.get('x-forwarded-host') || hdr.get('host') || 'localhost:3000';
  const proto = hdr.get('x-forwarded-proto') || 'https';
  return `${proto}://${host}/auth`;
}

async function sendMagicLink(formData: FormData) {
  const emailValue = formData.get('email');
  if (!emailValue || typeof emailValue !== 'string') {
    throw new Error('Provide a valid email address.');
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signInWithOtp({
    email: emailValue,
    options: { emailRedirectTo: buildRedirectUrl() },
  });
  revalidatePath('/auth');
}

async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  revalidatePath('/auth');
}

export default async function AuthPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Authentication</h1>
          <p className="text-slate-400">Magic link sign-in powered by Supabase + GitHub Actions validated stack.</p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="space-y-4">
            {user ? (
              <div className="space-y-3">
                <p className="text-lg">You are signed in as {user.email ?? user.id}</p>
                <form action={signOut} className="inline-flex">
                  <button
                    type="submit"
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <form action={sendMagicLink} className="space-y-3">
                <label className="block text-sm font-medium text-slate-300" htmlFor="email">
                  Email for magic link
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                  placeholder="you@example.com"
                />
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white"
                >
                  Send magic link
                </button>
              </form>
            )}
          </div>
        </section>

        <footer>
          <Link href="/" className="text-sm text-sky-300">
            Back to home
          </Link>
        </footer>
      </div>
    </main>
  );
}
