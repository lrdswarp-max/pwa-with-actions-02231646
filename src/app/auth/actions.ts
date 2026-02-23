'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

function getBaseUrl(headerStore: Headers) {
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host');
  const proto = headerStore.get('x-forwarded-proto') ?? 'http';
  if (!host) return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  return `${proto}://${host}`;
}

export async function signInWithMagicLink(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  if (!email) redirect('/auth?error=missing-email');

  const supabase = await createSupabaseServerClient();
  const headerStore = await headers();
  const redirectTo = `${getBaseUrl(headerStore)}/auth/callback`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: redirectTo }
  });

  if (error) redirect(`/auth?error=${encodeURIComponent(error.message)}`);
  redirect('/auth?message=check-your-email');
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/auth?message=signed-out');
}
