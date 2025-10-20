import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';

interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

const connection = new IORedis(process.env.REDIS_URL!);

export const emailWorker = new Worker<EmailJob>(
  'emailQueue',
  async (job: Job<EmailJob>) => {
    console.log(`📩 Verarbeite E-Mail an ${job.data.to} mit Betreff "${job.data.subject}"`);
    // TODO: Hier echten Versand z. B. via Nodemailer einfügen.
  },
  { connection }
);

emailWorker.on('completed', (job) => {
  console.log(`✅ Job ${job.id} abgeschlossen`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} fehlgeschlagen:`, err);
});
