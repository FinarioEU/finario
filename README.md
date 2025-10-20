# Finario – All-in-One (Web + API)

Monorepo:
- **apps/web** – Next.js 14 (Landingpage, Pricing, Dashboard, Kontakt)
- **apps/api** – NestJS 10 (Health, Trial-Status, Stripe-Webhook-Placeholder)

**Kontakt-E-Mail:** `finario@outlook.com`

## Schnellstart lokal
```bash
# Web
cd apps/web
npm i
npm run dev

# API
cd ../api
npm i
npm run start:dev
```

## Deploy (Kurz)
- Render (API): Root `apps/api`, Build `npm ci && npm run build`, Start `node dist/main.js`
- Vercel (Web): Root `apps/web`, ENV `NEXT_PUBLIC_API_URL=https://DEINE-API-DOMAIN`
