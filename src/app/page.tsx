import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function Home() {
  const hasEnv = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!hasEnv) return <main style={{padding:24}}>Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local</main>;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <main style={{ padding: 24 }}>
      <h1>PWA Termux Starter</h1>
      <p>Supabase SSR status: {error ? 'not authenticated' : 'ok'}</p>
      <p>User: {data.user?.email ?? 'anonymous'}</p>
    </main>
  );
}
