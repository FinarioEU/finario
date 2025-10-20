import { Queue } from 'bullmq';

const connection = { connection: { url: process.env.REDIS_URL || 'redis://127.0.0.1:6379' } };

export const mailQueue = new Queue('mail', connection);
