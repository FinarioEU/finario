import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { getStripe, getWebhookSecret } from './stripe';
import { mailQueue } from '../queue/queues';

@Controller('stripe')
export class StripeWebhookController {
  @Post('webhook')
  async handle(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') signature?: string){
    const stripe = getStripe();
    const secret = getWebhookSecret();

    try{
      const raw = (req as any).rawBody || (req as any).bodyRaw || JSON.stringify(req.body);
      const event = stripe.webhooks.constructEvent(raw, signature || '', secret);

      const sendConversionMail = async (data: any) => {
        const meta = data?.metadata || {};
        const email = meta.email || data?.customer_email || data?.customer?.email;
        const name = meta.name || '';
        if(email){
          await mailQueue.add('trial_reminder', {
            to: email,
            template: 'conversion_success',
            vars: { name }
          });
        }
      };

      if(event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated'){
        const sub = event.data.object as any;
        if(sub.status === 'active'){
          await sendConversionMail(sub);
        }
      }
      else if(event.type === 'invoice.payment_succeeded'){
        const inv = event.data.object as any;
        await sendConversionMail(inv);
      }

      return res.status(200).json({ received: true });
    }catch(err:any){
      return res.status(400).json({ error: err?.message || 'Webhook error' });
    }
  }
}
