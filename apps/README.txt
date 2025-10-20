Bundle v7 — adds npm "overrides" to force Typescript 5.4.5 and pins all deps.

Upload these files to your repo at:
apps/api/package.json
apps/api/.npmrc

Then in Render (Finario-API):
- Root Directory: apps/api
- Build Command: npm install --include=dev --legacy-peer-deps --no-audit --no-fund && npm run build
- Start Command: node dist/main.js
- ENV: NODE_VERSION=20.11.1, NPM_CONFIG_PRODUCTION=false, REDIS_URL=...

IMPORTANT CLEANUP in your GitHub repo:
- Delete any **package.json** and **package-lock.json** in the repo root (/) if present.
- Keep package.json only under apps/api/
- Commit the deletions.
- In Render: Manual Deploy → Clear build cache & Redeploy.
Generated: 2025-10-20T18:22:02.729717Z
