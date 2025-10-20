# Trial & Intro Pricing – 2025-10-19

**Flow:** 14 Tage kostenlos → 14 Tage 50 % auf Start‑Preis → danach Normalpreis je Plan.  
API‑Blueprints:
- `POST /trial/start` – speichert Start (DB TODO) und gibt Phasen & Preise zurück
- `GET /trial/status?tenantId=…` – ermittelt Phase (free/intro/normal) anhand Startdatum (hier Demo)
- `POST /trial/subscribe` – Blueprint zur Abo-Anlage (Stripe/Provider nötig)

**Preise brutto (GROSS_PRICES):** Start 11,90 € · Business 29,90 € · Enterprise 99,00 €  
**Intro:** 50 % des Planpreises (z. B. Start 5,95 €)
