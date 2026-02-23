#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

# 1) Validate local app
pnpm test
pnpm build

# 2) Optional DB migrations push (if supabase project linked and migrations exist)
if [ -d supabase/migrations ] && [ "$(ls -A supabase/migrations 2>/dev/null || true)" != "" ]; then
  supabase db push --linked || echo "supabase db push skipped/fail (check link or migrations)"
fi

# 3) Sync source to GitHub
git add .
if ! git diff --cached --quiet; then
  git commit -m "chore: sync cloud $(date +%Y-%m-%dT%H:%M:%S)"
fi
git push origin main

# 4) Deploy to Vercel production
vercel --prod --yes
