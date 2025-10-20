import { Worker, Queue } from 'bullmq';
import nodemailer from 'nodemailer';

const connection = { connection: { url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' } };
export const mailQueue = new Queue('mail', connection);

const transporter = nodemailer.createTransport(process.env.SMTP_URL || 'smtp://localhost');

export const mailWorker = new Worker('mail', async job => {
  if(job.name === 'contact_form'){
    const { to, subject, text } = job.data;
    await transporter.sendMail({ to, subject, text, from: process.env.MAIL_FROM || 'Finario <no-reply@finario.eu>' });
  } else if(job.name === 'trial_reminder'){
    const { to, template, vars } = job.data;
    let subject = 'Finario – Hinweis';
    let text = 'Hinweis';
    if(template === 'trial_day10'){
      subject = 'Noch 4 Tage kostenlos – jetzt Zahlungsdaten hinterlegen';
      text = `Hallo ${vars?.name||''},\nIhre kostenlose Testphase läuft in 4 Tagen ab. Sichern Sie sich weitere 14 Tage zum halben Preis (5,95 € brutto).`;
    } else if(template === 'trial_day14'){
      subject = 'Einführungspreis gestartet – 14 Tage nur 5,95 €';
      text = `Hallo ${vars?.name||''},\nIhre Einführungspreis-Phase hat begonnen – 14 Tage für 5,95 € (brutto).`;
    } else if(template === 'trial_day27'){
      subject = 'Letzte Chance: noch 1 Tag Einführungspreis';
      text = `Hallo ${vars?.name||''},\nIhre 14-tägige Einführungspreis-Phase endet morgen. Wählen Sie jetzt Ihren Tarif.`;
    } else if(template === 'conversion_success'){
      subject = 'Willkommen im gewählten Finario-Tarif';
      text = `Hallo ${vars?.name||''},\nIhr Tarif ist jetzt aktiv. Vielen Dank für Ihr Vertrauen!`;
    }
    await transporter.sendMail({ to, subject, text, from: process.env.MAIL_FROM || 'Finario <no-reply@finario.eu>' });
  } else {
    console.log('MAIL job', job.name, job.data);
  }
}, connection);
