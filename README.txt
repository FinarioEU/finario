Files:
- apps/api/package.json
- apps/api/.npmrc

Render settings:
- Root Directory: apps/api
- Build Command: npm install --include=dev && npm run build
- Start Command: node dist/main.js
ENV:
- NODE_VERSION=20.11.1
- NPM_CONFIG_PRODUCTION=false
- REDIS_URL=redis://<user>:<pass>@<host>:6379/0
Generated: 2025-10-20T18:05:25.530256Z
