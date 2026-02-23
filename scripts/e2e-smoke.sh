#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail
APP_URL="${1:-https://pwa-with-actions-02231646.vercel.app}"
curl -fsSL "$APP_URL" | grep -qi "PWA Termux Starter"
curl -fsSL "$APP_URL/auth" | grep -qi "Authentication"
echo "e2e-smoke ok"
