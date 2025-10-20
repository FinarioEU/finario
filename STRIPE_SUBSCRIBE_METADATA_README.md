
# Stripe Abo mit Metadaten – 2025-10-19

**Endpunkte**
- `POST /billing/subscribe` → erstellt/aktualisiert Stripe-Kunde (metadata: tenantId, email, name, plan), hängt PM an (optional), erstellt Subscription (14 Tage Trial).
- `POST /stripe/webhook` → liest **metadata.email/name** bevorzugt aus, triggert `conversion_success` Mail bei aktiver Subscription oder erfolgreicher Rechnung.

**ENV (zusätzlich zu Webhook-Secret & Key)**
```
STRIPE_PRICE_START=price_live_xxx
STRIPE_PRICE_BUSINESS=price_live_yyy
STRIPE_PRICE_ENTERPRISE=price_live_zzz
```

**Hinweis Intro-Preis (14 Tage 50 %):**
- In Stripe realisiert man das sinnvoll über **Promotion Codes/Coupons** oder **Subscription Schedules**.
- Variante schnell: Coupon mit 50 % Rabatt und Laufzeit 14 Tage → beim Checkout/Upgrade anwenden.
- Variante pro: Subscription Schedule nach Trial: Phase 1 (14 Tage, 50 %) → Phase 2 (regulär).
