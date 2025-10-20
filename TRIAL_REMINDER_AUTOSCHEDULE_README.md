# Auto-Reminder Scheduling – 2025-10-19

- `POST /trial/start` erwartet: `tenantId`, `email`, optional `name`, `plan`.
- Beim Aufruf werden automatisch 3 Reminder-Jobs in die `mail`-Queue gelegt:
  - **Tag 10** → `trial_day10` (noch 4 Tage kostenlos)
  - **Tag 14** → `trial_day14` (Einführungspreis startet)
  - **Tag 27** → `trial_day27` (letzte Chance)
- Worker `src/queue/workers.ts` verschickt die Mails via Nodemailer.

**ENV:**
```
REDIS_URL=redis://127.0.0.1:6379
SMTP_URL=smtp://user:pass@mailserver:587
MAIL_FROM="Finario <no-reply@finario.eu>"
```
