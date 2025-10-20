# Stripe Webhook – Conversion Success – 2025-10-19

**Ziel:** Wenn ein Kunde nach 28 Tagen in den Standardtarif wechselt (oder ein Abo aktiv wird), wird automatisch die E-Mail „conversion_success“ versendet.

## Setup
1. **ENV setzen**
```
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
REDIS_URL=redis://127.0.0.1:6379
SMTP_URL=smtp://user:pass@mailserver:587
MAIL_FROM="Finario <no-reply@finario.eu>"
```

2. **Raw Body aktivieren (NestJS)**
- Stelle sicher, dass die Route `/stripe/webhook` den rohen Body erhält (Stripe verlangt das).
- Beispiel `main.ts` (Express):
```ts
import * as bodyParser from 'body-parser';
app.use('/stripe/webhook', bodyParser.raw({ type: '*/*' }));
```

3. **Stripe Dashboard**
- Produkte/Preise: Start, Business, Enterprise anlegen.
- Webhook anlegen: Ziel `https://api.deine-domain.tld/stripe/webhook` mit Events
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `invoice.payment_succeeded`
- Secret kopieren → `STRIPE_WEBHOOK_SECRET`

4. **Testen (CLI)**
```
stripe listen --forward-to localhost:4000/stripe/webhook
stripe trigger customer.subscription.created
```

## Verhalten
- Bei aktiver Subscription oder erfolgreicher Rechnung: Job `trial_reminder` mit Template `conversion_success` → Worker verschickt Mail.
